import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { fetchPageData } from '@/lib/api';
import { getRouteMetadataFromParams } from '@/lib/creator';
import { findTerm } from '@/lib/terms';
import PageRenderer from '@/components/PageRenderer';

function getOrigin(headersList) {
  const host = headersList.get('host') || 'localhost:3000';
  const proto = headersList.get('x-forwarded-proto') || 'http';
  return `${proto}://${host}`;
}

/**
 * Category routes resolve against the German search terms first (lib/terms.js, reviewed
 * with Lena on 10 Sep 2026). Terms removed on that call 404 instead of silently rendering
 * the home page. The ColdStart API is still called for every page so that, once the
 * Germany business has its own key, API content (images, per-location pages) layers in.
 */
async function loadCategory(slug) {
  const term = findTerm(slug);
  if (term && term.status === 'removed') notFound();
  let data = null;
  try {
    // The API validates `category` as a slug (exists:categories,slug), so always send the slug.
    data = await fetchPageData({ category: term?.slug || slug });
  } catch (e) {
    console.error(e);
  }
  return { term: term || null, data };
}

export async function generateMetadata({ params }) {
  const p = await params;
  const paramsNorm = { category: p.slug1 };
  const headersList = await headers();
  const origin = getOrigin(headersList);
  const { term, data } = await loadCategory(p.slug1);
  const base = getRouteMetadataFromParams(paramsNorm, data, origin);
  if (!term) return base;
  // Per-term SEO title / description: ColdStart's category copy when the Germany business
  // answers for this slug, otherwise the Categories sheet values as reviewed on 10 Sep.
  const apiCategory = data?.category?.slug === term.slug ? data.category : null;
  const title = apiCategory?.default_seo_title || term.seoTitle;
  const description = apiCategory?.default_seo_description || term.seoDescription;
  const canonical = `${origin}/${term.slug}`;
  return {
    ...base,
    title,
    description,
    alternates: { canonical },
    openGraph: { ...(base.openGraph || {}), title, description, url: canonical },
    twitter: { ...(base.twitter || {}), title, description },
  };
}

export default async function CategoryPage({ params }) {
  const p = await params;
  const headersList = await headers();
  const origin = getOrigin(headersList);
  const { term, data } = await loadCategory(p.slug1);
  const pathname = `/${p.slug1}`;
  return (
    <PageRenderer
      htmlContent={data}
      pathname={pathname}
      origin={origin}
      term={term}
    />
  );
}
