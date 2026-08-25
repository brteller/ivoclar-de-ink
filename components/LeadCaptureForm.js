'use client';

import { useEffect, useState } from 'react';
import { translate } from '@/lib/i18n';
import Script from 'next/script';

const JOB_TITLE_OPTIONS = [
  { value: '01', label: 'Dental Laboratory' },
  { value: '02', label: 'Practice Laboratory' },
  { value: '03', label: 'Dental Practice' },
  { value: '04', label: 'Milling Centre' },
  { value: '05', label: 'Other' },
];

const STATE_PROVINCE_OPTIONS = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Vermont', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'Alberta', 'British Columbia', 'Manitoba',
  'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut',
  'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon',
];

const COUNTRY_OPTIONS = ['Germany', 'Austria'];

const PRODUCT_OPTIONS = [
  { value: 'IPS e.max Zirconia', label: 'IPS e.max Zirconia disc' },
  { value: 'IPS e.max Ceram Art', label: 'IPS e.max Ceram Art' },
  { value: 'Color Liquids', label: 'Color Liquids' },
  { value: 'PrograMill 7', label: 'PrograMill 7' },
];

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const RECAPTCHA_ACTION = 'lead_capture';

export default function LeadCaptureForm({ lang = 'de' }) {
  const t = (s) => translate(lang, s);
  const [formData, setFormData] = useState({
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
    products: [],
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
    const { name, value, type, checked, multiple, options } = e.target;
    if (multiple) {
      const selected = Array.from(options).filter((o) => o.selected).map((o) => o.value);
      setFormData((prev) => ({ ...prev, [name]: selected }));
      return;
    }
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
        reject(new Error('reCAPTCHA site key is not configured'));
        return;
      }
      if (typeof window === 'undefined' || !window.grecaptcha || !window.grecaptcha.ready) {
        reject(new Error('reCAPTCHA failed to load. Please refresh and try again.'));
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
          throw new Error("We couldn't verify that you're not a bot. Please refresh and try again.");
        }
        throw new Error('There was a problem submitting your request. Please try again.');
      }
      window.location.href = '/thank-you';
    } catch (err) {
      console.error('Form submission error:', err);
      setErrorMessage(err.message || 'There was a problem submitting your request.');
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 md:px-6 bg-white border-t border-gray-200">
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-normal text-[#0a478b] mb-8 tracking-tight">{t('Request your IPS e.max Zirconia order')}</h2>
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <input type="hidden" name="utm_source" value={formData.utm_source} />
          <input type="hidden" name="utm_medium" value={formData.utm_medium} />
          <input type="hidden" name="utm_campaign" value={formData.utm_campaign} />
          <p className="text-sm text-gray-700">
          In Germany, ordering is quick: complete the form below and our team will connect you with one of the hundreds of dealers in your area. Tell us what you need and we will be in touch.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={t('First name')} required><input type="text" name="firstname" value={formData.firstname} onChange={handleFormChange} required className={inputClass} /></Field>
            <Field label={t('Last name')} required><input type="text" name="lastname" value={formData.lastname} onChange={handleFormChange} required className={inputClass} /></Field>
            <Field label={t('Company Name')} required><input type="text" name="company" value={formData.company} onChange={handleFormChange} required className={inputClass} /></Field>
            <Field label={t('Email')} required><input type="email" name="email" value={formData.email} onChange={handleFormChange} required className={inputClass} /></Field>

            <Field label={t('Company type')} required>
              <select name="jobtitle" value={formData.jobtitle} onChange={handleFormChange} required className={inputClass}>
                <option value="">{t('Company type')}</option>
                {JOB_TITLE_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </Field>

            <Field label={t('Phone')}><input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} className={inputClass} /></Field>
            <Field label={t('Address')} required><input type="text" name="address" value={formData.address} onChange={handleFormChange} required className={inputClass} /></Field>
            <Field label={t('City')} required><input type="text" name="city" value={formData.city} onChange={handleFormChange} required className={inputClass} /></Field>

            <Field label={t('Post code')} required><input type="text" name="zip" value={formData.zip} onChange={handleFormChange} required className={inputClass} /></Field>

            <Field label={t('Country')} required>
              <select name="country" value={formData.country} onChange={handleFormChange} required className={inputClass}>
                <option value="">{t('Country')}</option>
                {COUNTRY_OPTIONS.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </Field>

            <Field label={t('Which products would you like to order?')}>
              <select multiple name="products" value={formData.products} onChange={handleFormChange} className={`${inputClass} min-h-[128px]`}>
                {PRODUCT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </Field>
          </div>

          <div className="space-y-4 pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="privacy" value="true" checked={formData.privacy} onChange={handleFormChange} required className="mt-1 rounded border-gray-300 text-[#0a478b] focus:ring-[#0a478b]" />
              <span className="text-sm text-gray-700">
                I&apos;ve read and understood the{' '}
                <a href="https://www.ivoclar.com/en_us/legal/general-terms-of-use" target="_blank" rel="noopener noreferrer" className="text-[#0a478b] hover:underline">
                  {t('General Terms of Use')}
                </a>.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="doubleoptin" value="true" checked={formData.doubleoptin} onChange={handleFormChange} className="mt-1 rounded border-gray-300 text-[#0a478b] focus:ring-[#0a478b]" />
              <span className="text-sm text-gray-700">
                I would like to receive newsletters from Ivoclar and agree to the{' '}
                <a href="https://www.ivoclar.com/en_us/legal/marketing-consent" target="_blank" rel="noopener noreferrer" className="text-[#0a478b] hover:underline">
                  {t('Marketing Terms of use')}
                </a>.
              </span>
            </label>
          </div>

          <p className="text-xs text-gray-500">{t('This offer is available in Germany and Austria only.')}</p>

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
              {submitting ? 'Submitting...' : 'Submit your order'}
            </button>
          </div>

          <p className="text-xs text-gray-500 pt-2">
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
              {t('Privacy Policy')}
            </a>{' '}
            and{' '}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
              {t('Terms of Service')}
            </a>{' '}
            apply.
          </p>
        </form>
      </div>
    </section>
  );
}

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a478b]/20 focus:border-[#0a478b] bg-white';

function Field({ label, required = false, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required ? ' *' : ''}
      </span>
      {children}
    </label>
  );
}
