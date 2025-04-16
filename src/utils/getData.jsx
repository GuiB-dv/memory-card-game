// Generate random number between
const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate unique pokemon ids
const generatePokemonIds = (count, min = 1, max = 1025) => {
  const uniqueIds = new Set(); //set to ensure uniqueness

  while (uniqueIds.size < count) {
    const randomId = getRandomNumber(min, max);
    uniqueIds.add(randomId);
  }
  return Array.from(uniqueIds);
};

// Fetch api random pokemon
const fetchPokemon = async (pokemonId) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Fetch multiple pokemon
const fetchMultiplePokemon = async (count) => {
  const uniqueIds = generatePokemonIds(count);
  const pokemonData = await Promise.all(
    uniqueIds.map((id) => fetchPokemon(id))
  );
  return pokemonData;
};

export { fetchMultiplePokemon, fetchPokemon };
