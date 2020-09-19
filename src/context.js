import React, { useState, useEffect, useCallback } from "react";

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
  const [isRunning, setIsRunning] = useState(false); // UPDATE IF GAME IS RUNNING

  //--> CLEAR GRID & COUNTER
  const clearAllGrid = () => {
    setGrid(initialGrid);
    setCounter(0);
    setIsRunning(false);
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
        console.log(index);
        return cellState;
      })
    );
  };

  //--> START/STOP CONWAY'S GAME
  const runGame = useCallback(() => {
    !isRunning ? setIsRunning(true) : setIsRunning(false);
  }, [isRunning]);

  //--> NEXT GENERATION GRID
  const nextGrid = useCallback(() => {
    grid.map((cell, id) => {
      // ALIVE NEIGHTBURS COUNT VARIABLE CONTAINER
      let aliveNeighburs = 0;

      // COUNT ALIVE NEIGHTBORS
      // [ ↖ ]  [ ↥ ]  [ ↗ ]
      // [ ↤ ] [INDEX] [ ↦ ]
      // [ ↙ ]  [ ↧ ]  [ ↘ ]

      // INFINITE GRID EFFECT TOP BORDER (optional)
      if (id >= 1 && id <= 18) {
        grid[id - 1].state && (aliveNeighburs += 1); // [ ↤ ]
        grid[id + 1].state && (aliveNeighburs += 1); // [ ↦ ]
        grid[id + 379].state && (aliveNeighburs += 1); // [ ↖ ]*
        grid[id + 381].state && (aliveNeighburs += 1); // [ ↗ ]*
        grid[id + 380].state && (aliveNeighburs += 1); // [ ↥ ]*
        grid[id + 20].state && (aliveNeighburs += 1); // [ ↧ ]
        grid[id + 19].state && (aliveNeighburs += 1); // [ ↙ ]
        grid[id + 21].state && (aliveNeighburs += 1); // [ ↘ ]

        // INFINITE GRID EFFECT BOTTOM BORDER (optional)
      } else if (id >= 381 && id <= 398) {
        grid[id - 1].state && (aliveNeighburs += 1); // [ ↤ ]
        grid[id + 1].state && (aliveNeighburs += 1); // [ ↦ ]
        grid[id - 21].state && (aliveNeighburs += 1); // [ ↖ ]
        grid[id - 19].state && (aliveNeighburs += 1); // [ ↗ ]
        grid[id - 20].state && (aliveNeighburs += 1); // [ ↥ ]
        grid[id - 380].state && (aliveNeighburs += 1); // [ ↧ ]*
        grid[id - 381].state && (aliveNeighburs += 1); // [ ↙ ]*
        grid[id - 379].state && (aliveNeighburs += 1); // [ ↘ ]*

        // MID GRID (!important)
      } else if (id >= 21 && id <= 378) {
        grid[id - 1].state && (aliveNeighburs += 1); // [ ↤ ]
        grid[id + 1].state && (aliveNeighburs += 1); // [ ↦ ]
        grid[id - 21].state && (aliveNeighburs += 1); // [ ↖ ]
        grid[id - 19].state && (aliveNeighburs += 1); // [ ↗ ]
        grid[id - 20].state && (aliveNeighburs += 1); // [ ↥ ]
        grid[id + 20].state && (aliveNeighburs += 1); // [ ↧ ]
        grid[id + 19].state && (aliveNeighburs += 1); // [ ↙ ]
        grid[id + 21].state && (aliveNeighburs += 1); // [ ↘ ]
      }

      // CREATE INITIAL GRID COPY
      let gridTemp = [...initialGrid];

      // APPLY CONWAY'S RULES ON GRID COPY
      // 1. any live cell with two or three live neighbours survives. any dead cell
      if (cell.state && (aliveNeighburs === 2 || aliveNeighburs === 3)) {
        gridTemp[id].state = true;
      }
      // 2. with three live neighbours becomes a live cell. all other live cells die
      if (!cell.state && aliveNeighburs === 3) {
        gridTemp[id].state = true;
        // setCounter(counter + 1);
      }
      // 3. All other live cells die in the next generation. Similarly, all other dead cells stay dead
      if (cell.state && (aliveNeighburs < 2 || aliveNeighburs >= 4)) {
        gridTemp[id].state = false;
      }
      // UPDATE GRID
      return setGrid(gridTemp);
    });
  }, [initialGrid, grid]);

  useEffect(() => {
    if (isRunning) {
      console.log(isRunning);
      nextGrid();
    } else {
      console.log(isRunning);

      return;
    }
  }, [isRunning, nextGrid]);

  return (
    <DataContext.Provider
      value={{
        grid,
        generateRandomGrid,
        clearAllGrid,
        toggleCellState,
        runGame,
        counter,
        isRunning,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default ContextProvider;
