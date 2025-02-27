import React, { useState } from "react";
import styles from "./Card.module.css";

const Card = ({ pokemon }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (isClicked) {
      // game over
      console.log("It is clicked already");
    } else {
      setIsClicked(true);
    }
  };

  return (
    <>
      <div className={styles.card} onClick={handleClick}>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h2>{pokemon.name}</h2>
      </div>
    </>
  );
};

export default Card;
