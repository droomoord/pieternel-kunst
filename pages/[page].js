import { fetchPage, fetchPageTitles } from "../functions";
import Page from "../components/layout/Page";

export default function dynamicPage({ page, pageTitles }) {
  return <Page page={page} pageTitles={pageTitles} />;
}

// export async function getServerSideProps(context) {
//   const page = await fetchPage(context.params.page);
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
//     props: { page: page.data[0], pageTitles: pageTitles.data },
//   };
// }

export async function getStaticProps(context) {
  const page = await fetchPage(context.params.page);

  if (!page.data || page.data.length < 1) {
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
      page: page.data[0],
      pageTitles: pageTitles.data.concat({
        title: "Gallerij",
        slug: "gallerij",
      }),
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const { data } = await fetchPageTitles();

  return {
    paths: data.map((page) => {
      return {
        params: {
          page: page.slug,
        },
      };
    }),
    fallback: "blocking",
  };
}
