import React, { useContext } from "react";
import Buttons from "./Buttons";
import { DataContext } from "../context";

const Grid = () => {
  const context = useContext(DataContext);
  const { cells } = context;
  console.log(cells);

  return (
    <div className="grid">
      <div className="grid-wrapper">
        {cells.map((cell, id) => {
          return (
            <div
              key={id}
              className="grid-cell"
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
