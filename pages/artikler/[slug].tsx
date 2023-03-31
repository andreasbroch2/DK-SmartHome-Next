import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import { getAllPostsWithSlug, getPostAndMorePosts, getNavMenu } from '../../lib/api'
import Image from 'next/image'


export default function Post({ post, preview, menuItems, footerMenuItems }) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview} footerMenuItems={footerMenuItems}>
      <Container>
        <Header menuItems={menuItems} />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {`${post?.title}`}
                </title>
                <meta
                  property="og:image"
                  content={post.featuredImage?.node.sourceUrl}
                />
              </Head>
              <div className="alignfull flex flex-wrap">
                <div className="md:basis-1/2 max-h-[420px] relative">
                  <Image className="rounded-none" src={post.featuredImage?.node.sourceUrl} alt={post.featuredImage?.node.altText} fill/>
                </div>
                <div className="md:basis-1/2 bg-light flex items-center w-full">
                  <div className="max-w-xl px-4 py-12 mx-auto">
                    <h1>{`${post.title}`}</h1>
                  </div>
                </div>
              </div>
              <div className="entry-content px-4 flex">
                <div className="md:basis-2/3">
                  <div className="max-w-3xl mx-auto">
                    <div id="article-text">
                      <PostBody content={post.content} />
                    </div>
                  </div>
                </div>
                <div className="hidden md:basis-1/3 md:block">
                  <div className="toc-container mt-6 sticky top-6 w-fit">
                    <div className="info">
                      <p className="headlines">Indholdsfortegnelse</p>
                      <div className="ib-toc-separator"></div>
                      <div id="toc" className="text ib-toc-container toc-table p-5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getPostAndMorePosts(params?.slug, preview, previewData)
  const menuItems = await getNavMenu('PRIMARY');
  const footerMenuItems = await getNavMenu('FOOTER');
  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
      menuItems,
      footerMenuItems,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts.edges.map(({ node }) => `/artikler/${node.slug}`) || [],
    fallback: true,
  }
}
