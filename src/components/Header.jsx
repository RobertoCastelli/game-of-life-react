import React from "react";
import title from "../images/titlev2.png";
const Header = () => {
  return (
    <header>
      <img src={title} alt="title-img" />
      <div>conway's game of life</div>
    </header>
  );
};

export default Header;
