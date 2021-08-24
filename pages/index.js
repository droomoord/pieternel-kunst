import { fetchPage, fetchPageTitles } from "../functions";
import Page from "../components/layout/Page";

export default function dynamicPage({ page, pageTitles }) {
  return (
    <div>
      <Page page={page} pageTitles={pageTitles} />
    </div>
  );
}

export async function getServerSideProps() {
  const page = await fetchPage("home");
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
    props: { page: page.data[0], pageTitles: pageTitles.data },
  };
}

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
