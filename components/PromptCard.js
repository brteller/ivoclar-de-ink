'use client';

import { useState } from 'react';
import { AI_ICON_PATHS, AI_ICON_VIEWBOX } from '@/lib/aiIcons';

/**
 * One ready-made prompt: the text, a copy button, and a row that opens the prompt
 * in each assistant. Links are built on the server (lib/askAi.js) so the prompt
 * text and the link text can never drift apart.
 */
export default function PromptCard({ label, prompt, links, href = null }) {
	const [copied, setCopied] = useState(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(prompt);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			setCopied(false);
		}
	}

	return (
		<article className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
			<h3 className="text-base font-semibold text-[#0a478b]">
				{href ? (
					<a href={href} className="hover:underline underline-offset-4">
						{label}
					</a>
				) : (
					label
				)}
			</h3>
			<p className="mt-4 flex-1 rounded-xl bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">{prompt}</p>
			<div className="mt-5 flex flex-wrap items-center gap-2">
				{links.map((l) => (
					<a
						key={l.key}
						href={l.href}
						target="_blank"
						rel="noopener noreferrer nofollow"
						title={l.label}
						aria-label={l.label}
						className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white text-gray-600 transition-colors hover:border-[#0a478b] hover:text-[#0a478b]"
					>
						<svg viewBox={AI_ICON_VIEWBOX} fill="currentColor" className="h-[17px] w-[17px]" aria-hidden="true" focusable="false">
							<path d={AI_ICON_PATHS[l.icon]} />
						</svg>
						<span className="sr-only">{l.label}</span>
					</a>
				))}
				<button
					type="button"
					onClick={copy}
					className="ml-auto rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 transition-colors hover:border-[#0a478b] hover:text-[#0a478b]"
				>
					{copied ? 'Kopiert' : 'Prompt kopieren'}
				</button>
			</div>
		</article>
	);
}
