import Head from 'next/head'
import Script from 'next/script'

export default function Meta() {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon/dk-smarthome-favicon.png" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/favicon/dk-smarthome-favicon.png" />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta charSet="utf-8" />
        <Script id="google-tag-manager" strategy='afterInteractive'>
          {`
          (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TG6SCN8');
          `}
        </Script>
      </Head>
    </>
  )
}
