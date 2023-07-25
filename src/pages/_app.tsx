import '../../globals.css'
import App, { AppContext, AppInitialProps, AppProps } from 'next/app'

export const MyApp = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />
}
type AppOwnProps = { example: string }

MyApp.getInitialProps = async (
    context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
    const ctx = await App.getInitialProps(context)

    return { ...ctx, example: 'data' }
}

export default MyApp