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
      pageTitles: [
        {
          title: "Exposities",
          slug: "",
        },
        ...pageTitles.data,
      ],
    },
  };
}

// import { fetchPage, fetchPageTitles } from "../functions";
// import Page from "../components/layout/Page";

// export default function dynamicPage({ page, pageTitles }) {
//   return (
//     <div>
//       <Page page={page} pageTitles={pageTitles} />
//     </div>
//   );
// }

// export async function getServerSideProps() {
//   const page = await fetchPage("home");
//   if (!page.data || page.data.length < 1) {
//     return {
//       notFound: true,
//     };
//   }
//   const pageTitles = await fetchPageTitles();
//   if (!pageTitles.data || pageTitles.data.length < 1) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       page: page.data[0],
//       pageTitles: pageTitles.data.concat({
//         title: "Exposities",
//         slug: "exposities",
//       }),
//     },
//   };
// }

// export async function getStaticProps(context) {
//   const { data } = await fetchPage('home');

//   if (!data || data.length < 1) {
//     return {
//       notFound: true,
//     };
//   }
//   const page = data[0];
//   return {
//     props: { page },
//     revalidate: 10,
//   };
// }

// export async function getStaticPaths() {
//   const { data } = await fetchPageTitles();
//   return {
//     paths: data.map((page) => {
//       return {
//         params: {
//           page: page.slug,
//         },
//       };
//     }),
//     fallback: "blocking",
//   };
// }
