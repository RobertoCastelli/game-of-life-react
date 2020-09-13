import React, { useEffect, useState } from "react";

export const DataContext = React.createContext();

const ContextProvider = (props) => {
  //--> INITIAL GRID WITH STATE FALSE
  const initialGrid = Array.from({ length: 400 }, () => ({
    state: false,
  }));

  //--> STATES
  const [grid, setGrid] = useState(initialGrid); // UPDATE GRID
  const [cellState, setCellState] = useState(false); // UPDATE BOOLEAN CELL STATE --> DEAD/ALIVE
  const [counter, setCounter] = useState(0); // UPDATE STEP GENERATION COUNTER
  const [isRunning, setIsRunning] = useState(false);

  //--> CLEAR GRID & COUNTER
  const clearAllGrid = () => {
    setGrid(initialGrid);
    setCounter(0);
  };

  //--> GENERATE A RANDOM GRID
  const generateRandomGrid = () => {
    setGrid(
      grid.map(() => {
        return {
          state: Math.random() < 0.5,
        };
      })
    );
  };

  //--> TOGGLE SINGLE CELL STATE (DEAD/ALIVE)
  const toggleCellState = (index) => {
    setCellState(
      grid.map((cell, id) => {
        if (index === id) {
          cell.state = !cell.state;
        }
        return cellState;
      })
    );
  };

  //--> GENERATE NEXT GENERATION WITH CONWAY'S RULES
  const nextGrid = () => {
    setIsRunning(!isRunning);

    while (!isRunning) {
      grid.map((cell, id) => {
        // INIT ALIVE NEIGHTBURS COUNT = 0
        let aliveNeighburs = 0;
        // EXCLUDE BORDERS
        if (id >= 21 && id <= 378) {
          // COUNT ALIVE NEIGHTBORS
          // [ ↖ ]  [ ↥ ]  [ ↗ ]
          // [ ↤ ] [INDEX] [ ↦ ]
          // [ ↙ ]  [ ↧ ]  [ ↘ ]
          grid[id - 1].state && (aliveNeighburs += 1); //  [ ↤ ]
          grid[id + 1].state && (aliveNeighburs += 1); //  [ ↦ ]
          grid[id - 21].state && (aliveNeighburs += 1); // [ ↖ ]
          grid[id - 19].state && (aliveNeighburs += 1); // [ ↗ ]
          grid[id - 20].state && (aliveNeighburs += 1); // [ ↥ ]
          grid[id + 20].state && (aliveNeighburs += 1); // [ ↧ ]
          grid[id + 19].state && (aliveNeighburs += 1); // [ ↙ ]
          grid[id + 21].state && (aliveNeighburs += 1); // [ ↘ ]
        }

        // APPLIE CONWAY'RULES
        // SET GRID COPY
        let gridTemp = [...initialGrid];

        // 1. any live cell with two or three live neighbours survives. any dead cell
        if (cell.state && (aliveNeighburs === 2 || aliveNeighburs === 3)) {
          gridTemp[id].state = true;
        }
        // 2. with three live neighbours becomes a live cell. all other live cells die
        if (!cell.state && aliveNeighburs === 3) {
          gridTemp[id].state = true;
          setCounter(counter + 1);
        }
        // 3. All other live cells die in the next generation. Similarly, all other dead cells stay dead
        if (cell.state && (aliveNeighburs < 2 || aliveNeighburs >= 4)) {
          gridTemp[id].state = false;
        }

        setGrid(gridTemp);
        return gridTemp;
      });
    }
  };

  return (
    <DataContext.Provider
      value={{
        grid,
        generateRandomGrid,
        clearAllGrid,
        toggleCellState,
        nextGrid,
        counter,
        isRunning,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default ContextProvider;
