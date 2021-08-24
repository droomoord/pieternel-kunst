import Navbar from "../navigation/Navbar";
import Drawer from "../navigation/Drawer";
import { FaBars } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

import { useState } from "react";

const Navigation = ({ pageTitles }) => {
  const [drawer, setDrawer] = useState(false);

  function clicked() {
    if (drawer) setDrawer(false);
  }
  function clickHandler() {
    setDrawer(!drawer);
  }
  return (
    <>
      <nav>
        <div className="block md:hidden">
          <div className="z-20 border-b-2 w-screen h-20 flex justify-end items-center fixed bg-white">
            <button
              className="z-20 border-2 border-black rounded p-1.5 bg-gray-100 m-2 w-14 h-14 flex justify-center items-center"
              onClick={clickHandler}
            >
              {drawer ? <GrClose size="2em"></GrClose> : <FaBars size="2em" />}
            </button>
          </div>
          {drawer && (
            <Drawer
              drawerItems={pageTitles}
              clicked={clicked}
              closeDrawer={clickHandler}
            />
          )}
        </div>
        <div className="hidden md:block">
          <Navbar navItems={pageTitles} clicked={clicked} />
        </div>
      </nav>
    </>
  );
};

export default Navigation;
