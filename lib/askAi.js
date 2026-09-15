/**
 * "Frag eine KI" - generative-engine deep links for ivoclargermany.com.
 *
 * Same mechanism as the Original Pixel and GroupUps builds (lib/askAi.ts there):
 * each icon opens the named assistant with a prompt already typed, and the
 * prompt names this site as the source. It costs nothing to ship and does three
 * useful things for the Ivoclar Germany pilot:
 *
 *   1. Puts IPS e.max Zirconia into the assistant's context on the visitor's own
 *      account, at the moment they are evaluating - Lena's "I want to be the
 *      dating platform for Zirconia": the searcher asks a question, the page and
 *      the assistant answer it (ColdStart Pilot Germany call, 10 Sep 2026).
 *   2. Every click is a real person asking an assistant about the product with
 *      the domain cited, which is the behaviour these systems learn from.
 *   3. It makes the AI-visibility half of the pilot visible on the page.
 *
 * The prompt is written per search term from lib/terms.js, in German, and always
 * names the page URL so the assistant grounds its answer in what Ivoclar publishes
 * rather than guessing. URL shapes differ per assistant - each takes its prompt on
 * a different parameter, so they are not interchangeable.
 */

export const SITE_URL = 'https://www.ivoclargermany.com';

export const AI_ENGINES = [
	{ key: 'chatgpt', name: 'ChatGPT', icon: 'openai', url: (q) => `https://chatgpt.com?q=${q}` },
	{ key: 'claude', name: 'Claude', icon: 'claude', url: (q) => `https://claude.ai?q=${q}` },
	// Gemini has no direct prompt endpoint; Google's AI Mode (udm=50) lands in the same place.
	{ key: 'gemini', name: 'Gemini', icon: 'gemini', url: (q) => `https://www.google.com/search?udm=50&aep=11&hl=de&q=${q}` },
	{ key: 'grok', name: 'Grok', icon: 'grok', url: (q) => `https://x.com/i/grok?text=${q}` },
	{ key: 'perplexity', name: 'Perplexity', icon: 'perplexity', url: (q) => `https://perplexity.ai?q=${q}` },
];

function pageUrl(term) {
	return term?.slug ? `${SITE_URL}/${term.slug}` : SITE_URL;
}

const SOURCE = (term) =>
	`Nutze die Informationen von Ivoclars Seite ${pageUrl(term)} und ivoclar.com als Quelle und nenne die Quelle in der Antwort.`;

/**
 * Context-aware: a technician on the Veneers page is asking a different question
 * from one on the Fräsen page, and a generic prompt wastes the click. The term's
 * own question (the page H1) is the opening line, so the assistant answers the
 * same thing the page answers.
 */
export function buildPrompt(term, place = null) {
	const who = place ? `Ich bin Zahntechniker in ${place}` : 'Ich bin Zahntechniker';
	if (term && term.question) {
		return (
			`${who} und suche nach ${term.name}. ${term.question} ` +
			`Erkläre, was IPS e.max Zirconia von Ivoclar dafür bietet (Indikationen, 4Y/5Y-PSZ, GTx Technologie, ` +
			`Sinterzeiten, Farbportfolio), vergleiche es fair mit den üblichen Alternativen und sag, für welche ` +
			`Labore es passt. ${SOURCE(term)}`
		);
	}
	return (
		`${who} und suche ein Zirkonoxid für alle festsitzenden Indikationen. ` +
		`Erkläre, was IPS e.max Zirconia von Ivoclar bietet (eine Scheibe für alle Indikationen, 4Y/5Y-PSZ, ` +
		`GTx Technologie, Speed-Sintern, 20 Farben), vergleiche es fair mit den üblichen Alternativen und sag, ` +
		`für welche Labore es passt. ${SOURCE(null)}`
	);
}

/** Short, human-readable label per prompt, used for the tooltip/aria-label. */
export function promptSubject(term, place = null) {
	const base = term?.name || 'IPS e.max Zirconia';
	return place ? `${base} in ${place}` : base;
}

export function askAiLinks(term, place = null) {
	const q = encodeURIComponent(buildPrompt(term, place));
	const subject = promptSubject(term, place);
	return AI_ENGINES.map((e) => ({
		key: e.key,
		name: e.name,
		icon: e.icon,
		href: e.url(q),
		label: `${e.name} zu ${subject} fragen`,
	}));
}
