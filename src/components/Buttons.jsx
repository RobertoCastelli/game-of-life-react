import React, { useContext } from "react";
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { GiConwayLifeGlider } from "react-icons/gi";
import { HiX } from "react-icons/hi";
import { DataContext } from "../context";

const Buttons = () => {
  const context = useContext(DataContext);
  const { generateRandomCells, clearAllCells } = context;

  return (
    <div className="buttons">
      <button>
        <FaPlay />
      </button>
      <button>
        <FaStop />
      </button>
      <button onClick={generateRandomCells}>
        <GiConwayLifeGlider />
      </button>
      <button onClick={clearAllCells}>
        <HiX />
      </button>
      <button disabled className="counter">
        10
      </button>
    </div>
  );
};

export default Buttons;
