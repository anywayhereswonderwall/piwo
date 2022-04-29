import React from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { BiDrink, BiWine, BiBeer } from "react-icons/bi";

const openingHours = require("../data/openingHours.json");

const Modal = ({ modal, setModal }) => {
  const { open, address, placeId } = modal;
  let y = useSpring(0, { stiffness: 100 });

  const tempDay = new Date();
  let day = tempDay.getDay();
  const hours = openingHours[placeId];
  let openHour = undefined;
  let closeHour = undefined;
  if (hours) {
    openHour = hours[`${day}o`];
    closeHour = hours[`${day}c`];
    console.log(openHour);
  }
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key={"modal"}
          initial={{ y: 400 }}
          animate={{
            y: 0,
            transition: {
              duration: 0.8,
            },
          }}
          exit={{
            y: 400,
            transition: {
              duration: 0.8,
            },
          }}
          className="modal"
          style={{ y }}
          drag="y"
          dragConstraints={{ bottom: 0, top: 0 }}
          onDragEnd={() => {
            if (y.get() > 60) {
              setModal({ open: false });
            }
          }}
        >
          <button onClick={() => setModal(false)}>
            <AiOutlineClose />
          </button>
          <div className="content-container">
            <h2>{address}</h2>
            {openHour ? (
              <div className="hours">
                <p>
                  Godzina otwarcia: {Math.round(openHour / 100)}:
                  {openHour % 100 > 0 ? openHour % 100 : "00"}
                </p>
                <p>
                  Godzina zamknięcia: {Math.round(closeHour / 100)}:
                  {closeHour % 100 > 0 ? closeHour % 100 : "00"}
                </p>
              </div>
            ) : (
              <div className="hours">
                <p>Sklep nie udostępnia godzin otwarcia ;(</p>
              </div>
            )}
            <div className="icons">
              <BiBeer />
              <BiWine />
              <BiDrink />
            </div>
          </div>
          <div className="line"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
