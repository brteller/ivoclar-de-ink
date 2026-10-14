import { NextResponse } from 'next/server';
import { TERMS } from '@/lib/terms';
import { isKnownPath, germanRedirectTarget } from '@/lib/routes';

/**
 * Terms Lena and Carolin removed on the 10 Sep 2026 review (see lib/terms.js) redirect to
 * the root Zirconia page. notFound() in the route only renders the 404 UI - the response
 * has already started streaming through app/loading.js by then, so the status stays 200 -
 * and a permanent redirect is the honest answer for a URL that never went live.
 */
const REMOVED = new Set(TERMS.filter((t) => t.status === 'removed').map((t) => t.slug));

export function middleware(request) {
	const { pathname } = request.nextUrl;
	const path = pathname.toLowerCase().replace(/\/+$/, '');
	// The category is always the last path segment (/{cat}, /{country}/{cat},
	// /{country}/{state}/{cat}, /{country}/{state}/{city}/{cat}), so a removed term's geo
	// pages redirect too - Zirkonoxid Händler had ~225 of them (Carolin, 23 Sep: remove).
	const last = decodeURIComponent(path.split('/').pop() || '');
	if (REMOVED.has(last)) {
		return NextResponse.redirect(new URL('/', request.url), 308);
	}
	// 17 Sep: the questions hub moved from /ki-fragen to /fragen-antworten.
	if (path === '/ki-fragen') {
		return NextResponse.redirect(new URL('/fragen-antworten', request.url), 308);
	}
	// 13-14 Oct (Lena, Brandon): unknown URLs - the Tetric/US-era slugs Google picked up,
	// public/index.html (the old Tetric CRA shell) - redirect to their German equivalent
	// instead of rendering the home page with a 200 under an English slug title.
	if (!isKnownPath(pathname)) {
		return NextResponse.redirect(new URL(germanRedirectTarget(pathname), request.url), 308);
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next|images|videos|fonts|sitemaps|favicon.png|sitemap.xml|robots.txt).*)'],
};
