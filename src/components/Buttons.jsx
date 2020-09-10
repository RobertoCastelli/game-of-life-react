import React, { useContext } from "react";
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { GiConwayLifeGlider } from "react-icons/gi";
import { HiX } from "react-icons/hi";
import { DataContext } from "../context";

const Buttons = () => {
  const context = useContext(DataContext);
  const { generateRandomGrid, clearAllGrid, nextGrid, counter } = context;

  return (
    <div className="buttons">
      <button onClick={nextGrid}>
        <FaPlay />
      </button>
      <button>
        <FaStop />
      </button>
      <button onClick={generateRandomGrid}>
        <GiConwayLifeGlider />
      </button>
      <button onClick={clearAllGrid}>
        <HiX />
      </button>
      <button disabled className="counter">
        {counter}
      </button>
    </div>
  );
};

export default Buttons;
