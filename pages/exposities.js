import { fetchPageTitles, fetchBlogPosts } from "../functions";
import Blog from "../components/layout/Blog";
import Head from "next/head";

export default function dynamicPage({ blogPosts, pageTitles }) {
  return (
    <>
      <Head>
        <title>de Garage - Exposities</title>
      </Head>
      <Blog blogPosts={blogPosts} pageTitles={pageTitles} />
    </>
  );
}

export async function getServerSideProps() {
  const blogPosts = await fetchBlogPosts();
  if (!blogPosts.data || blogPosts.data.length < 1) {
    return {
      notFound: true,
    };
  }
  const pageTitles = await fetchPageTitles();
  if (!pageTitles.data || pageTitles.data.length < 1) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blogPosts: blogPosts.data,
      pageTitles: pageTitles.data.concat({
        title: "Exposities",
        slug: "exposities",
      }),
    },
  };
}
