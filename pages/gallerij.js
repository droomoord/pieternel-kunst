import { fetchPageTitles, fetchBlogPosts } from "../functions";
import Blog from "../components/layout/Blog";

export default function dynamicPage({ blogPosts, pageTitles }) {
  return <Blog blogPosts={blogPosts} pageTitles={pageTitles} />;
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
    props: { blogPosts: blogPosts.data, pageTitles: pageTitles.data },
  };
}
