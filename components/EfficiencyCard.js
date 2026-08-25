'use client';

import PillarCheckIcon from './PillarCheckIcon';
import { renderWithCitations } from '@/lib/citations';

const EFFICIENCY_BULLETS = [
  'Speed sintering for shorter cycles and increased productivity',
  'Reliable milling with optimized surface quality and edge stability',
  'Fewer remakes thanks to high shade accuracy',
  'Seamless digital workflow from CAD/CAM to sintering',
];

export default function EfficiencyCard({ bullets = EFFICIENCY_BULLETS }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <PillarCheckIcon />
      <h3 className="text-xl font-bold text-[#0a478b] mb-4">Efficiency</h3>
      <ul className="space-y-2.5 text-gray-600 text-sm leading-relaxed">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="text-[#00a651] mt-1.5 shrink-0">•</span>
            <span>{renderWithCitations(bullet, 'efficiency')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
