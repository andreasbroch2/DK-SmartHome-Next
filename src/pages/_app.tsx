import { AppProps } from 'next/app'
import Script from 'next/script'
import '../styles/index.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <main className={poppins.className}>
      <Script src="/js/app.js" />
      <Script src="/js/fontAwesome.js" />
      <Component {...pageProps} />
    </main>
    </>
  )
}

export default MyApp
