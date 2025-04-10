import React from "react";
import styles from "./Header.module.css";

import pkbl from "../../assets/pkbl.png";

const Header = () => {
  return (
    <div className={styles.header}>
      <img src={pkbl} alt="pokeball" />
      Pokemon Memory Card Game
      <img src={pkbl} alt="pokeball" />
    </div>
  );
};

export default Header;
