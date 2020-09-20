import React, { useContext } from "react";
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { GiConwayLifeGlider } from "react-icons/gi";
import { MdReplay } from "react-icons/md";
import { BiShapeTriangle } from "react-icons/bi";
import { DataContext } from "../context";

const Buttons = () => {
  const context = useContext(DataContext);
  const {
    generateRandomCells,
    generatePulsar,
    clearAllGrid,
    runGame,
    isRunning,
    handleSpeed,
    speed,
    cellColor,
    handleCellColor,
  } = context;

  return (
    <div className="controlPanel">
      <div className="buttons">
        <button onClick={runGame}>
          {!isRunning ? <FaPlay size={20} /> : <FaStop size={20} />}
        </button>
        <button onClick={generateRandomCells}>
          <GiConwayLifeGlider size={20} />
        </button>
        <button onClick={generatePulsar}>
          <BiShapeTriangle size={20} />
        </button>
        <button onClick={clearAllGrid}>
          <MdReplay size={20} />
        </button>
      </div>
      <div className="slider">
        <label htmlFor="speed">{speed} ms</label>
        <input
          name="speed"
          type="range"
          min="100"
          max="1000"
          step="100"
          value={speed}
          onChange={(e) => handleSpeed(e.target.value)}
        />
      </div>
      <div>
        <input
          type="color"
          value={cellColor}
          onChange={(e) => handleCellColor(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Buttons;
