import Navigation from "../layout/Navigation";
import { useRouter } from "next/router";
import Head from "next/head";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";

const Blog = ({ blogPosts, pageTitles }) => {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_DATASET;

  const sanityClient = require("@sanity/client");
  const client = sanityClient({
    projectId,
    dataset,
    apiVersion: "v1", // use current UTC date - see "specifying API version"!
    token: "", // or leave blank for unauthenticated usage
    useCdn: true, // `false` if you want to ensure fresh data
  });

  function urlFor(source) {
    return builder.image(source);
  }

  const builder = imageUrlBuilder(client);

  const pageRender = (
    <section className="blog px-5 pt-28 md:px-10 md:flex md:flex-col md:items-center">
      {blogPosts.map((post) => {
        const imgs = post.images.map((image) => {
          return {
            src: urlFor(image).url(),
            key: image._key,
          };
        });
        console.log(post);

        return (
          <div
            key={post._id}
            className=" flex flex-col items-center md:block md:p-10 lg:px-52"
          >
            <h1 className="text-4xl text-center m-5">
              {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
            </h1>
            {post.date && (
              <small className="text-right block  font-bold">{post.date}</small>
            )}
            {post.description ? (
              <p className="text-center">{post.description}</p>
            ) : null}
            <div
              className={`p-10 flex flex-col gap-5 md:grid md:p-0 md:grid-cols-${
                imgs.length < 4 ? imgs.length : 4
              }`}
            >
              {imgs.map((image) => {
                return (
                  <div
                    key={image.key}
                    className="flex justify-center cursor-pointer"
                  >
                    <Image
                      onClick={() => window.open(image.src, "_blank").focus()}
                      src={image.src}
                      width={400}
                      height={400}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );

  return (
    <>
      <Head>
        <title>Boiler Plate - Blog</title>
      </Head>
      <Navigation pageTitles={pageTitles} />
      {pageRender}
    </>
  );
};

export default Blog;
