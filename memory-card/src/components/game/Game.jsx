import React, { useEffect, useState } from "react";
import styles from "./Game.module.css";
import Card from "../card/Card";
import { fetchMultiplePokemon } from "../../utils/getData";
import { shuffleArray } from "../../utils/utils";

const Game = () => {
  const [level, setLevel] = useState(1);
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [overAllScore, setOverAllScore] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [highScore, setHighScore] = useState(0);

  const fetchData = async () => {
    try {
      const numberOfCards = level * 5;
      const data = await fetchMultiplePokemon(numberOfCards);
      setPokemonList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setScore(0);
  }, [level]);

  // Levels

  // Retrieve high score from localStorage on component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem("highScore");
    if (savedHighScore) {
      setHighScore(Number(savedHighScore)); // Convert string to number
    }
  }, []);

  // Save high score to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("highScore", highScore);
  }, [highScore]);

  // Shuffle the pokemonList array
  const shuffleCards = () => {
    const shuffledList = shuffleArray([...pokemonList]);
    setPokemonList(shuffledList);
  };

  // Handle card click
  const handleCardClick = (pokemonId) => {
    if (clickedCards.includes(pokemonId)) {
      restartGame();
    } else {
      setScore((prevScore) => prevScore + 1);
      setOverAllScore((prevOverAllScore) => prevOverAllScore + 1);
      console.log(`Clicked on Pokémon with ID: ${pokemonId}`);
      shuffleCards();
      setClickedCards((prevClickedCards) => [...prevClickedCards, pokemonId]);

      // Checks if player has finished current level
      if (score + 1 === level * 5) {
        setLevel((prevLevel) => prevLevel + 1); //move to the next level
      }
    }
  };

  // Restart the game
  const restartGame = () => {
    setGameOver(false);
    setPokemonList([]);
    setIsLoading(true);
    fetchData();
    setClickedCards([]);
    setScore(0);
    setOverAllScore(0);
    setLevel(1);
    setPokemonList([]);
    // Update high score if the current score is greater
    if (score > highScore) {
      setHighScore(score);
    }
  };

  // pop up if gameover
  useEffect(() => {
    if (gameOver) {
      const confirmRestart = window.confirm(
        `Game over! Do you want to restart?
        Max points ${score}`
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
      <div className={styles.score}>Score: {overAllScore}</div>
      <div className={styles.highScore}>Highscore: {highScore}</div>
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
