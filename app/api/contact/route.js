const CONTACT_WEBHOOK = process.env.CONTACT_WEBHOOK_URL;
const SALESFORCE_WEBHOOK = process.env.SALESFORCE_WEBHOOK_URL;
// Ivoclar Germany's Pardot form handler (Sophie Mosner, 13 Oct 2026). It is the same handler
// behind Ivoclar's own offer form, so it is the default; FORM_ACTION_URL / PARDOT_FORM_ACTION
// still override it. (Never fall back to the US handler: German leads would land in the US campaign.)
const DEFAULT_FORM_ACTION_URL = 'https://campaign.ivoclar.com/l/794073/2026-10-12/4bsjwj';
const FORM_ACTION_URL =
  process.env.FORM_ACTION_URL || process.env.PARDOT_FORM_ACTION || DEFAULT_FORM_ACTION_URL;

// Our field names -> the names Ivoclar's DE offer form posts to that handler (read from
// ivoclar.com/de_de/ips-emax-zirconia-neukundenangebot-lp on 10 Nov 2026). Fields that already
// match (firstname, lastname, email, city, country, privacy, doubleoptin, utm_*) are sent as-is.
const DEFAULT_FIELD_MAP = {
  discheight: 'schreibhoehe',
  shade: 'farbe',
  depot: 'dentaldepot',
  jobtitle: 'industry',
  company: 'companyname',
  address: 'Adress',
  zip: 'zipcode',
};

// Optional FORM_FIELD_MAP (JSON) adds to or overrides the defaults, e.g. {"zip":"postal_code"}.
function parseFieldMap() {
  const raw = process.env.FORM_FIELD_MAP;
  if (!raw) return { ...DEFAULT_FIELD_MAP };
  try {
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_FIELD_MAP, ...(parsed && typeof parsed === 'object' ? parsed : {}) };
  } catch (err) {
    console.error('FORM_FIELD_MAP is not valid JSON; using the default field map.');
    return { ...DEFAULT_FIELD_MAP };
  }
}
const FORM_FIELD_MAP = parseFieldMap();

// Attribution agreed on the 8 Oct call: every lead from these pages is flagged as ColdStart.
const LEAD_SOURCE = process.env.LEAD_SOURCE_VALUE || 'ColdStart';
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_MIN_SCORE = parseFloat(process.env.RECAPTCHA_MIN_SCORE || '0.5');
const RECAPTCHA_EXPECTED_ACTION = process.env.RECAPTCHA_EXPECTED_ACTION || 'lead_capture';

async function verifyRecaptcha(token, remoteIp) {
  if (!RECAPTCHA_SECRET_KEY) {
    console.error('RECAPTCHA_SECRET_KEY is not configured');
    return { success: false, error: 'captcha-not-configured' };
  }
  if (!token || typeof token !== 'string') {
    return { success: false, error: 'missing-token' };
  }

  const params = new URLSearchParams({
    secret: RECAPTCHA_SECRET_KEY,
    response: token,
  });
  if (remoteIp) params.append('remoteip', remoteIp);

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        error: 'verification-failed',
        codes: data['error-codes'] || [],
      };
    }

    // For reCAPTCHA v3 the response includes a score (0.0 - 1.0) and an action.
    if (typeof data.score === 'number' && data.score < RECAPTCHA_MIN_SCORE) {
      return { success: false, error: 'low-score', score: data.score };
    }

    if (
      RECAPTCHA_EXPECTED_ACTION &&
      data.action &&
      data.action !== RECAPTCHA_EXPECTED_ACTION
    ) {
      return { success: false, error: 'action-mismatch', action: data.action };
    }

    return { success: true, score: data.score, action: data.action };
  } catch (err) {
    console.error('reCAPTCHA verification error:', err);
    return { success: false, error: 'verification-error' };
  }
}

function buildFormEncodedBody(formData) {
  const body = new URLSearchParams();
  Object.entries(formData).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) body.append(key, String(item));
      });
    } else if (typeof value === 'boolean') {
      // Match the original Pardot form, which sent checkbox values as the string "true"
      if (value) body.append(key, 'true');
    } else {
      body.append(key, String(value));
    }
  });
  return body;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { recaptchaToken, ...submitted } = body || {};

    // Attribution is stamped server-side so it is present even if the client field is missing.
    const referer = request.headers.get('referer') || '';
    const formData = {
      ...submitted,
      lead_source: LEAD_SOURCE,
      page_url: submitted.page_url || referer.split('?')[0] || '',
    };

    const remoteIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      undefined;

    const verification = await verifyRecaptcha(recaptchaToken, remoteIp);
    if (!verification.success) {
      console.warn('reCAPTCHA verification rejected:', verification);
      return new Response(
        JSON.stringify({ ok: false, error: 'captcha-failed', detail: verification.error }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    if (!FORM_ACTION_URL && !CONTACT_WEBHOOK && !SALESFORCE_WEBHOOK) {
      console.error('No lead destination configured: set FORM_ACTION_URL to the Ivoclar DE form handler.');
      return new Response(
        JSON.stringify({ ok: false, error: 'form-endpoint-not-configured' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Forward to the Ivoclar DE form handler (Salesforce/Pimcore) as form-urlencoded.
    if (FORM_ACTION_URL) {
      try {
        const mapped = Object.fromEntries(
          Object.entries(formData).map(([key, value]) => [FORM_FIELD_MAP[key] || key, value]),
        );
        const pardotBody = buildFormEncodedBody(mapped);
        const pardotRes = await fetch(FORM_ACTION_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: pardotBody.toString(),
          // Pardot form handlers typically respond with a 302 redirect to a thank-you page.
          // We don't want to follow it; we just want to know it accepted the submission.
          redirect: 'manual',
        });
        // Accept 2xx and 3xx as success. 0 status can occur with manual redirects in some runtimes.
        if (pardotRes.status !== 0 && pardotRes.status >= 400) {
          console.error('Pardot submission failed:', { status: pardotRes.status });
          return new Response(
            JSON.stringify({ ok: false, target: 'pardot' }),
            { status: 502, headers: { 'Content-Type': 'application/json' } },
          );
        }
      } catch (err) {
        console.error('Pardot submission threw:', err);
        return new Response(
          JSON.stringify({ ok: false, target: 'pardot' }),
          { status: 502, headers: { 'Content-Type': 'application/json' } },
        );
      }
    }

    // Optional additional webhooks (JSON). Preserved from the original behavior.
    const targets = [
      { url: CONTACT_WEBHOOK, name: 'contact_webhook' },
      { url: SALESFORCE_WEBHOOK, name: 'salesforce_webhook' },
    ].filter((target) => Boolean(target.url));

    for (const target of targets) {
      const res = await fetch(target.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        console.error('Contact forward failed:', { target: target.name, status: res.status });
        return new Response(
          JSON.stringify({ ok: false, target: target.name }),
          { status: 502, headers: { 'Content-Type': 'application/json' } },
        );
      }
    }

    return new Response(
      JSON.stringify({ ok: true, score: verification.score }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ ok: false }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
