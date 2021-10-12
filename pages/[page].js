import { fetchPage, fetchPageTitles } from "../functions";
import Page from "../components/layout/Page";
import Head from "next/head";

export default function dynamicPage({ page, pageTitles }) {
  const metatags = page.metatags
    ? page.metatags.map((metatag) => {
        return (
          <meta
            name={metatag.name}
            content={metatag.content}
            key={metatag._key}
          />
        );
      })
    : null;
  return (
    <>
      <Head>
        <title>de Garage - {page.title}</title>
        {metatags}
      </Head>
      <Page page={page} pageTitles={pageTitles} />
    </>
  );
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
      pageTitles: [
        {
          title: "Exposities",
          slug: "",
        },
        ...pageTitles.data,
      ],
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
