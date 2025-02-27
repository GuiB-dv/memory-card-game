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

  useEffect(() => {
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.game}>
      {pokemonList.map((pokemon) => (
        <div key={pokemon.id} onClick={() => handleCardClick(pokemon.id)}>
          <Card pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
};

export default Game;
