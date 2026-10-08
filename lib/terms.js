/**
 * German search terms for the IPS e.max Zirconia pilot (ivoclargermany.com).
 *
 * Source of truth: Ivoclar_Germany_Content_Structure.xlsx (Drive, "Ivoclar Germany"
 * folder), reviewed row by row with Lena Lackner and Carolin Fichtenau on the
 * ColdStart Pilot Germany call of 10 September 2026. Sheet row numbers below refer
 * to the "Site Content" tab as it was shared on that call.
 *
 * Outcome of the review:
 *   - Removed (patient-facing or duplicate of a kept term): Zirkonoxid Kronen (row 11),
 *     Zirkonoxid Brücken (row 12), Vollkeramik Kronen (row 13, "Keramik Kronen"),
 *     Zirkonoxid Verblendkeramik (row 25 - "that would be Ceram, not Ceram Art - skip").
 *   - Spelling: umlauts instead of ue/ae throughout (Fräsen, Brücken, Höhen).
 *   - Open (Lena asked to mark them and think about it): Zirkonoxid Sintern (row 19) and
 *     Speed-Sintern (row 20) - workflow terms that would normally point at PrograMill /
 *     the furnace, kept for now because a sintering search still lands on Zirconia.
 *   - Added at the bottom of the sheet on the call: Zirkon, Zirkonronden, Zirkon
 *     Zahntechnik - the "easy" high-volume terms Lena asked for.
 *   - Lena also mentioned "Dentallabor" as an easy term; proposed here, not yet confirmed.
 *
 * What is dynamic per term (Lena, 10 Sep): the H1 becomes the question the searcher
 * typed, the subline the answer; the first block under the banner and the
 * "Warum IPS e.max Zirconia?" section (headline + four benefits) change per term;
 * the hero image can change per category. Everything else on the page stays static.
 *
 * `status`: 'confirmed' | 'open' | 'proposed' | 'removed'. Removed terms stay listed so
 * the old URLs 404 cleanly instead of silently rendering the home page, and so nobody
 * re-adds them from the sheet.
 *
 * `hero`: which banner treatment the page uses - see HERO_VARIANTS in PageRenderer.
 *
 * 21 Sep: answers and FAQs checked against Ivoclar's own "FAQ IPS e.max Zirconia_DE"
 * (Lutz Ketelaar, Labside Prosthetics Fixed, 1 Apr 2026) and Carolin's Google Ads keyword
 * export (mail of 10 Sep). Facts from the FAQ: veneers from 0,5 mm (Variolink Esthetic LC
 * up to 1,5 mm, DC above), sintering at 1450 °C with 0:58 h / 2:57 h / 9:50 h programs and
 * up to 10 units per 0:58 h run in a Programat S2, 4Y-PSZ 1.200 MPa / 5Y-PSZ 800 MPa,
 * open 98,5 mm disc geometry, Intelligent Disc Concept (3 mm incisal, 4 mm transition,
 * 5–23 mm dentin), certified abutments for implant work, no etching of zirconia, no
 * ZirLiner, OptraGloss polishers, fluorescent glaze (Ceram Art Magic Glaze FLUO).
 * Keyword gaps from the Ads export added as proposed terms: Multilayer Zirkon, Vollzirkon.
 *
 * 23 Sep: Carolin's corrections in the shared sheet (Kategorien & Fragen, text edits plus
 * column AB comments) applied 7 Oct: wrong FAQs removed (4Y/5Y #3-4, Fräsen #4, Zirkon #1),
 * sintering temperature no longer stated as one value, Speed-Sintern intro no longer skips the
 * milling step, Zirkonronden FAQ names the 98,5 mm holder, Händler page removed.
 *
 * `layout` (added 17 Sep after Lena's "it all looks the same"): which of the four term
 * templates the page uses - antwort (answer-first), vergleich (decision table, `compare`),
 * workflow (the four steps first, `workflowStep` opened), indikation (indication grid,
 * `indication` + `indicationDetail`). PageRenderer maps each to a section order; any
 * page can be previewed in another layout with ?layout=<name>.
 */

/** Spec table shared by the disc terms (Scheiben, Ronden, Zirkonronden). Facts: Ivoclar FAQ, 1 Apr 2026. */
const DISC_COMPARE = {
	headline: 'IPS e.max Zirconia auf einen Blick',
	intro: 'Die Kennzahlen der Scheibe, die alle festsitzenden Indikationen abdeckt.',
	columns: ['Merkmal', 'IPS e.max Zirconia'],
	rows: [
		['Material', 'Yttriumstabilisiertes Zirkonoxid: 4Y-PSZ (Dentin) und 5Y-PSZ (Inzisal) in einer Scheibe'],
		['Biegefestigkeit', '1.200 MPa (4Y-PSZ) / 800 MPa (5Y-PSZ)'],
		['Geometrie', '98,5 mm, offen – passt in jede Maschine mit entsprechendem Halter'],
		['Höhen', '12 bis 30 mm'],
		['Aufbau (Intelligent Disc Concept)', 'Inzisalzone 3 mm, Übergangszone 4 mm – konstant über alle Höhen; Dentinanteil variabel 5 bis 23 mm'],
		['Farben', '20 (A–D und BL) mit integriertem Farb- und Transluzenzverlauf (GTx Technologie)'],
		['Indikationen', 'Veneers (ab 0,5 mm), Inlays, Onlays, Kronen, 3- und mehrgliedrige Brücken, Freiend- und Klebebrücken, Hybridversorgungen auf Ti-Basis, All-on-X'],
		['Sintern', '0:58 h (Kronen, 3-gliedrige Brücken), 2:57 h (bis Full-Arch), 9:50 h Standard – Temperatur je nach Programm'],
		['CAD/CAM', 'offen – exocad, 3Shape und andere; optimierte Fräsvorlagen auf der PrograMill-Plattform'],
		['Individualisierung', 'Color & Effect Liquids (16 A–D, 7 Effect), IPS e.max Ceram Art'],
	],
	note: '30-mm-Scheiben in BL1, BL3, A1, A2, A3, A3,5, B1 und B2.',
};

export const TERMS = [
	{
		slug: 'zirkonoxid',
		name: 'Zirkonoxid',
		status: 'confirmed',
		layout: 'antwort',
		sheetRow: 8,
		hero: 'default',
		seoTitle: 'Zirkonoxid für Labor und Praxis | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'IPS e.max Zirconia: ein Premium-Zirkonoxid für alle festsitzenden Indikationen. High-End-Ästhetik, Speed-Sintern, 20 Farben.',
		question: 'Welches Zirkonoxid deckt alle festsitzenden Indikationen ab?',
		answer:
			'IPS e.max Zirconia: eine Scheibe für alle Indikationen – von dünnen Veneers bis zur weitspannigen Restauration.',
		introHeadline: 'Zirkonoxid, das keine Kompromisse verlangt.',
		introBody:
			'Zirkonoxid ist das Arbeitsmaterial der modernen festsitzenden Prothetik. IPS e.max Zirconia vereint 4Y-PSZ und 5Y-PSZ in einer Scheibe und verbindet High-End-Ästhetik mit prozessorientierter Effizienz für Labor und Praxis.',
		whyHeadline: 'Warum IPS e.max Zirconia als Zirkonoxid?',
		benefits: [
			'Eine Scheibe für alle Indikationen – weniger Materialien, mehr Möglichkeiten',
			'GTx Technologie für einen natürlichen Farb- und Transluzenzverlauf',
			'Speed-Sintern ab 0:58 h – mehr Output am selben Tag',
			'Über Branchenstandards hinaus geprüft für Verarbeitungssicherheit',
		],
		faq: [
			{
				q: 'Welche Indikationen deckt IPS e.max Zirconia ab?',
				a: 'Kronen, 3-gliedrige und mehrgliedrige Brücken, Inlays, Onlays, Veneers, Freiend- und Klebebrücken, Hybridversorgungen auf Ti-Basis und All-on-X – alles aus einer Scheibe.',
			},
			{
				q: 'Ist IPS e.max Zirconia ein 4Y- oder ein 5Y-Zirkonoxid?',
				a: 'Beides. Die Scheibe kombiniert yttriumstabilisiertes 4Y-PSZ und 5Y-PSZ, sodass Festigkeit und Transluzenz dort liegen, wo die Restauration sie braucht.',
			},
			{
				q: 'Wie schnell lässt sich IPS e.max Zirconia sintern?',
				a: 'Ab 0:58 h für Einzelkronen und 3-gliedrige Brücken, 2:57 h für Brücken bis Full-Arch – ohne Kompromisse bei der Ästhetik, 9:50 h im Standardprogramm.',
			},
			{
				q: 'Wie wird IPS e.max Zirconia befestigt?',
				a: 'Adhäsiv, selbstadhäsiv oder konventionell. Bei retentiver Präparation konventionell mit ZirCAD Cement; sonst adhäsiv bzw. selbstadhäsiv, z. B. mit Multilink Automix oder SpeedCEM Plus. Zirkonoxid wird nicht geätzt, sondern sandgestrahlt (25–70 µm bei 1 bar oder 70–110 µm bei 1,5 bar) und mit Monobond Plus konditioniert.',
			},
		],
		chatPrompt:
			'Welches Zirkonoxid eignet sich im Dentallabor für alle festsitzenden Indikationen, und was zeichnet IPS e.max Zirconia von Ivoclar aus?',
	},
	{
		slug: 'zirkonoxid-scheiben',
		name: 'Zirkonoxid Scheiben',
		status: 'confirmed',
		layout: 'vergleich',
		compare: DISC_COMPARE,

		sheetRow: 9,
		hero: 'default',
		seoTitle: 'Zirkonoxid Scheiben 12–30 mm | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Zirkonoxidscheiben von 12 bis 30 mm in 20 Farben. Eine Scheibe für alle Indikationen – mit GTx Technologie für natürliche Farbverläufe.',
		question: 'Welche Zirkonoxidscheibe passt zu jedem Fall in meinem Labor?',
		answer:
			'Ein Material, 12–30 mm, 20 Farben: IPS e.max Zirconia reduziert Lagerhaltung und Umrüstzeiten.',
		introHeadline: 'Weniger Scheiben im Regal. Mehr Fälle pro Tag.',
		introBody:
			'Eine Scheibe, die alle Indikationen abdeckt, macht die Materialwahl einfach. Das Höhenportfolio von 12 bis 30 mm in der offenen 98,5-mm-Geometrie und 20 präzise A–D- und BL-Farben decken das gesamte Spektrum festsitzender Restaurationen ab.',
		whyHeadline: 'Warum IPS e.max Zirconia Scheiben?',
		benefits: [
			'Ein Scheibentyp für Kronen, Brücken, Veneers, Inlays, Onlays und All-on-X',
			'Höhen von 12 bis 30 mm – passend zum Fall, nicht zum Lagerbestand',
			'20 A–D- und BL-Farben mit integriertem Farbverlauf (GTx Technologie)',
			'Speed-Sintern ab 0:58 h für Restaurationen bis zur 3-gliedrigen Brücke',
		],
		faq: [
			{
				q: 'In welchen Höhen gibt es IPS e.max Zirconia Scheiben?',
				a: 'Von 12 bis 30 mm.',
			},
			{
				q: 'Brauche ich weiterhin verschiedene Scheibentypen für Front- und Seitenzahn?',
				a: 'Nein. IPS e.max Zirconia kombiniert 4Y-PSZ (1.200 MPa) im Dentinbereich und 5Y-PSZ (800 MPa) im Inzisalbereich in einer Scheibe und deckt beide Bereiche ab.',
			},
			{
				q: 'Wie ist die Scheibe aufgebaut?',
				a: 'Nach dem Intelligent Disc Concept: Inzisalzone 3 mm und Übergangszone 4 mm bleiben über alle Scheibenhöhen konstant, der Dentinanteil variiert von 5 bis 23 mm. Farbe und Transluzenz gehen ohne sichtbare Schichten ineinander über.',
			},
			{
				q: 'Wie kann ich die Scheibe testen?',
				a: 'Über das Neukundenangebot: die erste Scheibe mit 30 % Rabatt, bei Nichtgefallen Geld zurück. Das Formular finden Sie weiter unten auf dieser Seite.',
			},
		],
		chatPrompt:
			'Welche Zirkonoxidscheibe deckt im Dentallabor alle Indikationen mit einem Scheibentyp ab? Was bietet IPS e.max Zirconia von Ivoclar?',
	},
	{
		slug: 'zirkonoxid-ronden',
		name: 'Zirkonoxid Ronden',
		status: 'confirmed',
		layout: 'vergleich',
		compare: DISC_COMPARE,

		sheetRow: 10,
		hero: 'milling',
		seoTitle: 'Zirkonoxid Ronden für CAD/CAM | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Zirkonoxidronden für die CAD/CAM-Fertigung. 4Y/5Y-PSZ, 12–30 mm, 20 Farben – eine Ronde für alle Indikationen.',
		question: 'Welche Zirkonoxid-Ronde deckt das gesamte Indikationsspektrum ab?',
		answer:
			'IPS e.max Zirconia: 4Y/5Y-PSZ, 12–30 mm, 20 Farben – eine Ronde für die komplette digitale Fertigung.',
		introHeadline: 'Eine Ronde. Alle Indikationen.',
		introBody:
			'Ronden aus yttriumstabilisiertem Zirkonoxid sind die Basis der digitalen Fertigung festsitzender Restaurationen. IPS e.max Zirconia deckt mit einer Ronde das gesamte Indikationsspektrum ab – offen für exocad, 3Shape und jede gängige CAD/CAM-Umgebung.',
		whyHeadline: 'Warum IPS e.max Zirconia als Zirkonoxid-Ronde?',
		benefits: [
			'Eine Ronde für alle Indikationen – von Veneers bis Full-Arch',
			'Offenes System: verarbeitbar in exocad, 3Shape und jeder offenen CAD/CAM-Umgebung',
			'Abgestimmte Frässtrategien auf der PrograMill 7 für glatte, reproduzierbare Oberflächen',
			'Validiert unter realen Bedingungen und strengen Worst-Case-Protokollen',
		],
		faq: [
			{
				q: 'Ronde oder Scheibe – gibt es einen Unterschied?',
				a: 'Nein, beides bezeichnet dieselbe Materialscheibe für die CAD/CAM-Fertigung. Ivoclar verwendet auf der Produktseite den Begriff Scheibe.',
			},
			{
				q: 'Kann ich IPS e.max Zirconia auf meiner bestehenden Fräsmaschine verarbeiten?',
				a: 'Ja. Dank der offenen 98,5-mm-Geometrie passt die Ronde in jede Maschine mit einem Halter für diese Geometrie; die Frässtrategien unterscheiden sich nur geringfügig. Auf der PrograMill-Plattform stehen zusätzlich optimierte Fräsvorlagen bereit.',
			},
			{
				q: 'Welche Farben und Höhen sind verfügbar?',
				a: '20 A–D- und BL-Farben in Höhen von 12 bis 30 mm.',
			},
		],
		chatPrompt:
			'Welche Zirkonoxid-Ronde eignet sich im Dentallabor für alle Indikationen im offenen CAD/CAM-Workflow? Was bietet IPS e.max Zirconia von Ivoclar?',
	},
	{
		slug: 'zirkonoxid-kronen',
		name: 'Zirkonoxid Kronen',
		status: 'removed',
		sheetRow: 11,
		removedReason: 'Lena/Carolin 10 Sep: a dental technician does not search this; same topic as Vollkeramik Kronen.',
	},
	{
		slug: 'zirkonoxid-bruecken',
		name: 'Zirkonoxid Brücken',
		status: 'removed',
		sheetRow: 12,
		removedReason: 'Lena/Carolin 10 Sep: "10, 11 it\'s out" - a technician does not search for it either.',
	},
	{
		slug: 'vollkeramik-kronen',
		name: 'Vollkeramik Kronen',
		status: 'removed',
		sheetRow: 13,
		removedReason: 'Lena 10 Sep: patient-facing term ("Keramik Kronen"), not searched by professionals.',
	},
	{
		slug: 'monolithisches-zirkonoxid',
		name: 'Monolithisches Zirkonoxid',
		status: 'confirmed',
		layout: 'vergleich',
		compare: {"headline": "Monolithisch oder verblendet?", "intro": "Was sich im Laboralltag ändert, wenn die Restauration ohne Verblendung aus der Scheibe kommt.", "columns": ["", "Verblendete Restauration", "Monolithisch mit IPS e.max Zirconia"], "rows": [["Arbeitsschritte", "Gerüst fräsen, sintern, schichten, brennen", "Fräsen, sintern, charakterisieren"], ["Chipping-Risiko", "Verblendung kann abplatzen", "keine Verblendung – kein Chipping der Verblendung"], ["Ästhetik", "durch die Schichtung des Technikers", "Farb- und Transluzenzverlauf integriert (GTx Technologie)"], ["Individualisierung", "Keramikschichtung", "Color & Effect Liquids, IPS e.max Ceram Art"], ["Zeit bis zum Finish", "mehrere Brände", "Speed-Sintern ab 0:58 h"]]},
		sheetRow: 14,
		hero: 'esthetics',
		seoTitle: 'Monolithisches Zirkonoxid | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Monolithische Restaurationen aus 4Y/5Y-PSZ mit integriertem Farb- und Transluzenzverlauf – ohne Verblendung.',
		question: 'Wie erreiche ich monolithisch die Ästhetik einer verblendeten Restauration?',
		answer:
			'Der integrierte GTx-Gradient von IPS e.max Zirconia liefert Farb- und Transluzenzverlauf ohne Verblendung – und ohne Chipping-Risiko.',
		introHeadline: 'Monolithisch. Ohne Abstriche bei der Ästhetik.',
		introBody:
			'Monolithische Versorgungen sparen Arbeitsschritte und reduzieren das Chipping-Risiko. Der eingebaute Farb- und Transluzenzverlauf der GTx Technologie liefert die Ästhetik, für die sonst eine Verblendung notwendig wäre.',
		whyHeadline: 'Warum monolithisch mit IPS e.max Zirconia?',
		benefits: [
			'Integrierter Farb- und Transluzenzverlauf (GTx Technologie) – keine Verblendung nötig',
			'Weniger Arbeitsschritte, kein Chipping-Risiko der Verblendung',
			'4Y/5Y-PSZ in einer Scheibe: Festigkeit im Dentin, Transluzenz in der Schneide',
			'Individualisierung mit Color & Effect Liquids und IPS e.max Ceram Art, wenn gewünscht',
		],
		faq: [
			{
				q: 'Sieht eine monolithische Zirkonoxidkrone nicht zu opak aus?',
				a: 'Nicht mit IPS e.max Zirconia: Der Gradient von zervikal nach inzisal ist in die Scheibe eingebaut, sodass die Restauration ohne Schichtung natürlich wirkt.',
			},
			{
				q: 'Kann ich monolithische Arbeiten trotzdem individualisieren?',
				a: 'Ja – mit den Color & Effect Liquids vor dem Sintern und, wenn gewünscht, mit IPS e.max Ceram Art zur Charakterisierung.',
			},
			{
				q: 'Für welche Spannen ist monolithisches IPS e.max Zirconia freigegeben?',
				a: 'Von der Einzelkrone über mehrgliedrige Brücken bis Full-Arch und All-on-X.',
			},
			{
				q: 'Wie bekommt eine monolithische Restauration natürliche Fluoreszenz?',
				a: 'Zirkonoxid fluoresziert von Natur aus nicht. Eine fluoreszierende Glasur wie IPS e.max Ceram Art Magic Glaze FLUO gibt der monolithischen Restauration die natürliche Fluoreszenz.',
			},
			{
				q: 'Worauf kommt es bei Politur und Abrasion an?',
				a: 'Je glatter und runder die Oberfläche, desto geringer der Verschleiß des Antagonisten – polierte monolithische Zirkonoxidkronen gelten hier als unkritisch. Wir empfehlen OptraGloss Extra Oral Polierer; nach dem Einschleifen im Mund immer nachpolieren.',
			},
		],
		chatPrompt:
			'Wie erreiche ich mit monolithischem Zirkonoxid eine natürliche Ästhetik ohne Verblendung? Was leistet die GTx Technologie von IPS e.max Zirconia (Ivoclar)?',
	},
	{
		slug: 'hochtransluzentes-zirkonoxid',
		name: 'Hochtransluzentes Zirkonoxid',
		status: 'confirmed',
		layout: 'vergleich',
		compare: {"headline": "Frontzahn oder Seitenzahn: Was das Material leisten muss", "intro": "Im Frontzahnbereich entscheidet die Transluzenz, im Seitenzahnbereich die Festigkeit. IPS e.max Zirconia deckt beides mit einem Gradienten in einer Scheibe ab.", "columns": ["Anforderung", "Frontzahn", "Seitenzahn", "IPS e.max Zirconia"], "rows": [["Transluzenz", "hoch – Lichtdynamik entscheidet", "mittel", "hochtransluzent inzisal, Gradient bis zervikal"], ["Festigkeit", "ausreichend", "hoch", "4Y-PSZ-Anteil zervikal"], ["Farbverlauf", "entscheidend", "wichtig", "integriert (GTx Technologie), 20 A–D- und BL-Farben"], ["Feinabstimmung", "Schichtung oder Malfarben", "meist keine", "Color & Effect Liquids vor dem Sintern"]]},
		sheetRow: 15,
		hero: 'esthetics',
		seoTitle: 'Hochtransluzentes Zirkonoxid | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Hochtransluzentes Zirkonoxid für den Frontzahnbereich. GTx Technologie für eine natürliche Lichtdynamik.',
		question: 'Welches hochtransluzente Zirkonoxid überzeugt im Frontzahnbereich?',
		answer:
			'IPS e.max Zirconia mit GTx Technologie: natürliche Lichtdynamik von zervikal bis inzisal – in einer Scheibe.',
		introHeadline: 'Transluzenz, wo sie sichtbar ist.',
		introBody:
			'Im Frontzahnbereich entscheidet die Transluzenz darüber, ob eine Restauration auffällt. Das optimierte Gradientenprofil von IPS e.max Zirconia sorgt für eine natürliche Lichtdynamik von zervikal bis inzisal.',
		whyHeadline: 'Warum IPS e.max Zirconia für hochtransluzente Arbeiten?',
		benefits: [
			'Optimiertes Gradientenprofil für natürliche Lichtdynamik im Frontzahnbereich',
			'Hochtransluzent im Inzisalbereich, festigkeitsstark im zervikalen Bereich – aus einer Scheibe',
			'20 präzise A–D- und BL-Farben für zuverlässige Farbgenauigkeit',
			'Feinabstimmung mit Color & Effect Liquids vor dem Sintern',
		],
		faq: [
			{
				q: 'Verliere ich mit hoher Transluzenz Festigkeit?',
				a: 'Nicht bei IPS e.max Zirconia: Der transluzente 5Y-PSZ-Anteil liegt inzisal, der feste 4Y-PSZ-Anteil zervikal – beides in einer Scheibe.',
			},
			{
				q: 'Eignet sich das Material auch für Veneers?',
				a: 'Ja, dünne Veneers gehören zum freigegebenen Indikationsspektrum.',
			},
			{
				q: 'Welche Farben stehen im Frontzahnbereich zur Verfügung?',
				a: 'Alle 20 A–D- und BL-Farben, jeweils mit integriertem Farb- und Transluzenzverlauf.',
			},
			{
				q: 'Welcher Zement bei hochtransluzentem Zirkonoxid?',
				a: 'Adhäsiv oder selbstadhäsiv, z. B. Multilink Automix oder SpeedCEM Plus. Konventionelle Phosphatzemente werden bei hochtransluzenten Zirkonoxiden nicht empfohlen, weil sie die Lichtdurchlässigkeit und damit die Ästhetik beeinträchtigen können.',
			},
		],
		chatPrompt:
			'Welches hochtransluzente Zirkonoxid eignet sich für Frontzahnrestaurationen mit natürlicher Lichtdynamik? Was bietet IPS e.max Zirconia von Ivoclar?',
	},
	{
		slug: '4y-psz-5y-psz-zirkonoxid',
		name: '4Y-PSZ / 5Y-PSZ Zirkonoxid',
		status: 'confirmed',
		layout: 'vergleich',
		compare: {"headline": "4Y-PSZ, 5Y-PSZ – oder beides in einer Scheibe?", "intro": "Die Yttrium-Stabilisierung bestimmt das Verhältnis von Festigkeit zu Transluzenz. So unterscheiden sich die Rohstoffe – und so löst IPS e.max Zirconia die Entscheidung auf.", "columns": ["", "4Y-PSZ", "5Y-PSZ", "IPS e.max Zirconia"], "rows": [["Biegefestigkeit", "1.200 MPa", "800 MPa", "beides: 4Y-PSZ im Dentin, 5Y-PSZ inzisal"], ["Transluzenz", "mittel", "hoch", "5Y-Anteil im inzisalen Bereich"], ["Typische Indikationen", "Brücken, Full-Arch, All-on-X", "Veneers, Frontzahnkronen", "alle festsitzenden Indikationen"], ["Farb- und Transluzenzverlauf", "nur durch Schichtung", "nur durch Schichtung", "integriert (GTx Technologie)"], ["Materialwechsel im Labor", "ja, nach Indikation", "ja, nach Indikation", "nein – eine Scheibe"]]},
		sheetRow: 16,
		hero: 'default',
		seoTitle: '4Y-PSZ und 5Y-PSZ Zirkonoxid | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Yttriumstabilisiertes 4Y-PSZ / 5Y-PSZ Zirkonoxid für alle festsitzenden vollkeramischen Indikationen – in einer Scheibe.',
		question: '4Y-PSZ oder 5Y-PSZ – muss ich mich entscheiden?',
		answer:
			'Nein. IPS e.max Zirconia kombiniert beide Rohstoffe in einer Scheibe: Festigkeit und Transluzenz dort, wo sie gebraucht werden.',
		introHeadline: 'Zwei Rohstoffe. Eine Scheibe.',
		introBody:
			'Die Yttrium-Stabilisierung bestimmt das Verhältnis von Festigkeit zu Transluzenz. IPS e.max Zirconia kombiniert 4Y-PSZ und 5Y-PSZ in einer Scheibe und deckt damit beide Anforderungen ab – ohne Materialwechsel zwischen den Fällen.',
		whyHeadline: 'Warum 4Y/5Y-PSZ in einer Scheibe?',
		benefits: [
			'4Y-PSZ-Festigkeit für Brücken bis Full-Arch und All-on-X',
			'5Y-PSZ-Transluzenz für Veneers und den Frontzahnbereich',
			'Kein Materialwechsel, kein zweiter Scheibentyp im Lager',
			'Über Industriestandards hinaus in Worst-Case-Protokollen geprüft',
		],
		faq: [
			{
				q: 'Was bedeutet 4Y-PSZ und 5Y-PSZ?',
				a: 'PSZ steht für Partially Stabilized Zirconia: yttriumstabilisiertes Zirkonoxid, in dem tetragonale und kubische Kristalle in unterschiedlichem Verhältnis vorliegen. Die Zahl steht für den Yttriumoxid-Anteil – mehr Yttrium bedeutet mehr Transluzenz (5Y-PSZ, 800 MPa), weniger Yttrium mehr Festigkeit (4Y-PSZ, 1.200 MPa).',
			},
			{
				q: 'Wo liegt in der Scheibe welcher Rohstoff?',
				a: 'Der Gradient verläuft von festigkeitsstark im zervikalen Bereich zu hochtransluzent im inzisalen Bereich – abgestimmt auf die Restauration.',
			},
		],
		chatPrompt:
			'Was ist der Unterschied zwischen 4Y-PSZ und 5Y-PSZ Zirkonoxid, und welches Material kombiniert beides in einer Scheibe? Was bietet IPS e.max Zirconia von Ivoclar?',
	},
	{
		slug: 'zirkonoxid-fraesen',
		name: 'Zirkonoxid Fräsen',
		status: 'confirmed',
		layout: 'workflow',
		workflowStep: 1,
		sheetRow: 17,
		hero: 'milling',
		seoTitle: 'Zirkonoxid fräsen mit PrograMill 7 | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Zirkonoxid präzise fräsen: dedizierte Frässtrategien und ein Nullpunkt-Spannsystem für reproduzierbare Ergebnisse.',
		question: 'Wie fräse ich Zirkonoxid mit weniger Nacharbeit?',
		answer:
			'IPS e.max Zirconia auf der PrograMill 7: dedizierte Frässtrategien und Nullpunkt-Spannsystem für reproduzierbar glatte Oberflächen.',
		introHeadline: 'Randqualität entsteht beim Fräsen.',
		introBody:
			'Das Fräsergebnis entscheidet über Randqualität und Nacharbeit. PrograMill 7 fräst IPS e.max Zirconia mit abgestimmten Strategien und einem Nullpunkt-Spannsystem für glatte, reproduzierbare Oberflächen – Material und Maschine aus einer Hand.',
		whyHeadline: 'Warum IPS e.max Zirconia und PrograMill 7?',
		benefits: [
			'Dedizierte PrograMill-Frässtrategien, abgestimmt auf IPS e.max Zirconia',
			'Nullpunkt-Spannsystem für reproduzierbare Ergebnisse mit minimaler Nacharbeit',
			'Offen für exocad, 3Shape und andere CAD/CAM-Systeme',
			'Ein Partner für Material, Maschine und Support',
		],
		faq: [
			{
				q: 'Brauche ich eine PrograMill 7, um IPS e.max Zirconia zu fräsen?',
				a: 'Nein. Die Scheibe ist in offenen CAD/CAM-Systemen verarbeitbar. Die PrograMill 7 bietet zusätzlich dedizierte Frässtrategien für das Material.',
			},
			{
				q: 'Nass oder trocken fräsen?',
				a: 'IPS e.max Zirconia ist für das Trockenfräsen entwickelt.',
			},
			{
				q: 'Wie lege ich die Scheibe in die Maschine ein?',
				a: 'Die bedruckte Seite entspricht der inzisalen/okklusalen Ebene der Restauration und zeigt im Scheibenhalter nach oben.',
			},
			{
				q: 'Wie geht es nach dem Fräsen weiter?',
				a: 'Optional Color & Effect Liquids auftragen, dann sintern – ab 0:58 h für Kronen und 3-gliedrige Brücken – und mit IPS e.max Ceram Art charakterisieren.',
			},
		],
		chatPrompt:
			'Wie fräse ich Zirkonoxid im Dentallabor mit wenig Nacharbeit? Welche Frässtrategien bietet Ivoclar für IPS e.max Zirconia auf der PrograMill 7?',
	},
	{
		slug: 'cadcam-zirkonoxid',
		name: 'CAD/CAM Zirkonoxid',
		status: 'confirmed',
		layout: 'workflow',
		workflowStep: 1,
		sheetRow: 18,
		hero: 'workflow',
		seoTitle: 'CAD/CAM Zirkonoxid | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Zirkonoxid im durchgängigen CAD/CAM-Workflow – von der Materialauswahl bis zur Charakterisierung.',
		question: 'Welches Zirkonoxid fügt sich nahtlos in meinen CAD/CAM-Workflow ein?',
		answer:
			'IPS e.max Zirconia: Material, Fräsen, Sintern und Charakterisierung greifen in einem durchgängigen digitalen Workflow ineinander.',
		introHeadline: 'Ein Workflow. Vom Design bis zur Restauration.',
		introBody:
			'Ein digitaler Workflow ist nur so gut wie das Zusammenspiel seiner Schritte. Material, Fräsmaschine, Sinterprogramm und Charakterisierung greifen bei IPS e.max Zirconia und PrograMill 7 ineinander – vom Design bis zur fertigen Restauration.',
		whyHeadline: 'Warum IPS e.max Zirconia im CAD/CAM-Workflow?',
		benefits: [
			'Offenes System: Designdaten aus exocad, 3Shape und jedem offenen CAD/CAM-System',
			'Abgestimmte Frässtrategien und Sinterprogramme – kein Ausprobieren',
			'Speed-Sintern ab 0:58 h für Versorgungen am selben Tag',
			'Charakterisierung mit Color & Effect Liquids und IPS e.max Ceram Art',
		],
		faq: [
			{
				q: 'Mit welchen CAD/CAM-Systemen ist IPS e.max Zirconia kompatibel?',
				a: 'Mit allen offenen Systemen – zum Beispiel exocad und 3Shape. Die offene 98,5-mm-Geometrie passt in jede Fräsmaschine mit einem Halter für diese Geometrie.',
			},
			{
				q: 'Muss ich für jede Indikation ein anderes Material einplanen?',
				a: 'Nein. Eine Scheibe deckt Veneers, Kronen, Brücken, Inlays, Onlays und All-on-X ab.',
			},
			{
				q: 'Wie lange dauert der Workflow von der Ronde bis zur fertigen Krone?',
				a: 'Nach dem Fräsen sintert IPS e.max Zirconia ab 0:58 h; die Charakterisierung folgt direkt danach – Same-Day-Versorgungen sind realistisch.',
			},
		],
		chatPrompt:
			'Welches Zirkonoxid passt in einen offenen CAD/CAM-Workflow im Dentallabor (exocad, 3Shape)? Wie sieht der digitale Workflow mit IPS e.max Zirconia und PrograMill 7 von Ivoclar aus?',
	},
	{
		slug: 'zirkonoxid-sintern',
		name: 'Zirkonoxid Sintern',
		status: 'open',
		layout: 'workflow',
		workflowStep: 2,
		sheetRow: 19,
		openNote: 'Lena 10 Sep: workflow term, would normally point at PrograMill/furnace. Kept because a sintering search still lands on Zirconia. Marked to think about.',
		hero: 'workflow',
		seoTitle: 'Zirkonoxid sintern | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Sinterprogramme für IPS e.max Zirconia – von 0:58 h bis zur 3-gliedrigen Brücke bis 2:57 h für Full-Arch.',
		question: 'Wie sintere ich Zirkonoxid schnell – ohne Verlust bei Passung und Farbe?',
		answer:
			'Abgestimmte Sinterprogramme für IPS e.max Zirconia: 0:58 h bis zur 3-gliedrigen Brücke, 2:57 h bis Full-Arch.',
		introHeadline: 'Sintern gibt der Restauration ihre Festigkeit.',
		introBody:
			'Das Sintern gibt der gefrästen Restauration Festigkeit, Farbe und Passung. Abgestimmte Programme halten Ergebnis und Ästhetik reproduzierbar – auch bei kurzen Zyklen.',
		whyHeadline: 'Warum IPS e.max Zirconia beim Sintern?',
		benefits: [
			'Sinterprogramme ab 0:58 h für Restaurationen bis zur 3-gliedrigen Brücke',
			'2:57 h bis Full-Arch – planbar im Tagesablauf des Labors',
			'Reproduzierbare Farbe und Passung, auch im Speed-Zyklus',
		],
		faq: [
			{
				q: 'Welche Sinterprogramme gelten für IPS e.max Zirconia?',
				a: '0:58 h für Einzelkronen und 3-gliedrige Brücken, 2:57 h für Brücken bis Full-Arch, 9:50 h im Standardprogramm. Die Sintertemperatur hängt vom jeweiligen Programm ab – alle Parameter stehen in der Gebrauchsinformation.',
			},
			{
				q: 'Kann ich in einem Fremdofen sintern?',
				a: 'Ja. Die Gebrauchsinformation führt alle Sinterprogramme auf, die in jeder Fremdsinteranlage verwendet werden können. Weil die Leistung des Ofens das Ergebnis beeinflusst, empfehlen wir eine regelmäßige Kalibrierung; für einige getestete Fremdöfen stellt Ivoclar Protokolle auf Anfrage bereit.',
			},
			{
				q: 'Was passiert, wenn die Sintertemperatur abweicht?',
				a: 'Zu niedrig sintert opaker mit höherem Chroma, zu hoch blasser mit weniger Chroma. Stimmt die Farbe trotz korrekter Temperatur nicht, fehlt meist der Atmosphärenaustausch – etwa in einer geschlossenen Sinterwanne.',
			},
			{
				q: 'Wann trage ich die Color & Effect Liquids auf?',
				a: 'Vor dem Sintern, per Pinselinfiltration.',
			},
		],
		chatPrompt:
			'Wie sintere ich Zirkonoxid im Dentallabor schnell und ohne Verlust bei Passung und Farbe? Welche Sinterzeiten gelten für IPS e.max Zirconia von Ivoclar?',
	},
	{
		slug: 'speed-sintern-zirkonoxid',
		name: 'Speed-Sintern Zirkonoxid',
		status: 'open',
		layout: 'workflow',
		workflowStep: 2,
		sheetRow: 20,
		openNote: 'Lena 10 Sep: same as Zirkonoxid Sintern - marked to think about together with row 19.',
		hero: 'workflow',
		seoTitle: 'Speed-Sintern Zirkonoxid | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Ultraschnelles Speed-Sintern: ab 0:58 h bis zur 3-gliedrigen Brücke, 2:57 h bis Full-Arch – ohne Kompromisse bei der Ästhetik.',
		question: 'Ist Speed-Sintern bei Zirkonoxid ohne ästhetische Kompromisse möglich?',
		answer: 'Ja. IPS e.max Zirconia sintert ab 0:58 h – mit gleichbleibender Ästhetik und Festigkeit.',
		introHeadline: 'Nach dem Fräsen: gesintert in unter einer Stunde.',
		introBody:
			'Nach dem Fräsen sintert IPS e.max Zirconia im Speed-Programm ab 0:58 h. Das macht Versorgungen am selben Tag realistisch – bei gleichbleibender Ästhetik und Festigkeit.',
		whyHeadline: 'Warum Speed-Sintern mit IPS e.max Zirconia?',
		benefits: [
			'Ab 0:58 h für Restaurationen bis zur 3-gliedrigen Brücke',
			'2:57 h bis Full-Arch und All-on-X',
			'Same-Day-Versorgungen ohne Kompromisse bei der GTx-Ästhetik',
			'Mehr Output pro Ofen und Tag – weniger Nacharbeiten',
		],
		faq: [
			{
				q: 'Für welche Restaurationen ist das Speed-Programm freigegeben?',
				a: 'Einzelkronen und 3-gliedrige Brücken sintern in 0:58 h, Brücken bis Full-Arch in 2:57 h; das Standardprogramm dauert 9:50 h.',
			},
			{
				q: 'Wird das Material durch Speed-Sintern opaker?',
				a: 'Nein. Beim Speed-Sintern zeigt IPS e.max Zirconia keinen negativen Einfluss auf Farbgenauigkeit, Transluzenz oder Materialsicherheit – bestätigt in Kaubelastungssimulationen und von internationalen Dentalexperten.',
			},
			{
				q: 'Wie viele Einheiten passen in ein 0:58-h-Programm?',
				a: 'Bis zu 10 Einheiten gleichzeitig in einem Programat S2 – die Speed-Programme wurden auf diesem Ofen entwickelt und nach höchsten Industriestandards geprüft.',
			},
		],
		chatPrompt:
			'Ist Speed-Sintern von Zirkonoxid ohne ästhetische Kompromisse möglich? Wie schnell sintert IPS e.max Zirconia von Ivoclar?',
	},
	{
		slug: 'zirkonoxid-veneers',
		name: 'Zirkonoxid Veneers',
		status: 'confirmed',
		layout: 'indikation',
		indication: 'veneers',
		indicationDetail: {"headline": "Veneers aus Zirkonoxid – freigegeben, in derselben Scheibe.", "intro": "Dünne Veneers verlangen Transluzenz bei minimaler Schichtstärke. IPS e.max Zirconia deckt sie mit dem 5Y-PSZ-Anteil der Scheibe ab – und die Brücke daneben mit dem 4Y-Anteil.", "specs": [{"label": "Indikation", "value": "Veneers ab 0,5 mm"}, {"label": "Transluzenz", "value": "hoch (5Y-PSZ inzisal)"}, {"label": "Befestigung", "value": "Variolink Esthetic LC / DC"}, {"label": "Sintern", "value": "ab 0:58 h"}]},
		sheetRow: 21,
		hero: 'esthetics',
		seoTitle: 'Zirkonoxid Veneers | IPS e.max Zirconia | Ivoclar',
		seoDescription: 'Dünne Veneers aus Zirkonoxid mit hoher Transluzenz und zuverlässiger Farbgenauigkeit.',
		question: 'Kann ich dünne Veneers aus Zirkonoxid fertigen – mit natürlicher Transluzenz?',
		answer:
			'Ja. IPS e.max Zirconia deckt dünne Veneers mit hoher Transluzenz und zuverlässiger Farbgenauigkeit ab – aus derselben Scheibe wie Ihre Brücken.',
		introHeadline: 'Veneers verlangen Transluzenz bei minimaler Schichtstärke.',
		introBody:
			'Veneers aus Zirkonoxid sind ein junges Indikationsfeld. IPS e.max Zirconia bringt die Transluzenz des 5Y-PSZ-Anteils dorthin, wo sie gebraucht wird – und deckt dünne Veneers und weitspannige Restaurationen mit derselben Scheibe ab.',
		whyHeadline: 'Warum IPS e.max Zirconia für Veneers?',
		benefits: [
			'Hohe Transluzenz im Inzisalbereich für naturgetreue Veneers',
			'Zuverlässige Farbgenauigkeit über 20 A–D- und BL-Farben',
			'Dünne Veneers und weitspannige Restaurationen aus einer Scheibe',
			'Feinabstimmung mit Color & Effect Liquids und IPS e.max Ceram Art',
		],
		faq: [
			{
				q: 'Sind Veneers aus Zirkonoxid überhaupt freigegeben?',
				a: 'Ja. IPS e.max Zirconia ist für Veneers ab einer Materialstärke von 0,5 mm freigegeben.',
			},
			{
				q: 'Wie befestige ich ein Zirkonoxid-Veneer?',
				a: 'Bis 1,5 mm Materialstärke mit Variolink Esthetic LC, bei größeren Wandstärken mit Variolink Esthetic DC – das Befestigungsprotokoll steht in der jeweiligen Gebrauchsinformation.',
			},
			{
				q: 'Wie erreiche ich bei einem Veneer die passende Farbe?',
				a: 'Über die 20 A–D- und BL-Farben mit integriertem Verlauf, bei Bedarf feinabgestimmt mit Color & Effect Liquids.',
			},
			{
				q: 'Womit charakterisiere ich die Oberfläche?',
				a: 'Mit IPS e.max Ceram Art – dem Charakterisierungssystem der IPS e.max Familie.',
			},
		],
		chatPrompt:
			'Kann man dünne Veneers aus Zirkonoxid herstellen, und welches Material eignet sich dafür? Was bietet IPS e.max Zirconia von Ivoclar für Veneers?',
	},
	{
		slug: 'zirkonoxid-inlays-onlays',
		name: 'Zirkonoxid Inlays & Onlays',
		status: 'confirmed',
		layout: 'indikation',
		indication: 'inlays-onlays',
		indicationDetail: {"headline": "Inlays und Onlays aus Zirkonoxid – ohne Materialwechsel.", "intro": "Neben Kronen und Brücken deckt IPS e.max Zirconia Inlays, Onlays sowie Freiend- und Klebebrücken ab. Ein Material für den gesamten Fall.", "specs": [{"label": "Indikation", "value": "Inlays, Onlays"}, {"label": "Verblendung", "value": "keine – monolithisch"}, {"label": "Farben", "value": "20 A–D / BL"}, {"label": "Sintern", "value": "ab 0:58 h"}]},
		sheetRow: 22,
		hero: 'default',
		seoTitle: 'Zirkonoxid Inlays und Onlays | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Inlays, Onlays, Freiend- und Klebebrücken aus einer Scheibe – das volle Indikationsspektrum von IPS e.max Zirconia.',
		question: 'Eignet sich Zirkonoxid auch für Inlays und Onlays?',
		answer:
			'IPS e.max Zirconia ist für Inlays, Onlays, Freiend- und Klebebrücken freigegeben – das volle Indikationsspektrum aus einer Scheibe.',
		introHeadline: 'Mehr als Kronen und Brücken.',
		introBody:
			'Neben Kronen und Brücken deckt IPS e.max Zirconia Inlays, Onlays, Freiend- und Klebebrücken sowie Hybridversorgungen auf Ti-Basis ab. Ein Material für den gesamten Fall – ohne Wechsel zwischen den Indikationen.',
		whyHeadline: 'Warum IPS e.max Zirconia für Inlays und Onlays?',
		benefits: [
			'Freigegeben für Inlays, Onlays, Freiend- und Klebebrücken',
			'Monolithisch: keine Verblendung, kein Chipping-Risiko',
			'Farb- und Transluzenzverlauf für unauffällige Seitenzahnversorgungen',
			'Speed-Sintern ab 0:58 h – kleine Arbeiten am selben Tag',
		],
		faq: [
			{
				q: 'Welche Indikationen neben Kronen und Brücken deckt IPS e.max Zirconia ab?',
				a: 'Inlays, Onlays und Veneers, Cantilever-Brücken mit einem Pontic, Adhäsiv-/Maryland-Brücken mit einem Flügel, Hybridstrukturen wie verschraubte Kronen auf Ti-Base und All-on-X. Mehrgliedrige Brücken sind mit bis zu 2 verbundenen Pontics freigegeben, im Frontzahnbereich mit bis zu 4.',
			},
			{
				q: 'Brauche ich für Inlays ein anderes Zirkonoxid als für Brücken?',
				a: 'Nein, beides kommt aus derselben Scheibe.',
			},
			{
				q: 'Wie lange dauert das Sintern eines Inlays?',
				a: 'Ab 0:58 h im Speed-Programm.',
			},
		],
		chatPrompt:
			'Eignet sich Zirkonoxid für Inlays und Onlays, und welches Material ist dafür freigegeben? Was bietet IPS e.max Zirconia von Ivoclar?',
	},
	{
		slug: 'zirkonoxid-farben',
		name: 'Zirkonoxid Farben',
		status: 'confirmed',
		layout: 'vergleich',
		compare: {"headline": "Das Farbportfolio von IPS e.max Zirconia", "intro": "20 Farben, jede mit dem integrierten Farb- und Transluzenzverlauf – und die Liquids für die Feinabstimmung.", "columns": ["", "IPS e.max Zirconia"], "rows": [["Scheibenfarben", "20 – alle 16 A–D-Farben und die BL-Farben"], ["Farbverlauf", "integriert von zervikal nach inzisal (GTx Technologie)"], ["Höhen", "12 bis 30 mm"], ["30-mm-Scheibe", "BL1, BL3, A1, A2, A3, A3,5, B1, B2"], ["Color Liquids", "16 A–D-Farben, gebrauchsfertig mit Farbindikator"], ["Effect Liquids", "7: Snow, Sunset, Berry, Hazel, Sky, Storm, Opaque"], ["Charakterisierung", "IPS e.max Ceram Art"]]},
		sheetRow: 23,
		hero: 'liquids',
		seoTitle: 'Zirkonoxid Farben – 20 A–D und BL Farben | Ivoclar',
		seoDescription:
			'20 präzise A–D- und BL-Farben mit integriertem Farb- und Transluzenzverlauf durch die GTx Technologie.',
		question: 'Welche Zirkonoxid-Farben brauche ich für das gesamte klinische Spektrum?',
		answer:
			'20 präzise A–D- und BL-Farben mit integriertem Farb- und Transluzenzverlauf – IPS e.max Zirconia deckt es ab.',
		introHeadline: 'Ein vollständiges Farbportfolio. Keine Kompromisse.',
		introBody:
			'Ein vollständiges Farbportfolio erspart Kompromisse bei der Farbauswahl. 20 präzise A–D- und BL-Farben decken das gesamte klinisch relevante Spektrum ab – jede mit dem integrierten Farbverlauf der GTx Technologie.',
		whyHeadline: 'Warum die Farben von IPS e.max Zirconia?',
		benefits: [
			'20 präzise A–D- und BL-Farben in jeder Scheibenhöhe',
			'Integrierter Farb- und Transluzenzverlauf (GTx Technologie)',
			'Zuverlässige Farbgenauigkeit vom Modell zum Mund',
			'Individualisierung mit 16 Color Liquids und 7 Effect Liquids',
		],
		faq: [
			{
				q: 'Welche Farben gibt es?',
				a: 'Alle 16 A–D-Farben sowie die BL-Farben – insgesamt 20 präzise Farben.',
			},
			{
				q: 'Gibt es alle Farben in jeder Höhe?',
				a: 'Ja – mit Ausnahme der 30-mm-Scheibe. Diese gibt es nur in den folgenden Farben: BL1, BL3, A1, A2, A3, A3,5, B1 und B2.',
			},
			{
				q: 'Wie passe ich eine Farbe individuell an?',
				a: 'Mit den IPS e.max Zirconia Color & Effect Liquids per Pinselinfiltration vor dem Sintern.',
			},
		],
		chatPrompt:
			'Welche Zirkonoxid-Farben decken das gesamte klinische Spektrum ab? Welche Farben bietet IPS e.max Zirconia von Ivoclar?',
	},
	{
		slug: 'zirkonoxid-malfarben',
		name: 'Zirkonoxid Malfarben',
		status: 'confirmed',
		layout: 'workflow',
		workflowStep: 3,
		sheetRow: 24,
		hero: 'liquids',
		seoTitle: 'Zirkonoxid Malfarben und Color Liquids | Ivoclar',
		seoDescription:
			'IPS e.max Zirconia Color & Effect Liquids: 16 A–D Farben und 7 Effect Liquids, gebrauchsfertig mit Farbindikator.',
		question: 'Wie individualisiere ich Zirkonoxid vor dem Sintern?',
		answer:
			'IPS e.max Zirconia Color & Effect Liquids: 16 A–D-Farben und 7 Effect Liquids, gebrauchsfertig mit Farbindikator.',
		introHeadline: 'Kontrolle über Farbe und Effekt – vor dem Sintern.',
		introBody:
			'Die Pinselinfiltration gibt Technikern die Kontrolle über Farbe und Effekt vor dem Sintern. Das Opaque Liquid maskiert Ti-Bases von innen und bewahrt die Lichtdynamik nach außen.',
		whyHeadline: 'Warum Color & Effect Liquids?',
		benefits: [
			'Alle 16 A–D-Farben für die Pinselinfiltration',
			'7 Effect Liquids: Snow, Sunset, Berry, Hazel, Sky, Storm und Opaque',
			'Opaque Liquid maskiert Ti-Bases von innen',
			'Gebrauchsfertig mit integriertem Farbindikator',
		],
		faq: [
			{
				q: 'Sind die Liquids gebrauchsfertig?',
				a: 'Ja, mit integriertem Farbindikator – Sie sehen beim Auftragen, wo bereits infiltriert wurde.',
			},
			{
				q: 'Wofür ist das Opaque Liquid?',
				a: 'Es maskiert Ti-Bases bei Hybridversorgungen von innen, ohne die Lichtdynamik nach außen zu beeinträchtigen.',
			},
			{
				q: 'Wie kombiniere ich die Liquids mit IPS e.max Ceram Art?',
				a: 'Liquids vor dem Sintern für Farbe und Effekt, Ceram Art nach dem Sintern für die Charakterisierung der Oberfläche. Ceram Art braucht kein Sandstrahlen der Zirkonoxidoberfläche – nur eine saubere, fettfreie, dampfgereinigte Restauration; ein ZirLiner ist nicht nötig.',
			},
			{
				q: 'Lohnt sich das Vorpolieren der labialen Flächen vor dem Malen und Glasieren?',
				a: 'Ja – es erhöht Transluzenz und Farbintensität.',
			},
		],
		chatPrompt:
			'Wie individualisiere ich Zirkonoxid vor dem Sintern? Was sind die IPS e.max Zirconia Color & Effect Liquids von Ivoclar?',
	},
	{
		slug: 'zirkonoxid-verblendkeramik',
		name: 'Zirkonoxid Verblendkeramik',
		status: 'removed',
		sheetRow: 25,
		removedReason: 'Lena 10 Sep: "that would be Ceram, but not Ceram Art - skip that".',
	},
	{
		slug: 'zirkonoxid-implantatprothetik',
		name: 'Zirkonoxid Implantatprothetik',
		status: 'confirmed',
		layout: 'indikation',
		indication: 'hybrid',
		indicationDetail: {"headline": "Implantatgetragen: Hybridversorgungen auf Ti-Basis und All-on-X.", "intro": "Lange Spannen verlangen Festigkeit und Passung. IPS e.max Zirconia ist für Hybridversorgungen verschraubt auf Ti-Basis und für All-on-X freigegeben.", "specs": [{"label": "Indikation", "value": "Ti-Basis, All-on-X"}, {"label": "Festigkeit", "value": "4Y-PSZ zervikal"}, {"label": "Ti-Basis", "value": "Opaque Liquid"}, {"label": "Full-Arch", "value": "2:57 h"}]},
		sheetRow: 26,
		hero: 'default',
		seoTitle: 'Zirkonoxid Implantatprothetik und All-on-X | Ivoclar',
		seoDescription:
			'Hybridversorgungen verschraubt auf Ti-Basis und All-on-X aus IPS e.max Zirconia – validiert unter realen Bedingungen.',
		question: 'Welches Zirkonoxid ist für Hybridversorgungen auf Ti-Basis und All-on-X freigegeben?',
		answer:
			'IPS e.max Zirconia – validiert unter realen Bedingungen für implantatgetragene Versorgungen bis All-on-X.',
		introHeadline: 'Festigkeit und Passung über lange Spannen.',
		introBody:
			'Implantatgetragene Versorgungen verlangen Festigkeit und Passung über lange Spannen. IPS e.max Zirconia ist für Hybridversorgungen verschraubt auf Ti-Basis und All-on-X freigegeben und wurde in strengen Worst-Case-Protokollen geprüft.',
		whyHeadline: 'Warum IPS e.max Zirconia in der Implantatprothetik?',
		benefits: [
			'Freigegeben für Hybridversorgungen auf Ti-Basis und All-on-X',
			'4Y-PSZ-Festigkeit für weitspannige, implantatgetragene Restaurationen',
			'Opaque Liquid maskiert Ti-Bases, ohne die Lichtdynamik zu verlieren',
			'Full-Arch in 2:57 h gesintert',
		],
		faq: [
			{
				q: 'Ist IPS e.max Zirconia für All-on-X freigegeben?',
				a: 'Ja – ebenso wie für Hybridversorgungen, die auf Ti-Basis verschraubt werden. Voraussetzung ist ein zertifiziertes Abutment, also eine Ti-Base oder ein Multi-Unit-Abutment.',
			},
			{
				q: 'Wie verhindere ich, dass die Ti-Basis durchscheint?',
				a: 'Mit dem Opaque Liquid aus den Color & Effect Liquids: Es maskiert von innen und erhält die Lichtdynamik außen.',
			},
			{
				q: 'Wie lange sintert eine Full-Arch-Versorgung?',
				a: '2:57 h im Speedprogramm – ohne Abstriche bei der Ästhetik.',
			},
		],
		chatPrompt:
			'Welches Zirkonoxid ist für implantatgetragene Hybridversorgungen auf Ti-Basis und All-on-X freigegeben? Was bietet IPS e.max Zirconia von Ivoclar?',
	},
	{
		slug: 'digitaler-workflow-zahntechnik',
		name: 'Digitaler Workflow Zahntechnik',
		status: 'confirmed',
		layout: 'workflow',
		workflowStep: 0,
		sheetRow: 27,
		hero: 'workflow',
		seoTitle: 'Digitaler Workflow in der Zahntechnik | Ivoclar',
		seoDescription:
			'Materialauswahl, Fräsen, Sintern, Charakterisieren – der durchgängige digitale Workflow von Ivoclar.',
		question: 'Wie sieht ein durchgängiger digitaler Workflow in der Zahntechnik aus?',
		answer:
			'Materialauswahl, Fräsen, Sintern, Charakterisieren – vier Schritte, ein Partner: der digitale Workflow von Ivoclar.',
		introHeadline: 'Vier Schritte. Ein Partner.',
		introBody:
			'Vier Schritte führen vom Design zur fertigen Restauration: Materialauswahl mit IPS e.max Zirconia, Fräsen auf der PrograMill 7, Speed-Sintern im Programat S2 und Charakterisierung mit Color & Effect Liquids und IPS e.max Ceram Art.',
		whyHeadline: 'Warum der digitale Workflow von Ivoclar?',
		benefits: [
			'Material und Maschine aufeinander abgestimmt – keine Schnittstellenprobleme',
			'Offenes System für exocad, 3Shape und andere CAD/CAM-Systeme',
			'Speed-Sintern und Automatisierung für mehr Output',
			'Ein Partner für Material, Ausstattung und Support',
		],
		faq: [
			{
				q: 'Aus welchen Schritten besteht der digitale Workflow?',
				a: 'Materialauswahl, Fräsen, Sintern und Charakterisieren & finalisieren – die vier Schritte finden Sie weiter unten auf dieser Seite.',
			},
			{
				q: 'Kann ich meine bestehende CAD-Software weiter nutzen?',
				a: 'Ja. Der Workflow ist offen für exocad, 3Shape und andere Systeme.',
			},
			{
				q: 'Wie schnell ist eine Krone fertig?',
				a: 'Nach dem Fräsen sintert IPS e.max Zirconia ab 0:58 h – Same-Day-Versorgungen sind realistisch.',
			},
		],
		chatPrompt:
			'Wie sieht ein durchgängiger digitaler Workflow in der Zahntechnik aus – von der Materialauswahl über Fräsen und Sintern bis zur Charakterisierung? Was bietet Ivoclar mit IPS e.max Zirconia und PrograMill 7?',
	},
	// ---- Added on the 10 Sep call: the "easy" high-volume terms Lena asked for ----
	{
		slug: 'zirkon',
		name: 'Zirkon',
		status: 'confirmed',
		layout: 'antwort',
		sheetRow: 28,
		hero: 'default',
		seoTitle: 'Zirkon für die Zahntechnik | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Zirkon, Zirkonoxid, Zirconia: IPS e.max Zirconia ist das Premium-Zirkonoxid für alle festsitzenden Indikationen – in einer Scheibe.',
		question: 'Zirkon für die Zahntechnik – welches Material ist die richtige Wahl?',
		answer: 'IPS e.max Zirconia: Premium-Zirkonoxid für alle festsitzenden Indikationen, in einer Scheibe.',
		introHeadline: 'IPS e.max Zirconia – ein Material, das alles kann.',
		introBody:
			'IPS e.max Zirconia ist ein yttriumstabilisiertes Zirkoniumdioxid, das die festsitzende Prothetik prägt. IPS e.max Zirconia vereint 4Y-PSZ und 5Y-PSZ in einer Scheibe – für Veneers, Kronen, Brücken und All-on-X.',
		whyHeadline: 'Warum IPS e.max Zirconia?',
		benefits: [
			'Eine Scheibe für alle Indikationen – von Veneers bis All-on-X',
			'Natürlicher Farb- und Transluzenzverlauf durch die GTx Technologie',
			'Speed-Sintern ab 0:58 h für Versorgungen am selben Tag',
			'Mit Zahntechnikern entwickelt, über Branchenstandards hinaus geprüft',
		],
		faq: [
			{
				q: 'Welche Indikationen deckt IPS e.max Zirconia ab?',
				a: 'Veneers, Inlays, Onlays, Kronen, Brücken, Freiend- und Klebebrücken, Hybridversorgungen auf Ti-Basis und All-on-X.',
			},
			{
				q: 'Wie kann ich das Material testen?',
				a: 'Mit dem Neukundenangebot: erste Scheibe mit 30 % Rabatt, bei Nichtgefallen Geld zurück.',
			},
		],
		chatPrompt: 'Welches Zirkon eignet sich in der Zahntechnik für alle festsitzenden Indikationen? Was bietet IPS e.max Zirconia von Ivoclar?',
	},
	{
		slug: 'zirkonronden',
		name: 'Zirkonronden',
		status: 'confirmed',
		layout: 'vergleich',
		compare: DISC_COMPARE,

		sheetRow: 30,
		hero: 'milling',
		seoTitle: 'Zirkonronden für das Dentallabor | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Zirkonronden aus 4Y/5Y-PSZ, 12–30 mm, 20 Farben – eine Ronde für alle Indikationen im CAD/CAM-Workflow.',
		question: 'Welche Zirkonronde deckt alle Fälle in meinem Labor ab?',
		answer: 'IPS e.max Zirconia: 4Y/5Y-PSZ in einer Ronde, 12–30 mm, 20 Farben.',
		introHeadline: 'Eine Zirkonronde statt vieler.',
		introBody:
			'Wer für Front- und Seitenzahn unterschiedliche Ronden bevorratet, wechselt ständig Material. IPS e.max Zirconia bringt Festigkeit und Transluzenz in eine Ronde – für jede Indikation, in jeder gängigen CAD/CAM-Umgebung.',
		whyHeadline: 'Warum IPS e.max Zirconia als Zirkonronde?',
		benefits: [
			'Eine Ronde für alle Indikationen – weniger Lagerhaltung',
			'Höhen von 12 bis 30 mm, 20 A–D- und BL-Farben',
			'Offen für exocad, 3Shape und jede offene Fräsmaschine',
			'Speed-Sintern ab 0:58 h',
		],
		faq: [
			{
				q: 'Passt die Ronde in meine Fräsmaschine?',
				a: 'IPS e.max Zirconia ist eine Ronde für offene CAD/CAM-Systeme – auf der PrograMill 7 mit dedizierten Frässtrategien. Voraussetzung ist, dass der Halter Ihrer Maschine eine Scheibe mit 98,5 mm Durchmesser aufnehmen kann.',
			},
			{
				q: 'Welche Höhe brauche ich?',
				a: 'Die Ronde gibt es von 12 bis 30 mm – wählen Sie nach Fall, nicht nach Lagerbestand.',
			},
			{
				q: 'Wie teste ich die Ronde?',
				a: 'Über das Neukundenangebot mit 30 % Rabatt auf die erste Scheibe – Formular weiter unten.',
			},
		],
		chatPrompt: 'Welche Zirkonronde eignet sich im Dentallabor für alle Indikationen? Was bietet IPS e.max Zirconia von Ivoclar?',
	},
	{
		slug: 'zirkon-zahntechnik',
		name: 'Zirkon Zahntechnik',
		status: 'confirmed',
		layout: 'antwort',
		geo: true,
		sheetRow: 31,
		hero: 'workflow',
		seoTitle: 'Zirkon in der Zahntechnik | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Ein Material, kürzere Sinterzeiten, alle Indikationen: IPS e.max Zirconia – entwickelt mit Zahntechnikern.',
		question: 'Welches Zirkon vereinfacht den Laboralltag in der Zahntechnik?',
		answer:
			'IPS e.max Zirconia: ein Material, kürzere Sinterzeiten, alle Indikationen – entwickelt mit Zahntechnikern.',
		introHeadline: 'Mit Zahntechnikern entwickelt.',
		introBody:
			'Von Anfang an haben Zahntechnikerinnen und Zahntechniker weltweit ihre Erfahrung aus dem Laboralltag eingebracht – damit IPS e.max Zirconia den Anforderungen moderner Labore gerecht wird: weniger Materialwechsel, kürzere Sinterzeiten, reproduzierbare Ästhetik.',
		whyHeadline: 'Warum IPS e.max Zirconia in der Zahntechnik?',
		benefits: [
			'Eine Scheibe für alle Indikationen – weniger Materialien im Lager',
			'Speed-Sintern ab 0:58 h – mehr Fälle pro Tag',
			'GTx Technologie für reproduzierbare Ästhetik ohne Verblendung',
			'Ein Partner für Material, Maschine und Support',
		],
		faq: [
			{
				q: 'Was ändert sich im Laboralltag mit IPS e.max Zirconia?',
				a: 'Ein Scheibentyp statt mehrerer, kürzere Sinterzeiten – und weniger Nacharbeit durch den integrierten Farbverlauf.',
			},
			{
				q: 'Ist das Material auch für kleine Labore sinnvoll?',
				a: 'Gerade dort: weniger Lagerhaltung und keine Materialwechsel zwischen Front- und Seitenzahnfällen.',
			},
			{
				q: 'Gibt es ein Testangebot?',
				a: 'Ja, das Neukundenangebot: erste Scheibe mit 30 % Rabatt, bei Nichtgefallen Geld zurück.',
			},
		],
		chatPrompt: 'Welches Zirkon vereinfacht in der Zahntechnik den Laboralltag? Was bietet IPS e.max Zirconia von Ivoclar für Dentallabore?',
	},
	{
		slug: 'zirkonoxid-dentallabor',
		name: 'Zirkonoxid Dentallabor',
		status: 'confirmed', // Lena, Pilot Germany call 22 Sep 2026
		layout: 'antwort',
		geo: true,
		proposedNote: 'Lena 10 Sep mentioned "Dentallabor" as an easy term; not added to the sheet on the call. Please confirm or drop.',
		hero: 'milling',
		seoTitle: 'Zirkonoxid für das Dentallabor | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'IPS e.max Zirconia für Dentallabore: weniger Lagerhaltung, kürzere Sinterzeiten, ein Material für alle Indikationen.',
		question: 'Welches Zirkonoxid lohnt sich für mein Dentallabor?',
		answer:
			'IPS e.max Zirconia: weniger Lagerhaltung, kürzere Sinterzeiten, ein Material für alle Indikationen – jetzt mit 30 % Neukundenrabatt testen.',
		introHeadline: 'Weniger Material. Mehr Labor.',
		introBody:
			'Jeder zusätzliche Scheibentyp kostet Regalplatz, Kapital und Umrüstzeit. IPS e.max Zirconia deckt das gesamte festsitzende Indikationsspektrum mit einer Scheibe ab und sintert ab 0:58 h – damit Ihr Labor mehr Fälle pro Tag ausliefert.',
		whyHeadline: 'Warum IPS e.max Zirconia für Ihr Dentallabor?',
		benefits: [
			'Ein Scheibentyp für alle Indikationen – weniger gebundenes Kapital',
			'Speed-Sintern ab 0:58 h – mehr Durchsatz pro Ofen',
			'Reproduzierbare Ästhetik ohne Verblendung – weniger Nacharbeit',
			'Neukundenangebot: erste Scheibe mit 30 % Rabatt, bei Nichtgefallen Geld zurück',
		],
		faq: [
			{
				q: 'Wie bestelle ich als Neukunde?',
				a: 'Über das Formular auf dieser Seite. Unser Team vermittelt Sie an einen Händler in Ihrer Nähe.',
			},
			{
				q: 'Gilt das Angebot in Österreich?',
				a: 'Ja, das Angebot gilt in Deutschland und Österreich.',
			},
			{
				q: 'Was passiert, wenn mir die Scheibe nicht gefällt?',
				a: 'Sie erhalten Ihr Geld zurück.',
			},
		],
		chatPrompt: 'Welches Zirkonoxid lohnt sich für ein Dentallabor mit Blick auf Lagerhaltung, Sinterzeiten und Indikationen? Was bietet IPS e.max Zirconia von Ivoclar?',
	},
	// ---- 21 Sep: keyword gaps from Carolin's Google Ads export (ad group "ZirCAD Prime Produktseite") ----
	{
		slug: 'multilayer-zirkon',
		name: 'Multilayer Zirkon',
		status: 'confirmed', // Lena, Pilot Germany call 22 Sep 2026
		layout: 'vergleich',
		proposedNote: 'From the Google Ads keyword export (multilayer zirkon, zirkon multilayer, zirkon mehrfarbig, zirkon farbverlauf, zirkon transluzenzverlauf). Not yet reviewed by Lena.',
		compare: {"headline": "Multilayer-Scheibe oder GTx Technologie?", "intro": "Klassische Multilayer-Scheiben stapeln mehrere eingefärbte Schichten. IPS e.max Zirconia entsteht aus zwei Pulvern – der Verlauf ist im Material, nicht in der Schichtung.", "columns": ["", "Klassische Multilayer-Scheibe", "IPS e.max Zirconia (GTx Technologie)"], "rows": [["Aufbau", "mehrere gestapelte, unterschiedlich eingefärbte Schichten", "zwei Rohmaterialien (4Y-PSZ und 5Y-PSZ), nahtloser Übergang"], ["Farbverlauf", "stufig, je nach Schichtgrenze", "harmonisch von zervikal nach inzisal – ohne sichtbare Schichten"], ["Transluzenzverlauf", "durch Schichtung", "im Material: hochtransluzent inzisal, festigkeitsstark im Dentin"], ["Festigkeit", "ein Wert für die ganze Scheibe", "1.200 MPa (4Y-PSZ) / 800 MPa (5Y-PSZ)"], ["Einfärbung", "meist vorgefärbtes Rohpulver", "nicht eingefärbtes Rohpulver, bei Ivoclar mit GTx eingefärbt – hohe Farbtreue zum A–D-Schlüssel"], ["Positionierung im Rohling", "Restauration muss in die Schichtzonen passen", "Intelligent Disc Concept: 3 mm Inzisal, 4 mm Übergang, 5–23 mm Dentin – konstant über alle Höhen"]], "note": "Vergleichbar sind nur Produkte, die zwei Rohmaterialien kombinieren – erkennbar an zwei angegebenen Biegefestigkeitswerten."},
		hero: 'esthetics',
		seoTitle: 'Multilayer Zirkon mit Farb- und Transluzenzverlauf | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Mehrfarbiges Zirkon ohne Schichtgrenzen: IPS e.max Zirconia mit GTx Technologie verbindet 4Y-PSZ und 5Y-PSZ zu einem nahtlosen Farb- und Transluzenzverlauf.',
		question: 'Multilayer Zirkon: Wie bekomme ich einen Farbverlauf ohne sichtbare Schichten?',
		answer:
			'Mit der GTx Technologie: IPS e.max Zirconia entsteht aus zwei Pulvern – 4Y-PSZ im Dentin, 5Y-PSZ inzisal – und zeigt einen nahtlosen Farb- und Transluzenzverlauf statt gestapelter Schichten.',
		introHeadline: 'Mehrfarbig, ohne Schichtgrenzen.',
		introBody:
			'Multilayer-Scheiben versprechen einen natürlichen Verlauf, zeigen aber oft Stufen an den Schichtgrenzen. IPS e.max Zirconia geht einen anderen Weg: Die von Ivoclar entwickelte Fülltechnologie sorgt für schichtfreie Farbe und Transluzenz, die Pulver-Vorbehandlung gleicht das unterschiedliche Sinterverhalten der beiden Rohstoffe aus – für eine hohe Passgenauigkeit und einen harmonischen Verlauf von zervikal nach inzisal.',
		whyHeadline: 'Warum IPS e.max Zirconia statt klassischer Multilayer-Scheibe?',
		benefits: [
			'Nahtloser Farb- und Transluzenzverlauf ohne sichtbare Schichten (GTx Technologie)',
			'Zwei Rohmaterialien in einer Scheibe: 1.200 MPa im Dentin, 800 MPa inzisal',
			'Intelligent Disc Concept: Inzisalzone (3 mm) und Übergangszone (4 mm) sind in jeder Scheibe gleich, die Dentinschicht variiert je nach Scheibenhöhe von 5 bis 23 mm',
			'20 A–D- und BL-Farben mit hoher Farbtreue durch Ivoclar-eigene Einfärbung',
		],
		faq: [
			{
				q: 'Ist IPS e.max Zirconia eine Multilayer-Scheibe?',
				a: 'Nicht im klassischen Sinn. Die Scheibe wird aus zwei eingefärbten Pulvern hergestellt und zeigt keine Schichtungen, sondern einen harmonischen Übergang von Farbe und Transluzenz zwischen Dentin und Schmelz.',
			},
			{
				q: 'Woher kommt der Transluzenzverlauf?',
				a: 'Aus der Kombination von 4Y-PSZ (Dentin) und 5Y-PSZ (Inzisal) und der Ivoclar-Fülltechnologie, die beide Pulver ohne Schichtgrenze in die Pressform bringt.',
			},
			{
				q: 'Wo positioniere ich die Restauration in der Scheibe?',
				a: 'Nach dem Intelligent Disc Concept: 3 mm Inzisalzone und 4 mm Übergangszone bleiben in jeder Scheibenhöhe gleich, der Dentinanteil variiert von 5 bis 23 mm.',
			},
			{
				q: 'Wie vergleiche ich IPS e.max Zirconia mit anderen mehrfarbigen Scheiben?',
				a: 'Nur Produkte, die zwei unterschiedliche Rohmaterialien kombinieren, sind vergleichbar – erkennbar an zwei angegebenen Biegefestigkeitswerten.',
			},
		],
		chatPrompt:
			'Welches Multilayer-Zirkon liefert einen Farb- und Transluzenzverlauf ohne sichtbare Schichten? Wie funktioniert die GTx Technologie von IPS e.max Zirconia (Ivoclar)?',
	},
	{
		slug: 'vollzirkon',
		name: 'Vollzirkon',
		status: 'confirmed', // Lena, Pilot Germany call 22 Sep 2026
		layout: 'antwort',
		proposedNote: 'From the Google Ads keyword export ([vollzirkon], zirkon monolithisch). Technician term for monolithic zirconia; sibling of monolithisches-zirkonoxid. Not yet reviewed by Lena.',
		hero: 'esthetics',
		seoTitle: 'Vollzirkon: monolithische Restaurationen | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Vollzirkon ohne Verblendung, ohne Chipping: IPS e.max Zirconia liefert Farb- und Transluzenzverlauf im Material – von der Krone bis All-on-X.',
		question: 'Vollzirkon: Sieht eine Restauration ganz aus Zirkon natürlich aus?',
		answer:
			'Ja, mit IPS e.max Zirconia: Farb- und Transluzenzverlauf sind im Material (GTx Technologie), eine fluoreszierende Glasur ergänzt die natürliche Wirkung – ohne Verblendung und ohne Chipping-Risiko.',
		introHeadline: 'Vollzirkon, das nicht nach Vollzirkon aussieht.',
		introBody:
			'Vollzirkon spart Arbeitsschritte und das Chipping-Risiko der Verblendung – galt aber lange als opak. IPS e.max Zirconia bringt den Verlauf von festigkeitsstarkem Dentin zu hochtransluzentem Inzisal in die Scheibe, Color & Effect Liquids und IPS e.max Ceram Art übernehmen die Individualisierung.',
		whyHeadline: 'Warum Vollzirkon mit IPS e.max Zirconia?',
		benefits: [
			'Integrierter Farb- und Transluzenzverlauf – keine Verblendung, kein Chipping der Verblendung',
			'Freigegeben von der Einzelkrone bis Full-Arch und All-on-X',
			'Speed-Sintern: 0:58 h für Kronen und 3-gliedrige Brücken',
			'Polierte Oberflächen schonen den Antagonisten – OptraGloss Polierer empfohlen',
		],
		faq: [
			{
				q: 'Ist Vollzirkon dasselbe wie monolithisches Zirkonoxid?',
				a: 'Ja. Vollzirkon ist der Laborbegriff für Restaurationen, die vollständig aus Zirkonoxid gefräst und nicht verblendet werden.',
			},
			{
				q: 'Wie wird Vollzirkon natürlich fluoreszierend?',
				a: 'Zirkonoxid hat keine intrinsische Fluoreszenz. Eine fluoreszierende Glasur wie IPS e.max Ceram Art Magic Glaze FLUO gibt der monolithischen Restauration natürliche Fluoreszenz.',
			},
			{
				q: 'Schädigt Vollzirkon den Antagonisten?',
				a: 'Studien zeigen: Bei polierten monolithischen Zirkonoxidkronen ist die Abrasion des natürlichen Antagonisten nicht kritisch. Entscheidend ist eine glatte, runde Oberfläche – nach dem Einschleifen im Mund nachpolieren.',
			},
			{
				q: 'Wie wird Vollzirkon befestigt?',
				a: 'Adhäsiv, selbstadhäsiv oder konventionell. Zirkonoxid wird nicht geätzt, sondern sandgestrahlt und mit Monobond Plus konditioniert; bei retentiver Präparation konventionell mit ZirCAD Cement, sonst z. B. mit Multilink Automix oder SpeedCEM Plus.',
			},
		],
		chatPrompt:
			'Sieht eine Vollzirkon-Restauration natürlich aus, und welches Material eignet sich für monolithische Kronen und Brücken? Was bietet IPS e.max Zirconia von Ivoclar?',
	},
	{
		slug: 'zirkonoxid-haendler',
		name: 'Zirkonoxid Händler',
		status: 'removed',
		layout: 'antwort',
		geo: true,
		proposedNote: 'ColdStart proposal 15 Sep: the "where can I get it near me" intent behind the dealer-referral form. Geo-enabled on ColdStart (category 7370).',
		removedNote: 'Carolin 23 Sep (sheet, Kategorien & Fragen row 27): "Würde ich komplett streichen". Removed with its geo pages; URLs redirect to /.',
		hero: 'milling',
		seoTitle: 'Zirkonoxid Händler in Ihrer Nähe | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'IPS e.max Zirconia über Ivoclar-Händler in Deutschland und Österreich beziehen – Neukundenangebot mit 30 % Rabatt auf die erste Scheibe, Händlervermittlung in Ihrer Region.',
		question: 'Wo bekomme ich IPS e.max Zirconia in meiner Nähe?',
		answer:
			'Über das Ivoclar-Händlernetz in Deutschland und Österreich – wir vermitteln Sie an einen Händler in Ihrer Region, die erste Scheibe kommt mit 30 % Neukundenrabatt.',
		introHeadline: 'Ihr Zirkonoxid-Händler in der Nähe.',
		introBody:
			'IPS e.max Zirconia ist über das Ivoclar-Händlernetz in Deutschland und Österreich erhältlich. Füllen Sie das Bestellformular aus – unser Team vermittelt Sie an einen Händler in Ihrer Nähe, und Ihre erste Scheibe kommt mit 30 % Neukundenrabatt, bei Nichtgefallen Geld zurück.',
		whyHeadline: 'Warum IPS e.max Zirconia über einen Ivoclar-Händler beziehen?',
		benefits: [
			'Lieferung über Ivoclar-Händler in Ihrer Region direkt ins Labor',
			'Neukundenangebot: erste Scheibe mit 30 % Rabatt, bei Nichtgefallen Geld zurück',
			'Eine Scheibe für alle Indikationen – 12 bis 30 mm, 20 Farben',
			'Ein Partner für Material, PrograMill 7, Sintern und Charakterisierung',
		],
		faq: [
			{
				q: 'Wie finde ich einen Ivoclar-Händler in meiner Nähe?',
				a: 'Über das Bestellformular auf dieser Seite: Sie geben Ihr Labor und Ihren Standort an, unser Team vermittelt den passenden Händler.',
			},
			{
				q: 'Gilt das Neukundenangebot bei jedem Händler?',
				a: 'Ja, das Angebot gilt in Deutschland und Österreich über die Händlervermittlung des Formulars.',
			},
			{
				q: 'Kann ich direkt bei Ivoclar bestellen?',
				a: 'Die Bestellung läuft über den Händler in Ihrer Region; das Formular auf dieser Seite startet die Vermittlung.',
			},
		],
		chatPrompt: 'Wo bekomme ich IPS e.max Zirconia von Ivoclar in Deutschland oder Österreich, und wie funktioniert die Händlervermittlung mit dem Neukundenangebot?',
	},
];

const bySlug = Object.fromEntries(TERMS.map((t) => [t.slug, t]));

/** Terms that render a page: confirmed, open and proposed. */
export const ACTIVE_TERMS = TERMS.filter((t) => t.status !== 'removed');

export function findTerm(slug) {
	if (!slug) return null;
	return bySlug[String(slug).toLowerCase()] || null;
}

export function isRemovedTerm(slug) {
	const t = findTerm(slug);
	return Boolean(t && t.status === 'removed');
}

/** Bottom-of-page pills: every active term, in sheet order. */
export function termNavigationItems() {
	return ACTIVE_TERMS.map((t) => ({ name: t.name, slug: `/${t.slug}` }));
}

/** Prefilled ChatGPT link for the "Frag ChatGPT" CTA on a term page. */
export function chatGptUrl(term) {
	const q = term?.chatPrompt || term?.question || '';
	return `https://chatgpt.com/?q=${encodeURIComponent(q)}`;
}
