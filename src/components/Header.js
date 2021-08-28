import React, { useState } from "react";
import poketitle from "../assets/poketitle.png";

const Header = () => {
  const [styleBtnUp, setStyleBtnUp] = useState("none");

  const handleUp = () => {
    window.scrollTo(0, 0);
  };

  window.addEventListener("scroll", () => {
    window.scrollY < 350 ? setStyleBtnUp("none") : setStyleBtnUp("block");
  });

  return (
    <header>
      <img className="poketitle" src={poketitle} alt="pokemon-logo" />

      <button
        className="up-btn"
        style={{ display: styleBtnUp }}
        onClick={handleUp}
      >
        UP
      </button>
    </header>
  );
};

export default Header;
