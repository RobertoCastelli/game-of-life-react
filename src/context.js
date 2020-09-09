import React, { useState } from "react";

export const DataContext = React.createContext();

const ContextProvider = (props) => {
  //--> GENERATE A RANDOM GRID
  const grid = Array.from({ length: 400 }, () => ({
    state: false,
  }));

  const [cells, setCells] = useState(grid);

  //--> GENERATE A RANDOM GRID
  const generateRandomCells = (e) => {
    e.preventDefault();
    setCells(
      grid.map(() => {
        return {
          state: Math.random() < 0.5,
        };
      })
    );
  };

  return (
    <DataContext.Provider value={{ cells, generateRandomCells }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default ContextProvider;
