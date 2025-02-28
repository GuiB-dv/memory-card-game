import React, { useEffect, useState } from "react";
import styles from "./Game.module.css";
import Card from "../card/Card";
import { fetchMultiplePokemon } from "../../utils/getData";
import { shuffleArray } from "../../utils/utils";

const Game = () => {
  const levelOne = 5;
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const fetchData = async () => {
    try {
      const data = await fetchMultiplePokemon(levelOne);
      setPokemonList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Shuffle the pokemonList array
  const shuffleCards = () => {
    const shuffledList = shuffleArray([...pokemonList]);
    setPokemonList(shuffledList);
  };

  // Handle card click
  const handleCardClick = (pokemonId) => {
    console.log(`Clicked on Pokémon with ID: ${pokemonId}`);
    shuffleCards(); // Shuffle the cards
  };

  // Restart the game
  const restartGame = () => {
    setGameOver(false);
    setPokemonList([]);
    setIsLoading(true);
    fetchData();
  };

  // Check if the game is over
  useEffect(() => {
    if (gameOver) {
      restartGame();
    }
  }, [gameOver]);

  // pop up if gameover
  useEffect(() => {
    if (gameOver) {
      const confirmRestart = window.confirm(
        "Game over! Do you want to restart?"
      );
      if (confirmRestart) {
        restartGame();
      }
    }
  }, [gameOver]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.game}>
      {pokemonList.map((pokemon) => (
        <div key={pokemon.id}>
          <Card
            pokemon={pokemon}
            onClick={() => handleCardClick(pokemon.id)}
            onGameOver={() => setGameOver(true)}
          />
        </div>
      ))}
    </div>
  );
};

export default Game;
