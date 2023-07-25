import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Office Add-in Next App',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="window.history.cache"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          console.log(window.history);
          // Office.js deletes window.history.pushState and window.history.replaceState.
          window._historyCache = {
              replaceState: window.history.replaceState,
              pushState: window.history.pushState
          };
          `,}}
        />
        <Script
          strategy="beforeInteractive"
          src="https://appsforoffice.microsoft.com/lib/1.1/hosted/office.js"
        />
        <Script
          id="window.history.restore"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.history.replaceState = window._historyCache.replaceState;
          window.history.pushState = window._historyCache.pushState;
          `,}}
        />
      </head>      
      <body className={inter.className}>{children}</body>
    </html>
  )
}
