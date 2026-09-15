import { NextResponse } from 'next/server';
import { TERMS } from '@/lib/terms';

/**
 * Terms Lena and Carolin removed on the 10 Sep 2026 review (see lib/terms.js) redirect to
 * the root Zirconia page. notFound() in the route only renders the 404 UI - the response
 * has already started streaming through app/loading.js by then, so the status stays 200 -
 * and a permanent redirect is the honest answer for a URL that never went live.
 */
const REMOVED = new Set(TERMS.filter((t) => t.status === 'removed').map((t) => `/${t.slug}`));

export function middleware(request) {
	const { pathname } = request.nextUrl;
	if (REMOVED.has(pathname.toLowerCase().replace(/\/+$/, ''))) {
		return NextResponse.redirect(new URL('/', request.url), 308);
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next|images|videos|fonts|sitemaps|favicon.png|sitemap.xml|robots.txt).*)'],
};
