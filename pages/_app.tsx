import { AppProps } from 'next/app'
import Script from 'next/script'
import '../styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Script src="https://dksmarthome.dk/wp-includes/js/jquery/jquery.min.js?ver=3.6.3" strategy='beforeInteractive' />
    <Script src="https://dksmarthome.dk/wp-includes/js/jquery/jquery-migrate.min.js?ver=3.4.0" />
    <Script src="/js/app.js" />
    <Component {...pageProps} /></>
  )
}

export default MyApp
