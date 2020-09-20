import React from "react";
import title from "../images/titlev2.png";
const Header = () => {
  return (
    <header>
      <img src={title} alt="title-img" />
      <div>
        <a
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          target="_blank"
          rel="noopener noreferrer"
        >
          consway's game of life
        </a>
      </div>

      <div className="rules">
        <p>
          The universe of the Game of Life is an infinite, two-dimensional
          orthogonal grid of square cells, each of which is in one of two
          possible states, live or dead. Every cell interacts with its eight
          neighbours, which are the cells that are horizontally, vertically, or
          diagonally adjacent. At each step in time, the following transitions
          occur:
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
            All other live cells die in the next generation. Similarly, all
            other dead cells stay dead
          </li>
        </ol>
      </div>
      <hr />
    </header>
  );
};

export default Header;
