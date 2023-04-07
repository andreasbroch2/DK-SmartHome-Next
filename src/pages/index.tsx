import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '../components/container'
import Layout from '../components/layout'
import { getSinglePage } from '../lib/api'
import Header from '../components/header'
import { getNavMenu } from '../lib/api'
import { useRouter } from 'next/router'
import Script from 'next/script'
import imgConverter from '../lib/imgConverter'

export default function Index({ data, preview, menuItems, footerMenuItems}) {
	const router = useRouter();
	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if ( router.isFallback ) {
		return <div>Indlæser...</div>;
	}
  return (
    <Layout preview={preview} footerMenuItems={footerMenuItems} data={data}>
    <Script src="https://kit.fontawesome.com/bf7aea6dc3.js" />
      <Head>
        <title>{data.seo.title}</title>
      </Head>
      <Container>
        <Header menuItems={menuItems} />
        <div className='entry-content homepage'>{imgConverter(data.content)}</div>
      </Container>
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getSinglePage("/");
  const menuItems = await getNavMenu('PRIMARY')
  const footerMenuItems = await getNavMenu('FOOTER')
  return {
    props: { data, preview, menuItems, footerMenuItems},
    revalidate: 10,
  }
}