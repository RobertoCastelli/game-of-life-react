import React, { useContext } from "react";
import Buttons from "./Buttons";
import { DataContext } from "../context";

const Grid = () => {
  const context = useContext(DataContext);
  const { grid, toggleCellState, counter } = context;

  return (
    <div className="grid">
      <div className="counter">{counter}</div>
      <div className="grid-wrapper">
        {grid.map((cell, id) => {
          return (
            <div
              id={id}
              key={id}
              className="grid-cell"
              onClick={() => toggleCellState(id)}
              style={
                cell.state
                  ? { backgroundColor: "cadetblue" }
                  : { backgroundColor: "white" }
              }
            ></div>
          );
        })}
      </div>
      <Buttons />
    </div>
  );
};

export default Grid;
