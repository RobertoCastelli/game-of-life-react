import React from "react";

const Rules = () => {
  return (
    <div className="rules">
      <br />
      <hr />
      <p>made with React by roberto castelli</p>
      <h3>gameplay</h3>
      <ul>
        <li>use mouse to create or destroy cells</li>
        <li>generate a radom grid with dead or alive cells</li>
        <li>generate a default pulsar (period 3) pattern</li>
        <li>use slider to toggle the speed mutation</li>
      </ul>
      <h3>legenda</h3>
      <ul>
        <li>born</li>
        <li>survived</li>
        <li>dead</li>
      </ul>
    </div>
  );
};

export default Rules;
