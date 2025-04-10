import React, { useEffect, useState } from "react";
import styles from "./Game.module.css";
import Card from "../card/Card";
import { fetchMultiplePokemon } from "../../utils/getData";
import { shuffleArray } from "../../utils/utils";
import Scorebar from "../scorebar/Scorebar";

import pkbl from "../../assets/pkbl.png";

const Game = () => {
  const [level, setLevel] = useState(1);
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [overAllScore, setOverAllScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchData = async () => {
    try {
      const numberOfCards = level * 5;
      const data = await fetchMultiplePokemon(numberOfCards);
      setPokemonList(data);
      console.log("level", level);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Series of actions when level is updated
  useEffect(() => {
    setClickedCards([]);
    setPokemonList([]);
    fetchData();
  }, [level]);

  // Trigger ANIMATION when cards are shuffled
  useEffect(() => {
    if (pokemonList.length > 0) {
      setIsAnimating(true); // Activate animation
      const timeout = setTimeout(() => {
        setIsAnimating(false); // Deactivate animation after it completes
      }, 500);
      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [pokemonList]);

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

  // SHUFFLE the pokemonList array
  const shuffleCards = () => {
    const shuffledList = shuffleArray([...pokemonList]);
    setPokemonList(shuffledList);
  };

  // Handle card click
  const handleCardClick = (pokemonId) => {
    if (clickedCards.includes(pokemonId)) {
      restartGame();
    } else {
      // Check if all cards in the current level have been clicked
      if (clickedCards.length + 1 === pokemonList.length) {
        setLevel((prevLevel) => prevLevel + 1); // Move to the next level
      }
      setOverAllScore((prevOverAllScore) => prevOverAllScore + 1);
      console.log(`Clicked on Pokémon with ID: ${pokemonId}`);
      shuffleCards();
      setClickedCards((prevClickedCards) => [...prevClickedCards, pokemonId]);
    }
  };

  // Restart the game
  const restartGame = () => {
    setGameOver(false);
    setLevel(1);
    setPokemonList([]);
    setIsLoading(true);
    setClickedCards([]);
    setOverAllScore(0);
    // Update high score if the current score is greater
    if (overAllScore > highScore) {
      setHighScore(overAllScore);
    }
    // Fetch data if level is one
    if (level === 1) {
      fetchData();
    }
  };

  // pop up if gameover

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.game}>
      <div className={styles.scoreboard}>
        <div className={styles.highScore}>
          <p>High score!</p>
          <p>{highScore}</p>
        </div>
        <div className={styles.score}>
          <p>Score: {overAllScore}</p>
          <p className={styles.lvl}>Lv: {level}</p>
          <Scorebar />
        </div>
      </div>
      <div className={styles.cardsContainer}>
        {pokemonList.map((pokemon) => (
          <div
            className={`${styles.card} ${
              isAnimating ? styles.flipAnimation : ""
            }`}
            key={pokemon.id}
          >
            <div
              className={styles.cardFront}
              onClick={() => handleCardClick(pokemon.id)}
            >
              <Card pokemon={pokemon} />
            </div>
            <div className={styles.cardBack}>
              <div className={styles.pkbl}>
                <img src={pkbl} alt="pokeball" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
