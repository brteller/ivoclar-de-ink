'use client';

import PillarCheckIcon from './PillarCheckIcon';

const ESTHETICS_BULLETS = [
  'High-end esthetics embedded at its core — convincing anterior results even without complex individualization',
  'GTx Technology for seamless progression of shade and translucency',
  'Comprehensive range of 20 precise A–D and BL shades',
];

export default function EstheticsCard() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <PillarCheckIcon />
      <h3 className="text-xl font-bold text-[#0a478b] mb-4">Esthetics</h3>
      <ul className="space-y-2.5 text-gray-600 text-sm leading-relaxed">
        {ESTHETICS_BULLETS.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="text-[#00a651] mt-1.5 shrink-0">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
