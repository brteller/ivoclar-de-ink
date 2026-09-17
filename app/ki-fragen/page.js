import { permanentRedirect } from 'next/navigation';

/**
 * The questions hub moved to /fragen-antworten on 17 Sep 2026 (Lena: the "AI" framing
 * felt odd for the customer). middleware.js already 308s this path; this stub only
 * exists so a stale build cannot serve the old page.
 */
export default function KiFragenRedirect() {
	permanentRedirect('/fragen-antworten');
}
