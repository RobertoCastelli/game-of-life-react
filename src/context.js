import React, { useState } from "react";

export const DataContext = React.createContext();

const ContextProvider = (props) => {
  //--> INITIAL GRID WITH STATE FALSE
  const initialGrid = Array.from({ length: 400 }, () => ({
    state: false,
  }));

  //--> STATES
  const [cells, setCells] = useState(initialGrid);
  const [cellState, setCellState] = useState(false);

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

  //--> TOGGLE SINGLE CELL STATE (DEAD/ALIVE)
  const toggleCellState = (index) => {
    setCellState(
      cells.map((cell, id) => {
        if (index === id) {
          cell.state = !cell.state;
        }
        return cellState;
      })
    );
  };

  return (
    <DataContext.Provider
      value={{
        cells,
        generateRandomCells,
        clearAllCells,
        toggleCellState,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default ContextProvider;
