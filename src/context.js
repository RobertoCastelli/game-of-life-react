import React, { useState } from "react";

export const DataContext = React.createContext();

const ContextProvider = (props) => {
  //--> INITIAL GRID WITH RANDOM STATE
  const initialGrid = Array.from({ length: 400 }, () => ({
    state: false,
  }));

  //--> STATES
  const [cells, setCells] = useState(initialGrid);

  //--> CLEAR GRID ON CLICK
  const clearAllCells = () => setCells(initialGrid);

  //--> GENERATE A RANDOM GRID ON CLICK
  const generateRandomCells = () => {
    setCells(
      cells.map(() => {
        return {
          state: Math.random() < 0.5,
        };
      })
    );
  };

  //--> CHANGE SINGLE CELL STATE (DEAD/ALIVE)
  const changeCellState = (index) => {
    document.getElementById(index).setAttribute("state", true);
  };

  return (
    <DataContext.Provider
      value={{
        cells,
        generateRandomCells,
        clearAllCells,
        changeCellState,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default ContextProvider;
