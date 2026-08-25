'use client';

import { translate } from '@/lib/i18n';

/**
 * Zirconia new-customer offer CTA.
 *
 * Per Ivoclar (Lena Lackner) review of 2026-08-20, the on-page ColdStart order form is
 * replaced by a link out to Ivoclar's own, already-approved online form:
 *   "Remove with following form (link to online form: IPS e.max Zirconia Neukundenangebot | Ivoclar DE)
 *    Add as headline: Lernen Sie das neue Zirkonoxid kennen und testen Sie es selbst!
 *    Subheadline: IPS e.max Zirconia mit 30% Rabatt bestellen:"
 *
 * The previous form component (LeadCaptureForm) is intentionally left in the repo so this
 * can be reverted in one line if Ivoclar wants the on-page form back.
 *
 * NOTE: keeps id="contact" because the hero and "Von Experten für Experten" CTAs scroll to it.
 * NOTE: outbound clicks are tagged so the pilot can still attribute conversions even though
 *       the submission itself now happens on ivoclar.com.
 */

const IVOCLAR_OFFER_URL =
	'https://www.ivoclar.com/de_de/local/zirconia_neukundenangebot' +
	'?utm_source=Homepage&utm_medium=Banner+Startseite+Slider+Message' +
	'&utm_campaign=DE+IPS+e.max+Zirconia+2026';

export default function ZirconiaOfferCta({ lang = 'de' }) {
	const t = (s) => translate(lang, s);

	const handleClick = () => {
		if (typeof window === 'undefined') return;
		try {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
				event: 'offer_cta_click',
				cta: 'zirconia_neukundenangebot',
				destination: IVOCLAR_OFFER_URL,
			});
		} catch (e) {
			// tracking must never block the outbound click
		}
	};

	return (
		<section id="contact" className="py-20 px-4 md:px-6 bg-white border-t border-gray-200">
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-[#0a478b] tracking-tight leading-snug">
					{t('Get to know the new zirconium oxide and test it yourself!')}
				</h2>
				<p className="mt-4 text-lg md:text-xl text-gray-700">
					{t('Order IPS e.max Zirconia at 30% off:')}
				</p>
				<div className="mt-8 flex justify-center">
					<a
						href={IVOCLAR_OFFER_URL}
						onClick={handleClick}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 bg-[#0a478b] hover:bg-[#083a70] text-white font-bold px-8 py-4 rounded-full transition-colors"
					>
						{t('Order now')}
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
						</svg>
					</a>
				</div>
				<p className="mt-6 text-xs text-gray-500">
					{t('This offer is available in Germany and Austria only.')}
				</p>
			</div>
		</section>
	);
}
