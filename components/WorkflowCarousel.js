'use client';

import { useState } from 'react';
import { translate } from '@/lib/i18n';

/**
 * Digital Fixed Prosthetics Workflow — 4 steps in a carousel with arrows.
 * Language-aware (de default, en toggle). Images are placeholders until Ivoclar delivers finals.
 */
const DEFAULT_STEPS = [
	{
		// Ivoclar 2026-08-26 slide 11: step 1 retitled "Materialauswahl" with Ivoclar-supplied copy.
		title: 'Material selection',
		body: 'IPS e.max Zirconia is an yttrium-stabilized zirconium oxide made from 4Y-PSZ / 5Y-PSZ raw materials for all types of fixed all-ceramic dental restorations — one disc for all applications.',
		// TODO(Ivoclar 2026-08-26, slide 11): swap image to "PIC 5 PM7 0824" — awaiting the file.
		image:
			'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Digital%20Equipment/Programill%207/154830/image-thumb__154830__tile_default/CAM-software_2952_1920x1220px.8a3fa481.jpg',
	},
	{
		title: 'Mill',
		body: 'PrograMill 7 mills IPS e.max Zirconia precisely, with dedicated milling templates and a zero-point clamping system for reproducible, smooth results.',
		// TODO(Ivoclar 2026-08-26, slide 12): swap image to "PIC 2 Programill 7 1741.jpeg" — awaiting the file.
		image:
			'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Digital%20Equipment/Programill%207/154638/image-thumb__154638__tile_default/Programill-7_6838_1920x1220px.a6c87793.jpg',
		// Ivoclar 2026-08-26 slide 12: add a "Mehr erfahren" button on this step.
		learnMoreUrl: 'https://www.ivoclar.com/de_de/products/digital-equipment/programill-7',
	},
	{
		title: 'Sinter',
		body: 'Ultra-fast speed sintering — from 0:58 h for restorations up to 3-unit bridges and 2:57 h up to full-arch cases, without compromising esthetics.',
		// TODO(Ivoclar 2026-08-26, slide 13): image swap requested, Lena noted "Pic follows".
		image:
			'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Digital%20Processes/IPS%20e.max%20Zirconia/159297/image-thumb__159297__tile_default/model_zirkon_2_1920x960px.dc52a1d7.jpg',
	},
	{
		title: 'Characterize & finish',
		body: 'Individualize with IPS e.max Zirconia Color & Effect Liquids and IPS e.max Ceram Art for lifelike, patient-specific esthetics.',
		// TODO(Ivoclar 2026-08-26, slide 14): swap image to "PIC 3 IPS e.max Zirconia Liquid 0727" — awaiting the file.
		image:
			'https://www.ivoclar.com/cache-buster-2/GLOBAL%20-%20MEDIA/Products/Digital%20Processes/IPS%20e.max%20Zirconia/159057/image-thumb__159057__cms_image_banner__infinity_right/IPS-e.max-Zirconia-Liquid_0727-3_1920x1220px.dc699c07.jpg',
	},
];
function Chevron({ dir = 'left' }) {
	return (
		<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			{dir === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
		</svg>
	);
}

export default function WorkflowCarousel({ steps = DEFAULT_STEPS, lang = 'de' }) {
	const t = (s) => translate(lang, s);
	const [index, setIndex] = useState(0);
	const count = steps.length;
	if (!count) return null;
	const current = steps[index];
	const go = (delta) => setIndex((prev) => (prev + delta + count) % count);

	const arrowClass =
		'absolute top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#0a478b] shadow-md ring-1 ring-black/5 hover:bg-white hover:text-[#083a70] transition-colors';

	return (
		<div>
			<div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
				<div className="relative">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={current.image} alt={t(current.title)} className="w-full aspect-[4/3] object-cover rounded-2xl" loading="lazy" />
					<button type="button" onClick={() => go(-1)} aria-label={t('Previous step')} className={`${arrowClass} left-3`}>
						<Chevron dir="left" />
					</button>
					<button type="button" onClick={() => go(1)} aria-label={t('Next step')} className={`${arrowClass} right-3`}>
						<Chevron dir="right" />
					</button>
				</div>
				<div>
					<div className="text-[#00a651] font-semibold text-sm mb-2">
						{t('Step')} {index + 1} {t('of')} {count}
					</div>
					<h3 className="text-2xl md:text-3xl font-normal text-[#0a478b] mb-4 tracking-tight">{t(current.title)}</h3>
					<p className="text-gray-600 text-base md:text-lg leading-relaxed">{t(current.body)}</p>
						{current.learnMoreUrl && (
							<a
								href={current.learnMoreUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0a478b] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#083a70]"
							>
								{t('Learn more')}
								<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
									<polyline points="9 18 15 12 9 6" />
								</svg>
							</a>
						)}
				</div>
			</div>

			<div className="mt-10 flex items-center gap-4">
				<button type="button" onClick={() => go(-1)} aria-label={t('Previous step')} className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-[#0a478b] hover:border-[#0a478b] transition-colors">
					<Chevron dir="left" />
				</button>
				<button type="button" onClick={() => go(1)} aria-label={t('Next step')} className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-[#0a478b] hover:border-[#0a478b] transition-colors">
					<Chevron dir="right" />
				</button>
				<div className="ml-2 flex items-center gap-2" role="tablist" aria-label={t('Workflow steps')}>
					{steps.map((step, i) => (
						<button
							key={step.title}
							type="button"
							role="tab"
							aria-selected={i === index}
							aria-label={t(step.title)}
							onClick={() => setIndex(i)}
							className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-[#0a478b]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
