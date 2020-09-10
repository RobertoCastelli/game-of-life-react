import React, { useState } from "react";

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

  //--> CLEAR GRID
  const clearAllGrid = () => setGrid(initialGrid);

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
    console.log(index);
  };

  //--> GENERATE NEXT GENERATION WITH CONWAY'S RULES
  const nextGrid = () => {
    grid.map((_, id) => {
      // INIT ALIVE NEIGHTBURS COUNT = 0
      let aliveNeighburs = 0;
      id = 42; //FIXME:
      // COUNT ALIVE NEIGHTBORS
      // [ TL ][ TC ][ TR ]
      // [ CL ][ CC ][ CR ]
      // [ BL ][ BC ][ BR ]
      grid[id - 1].state && (aliveNeighburs += 1);
      grid[id + 1].state && (aliveNeighburs += 1);
      grid[id - 21].state && (aliveNeighburs += 1);
      grid[id - 20].state && (aliveNeighburs += 1);
      grid[id - 19].state && (aliveNeighburs += 1);
      grid[id + 19].state && (aliveNeighburs += 1);
      grid[id + 20].state && (aliveNeighburs += 1);
      grid[id + 21].state && (aliveNeighburs += 1);
      console.log(aliveNeighburs);

      // APPLIE CONWAY'RULES
      // 1. any live cell with two or three live neighbours survives. any dead cell
      // 2. with three live neighbours becomes a live cell. all other live cells die
      // 3. in the next generation. similarly, all other dead cells stay dead.
      setCellState(aliveNeighburs === 3 && (grid[id].state = true));
      setCellState(
        aliveNeighburs === 2 && grid[id].state && (grid[id].state = true)
      );
      setCellState(
        (aliveNeighburs < 2 || aliveNeighburs >= 4) && (grid[id].state = false)
      );
      // COUNTER +1 EVERY CICLE GENERATION
      setCounter(counter + 1);
      return aliveNeighburs;
    });
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
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default ContextProvider;
