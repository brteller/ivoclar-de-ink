import { ACTIVE_TERMS } from '@/lib/terms';
import GEO from '@/coldstart/geo-germany-austria.json';

/**
 * The URLs this site actually serves. Everything else is redirected (308) to its German
 * equivalent by middleware.js - see germanRedirectTarget below.
 *
 * Why (Lena, 13 Oct 2026): the [slug1]..[slug4] routes rendered the home page with a 200
 * for ANY path and built the <title> from the slug, so Tetric/US-era URLs Google had found
 * (/flowable-composite, /bulk-fill, /united-states/california/oceanside, ...) showed up in
 * search as "Flowable Composite | IPS e.max Zirconia by Ivoclar". They date from before
 * 15 Sep, when the site still ran on the shared Tetric (North America) API key. notFound() inside the
 * route can't fix that - app/loading.js has already streamed a 200 by then - so the check
 * lives in middleware, before rendering.
 *
 * Valid shapes: /{term}, /{country}/{term}, /{country}/{state}/{term},
 * /{country}/{state}/{city}/{term} - country/state/city from coldstart/geo-germany-austria.json.
 */
const TERM_SLUGS = new Set(ACTIVE_TERMS.map((t) => t.slug));

const STATIC_PATHS = new Set(['', '/fragen-antworten', '/thank-you']);

/** Real files in public/ that the middleware matcher doesn't already skip. */
const PUBLIC_FILES = new Set(['/ivoclar-logo.svg', '/logo192.png', '/logo512.png', '/manifest.json']);

const GEO_INDEX = Object.fromEntries(
	Object.entries(GEO).map(([country, states]) => [
		country,
		Object.fromEntries(
			Object.values(states).map((s) => [s.slug, new Set((s.cities || []).map((c) => c[1]))]),
		),
	]),
);

export function isKnownPath(rawPath) {
	let path;
	try {
		path = decodeURIComponent(rawPath);
	} catch {
		return false;
	}
	path = path.toLowerCase().replace(/\/+$/, '');
	if (STATIC_PATHS.has(path) || PUBLIC_FILES.has(path)) return true;
	const parts = path.split('/').filter(Boolean);
	if (parts.length < 1 || parts.length > 4) return false;
	const term = parts[parts.length - 1];
	if (!TERM_SLUGS.has(term)) return false;
	if (parts.length === 1) return true;
	const states = GEO_INDEX[parts[0]];
	if (!states) return false;
	if (parts.length === 2) return true;
	const cities = states[parts[1]];
	if (!cities) return false;
	if (parts.length === 3) return true;
	return cities.has(parts[2]);
}

/**
 * Where an unknown URL goes (Brandon, 14 Oct: the US pages should land on Germany, and
 * nothing should cost the domain authority, so redirect rather than 404/410):
 * - multi-segment (old /united-states/{state}/{city}/{cat} etc.) -> /germany/{term} when the
 *   last segment is still an active term, otherwise /germany/zirkonoxid
 * - old country pages (/united-states, /canada) -> /germany/zirkonoxid
 * - other single segments (old Tetric categories, /index.html, ...) -> home page
 */
const OLD_COUNTRIES = new Set(['united-states', 'usa', 'canada']);

export function germanRedirectTarget(rawPath) {
	let path;
	try {
		path = decodeURIComponent(rawPath);
	} catch {
		return '/';
	}
	const parts = path.toLowerCase().split('/').filter(Boolean);
	if (parts.length === 1 && OLD_COUNTRIES.has(parts[0])) return '/germany/zirkonoxid';
	if (parts.length <= 1) return '/';
	const last = parts[parts.length - 1];
	return `/germany/${TERM_SLUGS.has(last) ? last : 'zirkonoxid'}`;
}
