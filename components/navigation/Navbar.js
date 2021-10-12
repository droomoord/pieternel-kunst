import Link from "next/link";
import { useRouter } from "next/router";
import classes from "./Navbar.module.css";

import { AiFillFacebook } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";

const Navbar = ({ navItems, clicked }) => {
  const router = useRouter();
  const page = router.asPath;

  return (
    <div
      className={`${classes.navbar} w-screen h-20 fixed z-10 grid grid-cols-12 border-b-2 border-gray-700`}
    >
      <div className="logo ml-5">
        <h1>
          <span className="text-primary italic text-base relative top-2">
            Ateliergalerie
          </span>
          <div className="w-full flex justify-between items-end">
            <span className="text-white">de</span>
            <span className="text-white text-5xl">Garage</span>
          </div>
        </h1>
      </div>

      <ul className="flex items-center justify-between col-start-3 col-end-11 lg:col-end-10 pl-16 lg:pl-10 gap-3 whitespace-nowrap">
        {navItems.map((item) => {
          const active = "/" + item.slug === page;
          return active ? (
            <li key={item.slug}>
              <Link href={"/" + item.slug}>
                <a
                  className={`${classes.active} text-xs font-bold text-primary uppercase no-underline  relative py-3`}
                >
                  {item.title}
                </a>
              </Link>
            </li>
          ) : (
            <li key={item.slug}>
              <Link href={"/" + item.slug}>
                <a
                  className={`${classes.link} text-xs font-bold text-white uppercase no-underline relative py-3`}
                >
                  {item.title}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="social col-start-11 col-end-13 flex justify-end items-center  lg:gap-2 pr-5 lg:pr-8">
        <AiFillFacebook className="text-4xl text-blue-700" />
        <AiFillInstagram className="text-4xl text-pink-500" />
        <AiFillLinkedin className="text-4xl text-blue-900" />
      </div>
    </div>
  );
};
export default Navbar;
