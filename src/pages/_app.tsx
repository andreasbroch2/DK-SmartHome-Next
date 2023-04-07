import { AppProps } from 'next/app'
import Script from 'next/script'
import '../styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="/js/app.js" />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
