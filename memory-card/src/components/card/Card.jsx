import React, { useState } from "react";
import styles from "./Card.module.css";
import { useQuery } from "@tanstack/react-query";

// Function to fetch Pokémon data
const fetchPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Card = () => {
  const [isClicked, setIsClicked] = useState(false);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["pokemon"],
    queryFn: fetchPokemon,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
      <div onClick={handleClick}>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <img src={data.sprites.front_default} alt={data.name} />
      </div>
    </>
  );
};

export default Card;
