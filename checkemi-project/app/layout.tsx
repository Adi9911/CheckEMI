import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SITE_URL } from '@/lib/site'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CheckEMI — Free EMI, SIP, PPF, FD, RD, GST & Age Calculators',
    template: '%s | CheckEMI',
  },
  description:
    'CheckEMI offers free, accurate financial calculators for India — EMI, SIP, Lumpsum, PPF, FD, RD, GST and Age. Instant results with visual charts, fully private in your browser.',
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: 'tzXVuE1nQj_5IXYWZkC3lQRxrfEpPozd5CGYNmwl7sA',
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
  keywords: [
    'EMI calculator',
    'SIP calculator',
    'PPF calculator',
    'FD calculator',
    'RD calculator',
    'GST calculator',
    'loan EMI',
    'CheckEMI',
  ],
  generator: 'v0.app',
  openGraph: {
    title: 'CheckEMI — Free Financial Calculators for India',
    description:
      'Calculate loan EMIs, SIP returns, PPF, FD, RD maturity, GST and age instantly with beautiful charts.',
    type: 'website',
    siteName: 'CheckEMI',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CheckEMI — Free Financial Calculators for India',
    description: 'Calculate EMI, SIP, tax, GST, FD, RD and more with clear, private tools.',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7fdfa' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1a17' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${SITE_URL}/#organization`,
                  name: 'CheckEMI',
                  url: SITE_URL,
                  founder: { '@type': 'Organization', name: 'Aditya Softwares' },
                },
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_URL}/#website`,
                  name: 'CheckEMI',
                  url: SITE_URL,
                  publisher: { '@id': `${SITE_URL}/#organization` },
                  inLanguage: 'en-IN',
                },
              ],
            }),
          }}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
