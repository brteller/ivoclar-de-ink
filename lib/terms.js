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
 */

export const TERMS = [
	{
		slug: 'zirkonoxid',
		name: 'Zirkonoxid',
		status: 'confirmed',
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
				a: 'Ab 0:58 h für Restaurationen bis zur 3-gliedrigen Brücke und 2:57 h bis Full-Arch – ohne Kompromisse bei der Ästhetik.',
			},
		],
		chatPrompt:
			'Welches Zirkonoxid eignet sich im Dentallabor für alle festsitzenden Indikationen, und was zeichnet IPS e.max Zirconia von Ivoclar aus?',
	},
	{
		slug: 'zirkonoxid-scheiben',
		name: 'Zirkonoxid Scheiben',
		status: 'confirmed',
		sheetRow: 9,
		hero: 'default',
		seoTitle: 'Zirkonoxid Scheiben 12–30 mm | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Zirkonoxidscheiben von 12 bis 30 mm in 20 Farben. Eine Scheibe für alle Indikationen – mit GTx Technologie für natürliche Farbverläufe.',
		question: 'Welche Zirkonoxidscheibe passt zu jedem Fall in meinem Labor?',
		answer:
			'Eine Scheibe, 12–30 mm, 20 Farben: IPS e.max Zirconia reduziert Lagerhaltung und Umrüstzeiten.',
		introHeadline: 'Weniger Scheiben im Regal. Mehr Fälle pro Tag.',
		introBody:
			'Eine Scheibe, die alle Indikationen abdeckt, macht die Materialwahl einfach. Das Höhenportfolio von 12 bis 30 mm und 20 präzise A–D- und BL-Farben decken das gesamte Spektrum festsitzender Restaurationen ab.',
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
				a: 'Von 12 bis 30 mm. Die 30-mm-Scheibe ist in den Farben BL1, BL3, A1, A2, A3, A3,5, B1 und B2 erhältlich.',
			},
			{
				q: 'Brauche ich weiterhin verschiedene Scheibentypen für Front- und Seitenzahn?',
				a: 'Nein. IPS e.max Zirconia kombiniert 4Y-PSZ und 5Y-PSZ in einer Scheibe und deckt beide Bereiche ab.',
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
				a: 'Ja. Die Ronde ist in offenen CAD/CAM-Systemen verarbeitbar; auf der PrograMill 7 stehen zusätzlich dedizierte Frässtrategien bereit.',
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
			'4Y/5Y-PSZ in einer Scheibe: Festigkeit im Seitenzahn, Transluzenz im Frontzahn',
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
		],
		chatPrompt:
			'Wie erreiche ich mit monolithischem Zirkonoxid eine natürliche Ästhetik ohne Verblendung? Was leistet die GTx Technologie von IPS e.max Zirconia (Ivoclar)?',
	},
	{
		slug: 'hochtransluzentes-zirkonoxid',
		name: 'Hochtransluzentes Zirkonoxid',
		status: 'confirmed',
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
		],
		chatPrompt:
			'Welches hochtransluzente Zirkonoxid eignet sich für Frontzahnrestaurationen mit natürlicher Lichtdynamik? Was bietet IPS e.max Zirconia von Ivoclar?',
	},
	{
		slug: '4y-psz-5y-psz-zirkonoxid',
		name: '4Y-PSZ / 5Y-PSZ Zirkonoxid',
		status: 'confirmed',
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
				a: 'Die Zahl steht für den Yttriumoxid-Anteil (4 bzw. 5 mol%), der das Zirkonoxid stabilisiert. Mehr Yttrium bedeutet mehr Transluzenz, weniger Yttrium mehr Festigkeit.',
			},
			{
				q: 'Wo liegt in der Scheibe welcher Rohstoff?',
				a: 'Der Gradient verläuft von festigkeitsstark im zervikalen Bereich zu hochtransluzent im inzisalen Bereich – abgestimmt auf die Restauration.',
			},
			{
				q: 'Muss ich meine Sinterparameter anpassen?',
				a: 'Nein. IPS e.max Zirconia wird mit einem abgestimmten Sinterprogramm verarbeitet, unabhängig von der Indikation.',
			},
		],
		chatPrompt:
			'Was ist der Unterschied zwischen 4Y-PSZ und 5Y-PSZ Zirkonoxid, und welches Material kombiniert beides in einer Scheibe? Was bietet IPS e.max Zirconia von Ivoclar?',
	},
	{
		slug: 'zirkonoxid-fraesen',
		name: 'Zirkonoxid Fräsen',
		status: 'confirmed',
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
		whyHeadline: 'Warum IPS e.max Zirconia beim Fräsen?',
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
				a: 'Zirkonoxid wird im Grünzustand trocken gefräst. Die PrograMill 7 wechselt automatisch zwischen Nass- und Trockenbearbeitung.',
			},
			{
				q: 'Wie geht es nach dem Fräsen weiter?',
				a: 'Optional Color & Effect Liquids auftragen, dann sintern – ab 0:58 h bis zur 3-gliedrigen Brücke – und mit IPS e.max Ceram Art charakterisieren.',
			},
		],
		chatPrompt:
			'Wie fräse ich Zirkonoxid im Dentallabor mit wenig Nacharbeit? Welche Frässtrategien bietet Ivoclar für IPS e.max Zirconia auf der PrograMill 7?',
	},
	{
		slug: 'cadcam-zirkonoxid',
		name: 'CAD/CAM Zirkonoxid',
		status: 'confirmed',
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
				q: 'Mit welchen CAD-Systemen ist IPS e.max Zirconia kompatibel?',
				a: 'Mit allen offenen Systemen – zum Beispiel exocad und 3Shape.',
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
			'Ein Material, ein Sinterprogramm – weniger Fehlerquellen',
		],
		faq: [
			{
				q: 'Welche Sinterzeiten gelten für IPS e.max Zirconia?',
				a: 'Ab 0:58 h für Restaurationen bis zur 3-gliedrigen Brücke und 2:57 h bis Full-Arch.',
			},
			{
				q: 'Leidet die Ästhetik unter dem schnellen Sintern?',
				a: 'Nein. Die Programme sind auf das Material abgestimmt; Farbverlauf und Transluzenz bleiben erhalten.',
			},
			{
				q: 'Wann trage ich die Color & Effect Liquids auf?',
				a: 'Vor dem Sintern, per Pinselinfiltration im Grünzustand.',
			},
		],
		chatPrompt:
			'Wie sintere ich Zirkonoxid im Dentallabor schnell und ohne Verlust bei Passung und Farbe? Welche Sinterzeiten gelten für IPS e.max Zirconia von Ivoclar?',
	},
	{
		slug: 'speed-sintern-zirkonoxid',
		name: 'Speed-Sintern Zirkonoxid',
		status: 'open',
		sheetRow: 20,
		openNote: 'Lena 10 Sep: same as Zirkonoxid Sintern - marked to think about together with row 19.',
		hero: 'workflow',
		seoTitle: 'Speed-Sintern Zirkonoxid | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Ultraschnelles Speed-Sintern: ab 0:58 h bis zur 3-gliedrigen Brücke, 2:57 h bis Full-Arch – ohne Kompromisse bei der Ästhetik.',
		question: 'Ist Speed-Sintern bei Zirkonoxid ohne ästhetische Kompromisse möglich?',
		answer: 'Ja. IPS e.max Zirconia sintert ab 0:58 h – mit gleichbleibender Ästhetik und Festigkeit.',
		introHeadline: 'Von der Ronde zum Finish in unter einer Stunde.',
		introBody:
			'Speed-Sintern bringt Restaurationen in unter einer Stunde vom Fräsen zum Finish und macht Versorgungen am selben Tag realistisch – bei gleichbleibender Ästhetik und Festigkeit.',
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
				a: 'Für Restaurationen bis zur 3-gliedrigen Brücke (0:58 h); größere Spannen bis Full-Arch sintern in 2:57 h.',
			},
			{
				q: 'Wird das Material durch Speed-Sintern opaker?',
				a: 'Nein. Der Farb- und Transluzenzverlauf der GTx Technologie bleibt im Speed-Zyklus erhalten.',
			},
			{
				q: 'Was bringt Speed-Sintern im Laboralltag?',
				a: 'Mehr Fälle pro Ofen und Tag – und die Möglichkeit, Einzelkronen am selben Tag auszuliefern.',
			},
		],
		chatPrompt:
			'Ist Speed-Sintern von Zirkonoxid ohne ästhetische Kompromisse möglich? Wie schnell sintert IPS e.max Zirconia von Ivoclar?',
	},
	{
		slug: 'zirkonoxid-veneers',
		name: 'Zirkonoxid Veneers',
		status: 'confirmed',
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
				a: 'Ja. Dünne Veneers gehören zum freigegebenen Indikationsspektrum von IPS e.max Zirconia.',
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
			'Speed-Sintern ab 0:58 h – auch kleine Arbeiten am selben Tag',
		],
		faq: [
			{
				q: 'Welche Indikationen neben Kronen und Brücken deckt IPS e.max Zirconia ab?',
				a: 'Inlays, Onlays, Veneers, Freiend- und Klebebrücken sowie Hybridversorgungen auf Ti-Basis und All-on-X.',
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
				a: 'Die 30-mm-Scheibe gibt es in BL1, BL3, A1, A2, A3, A3,5, B1 und B2. Die Übersicht aller Höhen und Farben finden Sie im Farbportfolio auf ivoclar.com.',
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
				a: 'Liquids vor dem Sintern für Farbe und Effekt, Ceram Art nach dem Sintern für die Charakterisierung der Oberfläche.',
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
				a: 'Ja – ebenso wie für Hybridversorgungen, die auf Ti-Basis verschraubt werden.',
			},
			{
				q: 'Wie verhindere ich, dass die Ti-Basis durchscheint?',
				a: 'Mit dem Opaque Liquid aus den Color & Effect Liquids: Es maskiert von innen und erhält die Lichtdynamik außen.',
			},
			{
				q: 'Wie lange sintert eine Full-Arch-Versorgung?',
				a: '2:57 h.',
			},
		],
		chatPrompt:
			'Welches Zirkonoxid ist für implantatgetragene Hybridversorgungen auf Ti-Basis und All-on-X freigegeben? Was bietet IPS e.max Zirconia von Ivoclar?',
	},
	{
		slug: 'digitaler-workflow-zahntechnik',
		name: 'Digitaler Workflow Zahntechnik',
		status: 'confirmed',
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
			'Vier Schritte führen vom Design zur fertigen Restauration: Materialauswahl mit IPS e.max Zirconia, Fräsen auf der PrograMill 7, Speed-Sintern und Charakterisierung mit Color & Effect Liquids und IPS e.max Ceram Art.',
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
		sheetRow: 28,
		hero: 'default',
		seoTitle: 'Zirkon für die Zahntechnik | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Zirkon, Zirkonoxid, Zirconia: IPS e.max Zirconia ist das Premium-Zirkonoxid für alle festsitzenden Indikationen – in einer Scheibe.',
		question: 'Zirkon für die Zahntechnik – welches Material ist die richtige Wahl?',
		answer: 'IPS e.max Zirconia: Premium-Zirkonoxid für alle festsitzenden Indikationen, in einer Scheibe.',
		introHeadline: 'Zirkon, Zirkonoxid, Zirconia – ein Material, das alles kann.',
		introBody:
			'Ob Sie Zirkon, Zirkonoxid oder Zirconia sagen: Gemeint ist das yttriumstabilisierte Zirkoniumdioxid, das die festsitzende Prothetik prägt. IPS e.max Zirconia vereint 4Y-PSZ und 5Y-PSZ in einer Scheibe – für Veneers, Kronen, Brücken und All-on-X.',
		whyHeadline: 'Warum IPS e.max Zirconia?',
		benefits: [
			'Eine Scheibe für alle Indikationen – von Veneers bis All-on-X',
			'Natürlicher Farb- und Transluzenzverlauf durch die GTx Technologie',
			'Speed-Sintern ab 0:58 h für Versorgungen am selben Tag',
			'Mit Zahntechnikern entwickelt, über Branchenstandards hinaus geprüft',
		],
		faq: [
			{
				q: 'Ist Zirkon dasselbe wie Zirkonoxid?',
				a: 'Im Laboralltag ja: Beide Begriffe meinen das Zirkoniumdioxid (ZrO2), aus dem festsitzende Restaurationen gefräst werden.',
			},
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
		sheetRow: 30,
		hero: 'milling',
		seoTitle: 'Zirkonronden für das Dentallabor | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Zirkonronden aus 4Y/5Y-PSZ, 12–30 mm, 20 Farben – eine Ronde für alle Indikationen im CAD/CAM-Workflow.',
		question: 'Welche Zirkonronde deckt alle Fälle in meinem Labor ab?',
		answer: 'IPS e.max Zirconia: 4Y/5Y-PSZ in einer Ronde, 12–30 mm, 20 Farben.',
		introHeadline: 'Eine Zirkonronde statt drei.',
		introBody:
			'Wer für Front- und Seitenzahn unterschiedliche Ronden bevorratet, wechselt ständig Material. IPS e.max Zirconia bringt Festigkeit und Transluzenz in eine Ronde – für jede Indikation, in jeder gängigen CAD/CAM-Umgebung.',
		whyHeadline: 'Warum IPS e.max Zirconia als Zirkonronde?',
		benefits: [
			'Eine Ronde für alle Indikationen – weniger Lagerhaltung',
			'Höhen von 12 bis 30 mm, 20 A–D- und BL-Farben',
			'Offen für exocad, 3Shape und jede offene Fräsmaschine',
			'Speed-Sintern ab 0:58 h nach dem Fräsen',
		],
		faq: [
			{
				q: 'Passt die Ronde in meine Fräsmaschine?',
				a: 'IPS e.max Zirconia ist eine Ronde für offene CAD/CAM-Systeme – auf der PrograMill 7 mit dedizierten Frässtrategien.',
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
		sheetRow: 31,
		hero: 'workflow',
		seoTitle: 'Zirkon in der Zahntechnik | IPS e.max Zirconia | Ivoclar',
		seoDescription:
			'Ein Material, ein Sinterprogramm, alle Indikationen: IPS e.max Zirconia – entwickelt mit Zahntechnikern.',
		question: 'Welches Zirkon vereinfacht den Laboralltag in der Zahntechnik?',
		answer:
			'IPS e.max Zirconia: ein Material, ein Sinterprogramm, alle Indikationen – entwickelt mit Zahntechnikern.',
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
				a: 'Ein Scheibentyp statt mehrerer, ein Sinterprogramm, kürzere Zyklen – und weniger Nacharbeit durch den integrierten Farbverlauf.',
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
		status: 'proposed',
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
