import React, { useState } from "react";

export const DataContext = React.createContext();

const ContextProvider = (props) => {
  const grid = Array.from({ length: 400 }, () => ({
    state: Math.random() < 0.5,
  }));

  const [cells, setCells] = useState(grid);

  const generateRandomCells = () => setCells([...grid]);

  return (
    <DataContext.Provider value={{ cells, generateRandomCells }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default ContextProvider;
