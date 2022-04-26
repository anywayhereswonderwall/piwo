import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const fetchPlaces = () => {};

const modalAnimate = {
  hidden: { y: 400 },
  show: {
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
  exit: {
    y: 400,
    transition: {
      duration: 0.6,
    },
  },
};
const Modal = ({ modal, setModal }) => {
  const { open, address, category, place_id } = modal;
  if (open)
    return (
      <AnimatePresence>
        <motion.div
          key={"modal"}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={modalAnimate}
          className="modal"
        >
          <div className="content-container">
            <h3>{address}</h3>
            <p>{place_id}</p>
          </div>
          <button onClick={() => setModal(false)}>close</button>
        </motion.div>
      </AnimatePresence>
    );
};

export default Modal;
