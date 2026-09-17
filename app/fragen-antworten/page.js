import { headers } from 'next/headers';
import PromptCard from '@/components/PromptCard';
import { ACTIVE_TERMS } from '@/lib/terms';
import { askAiLinks, buildPrompt, SITE_URL } from '@/lib/askAi';

/**
 * "Fragen & Antworten zu IPS e.max Zirconia" - the hub for every question on the site,
 * the German counterpart of /ask-ai on originalpixel.com. Renamed from /ki-fragen on
 * 17 Sep (Lena: the AI framing felt odd for the customer); the old URL redirects.
 *
 * Why it exists (ColdStart Pilot Germany, 10 Sep 2026): Lena wants the answers
 * to a technician's question pushed into the assistants people search with, not
 * only onto the page. Each card is one search term from lib/terms.js: the
 * question the page answers, the prompt that opens in ChatGPT / Claude / Gemini /
 * Grok / Perplexity with the page named as the source, and a copy button.
 *
 * A static route wins over app/[slug1], so /fragen-antworten never hits the API.
 */

export const metadata = {
	title: 'Fragen & Antworten zu IPS e.max Zirconia | Ivoclar',
	description:
		'Die Fragen, die Zahntechniker zu Zirkonoxid, Fräsen, Sintern, Veneers, Farben und Implantatprothetik stellen – beantwortet von Ivoclar. Jede Frage lässt sich auch direkt in ChatGPT, Claude, Gemini, Grok oder Perplexity öffnen.',
	alternates: { canonical: `${SITE_URL}/fragen-antworten` },
	openGraph: {
		title: 'Fragen & Antworten zu IPS e.max Zirconia | Ivoclar',
		description: 'Fragen aus dem Labor, Antworten von Ivoclar – auch direkt in ChatGPT, Claude, Gemini, Grok oder Perplexity zu öffnen.',
		url: `${SITE_URL}/fragen-antworten`,
		type: 'website',
		locale: 'de_DE',
	},
};

export default async function FragenAntwortenPage() {
	// headers() keeps this route dynamic like the rest of the app; nothing is read from it.
	await headers();

	const general = { label: 'IPS e.max Zirconia im Überblick', answer: 'Eine Scheibe für alle festsitzenden Indikationen – 4Y/5Y-PSZ, GTx Technologie, Speed-Sintern ab 0:58 h, 20 Farben.', prompt: buildPrompt(null), links: askAiLinks(null), href: '/' };
	const prompts = ACTIVE_TERMS.map((term) => ({
		label: term.question,
		answer: term.answer,
		prompt: buildPrompt(term),
		links: askAiLinks(term),
		href: `/${term.slug}`,
	}));

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: ACTIVE_TERMS.map((term) => ({
			'@type': 'Question',
			name: term.question,
			acceptedAnswer: { '@type': 'Answer', text: term.answer },
		})),
	};

	return (
		<div>
			<script type="application/ld+json">{JSON.stringify(structuredData)}</script>

			<header className="bg-white border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16 lg:h-18 gap-4">
						<a href="/" className="flex-shrink-0 inline-flex items-center" aria-label="Ivoclar Startseite">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src="/ivoclar-logo.svg" alt="Ivoclar" className="h-8 w-auto md:h-9" />
						</a>
						<a
							href="/#contact"
							className="bg-[#0a478b] hover:bg-[#083a70] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
						>
							Jetzt bestellen
						</a>
					</div>
				</div>
			</header>

			<section className="py-16 md:py-20 px-4 md:px-6 bg-white">
				<div className="max-w-6xl mx-auto">
					<p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#00a651] mb-3">Fragen aus dem Labor. Antworten von Ivoclar.</p>
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#0a478b] leading-tight tracking-tight max-w-4xl">
						Fragen & Antworten zu IPS e.max Zirconia.
					</h1>
					<p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
						Jede Karte ist eine Frage, die Zahntechniker zu Zirkonoxid stellen, mit der Antwort von Ivoclar auf der
						jeweiligen Seite. Immer mehr Recherche im Labor beginnt heute mit einer Frage an einen Assistenten – deshalb
						lässt sich jede Frage auch direkt in ChatGPT, Claude, Gemini, Grok oder Perplexity öffnen, mit dieser Seite als
						Quelle. Es wird nichts an uns gesendet, und Sie lesen die Frage, bevor Sie sie abschicken.
					</p>
				</div>
			</section>

			<section className="py-12 px-4 md:px-6 bg-gray-50 border-t border-gray-100">
				<div className="max-w-6xl mx-auto">
					<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
						<PromptCard {...general} />
						{prompts.map((p) => (
							<PromptCard key={p.href} {...p} />
						))}
					</div>
				</div>
			</section>

			<section className="py-16 px-4 md:px-6 bg-white">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-2xl md:text-3xl font-normal text-[#0a478b] mb-8 tracking-tight">Warum die Fragen auch in den Assistenten stehen</h2>
					<ol className="grid gap-5 md:grid-cols-3">
						{[
							{
								step: '01',
								title: 'Die Frage nennt die Quelle',
								body: 'Jede Frage nennt ivoclargermany.com und ivoclar.com. Der Assistent liest die Seite, statt zu raten – die Antwort stützt sich auf das, was Ivoclar veröffentlicht.',
							},
							{
								step: '02',
								title: 'Die Seite beantwortet die Frage',
								body: 'Jede Seite beginnt mit der Frage, die ein Techniker gesucht hat, und Ivoclars Antwort darauf. Die Assistenten können nur zusammenfassen, was geschrieben steht.',
							},
							{
								step: '03',
								title: 'Echte Fragen hinterlassen Spuren',
								body: 'Menschen, die Assistenten zu IPS e.max Zirconia fragen und dabei die Domain nennen, sind das Verhalten, aus dem diese Systeme lernen. ColdStart misst, ob die Antworten besser werden.',
							},
						].map((item) => (
							<li key={item.step} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
								<span className="text-sm font-bold text-[#00a651]">{item.step}</span>
								<h3 className="mt-3 text-lg font-semibold text-[#0a478b]">{item.title}</h3>
								<p className="mt-2 leading-relaxed text-gray-600 text-sm">{item.body}</p>
							</li>
						))}
					</ol>
					<p className="mt-10 text-xs leading-relaxed text-gray-500">
						ChatGPT, Claude, Gemini, Grok und Perplexity sind Marken von OpenAI, Anthropic, Google, xAI und Perplexity. Die
						Symbole oben sind Links zum jeweiligen Dienst. Es wird keine Empfehlung oder Verbindung unterstellt.
					</p>
				</div>
			</section>

			<footer className="bg-[#0a478b] text-white">
				<div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
					<span>© 2026 Ivoclar Vivadent</span>
					<a href="/" className="hover:underline">
						Zurück zu IPS e.max Zirconia
					</a>
				</div>
			</footer>
		</div>
	);
}
