/**
 * Geo pages (Land / Bundesland / Stadt) for the German pilot.
 *
 * ColdStart generates the location pages for the geo-enabled categories
 * (Zirkonoxid Dentallabor, Zirkon Zahntechnik, Zirkonoxid Händler - business 95,
 * Germany + Austria packages, cities from 50,000 inhabitants) and answers with the
 * English place names its dataset carries ("Bavaria", "Munich", "Cologne"). This
 * file turns those into German and writes the copy the geo template renders.
 *
 * Template decision (Brandon, 15 Sep 2026): geo pages follow the home page design -
 * static hero statement, intro, "Warum", products, offer, form, workflow - with the
 * place written into the headline, intro, benefits and map, plus a breadcrumb and the
 * sibling-location pills. The question/answer template stays on the term pages.
 */

import { findTerm } from '@/lib/terms';

export const COUNTRY_DE = {
	germany: 'Deutschland',
	austria: 'Österreich',
	switzerland: 'Schweiz',
};

/** Only the states whose ColdStart name is English; German names pass through. */
export const STATE_DE = {
	Bavaria: 'Bayern',
	'North Rhine-Westphalia': 'Nordrhein-Westfalen',
	Hesse: 'Hessen',
	Saxony: 'Sachsen',
	'Lower Saxony': 'Niedersachsen',
	'Saxony-Anhalt': 'Sachsen-Anhalt',
	'Rhineland-Palatinate': 'Rheinland-Pfalz',
	'Mecklenburg-Western Pomerania': 'Mecklenburg-Vorpommern',
	Thuringia: 'Thüringen',
	Vienna: 'Wien',
	Styria: 'Steiermark',
	'Upper Austria': 'Oberösterreich',
	'Lower Austria': 'Niederösterreich',
	Carinthia: 'Kärnten',
	Tyrol: 'Tirol',
};

/** Cities ColdStart names in English (the rest already come back in German). */
export const CITY_DE = {
	Munich: 'München',
	Nuremberg: 'Nürnberg',
	Cologne: 'Köln',
	Hanover: 'Hannover',
	Brunswick: 'Braunschweig',
	Vienna: 'Wien',
	'Frankfurt (Oder)': 'Frankfurt (Oder)',
	Frankfurt: 'Frankfurt am Main',
	'Dessau-Rosslau': 'Dessau-Roßlau',
};

/** Prepositions: "in Bayern" but "im Saarland" / "im Burgenland". */
function inPlace(name) {
	if (!name) return '';
	if (/^(Saarland|Burgenland)$/.test(name)) return `im ${name}`;
	return `in ${name}`;
}

export function germanCountry(slugOrName = '') {
	const key = String(slugOrName).toLowerCase();
	return COUNTRY_DE[key] || slugOrName;
}
export function germanState(name = '') {
	return STATE_DE[name] || name;
}
export function germanCity(name = '') {
	return CITY_DE[name] || name;
}

/**
 * Build the place context from the API payload + the URL segments.
 * Returns null when the page is not a location page.
 */
export function geoContext(htmlContent, pathname = '') {
	const parts = String(pathname).split('/').filter(Boolean);
	if (parts.length < 2) return null;
	const categorySlug = parts[parts.length - 1];
	const term = findTerm(categorySlug);
	const countrySlug = parts[0];
	const country = germanCountry(htmlContent?.country?.country || htmlContent?.state?.country?.country || countrySlug);
	const stateName = germanState(htmlContent?.state?.state || htmlContent?.city?.state?.state || '');
	const cityName = germanCity(htmlContent?.city?.city || '');
	const level = parts.length === 4 ? 'city' : parts.length === 3 ? 'state' : 'country';
	const place = level === 'city' ? cityName : level === 'state' ? stateName : country;
	const region = level === 'country' ? country : stateName || country;
	const crumbs = [{ name: 'IPS e.max Zirconia', href: '/' }];
	if (term) crumbs.push({ name: term.name, href: `/${term.slug}` });
	crumbs.push({ name: country, href: `/${countrySlug}/${categorySlug}` });
	if (level !== 'country') crumbs.push({ name: stateName, href: `/${parts[0]}/${parts[1]}/${categorySlug}` });
	if (level === 'city') crumbs.push({ name: cityName, href: pathname });
	return {
		level,
		term,
		categorySlug,
		country,
		countrySlug,
		state: stateName,
		city: cityName,
		place,
		region,
		inPlace: inPlace(place),
		inRegion: inPlace(region),
		placeLong: [cityName, stateName, country].filter(Boolean).join(', '),
		crumbs,
	};
}

/**
 * The geo copy per category. Three categories are geo-enabled on ColdStart; anything
 * else falls back to the generic block so a stray location URL never renders English.
 */
export function geoCopy(geo) {
	if (!geo) return null;
	const { term, place, inPlace: ip, region, inRegion: ir } = geo;
	const name = term?.name || 'Zirkonoxid';
	const base = {
		seoTitle: `${name} ${ip} | IPS e.max Zirconia | Ivoclar`,
		seoDescription: `IPS e.max Zirconia für Dentallabore ${ip}: eine Scheibe für alle Indikationen, über Ivoclar-Händler ${ir} beziehbar – erste Scheibe mit 30 % Neukundenrabatt.`,
		h1: `IPS e.max Zirconia ${ip}.`,
		subline: `Ein Zirkonoxid für alle festsitzenden Indikationen – über das Ivoclar-Händlernetz ${ir} verfügbar.`,
		introHeadline: `Limits neu definiert. Standards neu gesetzt – auch ${ip}.`,
		introBody: `IPS e.max Zirconia ist das neue Premium-Zirkonoxid: eine Scheibe für alle Indikationen, die High-End-Ästhetik mit prozessorientierter Effizienz verbindet. Dentallabore und Praxislabore ${ip} beziehen es über Ivoclar-Händler ${ir} – die erste Scheibe mit 30 % Neukundenrabatt.`,
		whyHeadline: `Warum IPS e.max Zirconia ${ip}?`,
		benefits: [
			'Eine Scheibe für alle Indikationen – weniger Materialien, mehr Möglichkeiten',
			'GTx Technologie für einen natürlichen Farb- und Transluzenzverlauf',
			'Speed-Sintern ab 0:58 h – mehr Output am selben Tag',
			`Händlervermittlung ${ir} über das Bestellformular auf dieser Seite`,
		],
		productsHeadline: `IPS e.max Zirconia ${ip}`,
		mapHeadline: `Ivoclar ${ip}`,
		mapIntro: `Wir unterstützen Dentallabore und Praxislabore ${ip} mit dem digitalen Workflow für festsitzenden Zahnersatz – vom Design und Fräsen bis zum Sintern und Finishing. Ihr Händler ${ir} liefert IPS e.max Zirconia direkt ins Labor.`,
	};
	switch (term?.slug) {
		case 'zirkonoxid-dentallabor':
			return {
				...base,
				seoTitle: `Zirkonoxid für Dentallabore ${ip} | IPS e.max Zirconia | Ivoclar`,
				h1: `IPS e.max Zirconia für Dentallabore ${ip}.`,
				subline: `Weniger Lagerhaltung, kürzere Sinterzeiten, ein Material für alle Indikationen – über Ivoclar-Händler ${ir}, erste Scheibe mit 30 % Neukundenrabatt.`,
				introHeadline: `Weniger Material. Mehr Labor – auch ${ip}.`,
				introBody: `Dentallabore ${ip} arbeiten mit denselben Anforderungen wie überall: weniger Lagerhaltung, kurze Sinterzeiten, reproduzierbare Ästhetik. IPS e.max Zirconia deckt das gesamte festsitzende Indikationsspektrum mit einer Scheibe ab und ist über das Ivoclar-Händlernetz ${ir} verfügbar.`,
				whyHeadline: `Warum IPS e.max Zirconia für Ihr Dentallabor ${ip}?`,
				benefits: [
					'Ein Scheibentyp für alle Indikationen – weniger gebundenes Kapital',
					'Speed-Sintern ab 0:58 h – mehr Fälle pro Tag',
					`Händlervermittlung ${ir} über das Formular auf dieser Seite`,
					'Neukundenangebot: erste Scheibe mit 30 % Rabatt, bei Nichtgefallen Geld zurück',
				],
			};
		case 'zirkon-zahntechnik':
			return {
				...base,
				seoTitle: `Zirkon für die Zahntechnik ${ip} | IPS e.max Zirconia | Ivoclar`,
				h1: `IPS e.max Zirconia für die Zahntechnik ${ip}.`,
				subline: `Ein Material, kürzere Sinterzeiten, alle Indikationen – entwickelt mit Zahntechnikern, erhältlich über Ivoclar-Händler ${ir}.`,
				introHeadline: `Mit Zahntechnikern entwickelt. Für Labore ${ip}.`,
				introBody: `Von Anfang an haben Zahntechnikerinnen und Zahntechniker ihre Erfahrung aus dem Laboralltag eingebracht – damit IPS e.max Zirconia den Anforderungen moderner Labore gerecht wird: weniger Materialwechsel, kürzere Sinterzeiten, reproduzierbare Ästhetik. Für die Zahntechnik ${ip} über Ivoclar-Händler ${ir} verfügbar.`,
				whyHeadline: `Warum IPS e.max Zirconia in der Zahntechnik ${ip}?`,
				benefits: [
					'Eine Scheibe für alle Indikationen – weniger Materialien im Lager',
					'Speed-Sintern ab 0:58 h – mehr Fälle pro Tag',
					'GTx Technologie für reproduzierbare Ästhetik ohne Verblendung',
					`Ein Partner für Material, Maschine und Support – auch ${ip}`,
				],
			};
		case 'zirkonoxid-haendler':
			return {
				...base,
				seoTitle: `Zirkonoxid Händler ${ip} | IPS e.max Zirconia | Ivoclar`,
				seoDescription: `IPS e.max Zirconia über Ivoclar-Händler ${ip} beziehen: Händlervermittlung über das Formular, erste Scheibe mit 30 % Neukundenrabatt, bei Nichtgefallen Geld zurück.`,
				h1: `IPS e.max Zirconia Händler ${ip}.`,
				subline: `Wir vermitteln Sie an einen Ivoclar-Händler in Ihrer Nähe – Bestellformular unten, erste Scheibe mit 30 % Neukundenrabatt.`,
				introHeadline: `Ihr Zirkonoxid-Händler ${ip}.`,
				introBody: `IPS e.max Zirconia ist über das Ivoclar-Händlernetz ${ir} erhältlich. Füllen Sie das Bestellformular aus – unser Team vermittelt Sie an einen Händler ${ip}, und Ihre erste Scheibe kommt mit 30 % Neukundenrabatt, bei Nichtgefallen Geld zurück.`,
				whyHeadline: `Warum IPS e.max Zirconia über einen Händler ${ip} beziehen?`,
				benefits: [
					`Lieferung über Ivoclar-Händler ${ir} direkt ins Labor`,
					'Neukundenangebot: erste Scheibe mit 30 % Rabatt, bei Nichtgefallen Geld zurück',
					'Eine Scheibe für alle Indikationen – 12 bis 30 mm, 20 Farben',
					'Ein Partner für Material, PrograMill 7, Sintern und Charakterisierung',
				],
				mapHeadline: `Ivoclar-Händler ${ip}`,
			};
		default:
			return base;
	}
}

/**
 * Sibling-location pills for a location page, in German: country page lists the
 * Bundesländer, state page lists the cities. Falls back to null when the API
 * carries no siblings (city pages), so the caller shows the term pills instead.
 */
export function geoNavigationItems(htmlContent, geo) {
	if (!geo) return null;
	const name = geo.term?.name || 'Zirkonoxid';
	const toArray = (x) => (Array.isArray(x) ? x : x ? [x] : []);
	const states = toArray(htmlContent?.pages_state);
	const cities = toArray(htmlContent?.pages_city);
	if (geo.level === 'country' && states.length) {
		const seen = new Set();
		return states
			.filter((p) => p.state?.state && !seen.has(p.state.state) && seen.add(p.state.state))
			.map((p) => ({ name: `${name} ${inPlace(germanState(p.state.state))}`, slug: p.url }));
	}
	if (geo.level === 'state' && cities.length) {
		const seen = new Set();
		return cities
			.filter((p) => p.city?.city && !seen.has(p.city.city) && seen.add(p.city.city))
			.map((p) => ({ name: `${name} ${inPlace(germanCity(p.city.city))}`, slug: p.url }));
	}
	return null;
}
