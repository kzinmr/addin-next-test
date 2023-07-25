import { Metadata } from "next";
import NextDocument, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";

export const metadata: Metadata = {
  title: 'Office Add-in Next App',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  }
}

class Document extends NextDocument {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => App,
        enhanceComponent: (Component) => Component,
      })

    const initialProps = await NextDocument.getInitialProps(ctx)

    return initialProps
  }
  render() {
    return (
      <Html>
        <Head>
          <script
            async={false}
            id="window.history.cache"
            // strategy="beforeInteractive"
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                console.log(window.history);
                // Office.js deletes window.history.pushState and window.history.replaceState.
                window._historyCache = {
                  replaceState: window.history.replaceState,
                  pushState: window.history.pushState
                };
              `,
            }}
          />
          <script
            async={false}
            // strategy="beforeInteractive"
            type="text/javascript"
            src="https://appsforoffice.microsoft.com/lib/1.1/hosted/office.js"
          />
          <script
            async={false}
            id="window.history.restore"
            // strategy="beforeInteractive"
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                window.history.replaceState = window._historyCache.replaceState;
                window.history.pushState = window._historyCache.pushState;
              `,
            }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document