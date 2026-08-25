'use client';

import PillarCheckIcon from './PillarCheckIcon';
import { renderWithCitations } from '@/lib/citations';

const QUALITY_BULLETS = [
  'Tested beyond industry standards for maximum processing reliability',
  'Reduced wall thicknesses thanks to high material strength',
  'Evaluated with realistic, long-term simulation protocols',
  'The IPS e.max family promise: proven, reliable and system-compatible',
];

export default function QualityCard() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <PillarCheckIcon />
      <h3 className="text-xl font-bold text-[#0a478b] mb-4">Trust</h3>
      <ul className="space-y-2.5 text-gray-600 text-sm leading-relaxed">
        {QUALITY_BULLETS.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="text-[#00a651] mt-1.5 shrink-0">•</span>
            <span>{renderWithCitations(bullet, 'quality')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
