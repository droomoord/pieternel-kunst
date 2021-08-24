import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";

const Drawer = ({ drawerItems, closeDrawer }) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const page = router.asPath;
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div
      className={`h-screen z-10 w-screen bg-white m-0 pt-40 flex flex-col justify-start items-center gap-10 text-2xl fixed opacity-${
        mounted ? "1" : "0"
      } transition-opacity duration-300`}
    >
      {drawerItems.map((item) => {
        const active =
          (page === "/" && item.slug === "home") || "/" + item.slug === page;
        return active ? (
          <a
            onClick={closeDrawer}
            className="font-bold underline cursor-pointer"
            key={item.slug}
          >
            {item.title}
          </a>
        ) : (
          <Link key={item.slug} href={"/" + item.slug}>
            <a onClick={closeDrawer}>{item.title}</a>
          </Link>
        );
      })}
    </div>
  );
};

export default Drawer;
