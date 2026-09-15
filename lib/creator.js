import { geoContext, geoCopy } from '@/lib/geo';

export const CREATOR = {
  name: 'IPS e.max Zirconia',
  shortName: 'IPS e.max',
  // German-only pilot (Lena, 1 Sep): the default <title>/description were still the English
  // Tetric-era strings; the German page should not advertise "Zirconia Dental Discs".
  title: 'IPS e.max Zirconia | Zirkonoxid für Labor und Praxis | Ivoclar',
  description: 'IPS e.max Zirconia von Ivoclar – das Premium-Zirkonoxid für alle festsitzenden Indikationen. Eine Scheibe, 20 Farben, Speed-Sintern ab 0:58 h.',
  siteName: 'IPS e.max Zirconia by Ivoclar',
  /** Online shop / marketplace URL — set to your Ivoclar webshop or use NEXT_PUBLIC_SHOP_URL */
  shopUrl: process.env.NEXT_PUBLIC_SHOP_URL || '#',
};

function humanizeSlug(value = '') {
  return String(value)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export function getSEOMetadataFromParams(params, data, origin) {
  const isHome = !params?.category && !params?.country;
  if (isHome) {
    return {
      title: CREATOR.title,
      description: CREATOR.description,
      canonical: origin || '',
      categoryName: CREATOR.name,
      locationStr: '',
      keywords: ['ips e.max zirconia', 'ips zirconia', 'zirconia discs', 'zirconia dental', 'dental lab zirconia', 'ivoclar'],
    };
  }
  const category = data?.category?.name || humanizeSlug(params?.category) || CREATOR.name;
  const parts = [];
  if (params?.country) parts.push(humanizeSlug(params.country));
  if (params?.state) parts.push(humanizeSlug(params.state));
  if (params?.city) parts.push(humanizeSlug(params.city));
  const locationStr = parts.join(', ');
  const title = locationStr
    ? `${category} provider in ${locationStr} | ${CREATOR.siteName}`
    : `${category} | ${CREATOR.siteName}`;
  const description = locationStr
    ? `${category.toLowerCase()} provider in ${locationStr}. ${CREATOR.description}`
    : `${category.toLowerCase()}. ${CREATOR.description}`;
  const pathname = [params?.country, params?.state, params?.city, params?.category].filter(Boolean).join('/');
  return {
    title,
    description,
    canonical: origin ? `${origin}/${pathname}` : `/${pathname}`,
    categoryName: category,
    locationStr,
    keywords: [
      category,
      `ivoclar ${category}`.toLowerCase(),
      locationStr ? `${category} in ${locationStr}` : category,
      'zirconia discs',
      'all-ceramic',
      'ips e.max zirconia',
      'ivoclar',
    ],
  };
}

export function getRouteMetadataFromParams(params, data, origin) {
  let seo = getSEOMetadataFromParams(params, data, origin);
  // Location routes: German title/description from lib/geo.js (ColdStart answers with
  // English place names; the template rewrites them).
  if (params?.country) {
    const pathname = '/' + [params.country, params.state, params.city, params.category].filter(Boolean).join('/');
    const geo = geoContext(data, pathname);
    const copy = geoCopy(geo);
    if (copy) {
      const name = geo.term?.name || 'Zirkonoxid';
      seo = {
        ...seo,
        title: copy.seoTitle,
        description: copy.seoDescription,
        canonical: origin ? `${origin}${pathname}` : pathname,
        keywords: [name, `${name} ${geo.inPlace}`, `IPS e.max Zirconia ${geo.inPlace}`, `Zirkonoxid ${geo.inPlace}`, 'Ivoclar Händler', 'ivoclar'],
      };
    }
  }
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    category: seo.categoryName,
    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      type: 'website',
      siteName: CREATOR.siteName,
      locale: 'de_DE',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}
