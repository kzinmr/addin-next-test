import { Metadata } from "next";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

import "@/app/globals.css";
import { fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Providers } from "@/components/providers";
import { AuthProviders } from "@/components/auth-providers";

export const metadata: Metadata = {
  title: {
    default: "Next.js AI Chatbot",
    template: `%s - Next.js AI Chatbot`,
  },
  description: "An AI-powered chatbot template built with Next.js and Vercel.",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function OfficeRootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="window.history.cache"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
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
      <body
        className={cn(
          "font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <AuthProviders>
        <Toaster />
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            {/* @ts-ignore */}
            {/* without Header */}
            {children}
          </div>
          <TailwindIndicator />
        </Providers>
        </AuthProviders>
      </body>
    </html>
  );
}
