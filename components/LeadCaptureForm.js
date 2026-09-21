'use client';

import { useEffect, useState } from 'react';
import { translate } from '@/lib/i18n';
import Script from 'next/script';

/**
 * On-page order form for the German IPS e.max Zirconia new-customer offer.
 *
 * Ivoclar feedback 2026-09:
 *  - slide 6: add the three order-specification boxes from the Ivoclar DE form, with their
 *    drop-downs — Gewünschte Scheibenhöhe, Gewünschte Farbe, and the Opaque Liquid add-on.
 *    Option lists and price labels are mirrored verbatim from
 *    https://www.ivoclar.com/de_de/local/zirconia_neukundenangebot
 *    (fields formbuilder_4410[schreibhoehe], [farbe], [opaqueliquid]).
 *  - slide 6: the "Oder bestellen Sie direkt hier" heading is deleted — the form now sits
 *    directly under the offer copy, so it no longer reads as an alternative route.
 *  - slide 7: the "Welche Produkte möchten Sie bestellen?" multi-select is deleted. The
 *    product is implied by the offer, and the three new fields specify it precisely.
 *  - slide 7: all remaining hardcoded English copy routes through translate().
 *  - slide 7: the German legal remarks from the Ivoclar DE page are added below the form.
 *
 * Option `value`s are deliberately left untranslated: they are what reaches Pardot and
 * Salesforce, so only the visible labels are localised.
 */

const JOB_TITLE_OPTIONS = [
  { value: '01', label: 'Dental Laboratory' },
  { value: '02', label: 'Practice Laboratory' },
  { value: '03', label: 'Dental Practice' },
  { value: '04', label: 'Milling Centre' },
  { value: '05', label: 'Other' },
];

const COUNTRY_OPTIONS = ['Germany', 'Austria'];

/**
 * Ivoclar feedback 2026-09 slide 6, box 1: "Gewünschte Scheibenhöhe".
 * Prices are the Ivoclar DE offer prices (30% off the RRP) and are shown in the label
 * exactly as Ivoclar words them. 30 mm carries footnote [1] — see LEGAL_FOOTNOTE below.
 */
const DISC_HEIGHT_OPTIONS = [
  { value: '12 mm', label: '12 mm (für nur 107,80 € statt 154,00 €)' },
  { value: '14 mm', label: '14 mm (für nur 130,90 € statt 187,00 €)' },
  { value: '16 mm', label: '16 mm (für nur 147,70 € statt 211,00 €)' },
  { value: '18 mm', label: '18 mm (für nur 160,30 € statt 229,00 €)' },
  { value: '22 mm', label: '22 mm (für nur 188,30 € statt 269,00 €)' },
  { value: '25 mm', label: '25 mm (für nur 198,10 € statt 283,00 €)' },
  { value: '30 mm', label: '30 mm[1] (für nur 230,30 € statt 329,00 €)' },
];

/** Ivoclar feedback 2026-09 slide 6, box 2: "Gewünschte Farbe" — the full 20-shade portfolio. */
const SHADE_OPTIONS = [
  'BL1', 'BL2', 'BL3', 'BL4',
  'A1', 'A2', 'A3', 'A3,5', 'A4',
  'B1', 'B2', 'B3', 'B4',
  'C1', 'C2', 'C3', 'C4',
  'D2', 'D3', 'D4',
];

/** Ivoclar feedback 2026-09 slide 6, box 3: the Opaque Liquid add-on. */
const OPAQUE_LIQUID_OPTIONS = [
  { value: 'Ja', label: 'Yes' },
  { value: 'Nein', label: 'No' },
];

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const RECAPTCHA_ACTION = 'lead_capture';

export default function LeadCaptureForm({ lang = 'de' }) {
  const t = (s) => translate(lang, s);
  const [formData, setFormData] = useState({
    discheight: '',
    shade: '',
    opaqueliquid: '',
    firstname: '',
    lastname: '',
    company: '',
    email: '',
    jobtitle: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    privacy: false,
    doubleoptin: false,
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_id: '',
    utm_content: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFormData((prev) => ({
      ...prev,
      utm_source: params.get('utm_source') ?? '',
      utm_medium: params.get('utm_medium') ?? '',
      utm_campaign: params.get('utm_campaign') ?? '',
    }));
  }, []);

  const getRecaptchaToken = () =>
    new Promise((resolve, reject) => {
      if (!RECAPTCHA_SITE_KEY) {
        reject(new Error(t('reCAPTCHA is not configured. Please try again later.')));
        return;
      }
      if (typeof window === 'undefined' || !window.grecaptcha || !window.grecaptcha.ready) {
        reject(new Error(t('reCAPTCHA failed to load. Please refresh and try again.')));
        return;
      }
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
            action: RECAPTCHA_ACTION,
          });
          resolve(token);
        } catch (err) {
          reject(err);
        }
      });
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMessage(null);
    setSubmitting(true);
    try {
      const recaptchaToken = await getRecaptchaToken();
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (data?.error === 'captcha-failed') {
          throw new Error(t("We couldn't verify that you're not a bot. Please refresh and try again."));
        }
        throw new Error(t('There was a problem submitting your request. Please try again.'));
      }
      window.location.href = '/thank-you';
    } catch (err) {
      console.error('Form submission error:', err);
      setErrorMessage(err.message || t('There was a problem submitting your request. Please try again.'));
      setSubmitting(false);
    }
  };

  return (
    <section className="pb-16 px-4 md:px-6 bg-white">
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}
      <div className="max-w-5xl mx-auto">
        {/* Ivoclar feedback 2026-09 slide 6: the "Oder bestellen Sie direkt hier" heading is
            deleted. The form is now the only order route, so it needs no framing as an
            alternative — it carries the Ivoclar form's own section title instead. */}
        <h2 className="text-2xl md:text-3xl font-normal text-[#0a478b] mb-8 tracking-tight">
          {t('Order IPS e.max Zirconia at a preferential price')}
        </h2>
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <input type="hidden" name="utm_source" value={formData.utm_source} />
          <input type="hidden" name="utm_medium" value={formData.utm_medium} />
          <input type="hidden" name="utm_campaign" value={formData.utm_campaign} />
          <p className="text-sm text-gray-700">
            {t('We process your personal data for your participation in this campaign and in order to send you a survey.')}{' '}
            <a
              href="https://www.ivoclar.com/de_de/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0a478b] hover:underline"
            >
              {t('Privacy Policy')}
            </a>
            {t('PRIVACY_NOTE_POST')}
          </p>

          {/* Ivoclar feedback 2026-09 slide 6: the three order-specification boxes. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={t('Desired disc height')} required>
              <select name="discheight" value={formData.discheight} onChange={handleFormChange} required className={inputClass}>
                <option value="">{t('Please select')}</option>
                {DISC_HEIGHT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </Field>

            <Field label={t('Desired shade')} required>
              <select name="shade" value={formData.shade} onChange={handleFormChange} required className={inputClass}>
                <option value="">{t('Please select')}</option>
                {SHADE_OPTIONS.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </Field>

            <Field
              label={t('I would like to order the Opaque Liquid for €46.20 instead of €66.00 as well')}
              required
              className="md:col-span-2"
            >
              <select name="opaqueliquid" value={formData.opaqueliquid} onChange={handleFormChange} required className={inputClass}>
                <option value="">{t('Please select')}</option>
                {OPAQUE_LIQUID_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{t(opt.label)}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={t('First name')} required><input type="text" name="firstname" value={formData.firstname} onChange={handleFormChange} required className={inputClass} /></Field>
            <Field label={t('Last name')} required><input type="text" name="lastname" value={formData.lastname} onChange={handleFormChange} required className={inputClass} /></Field>
            <Field label={t('Company Name')} required><input type="text" name="company" value={formData.company} onChange={handleFormChange} required className={inputClass} /></Field>
            <Field label={t('Email')} required><input type="email" name="email" value={formData.email} onChange={handleFormChange} required className={inputClass} /></Field>

            <Field label={t('Company type')} required>
              <select name="jobtitle" value={formData.jobtitle} onChange={handleFormChange} required className={inputClass}>
                <option value="">{t('Please select')}</option>
                {JOB_TITLE_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{t(opt.label)}</option>)}
              </select>
            </Field>

            <Field label={t('Phone')}><input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} className={inputClass} /></Field>
            <Field label={t('Address')} required><input type="text" name="address" value={formData.address} onChange={handleFormChange} required className={inputClass} /></Field>
            <Field label={t('City')} required><input type="text" name="city" value={formData.city} onChange={handleFormChange} required className={inputClass} /></Field>

            <Field label={t('Post code')} required><input type="text" name="zip" value={formData.zip} onChange={handleFormChange} required className={inputClass} /></Field>

            <Field label={t('Country')} required>
              <select name="country" value={formData.country} onChange={handleFormChange} required className={inputClass}>
                <option value="">{t('Please select')}</option>
                {COUNTRY_OPTIONS.map((value) => <option key={value} value={value}>{t(value)}</option>)}
              </select>
            </Field>
          </div>

          {/* Ivoclar feedback 2026-09 slide 7 ("Translate please"): both consent labels are
              assembled from translated fragments so the inline links keep their position in
              the German sentence, and they point at the de_de legal pages. */}
          <div className="space-y-4 pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="privacy" value="true" checked={formData.privacy} onChange={handleFormChange} required className="mt-1 rounded border-gray-300 text-[#0a478b] focus:ring-[#0a478b]" />
              <span className="text-sm text-gray-700">
                {t('CONSENT1_PRE')}
                <a href="https://www.ivoclar.com/de_de/footer/verkaufsbedingungen" target="_blank" rel="noopener noreferrer" className="text-[#0a478b] hover:underline">
                  {t('General Terms of Use')}
                </a>
                {t('CONSENT1_POST')}
                <span className="text-red-600"> *</span>
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="doubleoptin" value="true" checked={formData.doubleoptin} onChange={handleFormChange} className="mt-1 rounded border-gray-300 text-[#0a478b] focus:ring-[#0a478b]" />
              <span className="text-sm text-gray-700">
                {t('CONSENT2_PRE')}
                <a href="https://www.ivoclar.com/de_de/legal/marketing-consent" target="_blank" rel="noopener noreferrer" className="text-[#0a478b] hover:underline">
                  {t('Marketing Terms of use')}
                </a>
                {t('CONSENT2_POST')}
              </span>
            </label>
          </div>

          {/* Lena, 1 Sep 2026 (slide 6): "Dieses Angebot ist nur in Deutschland und Österreich verfügbar" removed; the Land dropdown covers it. */}

          {errorMessage && (
            <p className="text-sm text-red-600" role="alert">
              {errorMessage}
            </p>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#0a478b] hover:bg-[#083a70] disabled:bg-[#0a478b]/60 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-lg transition-colors"
            >
              {submitting ? t('Submitting...') : t('Order now, subject to payment')}
            </button>
          </div>

          <p className="text-xs text-gray-500 pt-2">
            {t('RECAPTCHA_PRE')}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
              {t('Privacy Policy')}
            </a>
            {t('RECAPTCHA_AND')}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
              {t('Terms of Service')}
            </a>
            {t('RECAPTCHA_POST')}
          </p>
        </form>

        {/* Ivoclar feedback 2026-09 slide 7 ("Add German remarks"): the offer conditions from
            the Ivoclar DE page, reproduced verbatim. German only by design — these are the
            legally binding terms for the DE/AT offer and must not be paraphrased. */}
        <div className="mt-10 border-t border-gray-200 pt-6 space-y-3 text-[11px] leading-relaxed text-gray-500">
          <p>
            [1] 30 mm Scheiben sind nur in folgenden Farben erhältlich: BL1, BL3, A1, A2, A3,
            A3,5, B1, B2
          </p>
          <p>
            Dieses Angebot gilt nur für Neukunden, nur auf je ein Produkt und nur einmal je
            Labor. Bei Nichtgefallen muss die Scheibe innerhalb von 30 Tagen zur Gutschrift an
            Ivoclar zurückgesendet werden. Mind. 50% der Scheibe müssen dabei unbearbeitet
            sein. Alle angegebenen Preise sind unverbindliche Preisempfehlungen zzgl. MwSt.,
            Irrtümer und Änderungen vorbehalten. Angebote gültig bis 31.10.2026 – solange der
            Vorrat reicht. Bitte prüfen Sie die Verfügbarkeiten in Ihrem Land. Diese Angebote
            sind nicht mit gesonderten Verkaufsaktionen kombinierbar. Ausführlichere
            Informationen finden Sie in den allgemeinen Geschäftsbedingungen. Ivoclar Vivadent
            GmbH Ellwangen verarbeitet Ihre personenbezogenen Daten zur Erfüllung der
            vertraglichen Pflichten, die sich aus den Allgemeinen Geschäftsbedingungen ergeben.
            Einzelheiten zur Verarbeitung personenbezogener Daten und Ihren Rechten finden Sie
            im Abschnitt{' '}
            <a
              href="https://www.ivoclar.com/de_de/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-700"
            >
              Datenschutz
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a478b]/20 focus:border-[#0a478b] bg-white';

function Field({ label, required = false, className = '', children }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required ? ' *' : ''}
      </span>
      {children}
    </label>
  );
}
