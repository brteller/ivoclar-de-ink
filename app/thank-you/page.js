import Link from 'next/link';

// German only, like the rest of ivoclargermany.com (the old page was an English ColdStart template).
export const metadata = {
  title: 'Vielen Dank | IPS e.max Zirconia',
  description: 'Vielen Dank für Ihre Bestellung von IPS e.max Zirconia.',
  robots: 'noindex, nofollow',
};

export default function ThankYouPage() {
  return (
    <div className="min-h-[70vh] py-16 bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#0a478b]/10 mb-6">
          <svg className="w-10 h-10 text-[#0a478b]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-normal text-[#0a478b] mb-4 tracking-tight">
          Vielen Dank für Ihre Bestellung!
        </h1>
        <p className="text-lg text-gray-700 mb-10">
          Wir haben Ihre Angaben erhalten und melden uns in Kürze bei Ihnen.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#0a478b] hover:bg-[#083a70] text-white font-bold px-8 py-4 rounded-lg transition-colors"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}
