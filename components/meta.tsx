import Head from 'next/head'
import Script from 'next/script'
import { CMS_NAME, HOME_OG_IMAGE_URL } from '../lib/constants'

export default function Meta() {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/dk-smarthome-favicon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/dk-smarthome-favicon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/dk-smarthome-favicon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000" />
        <link rel="shortcut icon" href="/favicon/dk-smarthome-favicon.png" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/favicon/dk-smarthome-favicon.png" />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
        <meta
          name="description"
          content={`A statically generated blog example using Next.js and ${CMS_NAME}.`} />
        <meta property="og:image" content={HOME_OG_IMAGE_URL} />
      </Head>
      <Script src="/js/app.js" />
      <Script src="https://dksmarthome.dk/wp-includes/js/jquery/jquery.min.js?ver=3.6.3" />
      <Script src="https://dksmarthome.dk/wp-includes/js/jquery/jquery-migrate.min.js?ver=3.4.0" />
    </>
  )
}
