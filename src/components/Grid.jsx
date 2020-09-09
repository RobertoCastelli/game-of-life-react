import React, { useContext } from "react";
import Buttons from "./Buttons";
import { DataContext } from "../context";

const Grid = () => {
  const context = useContext(DataContext);
  const { cells, changeCellState } = context;

  return (
    <div className="grid">
      <div className="grid-wrapper">
        {cells.map((cell, id) => {
          return (
            <div
              id={id}
              key={id}
              className="grid-cell"
              onClick={() => changeCellState(id)}
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
