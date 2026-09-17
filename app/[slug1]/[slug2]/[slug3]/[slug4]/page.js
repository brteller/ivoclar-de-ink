import { headers } from 'next/headers';
import { fetchPageData } from '@/lib/api';
import { getRouteMetadataFromParams } from '@/lib/creator';
import PageRenderer from '@/components/PageRenderer';

function getOrigin(headersList) {
  const host = headersList.get('host') || 'localhost:3000';
  const proto = headersList.get('x-forwarded-proto') || 'http';
  return `${proto}://${host}`;
}

export async function generateMetadata({ params }) {
  const p = await params;
  const paramsNorm = { country: p.slug1, state: p.slug2, city: p.slug3, category: p.slug4 };
  const headersList = await headers();
  const origin = getOrigin(headersList);
  let data = null;
  try {
    data = await fetchPageData({ category: paramsNorm.category, country: paramsNorm.country, state: paramsNorm.state, city: paramsNorm.city });
  } catch (e) {
    console.error(e);
  }
  return getRouteMetadataFromParams(paramsNorm, data, origin);
}

export default async function CityCategoryPage({ params, searchParams }) {
  const p = await params;
  // Review switches (Lena, 17 Sep): ?layout=antwort|vergleich|workflow|indikation previews a
  // template, ?variante=ki shows the explicit-AI FAQ format next to the Ivoclar one.
  const sp = (await searchParams) || {};
  const layoutOverride = typeof sp.layout === 'string' ? sp.layout : null;
  const faqStyle = sp.variante === 'ki' ? 'ki' : 'ivoclar';
  const paramsNorm = { country: p.slug1, state: p.slug2, city: p.slug3, category: p.slug4 };
  const headersList = await headers();
  const origin = getOrigin(headersList);
  let data = null;
  try {
    data = await fetchPageData({ category: paramsNorm.category, country: paramsNorm.country, state: paramsNorm.state, city: paramsNorm.city });
  } catch (e) {
    console.error(e);
  }
  const pathname = `/${p.slug1}/${p.slug2}/${p.slug3}/${p.slug4}`;
  return (
    <PageRenderer
      htmlContent={data}
      pathname={pathname}
      origin={origin}
      layoutOverride={layoutOverride}
      faqStyle={faqStyle}
    />
  );
}
