import './globals.css';
import Script from 'next/script';
import { CREATOR } from '@/lib/creator';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: CREATOR.title,
    template: '%s'
  },
  description: CREATOR.description,
  applicationName: CREATOR.siteName,
  referrer: 'origin-when-cross-origin',
  creator: CREATOR.name,
  publisher: CREATOR.siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    siteName: CREATOR.siteName
  },
  twitter: {
    card: 'summary_large_image'
  }
};

// Google Tag Manager: set NEXT_PUBLIC_GTM_ID (GTM-XXXXXXX) to Ivoclar's container to enable it.
// Nothing is rendered while it is unset.
const GTM_ID = (process.env.NEXT_PUBLIC_GTM_ID || '').trim();

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className="font-sans antialiased">
        {GTM_ID && (
          <>
            <Script id="gtm-init" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
