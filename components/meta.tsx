import Head from 'next/head'

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
        <meta charSet="utf-8" />
      </Head>
    </>
  )
}
