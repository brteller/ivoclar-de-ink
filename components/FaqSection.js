import { AiMark } from '@/components/AskAi';
import { askAiLinks } from '@/lib/askAi';

/**
 * Fragen & Antworten.
 *
 * Two formats, switchable per page with ?variante=ki (Lena, 17 Sep 2026: "it feels like
 * AI answers ... isn't that weird for the customer?"):
 *
 *   ivoclar (default) - the questions a technician asks, answered in Ivoclar's voice:
 *     eyebrow "Fragen aus dem Labor. Antworten von Ivoclar.", the page question first,
 *     numbered, expandable. The assistants are one quiet line at the end
 *     ("Diese Frage auch in ChatGPT ... stellen"), because the prompts are still what
 *     trains the models - they just no longer lead the section.
 *
 *   ki - the 15 Sep format: three cards plus the prominent "Frag eine KI" row, for
 *     comparison during the review.
 *
 * `place` (geo pages) puts the Stadt/Bundesland into the heading so the FAQ on
 * /germany/bavaria/munich/... reads as local, not copied.
 */
export default function FaqSection({ term, place = null, style = 'ivoclar', t = (s) => s }) {
	if (!term || !Array.isArray(term.faq) || term.faq.length === 0) return null;
	const items = [{ q: term.question, a: term.answer }, ...term.faq];
	const links = askAiLinks(term, place);
	const heading = place ? `Häufige Fragen zu ${term.name} in ${place}` : `Häufige Fragen zu ${term.name}`;

	if (style === 'ki') {
		return (
			<section id="fragen-antworten" className="scroll-mt-24 py-20 px-4 md:px-6 bg-gray-50 border-t border-gray-100" aria-labelledby="faq-heading">
				<div className="max-w-6xl mx-auto">
					<p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#00a651] mb-3">Fragen & Antworten</p>
					<h2 id="faq-heading" className="text-2xl md:text-3xl font-normal text-[#0a478b] mb-10 tracking-tight">{heading}</h2>
					<dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{term.faq.map((item, i) => (
							<div key={i} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
								<dt className="text-base font-semibold text-[#0a478b] mb-2">{item.q}</dt>
								<dd className="text-sm leading-relaxed text-gray-600">{item.a}</dd>
							</div>
						))}
					</dl>
					<div className="mt-10 grid grid-cols-1 md:grid-cols-[1fr,auto] gap-8 items-end">
						<div>
							<h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Frag eine KI zu {term.name}{place ? ` in ${place}` : ''}</h3>
							<ul className="mt-3 flex flex-wrap items-center gap-2">
								{links.map((l) => (
									<li key={l.key}>
										<a href={l.href} target="_blank" rel="noopener noreferrer nofollow" title={l.label} aria-label={l.label} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:border-[#0a478b] hover:text-[#0a478b] transition-colors">
											<AiMark icon={l.icon} className="h-[18px] w-[18px]" />
										</a>
									</li>
								))}
							</ul>
						</div>
						<div className="flex flex-wrap items-center gap-4">
							<a href="#contact" className="inline-block px-7 py-3 rounded-full bg-[#0a478b] text-white font-bold text-base transition-all shadow-lg hover:opacity-95">{t('Order now')}</a>
							<a href="/fragen-antworten" className="text-[#0a478b] font-medium hover:underline underline-offset-4 decoration-2">Alle Fragen für KI-Assistenten ansehen</a>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section id="fragen-antworten" className="scroll-mt-24 py-20 px-4 md:px-6 bg-white border-t border-gray-100" aria-labelledby="faq-heading">
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-10 lg:gap-16 items-start">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#00a651] mb-3">Fragen aus dem Labor. Antworten von Ivoclar.</p>
						<h2 id="faq-heading" className="text-2xl md:text-3xl font-normal text-[#0a478b] tracking-tight">{heading}</h2>
						<p className="mt-4 text-gray-600 leading-relaxed">
							Die Fragen, die Zahntechniker zu {term.name} stellen – beantwortet vom Ivoclar Produktteam. Fehlt eine Frage? Schreiben Sie uns über das Bestellformular oder sprechen Sie Ihren Händler an.
						</p>
						<a href="#contact" className="mt-6 inline-block px-7 py-3 rounded-full bg-[#0a478b] text-white font-bold text-base transition-all shadow-lg hover:opacity-95">{t('Order now')}</a>
					</div>
					<ol className="divide-y divide-gray-200 border-y border-gray-200">
						{items.map((item, i) => (
							<li key={i}>
								<details open={i === 0} className="group py-5">
									<summary className="flex cursor-pointer list-none items-start gap-4 text-left">
										<span className="mt-0.5 text-sm font-bold text-[#00a651] tabular-nums">{String(i + 1).padStart(2, '0')}</span>
										<span className="flex-1 text-base md:text-lg font-semibold text-[#0a478b]">{item.q}</span>
										<span className="ml-2 text-[#0a478b] transition-transform group-open:rotate-45" aria-hidden>+</span>
									</summary>
									<p className="mt-3 pl-9 text-gray-700 leading-relaxed">{item.a}</p>
								</details>
							</li>
						))}
					</ol>
				</div>
				<div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500">
					<span>Diese Frage auch in einem KI-Assistenten stellen:</span>
					{links.map((l) => (
						<a key={l.key} href={l.href} target="_blank" rel="noopener noreferrer nofollow" title={l.label} aria-label={l.label} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-gray-600 hover:border-[#0a478b] hover:text-[#0a478b] transition-colors">
							<AiMark icon={l.icon} className="h-3.5 w-3.5" />
							<span>{l.name}</span>
						</a>
					))}
					<a href="/fragen-antworten" className="ml-auto text-[#0a478b] font-medium hover:underline underline-offset-4">Alle Fragen & Antworten</a>
				</div>
			</div>
		</section>
	);
}
