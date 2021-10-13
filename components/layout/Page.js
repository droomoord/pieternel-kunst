import BlockContent from "@sanity/block-content-to-react";
import Navigation from "../layout/Navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "../../components/util/Spinner";
import classes from "./Style.module.css";
import InfoDrawer from "./InfoDrawer";

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

  const pageRender = loading ? (
    <Spinner />
  ) : (
    <>
      <InfoDrawer />
      <section className={classes.wrapper2}>
        <BlockContent
          className="block-content"
          blocks={page.body}
          projectId={projectId}
          dataset={dataset}
        ></BlockContent>
      </section>
    </>
  );

  return (
    <>
      <Navigation pageTitles={pageTitles} startLoading={startLoading} />
      <div className={classes.wrapper}>{pageRender}</div>
    </>
  );
};

export default Page;
