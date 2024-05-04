import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/container.css";

function Container() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const offset = Math.floor(Math.random() * 1000); // Generate a random offset
      const url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`;
      const response = await axios.get(url);
      const pokemonData = await Promise.all(
        response.data.results.map(async (result) => {
          const pokemonResponse = await axios.get(result.url);
          return {
            name: pokemonResponse.data.name,
            image: pokemonResponse.data.sprites.front_default,
          };
        })
      );
      setPokemon(pokemonData);
    };

    fetchPokemon();
  }, []);

  return (
    <div className="grid_wrapper">
      <div className="grid">
        {pokemon.map((pokemon, index) => (
          <button key={index} className="grid-item">
            <img src={pokemon.image} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Container;
