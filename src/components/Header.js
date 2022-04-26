import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navAnimate = {
  hidden: { y: -800 },
  show: {
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
  exit: {
    y: -800,
    transition: {
      duration: 0.6,
    },
  },
};
const Header = ({ setCategory }) => {
  const [isMenu, setMenu] = useState(false);
  return (
    <AnimatePresence>
      <header className="header">
        <div className="logo"></div>
        <div className="burger-container">
          <button onClick={() => setMenu(!isMenu)} className="burger">
            <div></div>
          </button>
        </div>
      </header>
      {isMenu && (
        <motion.nav
          key={"nav"}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={navAnimate}
          className="nav"
        ></motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Header;
