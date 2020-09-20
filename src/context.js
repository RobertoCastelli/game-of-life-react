import React, { useCallback, useEffect, useState } from "react";

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
  const [speed, setSpeed] = useState(100); // UPDATE SLIDER SPEED VALUE

  //--> RESET GRID, COUNTER, SPEED & STOP RUNNING SIMULATION
  const clearAllGrid = () => {
    setGrid(initialGrid);
    setCounter(0);
    setIsRunning(false);
    setSpeed(100);
  };

  //--> GENERATE RANDOM CELLS FOR THE LAZY BASTARDS :)
  const generateRandomCells = () => {
    setGrid(
      grid.map(() => {
        return {
          state: Math.random() < 0.5,
        };
      })
    );
  };

  //--> GENERATE PULSAR TO SHOW OFF (optional)
  const generatePulsar = () => {
    setCellState(
      grid.map((cell, id) => {
        [
          248,
          268,
          288,
          250,
          270,
          290,
          168,
          148,
          128,
          170,
          150,
          130,
          191,
          192,
          193,
          231,
          232,
          233,
          227,
          226,
          225,
          187,
          186,
          185,
          91,
          92,
          93,
          87,
          86,
          85,
          327,
          326,
          325,
          331,
          332,
          333,
          255,
          275,
          295,
          175,
          295,
          175,
          155,
          135,
          123,
          143,
          163,
          243,
          263,
          283,
        ].includes(id)
          ? (cell.state = true)
          : (cell.state = false);
        return cellState;
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

  //--> TOGGLE MUTATION SPEED
  const handleSpeed = (e) => setSpeed(e);

  //--> START/STOP CONWAY's GAME
  const runGame = () => (!isRunning ? setIsRunning(true) : setIsRunning(false));

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*\
  ||~~~~~~~~~~~~~~~| CORE MECHANICS |~~~~~~~~~~~~~~~||
  ||~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~||                              
  ||
  ||              [ ↖ ]  [ ↥ ]  [ ↗ ]
  ||              [ ↤ ] [CELL]  [ ↦ ]
  ||              [ ↙ ]  [ ↧ ]  [ ↘ ]
  ||                                                ||
  ||  1. CREATE A NEW GRID FROM PREVIOUS GRID       ||
  ||  2. COUNT ALIVE NEIGHBOURS FOR EVERY CELL      ||
  ||     (optional -> implement infinite border)    ||
  ||  3. APPLY CONWAY's RULES FOR EVERY CELL        ||
  ||  4. POPULATE NEW GRID w/ DEAD/ALIVE CELLS      ||
  ||  5. UPDATE PREVIOUS GRID w/ NEW GRID           ||
  ||  6. RINSE AND REPEAT (care for infinite loops) ||
  ||                                                ||  
  \*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  const nextGrid = useCallback(() => {
    //--> 1. CREATE NEW GRID
    let gridTemp = [...initialGrid];

    //--> 2. COUNT ALIVE NEIGHBOURS FOR EVERY CELL
    grid.map((cell, id) => {
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

      //--> 3. & 4. APPLY CONWAY's RULES & POPULATE NEW GRID
      // any live cell with two or three live neighbours survives. any dead cell
      if (cell.state && (aliveNeighbours === 2 || aliveNeighbours === 3)) {
        gridTemp[id].state = true;
      }
      // with three live neighbours becomes a live cell. all other live cells die
      if (!cell.state && aliveNeighbours === 3) {
        gridTemp[id].state = true;
        // INCREMENT COUNTER
        setCounter(counter + 1);
        cell.color = "red";
      }
      // All other live cells die in the next generation. Similarly, all other dead cells stay dead
      if (cell.state && (aliveNeighbours < 2 || aliveNeighbours >= 4)) {
        gridTemp[id].state = false;
      }
      return cell;
    });
    // --> 5. UPDATE GRID w/ NEW GRID
    setGrid(gridTemp);
  }, [counter, grid, initialGrid]);

  //--> 6. RINSE AND REPEAT
  useEffect(() => {
    if (isRunning) {
      let step = () => nextGrid();
      let timer = setTimeout(step, speed);
      return () => clearTimeout(timer);
    } else {
      return;
    }
  }, [isRunning, nextGrid, speed]);

  //--> RENDER
  return (
    <DataContext.Provider
      value={{
        grid,
        generateRandomCells,
        generatePulsar,
        clearAllGrid,
        toggleCellState,
        runGame,
        counter,
        isRunning,
        speed,
        handleSpeed,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default ContextProvider;
