import {useRouter} from 'next/router';
import Layout from '../components/layout';
import Head from 'next/head';
import Container from '../components/container';
import Header from '../components/header';

import {getAllPagesWithSlug, getSinglePage, getNavMenu} from '../lib/api';

const Page = ( {data, preview = false, menuItems, footerMenuItems} ) => {
	const router = useRouter();

	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if ( router.isFallback ) {
		return <div>Indlæser...</div>;
	}

	return (
        <Layout preview={preview} footerMenuItems={footerMenuItems}>
        <Head>
          <title>Page page</title>
        </Head>
        <Container>
          	<Header menuItems={menuItems}/>
        	<div className='entry-content' dangerouslySetInnerHTML={{__html: data?.content }}/>
        </Container>
      </Layout>
	);
};

export default Page;

export async function getStaticProps( {params} ) {
    const data = await getSinglePage( params?.slug);
    const menuItems = await getNavMenu('PRIMARY');
	const footerMenuItems = await getNavMenu('FOOTER');

	return {
		props: {
			data: data || {},
            menuItems: menuItems,
			footerMenuItems: footerMenuItems,
		},
		/**
         * Revalidate means that if a new request comes to server, then every 1 sec it will check
         * if the data is changed, if it is changed then it will update the
         * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
         */
		revalidate: 1,
	};

}

/**
 * Since the page name uses catch-all routes,
 * for example [...slug],
 * that's why params would contain slug which is an array.
 * For example, If we need to have dynamic route '/foo/bar'
 * Then we would add paths: [ params: { slug: ['foo', 'bar'] } } ]
 * Here slug will be an array is ['foo', 'bar'], then Next.js will statically generate the page at /foo/bar
 *
 * At build time next js will will make an api call get the data and
 * generate a page bar.js inside .next/foo directory, so when the page is served on browser
 * data is already present, unlike getInitialProps which gets the page at build time but makes an api
 * call after page is served on the browser.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required
 *
 * @returns {Promise<{paths: [], fallback: boolean}>}
 */
export async function getStaticPaths() {
	const {data} = await getAllPagesWithSlug();

	const pathsData = [];

	data?.pages?.nodes && data?.pages?.nodes.map( page => {
			const slugs = page?.uri?.split( '/' ).filter( pageSlug => pageSlug );
			pathsData.push( {params: {slug: slugs}} );
	} );

	return {
		paths: pathsData,
        fallback: 'blocking',
	};
}
