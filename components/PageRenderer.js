'use client';

import React, { useState, useEffect } from 'react';
import { CREATOR } from '@/lib/creator';
import DentistTestimonials from '@/components/DentistTestimonials';
import EstheticsCard from '@/components/EstheticsCard';
import QualityCard from '@/components/QualityCard';
import EfficiencyCard from '@/components/EfficiencyCard';
import SuperheroTestimonialCards from '@/components/SuperheroTestimonialCards';
import ZirconiaOfferCta from '@/components/ZirconiaOfferCta';
import WorkflowCarousel from '@/components/WorkflowCarousel';
import { translate } from '@/lib/i18n';
import { renderWithCitations, TETRIC_FOOTNOTES } from '@/lib/citations';

/** Default top hero background (first section). */
const HERO_TOP_IMAGE = 'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Digital%20Processes/IPS%20e.max%20Zirconia/158891/image-thumb__158891__blog_detail/IPS-e.max-Zirconia_3329-3_1920x1220px.f97418bf.jpg';
/** Default-hero mobile override: use Dr. Tiffani Dunn with gradient treatment */
const HERO_TOP_IMAGE_DEFAULT_MOBILE = 'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Digital%20Processes/IPS%20e.max%20Zirconia/158891/image-thumb__158891__blog_detail/IPS-e.max-Zirconia_3329-3_1920x1220px.f97418bf.jpg';
/** Posterior-restoration categories: Dr. Anthony Mennito — same asset as superhero testimonial card */
const HERO_TOP_IMAGE_POSTERIOR_RESTORATION = HERO_TOP_IMAGE;
/** Light-cure categories: Dr. Luana Oliveira-Hass */
const HERO_TOP_IMAGE_LIGHT_CURE = HERO_TOP_IMAGE;

/**
 * Full-viewport overlay: hold solid black through the copy side, then feather across the 50% seam
 * well into the photo (stops were too tight before → looked like a hard line).
 */
const HERO_POSTERIOR_SEAM_GRADIENT =
	'linear-gradient(90deg, rgb(0 0 0) 0%, rgb(0 0 0) 40%, rgb(0 0 0 / 0.94) 46%, rgb(0 0 0 / 0.72) 50%, rgb(0 0 0 / 0.38) 56%, rgb(0 0 0 / 0.12) 66%, transparent 78%)';
// Tetric product lines — image, learnMoreUrl; optional vimeoId (legacy) or vimeoSections (up to 2 with title/subtitle); optional secondaryPhoto block
const TETRIC_PRODUCTS = [
	{
		id: 'ips-emax-zirconia',
		name: 'IPS e.max® Zirconia',
		tagline: 'One disc. All options.',
		description: 'An yttrium-stabilized 4Y-PSZ / 5Y-PSZ zirconium oxide for all types of fixed all-ceramic restorations — one disc that truly does it all. From thin veneers to wide-span restorations, with unmatched esthetic quality.',
		features: ['Versatility — single crowns to multi-unit bridges, thin veneers to full-arch', 'Esthetics — GTx Technology for a smooth transition of shade and translucency', 'Efficiency — ultra-fast sintering (0:58 h for up to 3-unit, 2:57 h up to full arch)', 'Reliability — validated beyond industry standards in real-life conditions', 'Full shade portfolio: 20 accurate A–D and BL shades', 'Optimized disc height portfolio from 12–30 mm'],
		faqQuestion: 'Which restorations can it produce?',
		faqAnswer: 'Crowns, 3-unit and multi-unit bridges, inlays, onlays, veneers, cantilever and adhesive bridges, hybrid (screw-retained on Ti-base) and all-on-x.',
		specs: [{ label: 'Type', value: '4Y/5Y-PSZ zirconia disc' }, { label: 'Heights', value: '12–30 mm' }, { label: 'Shades', value: '20 (A–D, BL)' }],
		image: 'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Digital%20Processes/IPS%20e.max%20Zirconia/158065/image-thumb__158065__tile_default/IPS-e.max-Zirconia_2234-1_1920x1220px.88a19c79.jpg',
		learnMoreUrl: 'https://www.ivoclar.com/en_gb/products/digital-processes/ips-e.max-zirconia',
		vimeoId: null
	},
	{
		id: 'emax-color-liquids',
		name: 'IPS e.max Zirconia Color & Effect Liquids',
		tagline: 'Endless individualization',
		description: 'Ready to use with an integrated colour indicator, the Color and Effect Liquids open up new possibilities for individualization. The unique “Opaque” liquid masks Ti-Bases from the inside while preserving natural light-dynamics on the outside.',
		features: ['All 16 A–D shades for brush infiltration', '7 effect liquids: Snow, Sunset, Berry, Hazel, Sky, Storm and Opaque', 'Ready to use with an integrated colour indicator'],
		faqQuestion: 'How are they applied?',
		faqAnswer: 'By brush infiltration, in combination with IPS e.max Ceram Art and IPS e.max Ceram for new levels of esthetics.',
		specs: [{ label: 'Type', value: 'Color & Effect Liquids' }],
		image: 'https://www.ivoclar.com/cache-buster-2/GLOBAL%20-%20MEDIA/Products/Digital%20Processes/IPS%20e.max%20Zirconia/159057/image-thumb__159057__cms_image_banner__infinity_right/IPS-e.max-Zirconia-Liquid_0727-3_1920x1220px.dc699c07.jpg',
		learnMoreUrl: 'https://www.ivoclar.com/en_gb/products/digital-processes/ips-e.max-zirconia',
		vimeoId: null
	},
	{
		// Added per Ivoclar review 2026-08-20: "Add e.max Ceram Art (4th product)".
		// TODO(Ivoclar): image + learnMoreUrl are placeholders reusing Redefining Package assets —
		// awaiting a dedicated IPS e.max Ceram Art product shot and product page URL from Ivoclar.
		id: 'emax-ceram-art',
		name: 'IPS e.max Ceram Art',
		tagline: 'Characterization, perfected.',
		description: 'IPS e.max Ceram Art is the characterization system for the IPS e.max family — layering and staining ceramics for lifelike, patient-specific results on IPS e.max Zirconia restorations.',
		features: [
			'Lifelike characterization for all-ceramic restorations',
			'Coordinated with IPS e.max Zirconia and the IPS e.max family',
			'Part of the Redefining Package',
		],
		faqQuestion: 'When is it used?',
		faqAnswer: 'In the characterize & finish step of the digital workflow, after milling and sintering — in combination with IPS e.max Zirconia Color & Effect Liquids.',
		specs: [{ label: 'Type', value: 'Characterization ceramics' }],
		image: 'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Digital%20Processes/IPS%20e.max%20Zirconia/158891/image-thumb__158891__blog_detail/IPS-e.max-Zirconia_3329-3_1920x1220px.f97418bf.jpg',
		learnMoreUrl: 'https://www.ivoclar.com/en_gb/campaigns/redefining-limits?utm_source=On+Site+Campaign&utm_medium=Product+Page&utm_campaign=Zirconia+Redefining+Package+2026',
		vimeoId: null
	},
	{
		id: 'redefining-package',
		name: 'The Redefining Package',
		tagline: 'Two innovations. All ceramics. Unlimited esthetics.',
		description: 'The IPS e.max family welcomes two new additions — IPS e.max Zirconia and IPS e.max Ceram Art — each with distinct strengths, designed to perform seamlessly together. For a limited time, available as an exclusive bundle.',
		features: ['IPS e.max Zirconia premium disc', 'IPS e.max Ceram Art for characterization', 'Limited-time exclusive bundle'],
		faqQuestion: 'How do I order?',
		faqAnswer: 'Order your Redefining Package using the form — our team will connect you with a dealer in your area.',
		specs: [{ label: 'Type', value: 'Bundle' }, { label: 'Availability', value: 'Limited time' }],
		image: 'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Digital%20Processes/IPS%20e.max%20Zirconia/158891/image-thumb__158891__blog_detail/IPS-e.max-Zirconia_3329-3_1920x1220px.f97418bf.jpg',
		learnMoreUrl: 'https://www.ivoclar.com/en_gb/campaigns/redefining-limits?utm_source=On+Site+Campaign&utm_medium=Product+Page&utm_campaign=Zirconia+Redefining+Package+2026',
		vimeoId: null
	},
];

// Optional: show only certain products per category slug. Key = category slug (from URL or normalized category name). Value = array of product ids. If not set or slug not found, all products are shown.
const TETRIC_PRODUCTS_BY_CATEGORY = {};

/** Order preserved when filtering TETRIC_PRODUCTS — same slug rules as categorySlugIndicatesAnteriorRestoration */
const ANTERIOR_RESTORATION_PRODUCT_IDS = [
	'ips-emax-zirconia',
];

/** Product images for “Order IPS e.max Zirconia” — matches Tetric line section assets (excludes maximized-efficiency combo tile) */
const BUY_SECTION_PRODUCT_IDS = [
	'ips-emax-zirconia',
	'emax-color-liquids',
	'redefining-package',
];

const DEFAULT_TESTIMONIAL_IDS = [
	'isabella',
	'massimo',
	'christine',
];
const POSTERIOR_RESTORATION_TESTIMONIAL_IDS = [
	'isabella',
	'massimo',
	'christine',
];
const TESTIMONIAL_IDS_BY_CATEGORY = {};

/** Category slug must contain this substring (API `category.slug`, URL segment, or normalized category key). */
const ANTERIOR_RESTORATION_SLUG_SNIPPET = 'anterior-restoration';

function categorySlugIndicatesAnteriorRestoration(htmlContent, pageContext, categorySlugKey) {
	const apiSlug = (htmlContent?.category?.slug ?? '').toString().toLowerCase();
	const pathSlug =
		pageContext?.type !== 'home' && pageContext.parts?.length
			? String(pageContext.parts[pageContext.parts.length - 1]).toLowerCase()
			: '';
	const normalizedKey = (categorySlugKey ?? '').toString().toLowerCase();
	return (
		apiSlug.includes(ANTERIOR_RESTORATION_SLUG_SNIPPET) ||
		pathSlug.includes(ANTERIOR_RESTORATION_SLUG_SNIPPET) ||
		normalizedKey.includes(ANTERIOR_RESTORATION_SLUG_SNIPPET)
	);
}

const POSTERIOR_RESTORATION_SLUG_SNIPPET = 'posterior-restoration';
const LIGHT_CURE_SLUG_SNIPPET = 'light-cure';
const FLOWABLE_COMPOSITE_SLUG = 'flowable-composite';
const LUANA_TOP_HERO_SLUGS = new Set(['flowable-composite']);
const ANTHONY_TOP_HERO_SLUGS = new Set([
	'low-shrinkage-resin',
	'low-shrinkage-composite',
	'bulk-fill-composite',
	'bulk-fill',
	'universal-shade-composite',
	'universal-composite',
	'chamaleon-composite',
]);

function categorySlugIndicatesPosteriorRestoration(htmlContent, pageContext, categorySlugKey) {
	const apiSlug = (htmlContent?.category?.slug ?? '').toString().toLowerCase();
	const pathSlug =
		pageContext?.type !== 'home' && pageContext.parts?.length
			? String(pageContext.parts[pageContext.parts.length - 1]).toLowerCase()
			: '';
	const normalizedKey = (categorySlugKey ?? '').toString().toLowerCase();
	return (
		apiSlug.includes(POSTERIOR_RESTORATION_SLUG_SNIPPET) ||
		pathSlug.includes(POSTERIOR_RESTORATION_SLUG_SNIPPET) ||
		normalizedKey.includes(POSTERIOR_RESTORATION_SLUG_SNIPPET)
	);
}

function categorySlugIndicatesLightCure(htmlContent, pageContext, categorySlugKey) {
	const apiSlug = (htmlContent?.category?.slug ?? '').toString().toLowerCase();
	const pathSlug =
		pageContext?.type !== 'home' && pageContext.parts?.length
			? String(pageContext.parts[pageContext.parts.length - 1]).toLowerCase()
			: '';
	const normalizedKey = (categorySlugKey ?? '').toString().toLowerCase();
	return (
		apiSlug.includes(LIGHT_CURE_SLUG_SNIPPET) ||
		pathSlug.includes(LIGHT_CURE_SLUG_SNIPPET) ||
		normalizedKey.includes(LIGHT_CURE_SLUG_SNIPPET) ||
		LUANA_TOP_HERO_SLUGS.has(apiSlug) ||
		LUANA_TOP_HERO_SLUGS.has(pathSlug) ||
		LUANA_TOP_HERO_SLUGS.has(normalizedKey)
	);
}

function categorySlugIsFlowableComposite(htmlContent, pageContext, categorySlugKey) {
	const apiSlug = (htmlContent?.category?.slug ?? '').toString().toLowerCase();
	const pathSlug =
		pageContext?.type !== 'home' && pageContext.parts?.length
			? String(pageContext.parts[pageContext.parts.length - 1]).toLowerCase()
			: '';
	const normalizedKey = (categorySlugKey ?? '').toString().toLowerCase();
	return (
		apiSlug === FLOWABLE_COMPOSITE_SLUG ||
		pathSlug === FLOWABLE_COMPOSITE_SLUG ||
		normalizedKey === FLOWABLE_COMPOSITE_SLUG
	);
}

function categorySlugIndicatesAnthonyTopHero(htmlContent, pageContext, categorySlugKey) {
	const apiSlug = (htmlContent?.category?.slug ?? '').toString().toLowerCase();
	const pathSlug =
		pageContext?.type !== 'home' && pageContext.parts?.length
			? String(pageContext.parts[pageContext.parts.length - 1]).toLowerCase()
			: '';
	const normalizedKey = (categorySlugKey ?? '').toString().toLowerCase();
	return (
		categorySlugIndicatesPosteriorRestoration(htmlContent, pageContext, categorySlugKey) ||
		ANTHONY_TOP_HERO_SLUGS.has(apiSlug) ||
		ANTHONY_TOP_HERO_SLUGS.has(pathSlug) ||
		ANTHONY_TOP_HERO_SLUGS.has(normalizedKey)
	);
}

function getSuperheroTestimonialIds(htmlContent, pageContext, categorySlugKey) {
	if (categorySlugIndicatesAnteriorRestoration(htmlContent, pageContext, categorySlugKey)) {
		return ['luana'];
	}
	if (categorySlugIndicatesPosteriorRestoration(htmlContent, pageContext, categorySlugKey)) {
		return POSTERIOR_RESTORATION_TESTIMONIAL_IDS;
	}
	return TESTIMONIAL_IDS_BY_CATEGORY[categorySlugKey] || DEFAULT_TESTIMONIAL_IDS;
}

const SHOW_DENTIST_TESTIMONIALS = false;

const PageRenderer = ({ htmlContent, pathname = '', origin = '' }) => {
	const [isHeaderVisible, setIsHeaderVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [selectedProductIndex, setSelectedProductIndex] = useState(0);
	const [isShopModalOpen, setIsShopModalOpen] = useState(false);
	const [lang, setLang] = useState('de');
	const t = (str) => translate(lang, str);
	// Citation-aware render that translates first. Product/API copy is authored in English;
	// without this it bypassed translate() and rendered English on the German page
	// (the "page is only partially translated" issue raised by Ivoclar on 2026-08-20).
	const rc = (text, key) => renderWithCitations(typeof text === 'string' ? t(text) : text, key);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			setIsHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 100);
			setLastScrollY(currentScrollY);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [lastScrollY]);

	// Central page context - single source of truth
	const getPageContext = () => {
		if (!htmlContent) return { type: 'home' };

		const parts = (pathname || (typeof window !== 'undefined' ? window.location.pathname : '')).split('/').filter(Boolean);

		if (parts.length === 4 && htmlContent.city?.city) {
			return {
				type: 'city-category',
				country: parts[0],
				state: parts[1],
				city: parts[2],
				category: htmlContent.category?.name,
				location: htmlContent.city,
				parts
			};
		}
		if (parts.length === 3 && htmlContent.state?.state) {
			return {
				type: 'state-category',
				country: parts[0],
				state: parts[1],
				category: htmlContent.category?.name,
				location: htmlContent.state,
				parts
			};
		}
		if (parts.length === 2) {
			return {
				type: 'country-category',
				country: parts[0],
				category: htmlContent.category?.name,
				parts
			};
		}
		if (parts.length === 1 && htmlContent.category?.name) {
			return {
				type: 'category',
				category: htmlContent.category?.name,
				parts
			};
		}

		return { type: 'home' };
	};

	const pageContext = getPageContext();
	const isHomePage = pageContext.type === 'home';
	const isSubPage = !isHomePage;

	// Category slug for product filtering: URL segment for category pages, or normalized category name for location pages
	const categorySlug = pageContext.type === 'category' && pageContext.parts?.length
		? pageContext.parts[0]
		: (pageContext.category || '').toLowerCase().replace(/\s+/g, '-');
	const isAnteriorRestorationCategory = categorySlugIndicatesAnteriorRestoration(
		htmlContent,
		pageContext,
		categorySlug
	);
	const isPosteriorRestorationCategory = categorySlugIndicatesPosteriorRestoration(
		htmlContent,
		pageContext,
		categorySlug
	);
	const isAnthonyTopHeroCategory = categorySlugIndicatesAnthonyTopHero(
		htmlContent,
		pageContext,
		categorySlug
	);
	const isLightCureCategory = categorySlugIndicatesLightCure(
		htmlContent,
		pageContext,
		categorySlug
	);
	const isFlowableCompositeCategory = categorySlugIsFlowableComposite(
		htmlContent,
		pageContext,
		categorySlug
	);
	const flowableEfficiencyBullets = isFlowableCompositeCategory
		? ['One disc for all applications reduces inventory and material switching']
		: undefined;
	const showEfficiencyPillar = !isAnteriorRestorationCategory;
	const productIdsForCategory = categorySlug && TETRIC_PRODUCTS_BY_CATEGORY[categorySlug];
	const visibleProducts = isAnteriorRestorationCategory
		? TETRIC_PRODUCTS.filter((p) => ANTERIOR_RESTORATION_PRODUCT_IDS.includes(p.id))
		: Array.isArray(productIdsForCategory)
			? TETRIC_PRODUCTS.filter((p) => productIdsForCategory.includes(p.id))
			: TETRIC_PRODUCTS;
	const buySectionThumbnailIds = isAnteriorRestorationCategory
		? ANTERIOR_RESTORATION_PRODUCT_IDS
		: BUY_SECTION_PRODUCT_IDS;
	const safeProductIndex = Math.min(Math.max(0, selectedProductIndex), Math.max(0, visibleProducts.length - 1));
	const currentProduct = visibleProducts[safeProductIndex];
	const SHOP_DESTINATIONS = [
		{
			id: 'ips-emax-zirconia',
			label: 'IPS e.max Zirconia',
			url: 'https://www.ivoclar.com/de_de/local/ips-emax-zirconia-neukundenangebot',
		},
	];
	const productImageById = Object.fromEntries(TETRIC_PRODUCTS.map((p) => [p.id, p.image]));
	const shopDestinationById = Object.fromEntries(SHOP_DESTINATIONS.map((x) => [x.id, x]));
	const pageShopOptions = Array.from(new Set(visibleProducts.map((p) => p.id)))
		.map((id) => shopDestinationById[id])
		.filter(Boolean);
	const resolvedShopOptions = pageShopOptions.length === 1 ? pageShopOptions : SHOP_DESTINATIONS;
	const shouldUseShopModal = resolvedShopOptions.length > 1;
	const primaryShopUrl = resolvedShopOptions[0]?.url || CREATOR.shopUrl;
	const handleShopClick = (e) => {
		if (!shouldUseShopModal) return;
		e.preventDefault();
		setIsShopModalOpen(true);
	};

	useEffect(() => {
		const maxIndex = Math.max(0, visibleProducts.length - 1);
		if (selectedProductIndex > maxIndex) {
			setSelectedProductIndex(maxIndex);
		}
	}, [visibleProducts.length, selectedProductIndex]);

	// Helper to get formatted location string
	const getLocationString = (ctx) => {
		switch (ctx.type) {
			case 'city-category':
				const cityState = ctx.location?.state?.state || htmlContent.state?.state;
				const cityCountry = ctx.location?.state?.country?.country || ctx.country.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
				return {
					locationStr: `${ctx.location.city}, ${cityState}, ${cityCountry}`,
					shortLocation: `${ctx.location.city}, ${cityState}`,
					city: ctx.location.city,
					state: cityState,
					country: cityCountry
				};
			case 'state-category':
				const stateCountry = ctx.location?.country?.country || ctx.country.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
				return {
					locationStr: `${ctx.location.state}, ${stateCountry}`,
					shortLocation: ctx.location.state,
					state: ctx.location.state,
					country: stateCountry
				};
			case 'country-category':
				const country = ctx.country.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
				return {
					locationStr: country,
					shortLocation: country,
					country
				};
			default:
				return { locationStr: '', shortLocation: '' };
		}
	};

	const getNavigationItems = () => {
		if (!htmlContent) return [];

		// Normalize pages_* to arrays (main page returns them as arrays)
		const toArray = (x) => (Array.isArray(x) ? x : x ? [x] : []);
		const pagesState = toArray(htmlContent.pages_state);
		const pagesCity = toArray(htmlContent.pages_city);
		const pagesCountry = toArray(htmlContent.pages_country);

		// Main page: categories come back as an array — use it for pills (SEO: category name links out)
		if (Array.isArray(htmlContent.categories) && htmlContent.categories.length > 0) {
			return htmlContent.categories.map((item) => ({
				name: item.name ?? item.category?.name ?? '',
				slug: item.slug ?? item.url ?? (item.name ? `/${String(item.name).toLowerCase().replace(/\s+/g, '-')}` : '#')
			})).filter((item) => item.name);
		}

		// Check if htmlContent is an array (category page) or use normalized pages_* arrays
		const dataArray = Array.isArray(htmlContent) ? htmlContent : (pagesCity.length ? pagesCity : pagesState.length ? pagesState : pagesCountry);
		
		// Helper: "{category} products in {location}" for state/city/country pills
		const categoryLocationLabel = (categoryName, locationName) =>
			categoryName && locationName ? `${categoryName} products in ${locationName}` : locationName || categoryName || '';

		// If pages_state is available, show states
		if (pagesState.length > 0) {
			const seenStates = new Set();
			return pagesState
				.filter(page => {
					if (!page.state?.state || seenStates.has(page.state.state)) {
						return false;
					}
					seenStates.add(page.state.state);
					return true;
				})
				.map(page => ({
					name: categoryLocationLabel(page.category?.name ?? htmlContent.category?.name, page.state.state),
					slug: page.url
				}));
		}

		// If pages_city is available, show cities
		if (pagesCity.length > 0) {
			const seenCities = new Set();
			return pagesCity
				.filter(page => {
					if (!page.city?.city || seenCities.has(page.city.city)) {
						return false;
					}
					seenCities.add(page.city.city);
					return true;
				})
				.map(page => ({
					name: categoryLocationLabel(page.category?.name ?? htmlContent.category?.name, page.city.city),
					slug: page.url
				}));
		}
		
		// If pages_country is available (for category pages), show countries
		if (pagesCountry.length > 0) {
			const seenCountries = new Set();
			return pagesCountry
				.filter(page => {
					if (!page.country?.country || seenCountries.has(page.country.country)) {
						return false;
					}
					seenCountries.add(page.country.country);
					return true;
				})
				.map(page => ({
					name: categoryLocationLabel(page.category?.name ?? htmlContent.category?.name, page.country.country),
					slug: page.url
				}));
		}
		
		// If we're viewing a city page or state page, extract the path parts
		const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
		const pathParts = currentPath.split('/').filter(Boolean);
		
		// If we're on a state page (united-states/california) — show cities: "{category} products in {city}"
		if (pathParts.length === 2 && pathParts[0] === 'united-states') {
			const currentState = pathParts[1];
			const categoryName = htmlContent.category?.name ?? dataArray[0]?.category?.name;
			const seenCities = new Set();
			return dataArray
				.filter(item => {
					const itemPathParts = item.url?.split('/').filter(Boolean);
					return itemPathParts?.[0] === 'united-states' && 
						   itemPathParts?.[1] === currentState &&
						   itemPathParts.length === 3 &&
						   !seenCities.has(itemPathParts[2]);
				})
				.map(item => {
					const cityName = item.url.split('/').pop();
					return {
						name: categoryLocationLabel(categoryName, cityName),
						slug: item.url
					};
				});
		}
		
		// If we're on the country page (united-states) — show states: "{category} products in {state}"
		if (pathParts.length === 1 && pathParts[0] === 'united-states') {
			const categoryName = htmlContent.category?.name ?? dataArray[0]?.category?.name;
			const seenStates = new Set();
			return dataArray
				.filter(item => {
					const itemPathParts = item.url?.split('/').filter(Boolean);
					return itemPathParts?.[0] === 'united-states' &&
						   itemPathParts.length >= 2 &&
						   !seenStates.has(itemPathParts[1]);
				})
				.map(item => {
					const stateName = item.url.split('/')[1];
					return {
						name: categoryLocationLabel(categoryName, stateName),
						slug: `/united-states/${stateName}`
					};
				});
		}
		
		// Default: show categories
		const seenCategories = new Set();
		return dataArray
			.filter(item => {
				if (!item.category?.name || seenCategories.has(item.category.name)) {
					return false;
				}
				seenCategories.add(item.category.name);
				return true;
			})
			.map(item => ({
				name: item.category.name,
				slug: item.url
			}));
	};

	// Unified SEO content generation
	const getSEOContent = () => {
		if (isHomePage) return {
			title: CREATOR.title,
			description: CREATOR.description,
			canonical: `${origin || (typeof window !== 'undefined' ? window.location.origin : '')}${pathname || (typeof window !== 'undefined' ? window.location.pathname : '')}`
		};

		const { locationStr } = getLocationString(pageContext);
		const category = pageContext.category || CREATOR.name;

		const title = locationStr 
			? `${category} in ${locationStr} | ${CREATOR.name}`
			: `${category} | ${CREATOR.name}`;

		const description = locationStr
			? `${category.toLowerCase()} in ${locationStr}. ${CREATOR.description}`
			: `${category.toLowerCase()}. ${CREATOR.description}`;

		return {
			title,
			description,
			canonical: `${origin || (typeof window !== 'undefined' ? window.location.origin : '')}${pathname || (typeof window !== 'undefined' ? window.location.pathname : '')}`
		};
	};

	// Simplified hero title using pageContext
	const getDynamicHeroTitle = () => {
		if (isHomePage) return {
			line1: CREATOR.name,
			line2: 'Dental Composites by Ivoclar'
		};

		const { locationStr, shortLocation } = getLocationString(pageContext);
		const category = pageContext.category;

		if (locationStr) {
			return {
				line1: `${category}`,
				line2: `in ${shortLocation}`
			};
		}
		return {
			line1: category,
			line2: 'Dental Composites by Ivoclar'
		};
	};

	// Simplified description using pageContext
	const getDynamicDescription = () => {
		if (isHomePage) {
			return CREATOR.description;
		}

		const { locationStr } = getLocationString(pageContext);
		const category = pageContext.category;

		if (!category) {
			return CREATOR.description;
		}

		if (locationStr) {
			return `${category} in ${locationStr}. ${CREATOR.description}`;
		}

		return `${category}. ${CREATOR.description}`;
	};

	// Conversion content from API with fallbacks for hero, benefits, video, CTA
	const getConversionContent = () => {
		const { locationStr, shortLocation } = getLocationString(pageContext);
		const category = pageContext.category || CREATOR.name;
		const c = htmlContent?.content || htmlContent;
		const defaultBenefits = [
			'One disc for all applications — fewer materials, more options',
			'High-end esthetics with reliable shade accuracy (GTx Technology)',
			'Speed sintering for increased output and fewer remakes',
			'Tested beyond industry standards for processing reliability',
		];
		const benefitsRaw = c?.features || c?.benefits;
		// API copy is authored in English — run it through translate() so the German page
		// does not mix languages. Strings with no DE entry fall through unchanged.
		const benefitsList = (Array.isArray(benefitsRaw) && benefitsRaw.length > 0
			? benefitsRaw
			: defaultBenefits
		).map((b) => (typeof b === 'string' ? t(b) : b));
		const heroHeadline = t(c?.hero_headline || (locationStr ? `${category} in ${shortLocation}` : category));
		const heroDescription = t(c?.hero_subheadline || c?.hero_description || (locationStr ? `${category} in ${locationStr}. ${CREATOR.description}` : CREATOR.description));
		const heroImageUrl = c?.hero_image_url || (Array.isArray(c?.product_images) && c.product_images[0]) || null;
		const benefitsHeadline = t(c?.benefits_headline || 'Why IPS e.max Zirconia?');
		const videoUrl = c?.video_url || null;
		const infographicUrl = c?.infographic_url || c?.secondary_image_url || null;
		const ctaText = t(c?.cta_text || 'Order now');
		const testimonialQuote = t(c?.testimonial_quote || 'One disc that gives me lifelike anterior results without overthinking layers — it keeps my all-ceramic work consistent and reliable.');
		const testimonialAuthor = c?.testimonial_author || t('Isabella M.');
		const testimonialTitle = t(c?.testimonial_title || 'Laboratory owner');
		const testimonialImageCaption = t(c?.testimonial_image_caption || 'All-ceramic restorations');
		const testimonialImageUrl = c?.testimonial_image_url || null;
		return {
			heroHeadline,
			heroDescription,
			heroImageUrl,
			benefitsHeadline,
			benefitsList,
			videoUrl,
			infographicUrl,
			ctaText,
			testimonialQuote,
			testimonialAuthor,
			testimonialTitle,
			testimonialImageCaption,
			testimonialImageUrl
		};
	};

	// ---- Location map (location-based subpages) — coordinates from the ColdStart API ----
	const isLocationPage = ['city-category', 'state-category', 'country-category'].includes(pageContext.type);
	const { locationStr: mapLocationStr } = getLocationString(pageContext);
	const geoLat =
		htmlContent?.latitude ?? htmlContent?.lat ??
		htmlContent?.city?.latitude ?? htmlContent?.city?.lat ??
		htmlContent?.state?.latitude ?? htmlContent?.state?.lat ??
		htmlContent?.location?.latitude ?? htmlContent?.location?.lat ?? null;
	const geoLng =
		htmlContent?.longitude ?? htmlContent?.lng ?? htmlContent?.long ??
		htmlContent?.city?.longitude ?? htmlContent?.city?.lng ??
		htmlContent?.state?.longitude ?? htmlContent?.state?.lng ??
		htmlContent?.location?.longitude ?? htmlContent?.location?.lng ?? null;
	const hasGeo = geoLat != null && geoLng != null && geoLat !== '' && geoLng !== '';
	const mapQuery = hasGeo ? `${geoLat},${geoLng}` : mapLocationStr;
	const mapSrc = mapQuery
		? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=${hasGeo ? 11 : 6}&output=embed`
		: '';

	const seoContent = getSEOContent();
	const heroTitle = getDynamicHeroTitle();
	const heroDescription = getDynamicDescription();

	// Generate JSON-LD structured data for dynamic pages using pageContext
	const getStructuredData = () => {
		if (isHomePage) {
			return {
				"@context": "https://schema.org",
				"@type": "Organization",
				"name": CREATOR.siteName,
				"description": CREATOR.description,
				"url": origin || (typeof window !== 'undefined' ? window.location.origin : '')
			};
		}
		
		const data = {
			"@context": "https://schema.org",
			"@type": "Service",
			"name": seoContent.title,
			"description": seoContent.description,
			"provider": {
				"@type": "Organization",
				"name": CREATOR.name,
				"url": origin || (typeof window !== 'undefined' ? window.location.origin : '')
			},
			"areaServed": {}
		};

		// Add location data based on page type
		if (pageContext.type === 'city-category' && pageContext.location) {
			const { city, state } = getLocationString(pageContext);
			data.areaServed = {
				"@type": "City",
				"name": city,
				"containedIn": {
					"@type": "State",
					"name": state
				}
			};
		} else if (pageContext.type === 'state-category' && pageContext.location) {
			const { state } = getLocationString(pageContext);
			data.areaServed = {
				"@type": "State",
				"name": state
			};
		} else if (pageContext.type === 'country-category') {
			const { country } = getLocationString(pageContext);
			data.areaServed = {
				"@type": "Country",
				"name": country
			};
		}

		return data;
	};

	// Check if we should hide the Industry Verticals section
	const shouldShowVerticals = () => {
		if (isHomePage) return true;
		
		const categoryName = (pageContext.category || '').toLowerCase();
		const hideCategories = ['onlyfans', 'model', 'influencer', 'agency', 'dating', 'adult'];
		
		// Check if category name contains any of the hide keywords
		return !hideCategories.some(keyword => categoryName.includes(keyword));
	};

	return (
        <div>
            {/* Structured Data - metadata is set by Next.js generateMetadata */}
            {getStructuredData() && (
                <script type="application/ld+json">
                    {JSON.stringify(getStructuredData())}
                </script>
            )}

            {/* Ivoclar-style Header */}
            <header
                className={`bg-white border-b border-gray-200 sticky top-0 z-50 transition-transform duration-300 ${
                    isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-18 gap-4">
                        {/* Logo */}
                        <a href="/" className="flex-shrink-0 inline-flex items-center" aria-label={t('Ivoclar home')}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/ivoclar-logo.svg"
                                alt={t('Ivoclar')}
                                className="h-8 w-auto md:h-9"
                            />
                        </a>

                        {/* Right: Search, Language, primary CTA */}
                        <div className="flex items-center gap-5 flex-shrink-0 ml-auto">
                            
                            <button type="button" onClick={() => setLang(lang === 'de' ? 'en' : 'de')} aria-label="Toggle language" className="text-[#0a478b] text-sm font-semibold hover:underline underline-offset-2">{lang === 'de' ? 'EN' : 'DE'}</button>
                            
                            <a
                                href={primaryShopUrl}
                                onClick={handleShopClick}
                                target={!shouldUseShopModal ? '_blank' : undefined}
                                rel={!shouldUseShopModal ? 'noopener noreferrer' : undefined}
                                className="text-[#0a478b] text-sm font-medium hover:underline underline-offset-2 decoration-[#0a478b] hover:decoration-[#083a70] transition-colors"
                            >
                                {t('Zirconia offer')}
                            </a>
                            <button
                                type="button"
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-[#0a478b] hover:bg-[#083a70] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                            >
                                {t('Order now')}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            

            {/* Hero: full-bleed image with overlaid text and CTA */}
            {(() => {
				const conv = getConversionContent();
				const heroBgUrl = isAnthonyTopHeroCategory
					? HERO_TOP_IMAGE_POSTERIOR_RESTORATION
					: isLightCureCategory
					? HERO_TOP_IMAGE_LIGHT_CURE
					: HERO_TOP_IMAGE;
				const isPosteriorHero = isAnthonyTopHeroCategory || isLightCureCategory;
				const heroBgUrlMobile = isPosteriorHero ? heroBgUrl : HERO_TOP_IMAGE_DEFAULT_MOBILE;
				const headlineParts = (conv.heroHeadline || t('Limits redefined. Standards raised.')).split(/(\s+)/);
				const lastWord = headlineParts[headlineParts.length - 1];
				const beforeLast = headlineParts.slice(0, -1).join('');
				const subline = conv.heroDescription || t('IPS e.max Zirconia — the new premium zirconium oxide.');
				const heroBgStyle = {
					backgroundImage: `url(${heroBgUrl})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center top',
				};
				const heroBgStyleMobile = {
					backgroundImage: `url(${heroBgUrlMobile})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center top',
				};
				return (
					<section
						className={
							isPosteriorHero
								? 'relative flex min-h-[52vh] items-start bg-black pt-16 pb-12 md:items-center md:pt-0 md:pb-0'
								: 'relative flex min-h-[52vh] items-start bg-gray-900 pt-16 pb-12 md:items-center md:pt-0 md:pb-0'
						}
					>
						{isPosteriorHero ? (
							<>
								{/* md+: left 50% solid black, right 50% image (cover in half viewport → less vertical crop) */}
								<div className="absolute inset-0 z-0 hidden md:flex" aria-hidden>
									<div className="h-full w-1/2 shrink-0 bg-black" />
									<div className="relative h-full w-1/2 min-w-0 overflow-hidden bg-black">
										<div className="absolute inset-0 bg-cover bg-top bg-no-repeat" style={heroBgStyle} />
										{/* Local feather on the photo’s left edge (reinforces blend at 50% column split) */}
										<div
											className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-44 bg-gradient-to-r from-black from-15% via-black/65 via-55% to-transparent lg:w-56"
											aria-hidden
										/>
									</div>
								</div>
								<div
									className="pointer-events-none absolute inset-0 z-[5] hidden md:block"
									style={{ background: HERO_POSTERIOR_SEAM_GRADIENT }}
									aria-hidden
								/>
								<div
									className="pointer-events-none absolute inset-0 z-[6] hidden md:block bg-gradient-to-r from-transparent via-transparent to-black/25"
									aria-hidden
								/>
								{/* Mobile: full-bleed + top/left weighting (flyer crop); desktop uses split above */}
								<div className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat md:hidden" style={heroBgStyleMobile} aria-hidden />
								<div
									className="pointer-events-none absolute inset-0 z-[1] md:hidden"
									style={{
										background:
											'linear-gradient(180deg, rgb(0 0 0 / 0.92) 0%, rgb(0 0 0 / 0.45) 42%, rgb(0 0 0 / 0.15) 62%, transparent 82%)',
									}}
									aria-hidden
								/>
							</>
						) : (
							<>
								<div className="absolute inset-0 z-0 hidden md:block bg-cover bg-top bg-no-repeat" style={heroBgStyle} aria-hidden />
								{/* Ivoclar-supplied banner video (Lena, 2026-08-20). Desktop only; the still above
								    remains the mobile/fallback and the poster covers the pre-load frame.
								    Source re-encoded for web: 24 MB → 0.7 MB, audio stripped for autoplay. */}
								<video
									className="absolute inset-0 z-[1] hidden md:block h-full w-full object-cover"
									src="/videos/zirconia-hero.mp4"
									poster="/videos/zirconia-hero-poster.jpg"
									autoPlay
									muted
									loop
									playsInline
									preload="metadata"
									aria-label={t('IPS e.max Zirconia banner video')}
								/>
								<div className="absolute inset-0 z-[2] hidden md:block bg-black/50" aria-hidden />
								<div className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat md:hidden" style={heroBgStyleMobile} aria-hidden />
								<div
									className="pointer-events-none absolute inset-0 z-[1] md:hidden"
									style={{
										background:
											'linear-gradient(180deg, rgb(0 0 0 / 0.92) 0%, rgb(0 0 0 / 0.45) 42%, rgb(0 0 0 / 0.15) 62%, transparent 82%)',
									}}
									aria-hidden
								/>
							</>
						)}
						<div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 py-10 md:py-20">
							<div className="max-w-[22rem] sm:max-w-xl">
								{/* Gradient border with transparent fill; inner area shows hero through bg-black/50 */}
								<div
									className="relative"
									style={{
										border: '1px solid #00a651',
									}}
								>
									<div className="p-5 sm:p-8">
										<h2 className="text-[2rem] sm:text-4xl lg:text-7xl text-white font-light leading-tight">
											{t('Limits')} <br></br>{t('redefined.')}
											<div className="font-bold text-5xl sm:text-6xl lg:text-8xl text-white">{t('Standards raised.')}</div>
										</h2>
										<h1 className="text-white text-base sm:text-lg md:text-5xl mt-2 sm:mt-3 font-light leading-snug md:leading-tight">
											{htmlContent?.category?.name ? (
												<>
													IPS e.max Zirconia for {htmlContent.category.name}.
												</>
											) : (
												<>
													{t('One disc for all applications.')}
												</>
											)}
										</h1>

										<div className="flex flex-wrap mb-2 sm:mb-8 mt-7 sm:mt-12 overflow-hidden items-center gap-4 sm:gap-6">
											<button
												type="button"
												onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
												className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-black font-bold text-base sm:text-lg transition-all shadow-lg hover:opacity-95"
												
											>
												{conv.ctaText}
											</button>
											<a
												href={primaryShopUrl}
												onClick={handleShopClick}
												target={!shouldUseShopModal ? '_blank' : undefined}
												rel={!shouldUseShopModal ? 'noopener noreferrer' : undefined}
												className="text-white font-medium hover:underline underline-offset-4 decoration-2 hover:opacity-90 transition-opacity"
											>
												{/* Per Ivoclar review 2026-08-20: Button 1 "Jetzt bestellen", Button 2 "Mehr erfahren".
												    Previously both buttons read "Jetzt bestellen". */}
												{t('Learn more')}
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				);
			})()}

            {/* Intro copy: two-column (heading + body) + full-width blue paragraph on white */}
            <section className="py-20 px-4 md:px-6 bg-white">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start mb-12">
						<h2 className="text-2xl md:text-3xl lg:text-[2rem] font-normal text-[#0a478b] leading-snug tracking-tight">
							{t('Limits redefined. Standards raised.')}
						</h2>
						<p className="text-gray-600 text-base md:text-lg leading-relaxed">
							{t('IPS e.max Zirconia is the new premium zirconium oxide — one disc for all applications, combining high-end esthetics with process-oriented efficiency for the lab and practice.')}
						</p>
					</div>
					<p className="text-[#0a478b] text-base md:text-lg leading-relaxed">
					{rc('Developed in close collaboration with our customers, IPS e.max Zirconia redefines versatility, esthetics, efficiency and reliability. From thin veneers to wide-span restorations, this material enables accurate fabrication with unmatched esthetic quality.', 'intro')}
					</p>
				</div>
			</section>

            {/* Conversion: Key benefits */}
            {(() => {
				const conv = getConversionContent();
				return (
					<section className="py-20 px-4 md:px-6 bg-white">
						<div className="max-w-6xl mx-auto">
							<h2 className="text-2xl md:text-3xl font-normal text-[#0a478b] mb-10 tracking-tight">{conv.benefitsHeadline}</h2>
							{/* Per Ivoclar review 2026-08-20 ("Can we add a picture to this section?"):
							    visual added alongside the benefit list. Using the Ivoclar-supplied GTx
							    animation, which matches the GTx Technology benefit. Swap for a still if preferred. */}
							<div className="grid grid-cols-1 lg:grid-cols-[1.1fr,1fr] gap-10 lg:gap-14 items-center">
								<ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{conv.benefitsList.map((item, i) => (
										<li key={i} className="flex items-start gap-3 text-gray-600 leading-relaxed">
											<span className="text-[#00a651] font-bold flex-shrink-0 mt-0.5">✓</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
								<div className="w-full overflow-hidden rounded-2xl bg-gray-50">
									<video
										className="h-full w-full object-cover"
										src="/videos/gtx-animation.mp4"
										poster="/videos/gtx-animation-poster.jpg"
										autoPlay
										muted
										loop
										playsInline
										preload="none"
										aria-label={t('GTx Technology animation')}
									/>
								</div>
							</div>
						</div>
					</section>
				);
			})()}

            {(() => {
				const conv = getConversionContent();
				return (
					<section className="py-20 px-4 md:px-6 bg-white border-t border-gray-100" aria-label={t('Developed with experts')}>
						<div className="max-w-6xl mx-auto">
							<h2 className="text-2xl md:text-3xl lg:text-4xl text-[#0a478b] font-normal mb-4 tracking-tight">{t('From experts to experts')}</h2>
							<p className="text-gray-600 text-lg mb-12 max-w-3xl">{t('IPS e.max Zirconia was developed around your needs.')}</p>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
							<div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src="https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Digital%20Processes/IPS%20e.max%20Zirconia/158065/image-thumb__158065__tile_default/IPS-e.max-Zirconia_2234-1_1920x1220px.88a19c79.jpg" alt={t('Developed with you')} className="h-full w-full object-cover" loading="lazy" />
							</div>
							<div className="p-6">
								<h3 className="mb-2 text-lg font-normal text-[#0a478b]">{t('Developed with you')}</h3>
								<p className="text-sm leading-relaxed text-gray-600">{t('From the outset, dental professionals worldwide contributed their expertise, real-lab experience and everyday challenges — so the material meets the demands of modern labs.')}</p>
							</div>
						</article>
						<article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
							<div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src="https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Digital%20Processes/IPS%20e.max%20Zirconia/162717/image-thumb__162717__tile_default/IPS-emax-Zirconia-BL1_1657_1920x1220px.e8533344.jpg" alt={t('Redefining trust')} className="h-full w-full object-cover" loading="lazy" />
							</div>
							<div className="p-6">
								<h3 className="mb-2 text-lg font-normal text-[#0a478b]">{t('Redefining trust')}</h3>
								<p className="text-sm leading-relaxed text-gray-600">{t('Validated beyond industry standards through meticulous testing and rigorous worst-case protocols. Simply put: we deliver what we promise.')}</p>
							</div>
						</article>
						<article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
							<div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src="https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Digital%20Processes/IPS%20e.max%20Zirconia/158891/image-thumb__158891__blog_detail/IPS-e.max-Zirconia_3329-3_1920x1220px.f97418bf.jpg" alt={t('Part of the IPS e.max family')} className="h-full w-full object-cover" loading="lazy" />
							</div>
							<div className="p-6">
								<h3 className="mb-2 text-lg font-normal text-[#0a478b]">{t('Part of the IPS e.max family')}</h3>
								<p className="text-sm leading-relaxed text-gray-600">{t('Trusted, proven and fully compatible — the IPS e.max family keeps redefining the possibilities of all-ceramic restorations.')}</p>
							</div>
						</article>
							</div>
							<div className="flex flex-wrap items-center justify-center gap-6 mt-14">
								<button type="button" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="inline-block px-8 py-4 rounded-full bg-[#0a478b] text-white font-bold text-lg transition-all shadow-lg hover:opacity-95">{conv.ctaText}</button>
								<a href={primaryShopUrl} onClick={handleShopClick} target={!shouldUseShopModal ? '_blank' : undefined} rel={!shouldUseShopModal ? 'noopener noreferrer' : undefined} className="text-[#0a478b] font-medium underline underline-offset-4 decoration-2 hover:opacity-90 transition-opacity">{t('Order the Redefining Package')}</a>
							</div>
						</div>
					</section>
				);
			})()}

            {/* Product lines — tabs, copy, image, specs, primary CTA link */}
            <section className="py-20 px-4 md:px-6 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-2xl md:text-3xl font-normal text-[#0a478b] mb-3 tracking-tight">
						{pageContext?.category ? `IPS e.max Zirconia for ${pageContext.category}` : 'IPS e.max Zirconia'}
					</h2>
					<p className="text-sm text-gray-600 mb-2 max-w-3xl">
						{t('Select a product below to view details and specifications — tap or click to switch.')}
					</p>
					
					<div className="mb-10 w-full">
						<nav
							className="flex flex-wrap gap-3 sm:gap-4 justify-start"
							role="tablist"
							aria-labelledby="tetric-product-picker-label"
							aria-label={t('Product line')}
						>
							{visibleProducts.map((product, i) => {
								const selected = safeProductIndex === i;
								return (
									<button
										key={product.id}
										id={`tetric-product-tab-${product.id}`}
										type="button"
										role="tab"
										aria-selected={selected}
										tabIndex={0}
										onClick={() => setSelectedProductIndex(i)}
										className={`
											min-h-[3rem] min-w-[10.5rem] max-w-full sm:min-w-[11.5rem]
											rounded-full px-5 py-3.5 text-sm sm:text-base text-center leading-snug
											transition-all duration-150
											border-2
											focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a478b] focus-visible:ring-offset-2
											${selected
												? 'bg-[#0a478b] text-white border-[#062d56] shadow-[0_2px_0_0_#052847,0_6px_16px_rgba(10,71,139,0.35)] hover:bg-[#083a70]'
												: 'bg-gradient-to-b from-white to-gray-100 text-gray-900 border-gray-300 shadow-[0_2px_0_0_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.06)] hover:border-[#0a478b]/55 hover:text-[#0a478b] hover:shadow-[0_2px_0_0_rgba(10,71,139,0.15),0_6px_16px_rgba(10,71,139,0.12)] hover:-translate-y-px active:translate-y-0 active:shadow-[0_1px_0_0_rgba(0,0,0,0.1)]'
											}
										`}
									>
										{t(product.name)}
									</button>
								);
							})}
						</nav>
					</div>
					{/* Selected product content — product left (larger), title + subtitle right; then description full-width below */}
					{currentProduct ? (() => {
						const p = currentProduct;
						return (
							<div
								role="tabpanel"
								id={`tetric-product-panel-${p.id}`}
								aria-labelledby={`tetric-product-tab-${p.id}`}
								className="relative rounded-none bg-white p-8 md:p-10 overflow-hidden"
								style={{
									boxShadow: '0 4px 20px rgba(0, 166, 81, 0.08)',
									borderTop: '3px solid rgba(10, 71, 139, 0.5)',
									borderRight: '3px solid rgba(10, 71, 139, 0.5)',
									borderBottom: '3px solid #00a651',
									borderLeft: '3px solid #00a651'
								}}
							>
								{/* Row: text left, product photo right (larger) */}
								<div className="grid grid-cols-1 lg:grid-cols-[1fr,1.25fr] gap-8 lg:gap-12 items-center mb-8">
									{/* Left: title + subtitle */}
									<div className="order-1 flex flex-col justify-center">
										<h3 className="text-2xl md:text-3xl font-normal text-[#0a478b] mb-3">{t(p.name)}</h3>
										{p.tagline && (
											<p className="text-[#0a478b] text-base md:text-lg font-medium">{t(p.tagline)}</p>
										)}
									</div>
									{/* Right: product image — larger on page */}
									<div className="order-2 w-full min-h-[260px] lg:min-h-[320px] bg-gray-50 rounded-none flex items-center justify-center overflow-hidden">
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={p.image}
											alt={t(p.name)}
											className="w-full h-full object-contain"
											onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling?.classList.remove('hidden'); }}
										/>
										<div className="hidden text-center text-gray-400 text-sm p-4">
											<span className="block font-medium text-gray-500 mb-1">{t('Product image')}</span>
											<span>Add asset at <code className="text-xs bg-gray-200 px-1 rounded-none">{p.image}</code></span>
										</div>
									</div>
								</div>
								{/* Description full-width below */}
								<p className="text-[#0a478b]/90 text-base leading-relaxed mb-6">{rc(p.description, `prod-${p.id}-desc`)}</p>
								{p.contentSections && p.contentSections.length > 0 && (
											<div className="space-y-5 mb-6">
												{p.contentSections.map((sec, i) => (
													<div key={i}>
														<p className="font-semibold text-[#0a478b] text-sm mb-1">{rc(sec.heading, `prod-${p.id}-sec-${i}-h`)}</p>
														<p className="text-gray-700 text-sm leading-relaxed">{rc(sec.body, `prod-${p.id}-sec-${i}-b`)}</p>
													</div>
												))}
											</div>
										)}
										{p.exposureTable && p.exposureTable.headers && p.exposureTable.rows && (
											<div className="mb-6 overflow-x-auto">
												<table className="w-full min-w-[520px] border border-gray-200 rounded-none overflow-hidden text-sm">
													<thead>
														<tr className="bg-[#0a478b] text-white">
															{p.exposureTable.headers.map((h, i) => (
																<th key={i} className="text-left font-semibold px-4 py-3">{h}</th>
															))}
														</tr>
													</thead>
													<tbody>
														{p.exposureTable.rows.map((row, ri) => (
															<tr key={ri} className={ri % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
																{row.map((cell, ci) => (
																	<td key={ci} className="px-4 py-3 border-t border-gray-200 text-gray-800">{rc(cell, `prod-${p.id}-cell-${ri}-${ci}`)}</td>
																))}
															</tr>
														))}
													</tbody>
												</table>
												{p.exposureTable.footnote && (
													<p className="text-gray-500 text-xs mt-2 italic">{p.exposureTable.footnote}</p>
												)}
											</div>
										)}
										{p.featuresSubhead && (
											<p className="text-[#0a478b] font-semibold text-sm mb-3">{t(p.featuresSubhead)}</p>
										)}
										{p.features && p.features.length > 0 && (
											<ul className="space-y-2 mb-6">
												{p.features.map((f, i) => (
													<li key={i} className="flex gap-2 text-gray-700 text-sm leading-relaxed">
														<span className="text-[#00a651] shrink-0">•</span>
														<span>{rc(f, `prod-${p.id}-feat-${i}`)}</span>
													</li>
												))}
											</ul>
										)}
										{p.faqQuestion && p.faqAnswer && (
											<div className="mb-6">
												<p className="font-semibold text-[#0a478b] text-sm mb-1">{rc(p.faqQuestion, `prod-${p.id}-faq-q`)}</p>
												<p className="text-gray-700 text-sm leading-relaxed">{rc(p.faqAnswer, `prod-${p.id}-faq-a`)}</p>
											</div>
										)}
										{p.specs && p.specs.length > 0 && (
											<dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
												{p.specs.map((spec, i) => (
													<React.Fragment key={i}>
														<dt className="text-sm font-medium text-gray-500">{spec.label}</dt>
														<dd className="text-sm text-gray-800">{spec.value}</dd>
													</React.Fragment>
												))}
											</dl>
										)}
										<a
											href={p.learnMoreUrl}
											className="inline-flex items-center gap-2 bg-[#0a478b] hover:bg-[#083a70] text-white font-semibold px-5 py-3 rounded-none text-sm transition-colors"
										>
											{t('Try it Today')}
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
										</a>
								{/* Vimeo sections — up to 2, each with optional title/subtitle above video. Hidden when no vimeoId is set. */}
								{(() => {
									const raw = (p.vimeoSections && p.vimeoSections.length > 0)
										? p.vimeoSections.slice(0, 2).map(s => ({ title: s.title, subtitle: s.subtitle, vimeoId: s.vimeoId }))
										: (p.vimeoId ? [{ title: p.name, subtitle: p.tagline || null, vimeoId: p.vimeoId }] : []);
									const sections = raw.filter(s => s.vimeoId);
									if (sections.length === 0) return null;
									return (
										<div className="mt-10 pt-8 border-t border-gray-200 w-full space-y-10">
											{sections.map((sec, i) => (
												<div key={i} className="space-y-3">
													{sec.title && <h4 className="text-xl font-normal text-[#0a478b]">{sec.title}</h4>}
													{sec.subtitle && (
														<p className="text-[#0a478b] text-sm font-medium">{sec.subtitle}</p>
													)}
													<div className="aspect-video w-full rounded-none overflow-hidden bg-black">
														<iframe
															title={sec.title || `${t(p.name)} video ${i + 1}`}
															src={`https://player.vimeo.com/video/${sec.vimeoId}`}
															className="w-full h-full"
															allow="autoplay; fullscreen; picture-in-picture"
															allowFullScreen
														/>
													</div>
												</div>
											))}
										</div>
									);
								})()}
								{/* Optional secondary product photo block — same layout as top (text left, photo right) */}
								{p.secondaryPhoto && (
									<div className="mt-10 pt-8 border-t border-gray-200 w-full">
										<div className="grid grid-cols-1 lg:grid-cols-[1fr,1.25fr] gap-8 lg:gap-12 items-center">
											<div className="flex flex-col justify-center">
												<h4 className="text-2xl md:text-3xl font-normal text-[#0a478b] mb-3">{p.secondaryPhoto.title}</h4>
												{p.secondaryPhoto.subtitle && (
													<p className="text-[#0a478b] text-base md:text-lg font-medium">{p.secondaryPhoto.subtitle}</p>
												)}
											</div>
											<div className="w-full min-h-[260px] lg:min-h-[320px] bg-gray-50 rounded-none flex items-center justify-center overflow-hidden">
												{/* eslint-disable-next-line @next/next/no-img-element */}
												<img
													src={p.secondaryPhoto.image}
													alt={p.secondaryPhoto.title}
													className="w-full h-full object-contain"
												/>
											</div>
										</div>
									</div>
								)}
							</div>
						);
					})() : null}
				</div>
			</section>

            {/* Dentist testimonials are extracted to a reusable component and disabled for now. */}
            {SHOW_DENTIST_TESTIMONIALS ? <DentistTestimonials /> : null}

            {/* Conversion: Optional video or infographic */}
            {(() => {
				const conv = getConversionContent();
				if (conv.videoUrl) {
					return (
						<section className="py-16 px-4 bg-white">
							<div className="max-w-4xl mx-auto">
								<h2 className="text-2xl font-normal text-[#0a478b] mb-6">{t('See the difference')}</h2>
								<div className="aspect-video rounded-xl overflow-hidden bg-black">
									<iframe
										title={t('Product video')}
										src={conv.videoUrl}
										className="w-full h-full"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
									/>
								</div>
							</div>
						</section>
					);
				}
				if (conv.infographicUrl) {
					return (
						<section className="py-16 px-4 bg-gray-50">
							<div className="max-w-4xl mx-auto">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src={conv.infographicUrl} alt="" className="w-full rounded-xl shadow-lg" />
							</div>
						</section>
					);
				}
				return null;
			})()}

            {/* Location map — location-based subpages only; coordinates from the ColdStart API */}
            {isLocationPage && mapSrc && (
			<section className="py-20 px-4 md:px-6 bg-white border-t border-gray-100" aria-label={`Map of ${mapLocationStr}`}>
				<div className="max-w-6xl mx-auto">
					<h2 className="text-2xl md:text-3xl lg:text-[2rem] font-normal text-[#0a478b] mb-3 tracking-tight">
						{CREATOR.shortName} in {mapLocationStr}
					</h2>
					<p className="text-gray-600 text-lg mb-8 max-w-3xl">
						Supporting dental laboratories and practice labs in {mapLocationStr} with the Ivoclar digital fixed prosthetics workflow — from design and milling through to sintering and finishing.
					</p>
					<div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white">
						<iframe
							title={`Map of ${mapLocationStr}`}
							src={mapSrc}
							className="w-full block min-h-[320px] md:min-h-[440px]"
							style={{ border: 0 }}
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							allowFullScreen
						/>
					</div>
				</div>
			</section>
			)}

            {/* Zirconia new-customer offer — replaces the on-page order form per Ivoclar review 2026-08-20 */}
            <ZirconiaOfferCta lang={lang} />

            {/* Digital Fixed Prosthetics Workflow — moved below the offer per Ivoclar review 2026-08-20
                ("Move this bracket to the end (after the form)") */}
            <section className="py-20 px-4 md:px-6 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-2xl md:text-3xl lg:text-[2rem] font-normal text-[#0a478b] mb-3 tracking-tight">{t('The Digital Fixed Prosthetics Workflow')}</h2>
					<p className="text-gray-600 text-lg mb-12 max-w-3xl">{t('IPS e.max Zirconia and PrograMill 7 belong to one seamless workflow — from design to finished restoration.')}</p>
					<WorkflowCarousel lang={lang} />
				</div>
			</section>


            {/* Pills: last section before footer — SEO: category name as link text and href = category page URL */}
            {getNavigationItems().length > 0 && (
			<section className="py-16 px-4 md:px-6 bg-gray-50 border-t border-gray-200">
				<div className="max-w-6xl mx-auto">
					<div className="flex flex-wrap justify-center gap-2">
						{getNavigationItems().map((item, index) => (
							<a
								key={index}
								href={item.slug}
								className="inline-block px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-[#0a478b] hover:text-[#0a478b] text-sm transition-colors"
							>
								{item.name}
							</a>
						))}
					</div>
				</div>
			</section>
            )}

			{/* References / Footnotes — semantic <ol> using DPUB-ARIA doc-endnotes.
			    Each inline [N] marker in body text renders as a <sup role="doc-noteref">
			    anchor pointing to the matching <li id="fn-N" role="doc-endnote"> below.
			    Academic works are wrapped in <cite> per HTML spec. */}
			<section
				id="references"
				aria-labelledby="references-heading"
				className="py-10 px-4 md:px-6 bg-white border-t border-gray-200"
			>
				<div className="max-w-6xl mx-auto">
					<h2 id="references-heading" className="sr-only">{t('References')}</h2>
					<p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-2">
						* Cavity classes I-V according to G. V. Black
					</p>
					<ol
						role="doc-endnotes"
						className="text-xs md:text-sm text-gray-600 leading-relaxed space-y-1 list-none pl-0"
					>
						{TETRIC_FOOTNOTES.map((fn) => (
							<li
								key={fn.id}
								id={`fn-${fn.id}`}
								role="doc-endnote"
								className="flex gap-2"
							>
								<span className="font-medium text-gray-700 shrink-0" aria-hidden>[{fn.id}]</span>
								<span>
									{fn.work ? (
										<>
											<cite className="not-italic">{fn.work}</cite>{' '}
										</>
									) : null}
									{fn.text}
								</span>
							</li>
						))}
					</ol>
				</div>
			</section>

			{isShopModalOpen && (
				<div className="fixed inset-0 z-[70] flex items-start sm:items-center justify-center overflow-y-auto px-3 py-4 sm:px-4 sm:py-6">
					<div
						className="absolute inset-0 bg-black/60"
						onClick={() => setIsShopModalOpen(false)}
						aria-hidden
					/>
					<div className="relative w-full max-w-md rounded-2xl bg-white p-5 sm:p-6 shadow-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain">
						<h3 className="text-xl font-normal text-[#0a478b] mb-2">{t('Choose product to buy')}</h3>
						<p className="text-sm text-gray-600 mb-5">
							{t('Select the product shop page you want to open.')}
						</p>
						<div className="space-y-3">
							{resolvedShopOptions.map((opt) => (
								<a
									key={opt.id}
									href={opt.url}
									target="_blank"
									rel="noopener noreferrer"
									className="w-full inline-flex items-center justify-between rounded-full border border-[#0a478b]/35 px-4 py-3.5 text-[#0a478b] font-semibold hover:bg-[#0a478b]/5 transition-colors"
								>
									<span className="inline-flex items-center gap-3 min-w-0">
										<span className="h-14 w-14 rounded-full bg-white border-2 border-[#0a478b]/25 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={productImageById[opt.id]}
												alt=""
												className="h-full w-full object-contain p-1.5"
											/>
										</span>
										<span className="truncate">{opt.label}</span>
									</span>
									<span aria-hidden>-&gt;</span>
								</a>
							))}
						</div>
						<button
							type="button"
							onClick={() => setIsShopModalOpen(false)}
							className="mt-5 w-full rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 transition-colors"
						>
							{t('Close')}
						</button>
					</div>
				</div>
			)}

			{/* Ivoclar-style Footer */}
			<footer className="bg-[#0a478b] text-white">
				<div className="max-w-6xl mx-auto px-6 py-10">
					<div className="flex flex-col lg:flex-row lg:justify-between gap-10 lg:gap-16">
						{/* Link columns */}
						<div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
							<ul className="space-y-3 text-sm">
								<li><a href="https://www.ivoclarusa.com/repfinder/" target="_blank" rel="noopener noreferrer" className="hover:underline">{t('Sales Rep Finder')}</a></li>
								<li><a href="https://mydevice.ivoclar.com/?lang=en" target="_blank" rel="noopener noreferrer" className="hover:underline">{t('Device Registration')}</a></li>
								<li><a href="https://www.ivoclar.com/en_us/tools/software-updates" target="_blank" rel="noopener noreferrer" className="hover:underline">{t('Software Updates')}</a></li>
								<li><a href="https://www.ivoclar.com/en_us/links/download-center" target="_blank" rel="noopener noreferrer" className="hover:underline">{t('Download Center')}</a></li>
								<li><a href="https://www.ivoclar.com/en_us/local/government-contracts" target="_blank" rel="noopener noreferrer" className="hover:underline">{t('Government Contracts')}</a></li>
								<li><a href="https://www.ivoclar.com/en_us/local/order-delivery-and-return-policy" target="_blank" rel="noopener noreferrer" className="hover:underline">{t('Delivery and Returns Policy')}</a></li>
								<li><a href="https://www.ivoclar.com/en_us/local/partnership-agreements" target="_blank" rel="noopener noreferrer" className="hover:underline">{t('Partner Agreements')}</a></li>
								<li><a href="https://www.ivoclar.com/en_us/faq" target="_blank" rel="noopener noreferrer" className="hover:underline">FAQ</a></li>
							</ul>
							<ul className="space-y-3 text-sm">
								<li><a href="https://www.ivoclar.com/en_us/legal/suppliers" target="_blank" rel="noopener noreferrer" className="hover:underline">{t('Suppliers')}</a></li>
								<li><a href="https://www.ivoclar.com/en_us/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:underline">{t('Privacy')}</a></li>
								<li><a href="https://www.ivoclar.com/en_us/shared/imprint" target="_blank" rel="noopener noreferrer" className="hover:underline">{t('Imprint')}</a></li>
								<li><a href="https://www.ivoclar.com/en_us/shared/cookies-declaration" target="_blank" rel="noopener noreferrer" className="hover:underline">{t('Cookies')}</a></li>
								<li><a href="https://www.ivoclar.com/en_US/shop/agent" target="_blank" rel="noopener noreferrer" className="hover:underline">{t('Agent Login')}</a></li>
								<li><a href="https://www.ivoclar.com/en_us/shared/sitemap" target="_blank" rel="noopener noreferrer" className="hover:underline">{t('Sitemap')}</a></li>
								<li><a href="https://www.ivoclar.com/en_us/legal/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="hover:underline">{t('Terms &amp; Conditions')}</a></li>
								<li><a href="https://www.ivoclar.com/en_us/contact-us" target="_blank" rel="noopener noreferrer" className="hover:underline">{t('Contact Us')}</a></li>
							</ul>
						</div>
						{/* Security + Social */}
						<div className="flex flex-col items-start lg:items-end gap-6 flex-shrink-0">
							<div className="flex flex-col items-start lg:items-end">
								<p className="text-white/90 text-xs mb-2">{t('This site is secure')}</p>
								<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#0a478b] text-xs font-semibold">
									<svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
										<path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
									</svg>
									<span>digicert SECURED</span>
								</div>
							</div>
							<div className="flex flex-col items-start lg:items-end">
								<p className="text-white/90 text-sm font-medium mb-3">{t('Follow us on our social media')}</p>
								<div className="flex gap-4">
									<a href="https://www.facebook.com/Ivoclar.NA" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity" aria-label={t('Facebook')}>
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
									</a>
									<a href="https://www.youtube.com/c/Ivoclar-global" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity" aria-label={t('YouTube')}>
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
									</a>
									<a href="https://www.instagram.com/ivoclar.na" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity" aria-label={t('Instagram')}>
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
									</a>
									<a href="https://www.linkedin.com/company/ivoclar-na" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity" aria-label={t('LinkedIn')}>
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Bottom bar */}
				<div className="border-t border-white/20">
					<div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
						<span>© 2026 Ivoclar Vivadent</span>
						<button
							type="button"
							onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
							className="flex items-center gap-1 text-white hover:opacity-90 transition-opacity"
						>
							{t('Go to top')}
							<span className="text-lg leading-none" aria-hidden>^</span>
						</button>
					</div>
				</div>
			</footer>
            
        </div>
    );
};

export default PageRenderer;