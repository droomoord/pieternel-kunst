import Navbar from "../navigation/Navbar";
import Drawer from "../navigation/Drawer";
import { FaBars } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import classes from "./Navigation.module.css";

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
    <header>
      <div className="block md:hidden">
        <div
          className={`${classes.navigation} z-20 w-screen h-20 flex justify-between  items-center fixed bg-transparent`}
        >
          <div className={`${classes.logo} ml-2`}>
            <h1>
              <span className="text-primary italic text-base relative top-2">
                Ateliergalerie
              </span>
              <div className="w-full flex justify-between items-end">
                <span className="text-white">de</span>
                <span className="text-white text-3xl">Garage</span>
              </div>
            </h1>
          </div>

          <button
            className="z-20 border-2 border-black rounded p-1.5 bg-white m-2 w-12 h-12 flex justify-center items-center"
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
      <nav className="hidden md:block">
        <Navbar navItems={pageTitles} clicked={clicked} />
      </nav>
    </header>
  );
};

export default Navigation;
