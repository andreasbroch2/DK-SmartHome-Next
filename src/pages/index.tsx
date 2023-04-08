import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '../components/container'
import Layout from '../components/layout'
import { getSinglePage } from '../lib/api'
import Header from '../components/header'
import { getNavMenu } from '../lib/api'
import { useRouter } from 'next/router'
import Script from 'next/script'
import ReactDomServer from 'react-dom/server'
import Image from "next/image";
import React from "react";
const parse = require('html-react-parser');


export default function Index({ data, preview, menuItems, footerMenuItems, content}) {
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
        <div className='entry-content homepage' dangerouslySetInnerHTML={{__html: content}} />
      </Container>
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getSinglePage("/");
  const menuItems = await getNavMenu('PRIMARY')
  const footerMenuItems = await getNavMenu('FOOTER')
  var cleanElement = data.content.replace(/\n/g, '');
  cleanElement = cleanElement.replace(/href="https:\/\/dksmarthome\.ditsmartehjem\.dk/g, 'href="https://dksmarthome.dk');
  var cleanJsx = parse(cleanElement);
  var imgNumber = 0;
  function reactNodeToImg(node) {
    return React.Children.map(node, (node) => {
      if(node.type === 'a'){
      }
      if (!node.type) {
        return node;
      }
      if (node.type === 'img') {
        if(imgNumber === 0){
          imgNumber++;
            return <Image src={node.props.src} alt={node.props.alt} width={1000} height={1000} priority placeholder="blur" blurDataURL={`/_next/image?url=${node.props.src}&w=16&q=1`}/>
        }
        else{
          imgNumber++;
          return <Image src={node.props.src} alt={node.props.alt} width={1000} height={1000} placeholder="blur" blurDataURL={`/_next/image?url=${node.props.src}&w=16&q=1`}/>
        }

      }
      else if (node.props && node.props.children != null) {
        React.Children.map(node.props.children, (child) => {
          if (typeof child === 'string') {
            return React.createElement('string', {}, child)
          }
        })
        return React.cloneElement(node, {}, reactNodeToImg(node.props.children));
      }
      else {
        return React.cloneElement(node, {}, null);
      }
    })
  }
  const dom = await React.Children.map(cleanJsx, (elementchild) => {
    if (!elementchild.type) {
      return;
    }
    if (elementchild.props.className === "yarpp yarpp-related yarpp-related-website yarpp-template-thumbnails"
    ) {
      return;
    }
    else if (elementchild.props && elementchild.props.children) {
      return React.cloneElement(elementchild, {}, reactNodeToImg(elementchild.props.children));
    }
    else {
      return elementchild;
    }
  })
  const html = ReactDomServer.renderToStaticMarkup(<div>{dom}</div>)
  return {
    props: { data, preview, menuItems, footerMenuItems, content: html},
    revalidate: 10,
  }
}