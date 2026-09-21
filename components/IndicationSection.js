/**
 * "Indikation" layout block: the full indication spectrum of IPS e.max Zirconia as a
 * grid, with the page's own indication opened up. Used on Veneers, Inlays & Onlays and
 * Implantatprothetik; the facts match the product tab on the same page.
 */
export const INDICATIONS = [
	{ key: 'veneers', name: 'Veneers', note: 'Freigegeben ab 0,5 mm; hohe Transluzenz im 5Y-PSZ-Anteil der Scheibe. Befestigung mit Variolink Esthetic.' },
	{ key: 'inlays-onlays', name: 'Inlays & Onlays', note: 'Monolithisch, ohne Verblendung – Sintern ab 0:58 h.' },
	{ key: 'kronen', name: 'Einzelkronen', note: 'Die häufigste Indikation im digitalen Labor; GTx-Gradient für den natürlichen Übergang.' },
	{ key: 'bruecken-3', name: '3-gliedrige Brücken', note: 'Speed-Sintern in 0:58 h – zusammen mit Einzelkronen.' },
	{ key: 'bruecken-mehr', name: 'Mehrgliedrige Brücken', note: 'Bis zu 2 verbundene Pontics, im Frontzahnbereich bis zu 4; bis Full-Arch in 2:57 h gesintert.' },
	{ key: 'freiend-klebe', name: 'Freiend- und Klebebrücken', note: 'Cantilever-Brücke mit 1 Pontic, Adhäsiv-/Maryland-Brücke mit 1 Flügel.' },
	{ key: 'hybrid', name: 'Hybridversorgungen auf Ti-Basis', note: 'Verschraubt auf zertifiziertem Abutment (Ti-Base, Multi-Unit); Opaque Liquid maskiert die Ti-Basis von innen.' },
	{ key: 'all-on-x', name: 'All-on-X', note: 'Validiert unter realen Bedingungen und Worst-Case-Protokollen; Full-Arch in 2:57 h.' },
];

export default function IndicationSection({ term }) {
	const current = term?.indication || null;
	const detail = term?.indicationDetail || null;
	return (
		<section id="indikationen" className="scroll-mt-24 py-20 px-4 md:px-6 bg-gray-50 border-t border-gray-100" aria-labelledby="indication-heading">
			<div className="max-w-6xl mx-auto">
				<p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#00a651] mb-3">Indikationen</p>
				<h2 id="indication-heading" className="text-2xl md:text-3xl font-normal text-[#0a478b] mb-3 tracking-tight">
					{detail?.headline || 'Eine Scheibe. Alle festsitzenden Indikationen.'}
				</h2>
				<p className="text-gray-600 text-lg mb-10 max-w-3xl">
					{detail?.intro || 'IPS e.max Zirconia ist für das gesamte festsitzende Indikationsspektrum freigegeben – ohne Materialwechsel zwischen den Fällen.'}
				</p>
				{detail?.specs && (
					<dl className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-4">
						{detail.specs.map((s, i) => (
							<div key={i} className="rounded-2xl border border-[#00a651]/30 bg-white p-5">
								<dt className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">{s.label}</dt>
								<dd className="mt-2 text-lg font-semibold text-[#0a478b]">{s.value}</dd>
							</div>
						))}
					</dl>
				)}
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{INDICATIONS.map((ind) => {
						const active = ind.key === current;
						return (
							<li key={ind.key} className={`rounded-2xl border p-5 ${active ? 'border-[#00a651] bg-white shadow-md ring-2 ring-[#00a651]/20' : 'border-gray-100 bg-white'}`}>
								<p className={`text-base font-semibold ${active ? 'text-[#00a651]' : 'text-[#0a478b]'}`}>
									{active && <span className="mr-2" aria-hidden>✓</span>}
									{ind.name}
								</p>
								<p className="mt-2 text-sm text-gray-600 leading-relaxed">{ind.note}</p>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
