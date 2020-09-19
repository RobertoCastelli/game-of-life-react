import React, { useEffect, useState } from "react";

export const DataContext = React.createContext();

const ContextProvider = (props) => {
  //--> INITIAL GRID WITH ALL CELLS DEAD (STATE FALSE)
  const initialGrid = Array.from({ length: 400 }, () => ({
    state: false,
  }));

  //--> STATES
  const [grid, setGrid] = useState(initialGrid); // UPDATE GRID
  const [cellState, setCellState] = useState(false); // UPDATE CELL STATE (DEAD/ALIVE)
  const [counter, setCounter] = useState(0); // UPDATE COUNTER
  const [isRunning, setIsRunning] = useState(false); // UPDATE IF GAME IS RUNNING

  //--> CLEAR GRID, COUNTER & STOP RUNNING SIMULATION
  const clearAllGrid = () => {
    setGrid(initialGrid);
    setCounter(0);
    setIsRunning(false);
  };

  //--> GENERATE A RANDOM GRID FOR THE LAZY BASTARDS :)
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

  //--> START/STOP CONWAY's GAME
  const runGame = () => (!isRunning ? setIsRunning(true) : setIsRunning(false));

  //--> NEXT GENERATION GRID
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*\
  ||~~~~~~~~~~~~~~~ CORE MECHANICS ~~~~~~~~~~~~~~~~~||
  ||~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~||
  ||                                                ||
  ||              [ ↖ ]  [ ↥ ]  [ ↗ ]
  ||              [ ↤ ] [CELL]  [ ↦ ]
  ||              [ ↙ ]  [ ↧ ]  [ ↘ ]
  ||
  ||  1. COUNT ALIVE NEIGHBOURS FOR EVERY CELL      ||
  ||     TAKING CARE OF BORDERS                     ||
  ||  2. CREATE A NEW GRID FROM PREVIOUS GRID       ||
  ||  3. APPLY CONWAY's RULES FOR EVERY CELL        ||
  ||  4. POPULATE NEW GRID w/ DEAD/ALIVE CELLS      ||
  ||  5. UPDATE PREVIOUS GRID w/ NEW GRID           ||
  ||  6. RINSE AND REPEAT (care for infinite loops) ||
  ||                                                ||  
  \*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const nextGrid = () => {
    grid.map((cell, id) => {
      //--> 1. COUNT ALIVE NEIGHBOURS FOR EVERY CELL
      // ALIVE NEIGHBOURS INIT
      let aliveNeighbours = 0;

      // COUNT NEIGHBOURS AVOIDING TOP-BOTTOM BORDERS (!important)
      if (id >= 21 && id <= 378) {
        grid[id - 1].state && (aliveNeighbours += 1); //  [ ↤ ]
        grid[id + 1].state && (aliveNeighbours += 1); //  [ ↦ ]
        grid[id - 21].state && (aliveNeighbours += 1); // [ ↖ ]
        grid[id - 19].state && (aliveNeighbours += 1); // [ ↗ ]
        grid[id - 20].state && (aliveNeighbours += 1); // [ ↥ ]
        grid[id + 20].state && (aliveNeighbours += 1); // [ ↧ ]
        grid[id + 19].state && (aliveNeighbours += 1); // [ ↙ ]
        grid[id + 21].state && (aliveNeighbours += 1); // [ ↘ ]

        // INFINITE GRID EFFECT TOP BORDER (optional)
      } else if (id >= 1 && id <= 18) {
        grid[id - 1].state && (aliveNeighbours += 1); //   [ ↤ ]
        grid[id + 1].state && (aliveNeighbours += 1); //   [ ↦ ]
        grid[id + 379].state && (aliveNeighbours += 1); // [ ↖ ] <-< infinite borders
        grid[id + 381].state && (aliveNeighbours += 1); // [ ↗ ] <-< infinite borders
        grid[id + 380].state && (aliveNeighbours += 1); // [ ↥ ] <-< infinite borders
        grid[id + 20].state && (aliveNeighbours += 1); //  [ ↧ ]
        grid[id + 19].state && (aliveNeighbours += 1); //  [ ↙ ]
        grid[id + 21].state && (aliveNeighbours += 1); //  [ ↘ ]

        // INFINITE GRID EFFECT BOTTOM BORDER (optional)
      } else if (id >= 381 && id <= 398) {
        grid[id - 1].state && (aliveNeighbours += 1); //   [ ↤ ]
        grid[id + 1].state && (aliveNeighbours += 1); //   [ ↦ ]
        grid[id - 21].state && (aliveNeighbours += 1); //  [ ↖ ]
        grid[id - 19].state && (aliveNeighbours += 1); //  [ ↗ ]
        grid[id - 20].state && (aliveNeighbours += 1); //  [ ↥ ]
        grid[id - 380].state && (aliveNeighbours += 1); // [ ↧ ] <-< infinite borders
        grid[id - 381].state && (aliveNeighbours += 1); // [ ↙ ] <-< infinite borders
        grid[id - 379].state && (aliveNeighbours += 1); // [ ↘ ] <-< infinite borders
      }

      //--> 2. CREATE NEW EMPTY GRID
      let gridTemp = [...initialGrid];

      //--> 3. & 4. APPLY CONWAY's RULES & POPULATE NEW GRID
      // any live cell with two or three live neighbours survives. any dead cell
      if (cell.state && (aliveNeighbours === 2 || aliveNeighbours === 3)) {
        gridTemp[id].state = true;
      }
      // with three live neighbours becomes a live cell. all other live cells die
      if (!cell.state && aliveNeighbours === 3) {
        gridTemp[id].state = true;
      }
      // All other live cells die in the next generation. Similarly, all other dead cells stay dead
      if (cell.state && (aliveNeighbours < 2 || aliveNeighbours >= 4)) {
        gridTemp[id].state = false;
      }

      // --> 5. UPDATE GRID w/ NEW GRID
      return setGrid(gridTemp);
    });
  };

  useEffect(() => {
    if (isRunning) {
      console.log(isRunning);
      nextGrid();
      console.log(grid);
    } else {
      console.log(isRunning);
      return;
    }
  }, [isRunning]);

  // --> RENDER
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
