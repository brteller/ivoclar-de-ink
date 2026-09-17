/**
 * "Vergleich" layout block: a decision table for the material terms (4Y vs 5Y,
 * monolithisch vs verblendet, Frontzahn vs Seitenzahn, the shade portfolio, the disc
 * specs). Data comes from `term.compare` in lib/terms.js; nothing here is generated.
 * The last column is always IPS e.max Zirconia and is highlighted.
 */
export default function CompareSection({ term }) {
	const c = term?.compare;
	if (!c || !Array.isArray(c.rows) || c.rows.length === 0) return null;
	const cols = c.columns || [];
	const last = cols.length - 1;
	return (
		<section id="vergleich" className="scroll-mt-24 py-20 px-4 md:px-6 bg-gray-50 border-t border-gray-100" aria-labelledby="compare-heading">
			<div className="max-w-6xl mx-auto">
				<p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#00a651] mb-3">Auf einen Blick</p>
				<h2 id="compare-heading" className="text-2xl md:text-3xl font-normal text-[#0a478b] mb-3 tracking-tight">{c.headline}</h2>
				{c.intro && <p className="text-gray-600 text-lg mb-10 max-w-3xl">{c.intro}</p>}
				<div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
					<table className="w-full min-w-[560px] text-sm">
						{cols.length > 0 && (
							<thead>
								<tr className="bg-[#0a478b] text-white">
									{cols.map((h, i) => (
										<th key={i} scope="col" className={`text-left font-semibold px-4 py-3 ${i === last ? 'bg-[#00a651]' : ''}`}>{h}</th>
									))}
								</tr>
							</thead>
						)}
						<tbody>
							{c.rows.map((row, ri) => (
								<tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
									{row.map((cell, ci) => (
										ci === 0 ? (
											<th key={ci} scope="row" className="text-left font-semibold text-[#0a478b] px-4 py-3 border-t border-gray-200 align-top">{cell}</th>
										) : (
											<td key={ci} className={`px-4 py-3 border-t border-gray-200 align-top ${ci === last ? 'font-medium text-gray-900 bg-[#00a651]/5' : 'text-gray-700'}`}>{cell}</td>
										)
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{c.note && <p className="mt-4 text-xs text-gray-500 leading-relaxed">{c.note}</p>}
			</div>
		</section>
	);
}
