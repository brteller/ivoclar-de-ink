'use client';

import { useState } from 'react';
import { translate } from '@/lib/i18n';

/**
 * Digital Fixed Prosthetics Workflow — 4 steps in a carousel with arrows.
 * Language-aware (de default, en toggle). Images are placeholders until Ivoclar delivers finals.
 */
const DEFAULT_STEPS = [
	{
		title: 'Design',
		body: 'Scan and design your case in an open CAD/CAM system — exocad, 3Shape or any zirconia supplier. The open architecture keeps you flexible across your existing workflow.',
		image:
			'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Digital%20Equipment/Programill%207/154830/image-thumb__154830__tile_default/CAM-software_2952_1920x1220px.8a3fa481.jpg',
	},
	{
		title: 'Mill',
		body: 'PrograMill 7 mills IPS e.max Zirconia precisely, with dedicated milling templates and a zero-point clamping system for reproducible, smooth results.',
		image:
			'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Digital%20Equipment/Programill%207/154638/image-thumb__154638__tile_default/Programill-7_6838_1920x1220px.a6c87793.jpg',
	},
	{
		title: 'Sinter',
		body: 'Ultra-fast speed sintering — from 0:58 h for restorations up to 3-unit bridges and 2:57 h up to full-arch cases, without compromising esthetics.',
		image:
			'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Digital%20Processes/IPS%20e.max%20Zirconia/159297/image-thumb__159297__tile_default/model_zirkon_2_1920x960px.dc52a1d7.jpg',
	},
	{
		title: 'Characterize & finish',
		body: 'Individualize with IPS e.max Zirconia Color & Effect Liquids and IPS e.max Ceram Art for lifelike, patient-specific esthetics.',
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
