import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Beer from "../icons/beer.webp";
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
const buttonContainer = {
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const buttonAnimate = {
  hidden: { x: -200 },
  show: {
    x: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const Header = ({ setCategory }) => {
  const [isMenu, setMenu] = useState(false);
  return (
    <AnimatePresence>
      <header className="header">
        <div className="logo">{/* <img src={Beer} alt="" /> */}</div>
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
        >
          <motion.div
            variants={buttonContainer}
            initial="hidden"
            animate="show"
            className="button-container"
          ></motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Header;
