import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import classes from "./Drawer.module.css";

const Drawer = ({ drawerItems, closeDrawer }) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const page = router.asPath;
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div
      className={`${
        classes.drawer
      } h-screen z-10 w-screen m-0 pt-20 flex flex-col justify-center items-center gap-5 text-2xl fixed opacity-${
        mounted ? "1" : "0"
      } transition-opacity duration-500`}
    >
      {drawerItems.map((item) => {
        const active = "/" + item.slug === page;
        return active ? (
          <a
            onClick={closeDrawer}
            className={`${classes.active} text-xs font-bold text-primary uppercase underline  relative py-3`}
            key={item.slug}
          >
            {item.title}
          </a>
        ) : (
          <Link key={item.slug} href={"/" + item.slug}>
            <a
              onClick={closeDrawer}
              className={`${classes.link} text-xs font-bold text-white uppercase no-underline relative py-3`}
            >
              {item.title}
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default Drawer;
