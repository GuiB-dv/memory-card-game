import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";

const Card = ({ pokemon, onClick, onGameOver }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (isClicked) {
      // game over
      console.log("It is clicked already");
      onGameOver();
    } else {
      setIsClicked(true);
      onClick();
    }
  };

  return (
    <>
      <div className={styles.card} onClick={handleClick}>
        <img
          className={styles.img}
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <p className={styles.pkmnName}>{pokemon.name}</p>
      </div>
    </>
  );
};

export default Card;
