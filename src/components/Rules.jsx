import React from "react";

const Rules = () => {
  return (
    <div className="rules">
      <br />
      <hr />
      <p className="rules-description">
        The universe of the Game of Life is an infinite, two-dimensional
        orthogonal grid of square cells, each of which is in one of two possible
        states, live or dead. Every cell interacts with its eight neighbours,
        which are the cells that are horizontally, vertically, or diagonally
        adjacent. At each step in time, the following transitions occur:
      </p>
      <ol>
        <li>
          Any live cell with two or three live neighbours survives. Any dead
          cell
        </li>
        <li>
          with three live neighbours becomes a live cell. All other live cells
          die
        </li>
        <li>
          in the next generation. Similarly, all other dead cells stay dead.
        </li>
      </ol>
    </div>
  );
};

export default Rules;
