import React, { useContext } from "react";
import { DataContext } from "../context";

const Rules = () => {
  const context = useContext(DataContext);
  const { cellColor } = context;

  return (
    <div className="rules">
      <br />
      <hr />
      <h3>gameplay</h3>
      <ul className="gameplay">
        <li>use mouse to create or destroy cells</li>
        <li>generate a radom grid with dead/alive cells</li>
        <li>generate a default pulsar (period 3) pattern</li>
        <li>experiment adding cells while the game is running</li>

        <li>use slider to toggle the speed mutation</li>
        <li>choose a color for a better visual expirience</li>
      </ul>
      <h3>legenda</h3>
      <ul className="legenda">
        <li style={{ backgroundColor: cellColor }} className="rules-born"></li>
        <li
          style={{ backgroundColor: cellColor, opacity: 0.5 }}
          className="rules-survived"
        ></li>
        <li className="rules-dead"></li>
      </ul>
    </div>
  );
};

export default Rules;
