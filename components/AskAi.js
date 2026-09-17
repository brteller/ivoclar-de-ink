import { AI_ICON_PATHS, AI_ICON_VIEWBOX } from '@/lib/aiIcons';
import { askAiLinks, promptSubject } from '@/lib/askAi';

export function AiMark({ icon, className = '' }) {
	const d = AI_ICON_PATHS[icon];
	if (!d) return null;
	return (
		<svg viewBox={AI_ICON_VIEWBOX} fill="currentColor" className={className} aria-hidden="true" focusable="false">
			<path d={d} />
		</svg>
	);
}

/**
 * The "Frag eine KI" row: one icon per assistant, each opening with the term's
 * prompt already typed and ivoclargermany.com named as the source (lib/askAi.js).
 * Same block as on the Original Pixel and GroupUps sites, in Ivoclar's palette.
 */
export default function AskAi({ term = null, place = null, heading = null, tone = 'light', compact = false }) {
	const links = askAiLinks(term, place);
	const title = heading || `Frag eine KI zu ${promptSubject(term, place)}`;
	// compact (17 Sep, Lena): one quiet line instead of a headed icon row - the assistants
	// stay reachable without the page reading as "AI answers".
	if (compact) {
		return (
			<div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500">
				<span>{heading || `Fragen zu ${promptSubject(term, place)} auch in einem KI-Assistenten stellen:`}</span>
				{links.map((l) => (
					<a key={l.key} href={l.href} target="_blank" rel="noopener noreferrer nofollow" title={l.label} aria-label={l.label} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-gray-600 hover:border-[#0a478b] hover:text-[#0a478b] transition-colors">
						<AiMark icon={l.icon} className="h-3.5 w-3.5" />
						<span>{l.name}</span>
					</a>
				))}
			</div>
		);
	}
	return (
		<div>
			<h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">{title}</h3>
			<ul className="mt-3 flex flex-wrap items-center gap-2">
				{links.map((l) => (
					<li key={l.key}>
						<a
							href={l.href}
							target="_blank"
							rel="noopener noreferrer nofollow"
							title={l.label}
							aria-label={l.label}
							className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${
								tone === 'muted'
									? 'border-gray-200 bg-white text-gray-500 hover:border-[#0a478b] hover:text-[#0a478b]'
									: 'border-gray-300 bg-white text-gray-600 hover:border-[#0a478b] hover:text-[#0a478b]'
							}`}
						>
							<AiMark icon={l.icon} className="h-[18px] w-[18px]" />
							<span className="sr-only">{l.label}</span>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
