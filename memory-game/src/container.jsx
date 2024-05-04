import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/container.css";

function Container() {
  const [pokemon, setPokemon] = useState([]);
  const [displayPokemon, setDisplayPokemon] = useState([]);
  const audio = new Audio("../public/sounds/blink.mp3");

  useEffect(() => {
    const fetchPokemon = async () => {
      const offset = Math.floor(Math.random() * 1000); // Generate a random offset
      const url = `https://pokeapi.co/api/v2/pokemon?limit=14&offset=${offset}`;
      const response = await axios.get(url);
      const pokemonData = await Promise.all(
        response.data.results.map(async (result) => {
          const pokemonResponse = await axios.get(result.url);
          return {
            name: pokemonResponse.data.name,
            image: pokemonResponse.data.sprites.front_default,
            types: pokemonResponse.data.types.map((type) => type.type.name),
          };
        })
      );
      setPokemon(pokemonData);
      setDisplayPokemon(pokemonData.slice(0, 10)); // Display the first 8 Pokémon
    };

    fetchPokemon();
  }, []);

  const handleShowRandom = () => {
    audio.play();
    const randomPokemon = pokemon.sort(() => 0.5 - Math.random()).slice(0, 10); // Get a random assortment of 8 Pokémon
    setDisplayPokemon(randomPokemon);
  };

  return (
    <div className="grid_wrapper">
      <div className="grid">
        {displayPokemon.map((pokemon, index) => (
          <button key={index} className="grid-item" onClick={handleShowRandom}>
            <img
              className="pokemon_sprite"
              src={pokemon.image}
              alt={pokemon.name}
            />
            <h2>{pokemon.name}</h2>
            <div className="types">
              {pokemon.types.map((type) => (
                <img
                  className="type-icon"
                  key={type}
                  src={`/public/types_icons/${type}.svg`}
                  alt={type}
                />
              )) || <span>Unknown</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Container;
