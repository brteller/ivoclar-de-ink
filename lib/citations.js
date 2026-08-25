'use client';

import React from 'react';

/**
 * Renders plain text with inline citation markers like [1], [2], or [4, 5] as
 * semantic <sup><a> anchors that link to corresponding <li id="fn-N"> footnotes.
 *
 * Uses the DPUB-ARIA role="doc-noteref" role on the inline link so assistive tech
 * recognizes the element as a note reference (paired with role="doc-endnote" on
 * the matching <li>).
 *
 * @param {string} text                     Source string possibly containing [N] markers.
 * @param {string} [citeKeyPrefix='cite']   Prefix used to build stable DOM ids for each <sup>.
 * @returns {React.ReactNode}               Fragment containing interleaved strings and <sup> nodes.
 */
export function renderWithCitations(text, citeKeyPrefix = 'cite') {
	if (text == null || typeof text !== 'string') return text;

	const regex = /\[(\d+(?:\s*,\s*\d+)*)\]/g;
	const parts = [];
	let lastIndex = 0;
	let match;
	let groupIdx = 0;

	while ((match = regex.exec(text)) !== null) {
		if (match.index > lastIndex) {
			parts.push(text.slice(lastIndex, match.index));
		}
		const refs = match[1].split(',').map((s) => s.trim()).filter(Boolean);
		refs.forEach((ref, i) => {
			parts.push(
				<sup key={`${citeKeyPrefix}-${groupIdx}-${ref}-${i}`} className="align-super text-[0.65em] leading-none">
					<a
						href={`#fn-${ref}`}
						id={`${citeKeyPrefix}-ref-${ref}-${groupIdx}`}
						role="doc-noteref"
						aria-label={`See footnote ${ref}`}
						className="text-[#0a478b] no-underline hover:underline focus:underline"
					>
						{ref}
					</a>
				</sup>
			);
			if (i < refs.length - 1) {
				parts.push(<span key={`${citeKeyPrefix}-${groupIdx}-sep-${i}`}>,&nbsp;</span>);
			}
		});
		groupIdx += 1;
		lastIndex = match.index + match[0].length;
	}

	if (lastIndex < text.length) {
		parts.push(text.slice(lastIndex));
	}

	// No citation markers were found — return the original string unchanged so callers
	// can safely wrap any text without extra overhead.
	if (parts.length === 0) return text;

	return (
		<>
			{parts.map((p, i) =>
				typeof p === 'string' ? <React.Fragment key={`txt-${i}`}>{p}</React.Fragment> : p
			)}
		</>
	);
}

/**
 * Reference metadata used by the footnotes <ol>. `work` fields get wrapped in a
 * <cite> element to satisfy the HTML spec's semantic requirement that the title
 * of a cited work be marked up with <cite>.
 */
export const TETRIC_FOOTNOTES = [];
