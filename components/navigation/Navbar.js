import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = ({ navItems, clicked }) => {
  const router = useRouter();
  const page = router.asPath;

  return (
    <div className="w-screen h-20 bg-gray-100 flex justify-center items-center gap-10 fixed z-10">
      {navItems.map((item) => {
        const active =
          (page === "/" && item.slug === "home") || "/" + item.slug === page;
        return active ? (
          <Link key={item.slug} href={"/" + item.slug}>
            <a className="font-bold underline cursor-pointer uppercase">
              {item.title}
            </a>
          </Link>
        ) : (
          <Link key={item.slug} href={"/" + item.slug}>
            <a className="uppercase hover:underline">{item.title}</a>
          </Link>
        );
      })}
    </div>
  );
};
export default Navbar;
