'use client';

import { translate } from '@/lib/i18n';

/**
 * Zirconia new-customer offer intro.
 *
 * History:
 *  - 2026-08-20 (Lena Lackner): the on-page ColdStart form was replaced by a link out to
 *    Ivoclar's own approved form, with the headline "Lernen Sie das neue Zirkonoxid kennen
 *    und testen Sie es selbst!" and subheadline "IPS e.max Zirconia mit 30% Rabatt bestellen:".
 *  - 2026-08-26 (slide 10): the on-page check-out was reinstated below this block.
 *  - 2026-09 (slide 6): with the on-page form live, the outbound route is redundant. Ivoclar
 *    asked to delete the "Jetzt bestellen" button, delete the Germany/Austria availability
 *    line here (it still appears once, above the submit button in the form), and exchange the
 *    subheadline for the risk-free offer copy from the Ivoclar DE landing page.
 *
 * This section is now purely the offer headline plus that copy; LeadCaptureForm renders
 * directly beneath it, so ordering happens in one place on one page.
 *
 * NOTE: keeps id="contact" because the header CTA and the "Von Experten für Experten" CTA
 * scroll to it.
 */

export default function ZirconiaOfferCta({ lang = 'de' }) {
	const t = (s) => translate(lang, s);

	return (
		<section id="contact" className="scroll-mt-24 pt-20 pb-10 px-4 md:px-6 bg-white border-t border-gray-200">
			<div className="max-w-5xl mx-auto text-center">
				<h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-[#0a478b] tracking-tight leading-snug">
					{t('Get to know the new zirconium oxide and test it yourself!')}
				</h2>
				{/* Ivoclar feedback 2026-09 slide 6: replaces "IPS e.max Zirconia mit 30% Rabatt
				    bestellen:". Copy taken verbatim from the Ivoclar DE offer page. */}
				<p className="mt-5 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
					{t('Order your first IPS e.max Zirconia disc now at a preferential price with a 30% discount and test it entirely without risk! If you are not satisfied, you get your money back.')}
				</p>
			</div>
		</section>
	);
}
