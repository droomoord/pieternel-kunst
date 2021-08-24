import BlockContent from "@sanity/block-content-to-react";
import Head from "next/head";
import Navigation from "../layout/Navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "../../components/util/Spinner";

const Page = ({ page, pageTitles, startLoading }) => {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_DATASET;

  const [loading, setLoading] = useState(false);

  function startLoading() {
    setLoading(true);
  }

  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, [router.query.page]);

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

  const pageRender = loading ? (
    <Spinner />
  ) : (
    <section className="px-5 pt-28 md:px-10">
      <BlockContent
        className="block-content flex flex-col gap-10 overflow-hidden"
        blocks={page.body}
        projectId={projectId}
        dataset={dataset}
      ></BlockContent>
    </section>
  );

  return (
    <>
      <Head>
        <title>Boiler Plate - {page.title}</title>
        {metatags}
      </Head>
      <Navigation pageTitles={pageTitles} startLoading={startLoading} />
      {pageRender}
    </>
  );
};

export default Page;
