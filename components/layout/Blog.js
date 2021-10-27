import BlockContent from "@sanity/block-content-to-react";
import Navigation from "../layout/Navigation";
import imageUrlBuilder from "@sanity/image-url";
import InfoDrawer from "./InfoDrawer";
import Filter from "../Filter/Filter";
import ImageFull from "../util/ImageFull";

import { useEffect, useState } from "react";

import classes from "./Style.module.css";

const Blog = ({ blogPosts, pageTitles }) => {
  const [filteredBlogposts, setFilteredBlogposts] = useState(blogPosts);
  const [filterState, setFilterState] = useState("alle");
  const [showFullImage, setShowFullImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
    const today = new Date();
    switch (filterState) {
      case "alle":
        setFilteredBlogposts([
          ...blogPosts
            .filter((post) => {
              return today <= new Date(post.tot);
            })
            .sort((a, b) => {
              return new Date(a.van) - new Date(b.van);
            }),
          ...blogPosts
            .filter((post) => {
              return today >= new Date(post.tot);
            })
            .sort((a, b) => {
              return new Date(b.van) - new Date(a.van);
            }),
        ]);

        break;
      case "toekomst":
        setFilteredBlogposts([
          ...blogPosts
            .filter((post) => {
              return today <= new Date(post.tot);
            })
            .sort((a, b) => {
              return new Date(a.van) - new Date(b.van);
            }),
        ]);

        break;
      case "verleden":
        setFilteredBlogposts([
          ...blogPosts
            .filter((post) => {
              return today >= new Date(post.tot);
            })
            .sort((a, b) => {
              return new Date(b.van) - new Date(a.van);
            }),
        ]);

        break;
      default:
        break;
    }
  }, [filterState]);

  useEffect(() => {
    const blogPosts = document.querySelectorAll(".post");

    blogPosts.forEach((post) => {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            document
              .querySelector(`[data-id="${entry.target.dataset.id}"]`)
              .querySelectorAll("img")
              .forEach((image) => {
                image.setAttribute("src", image.dataset.src);
              });
        });
      });
      observer.observe(post);
    });
  }, [filteredBlogposts]);

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

  const months = [
    "jan",
    "feb",
    "mrt",
    "apr",
    "mei",
    "jun",
    "jul",
    "aug",
    "sep",
    "okt",
    "nov",
    "nov",
  ];

  const changed = function (e) {
    setFilterState(e.target.value);
  };

  const showImage = function (src) {
    window.history.forward();
    setImageUrl(src);
    setShowFullImage(true);
  };

  const pageRender = (
    <>
      <InfoDrawer filter changed={changed} />
      <div className={classes.mobilefilter}>
        <Filter changed={changed} />
      </div>
      <section className={classes.wrapper2}>
        {filteredBlogposts.map((post, index) => {
          const from = new Date(post.van);
          const to = new Date(post.tot);
          const imgs = post.images.map((image) => {
            return {
              src: urlFor(image).url(),
              key: image._key,
            };
          });
          return (
            <div
              key={post._id}
              data-id={index}
              className={`post ${classes.post}`}
            >
              <h1 className={classes.title}>
                {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
              </h1>
              <div className={classes.date}>
                {post.van ? (
                  <span>
                    <div>
                      {post.van && (
                        <div>
                          <span className={classes.big}>{from.getDate()}</span>{" "}
                          <span>{months[from.getMonth()]}</span>
                        </div>
                      )}
                      <span> tm </span>
                      {post.tot && (
                        <div>
                          <span className={classes.big}>{to.getDate()}</span>{" "}
                          <span>{months[to.getMonth()]}</span>{" "}
                          <div>{to.getFullYear()}</div>
                        </div>
                      )}
                    </div>
                  </span>
                ) : null}
              </div>
              <div>
                {post.description ? (
                  <>
                    <BlockContent
                      className={classes.description}
                      blocks={post.description}
                    ></BlockContent>
                  </>
                ) : null}
              </div>
              <div className={classes.images}>
                {imgs.map((image) => {
                  return (
                    <img
                      key={image.key}
                      data-src={image.src}
                      onClick={() => showImage(image.src)}
                      // onClick={() => window.open(image.src, "_blank").focus()}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );

  // LOADER:
  // <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 absolute top-1/2 left-1/2 z-0"></div>

  return (
    <>
      <Navigation pageTitles={pageTitles} />
      <div className={classes.wrapper}>{pageRender}</div>
      {showFullImage && (
        <ImageFull url={imageUrl} close={() => setShowFullImage(false)} />
      )}
    </>
  );
};

export default Blog;
