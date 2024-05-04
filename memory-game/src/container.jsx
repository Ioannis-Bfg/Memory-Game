import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/container.css";

function Container({
  updateScore,
  resetScore,
  checkHighScore,
  score,
  highScore,
}) {
  const [pokemon, setPokemon] = useState([]);
  const [displayPokemon, setDisplayPokemon] = useState([]);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [showWinModal, setShowWinModal] = useState(false);
  const audio = new Audio("../public/sounds/blink.mp3");
  const winAudio = new Audio("../public/sounds/win.mp3");
  const lossAudio = new Audio("../public/sounds/loss.mp3");

  useEffect(() => {
    fetchPokemon();
  }, []);

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

  function Modal({ onClose, children }) {
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          {children}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }
  const handleShowRandom = (pokemon_instance) => {
    if (score >= 9) {
      console.log("won");
      resetScore();
      fetchPokemon();
      winAudio.play();
      setShowWinModal(true); // Show the win modal instead of an alert
      return;
    }
    if (clickedPokemon.includes(pokemon_instance)) {
      console.log("lost");
      fetchPokemon();
      checkHighScore();
      console.log(score, highScore);
      resetScore();
      lossAudio.play();
      return;
    } else {
      {
        updateScore();
      }

      setClickedPokemon([...clickedPokemon, pokemon_instance]);
      audio.play();
      const randomPokemon = pokemon
        .sort(() => 0.5 - Math.random())
        .slice(0, 10); // Get a random assortment of 8 Pokémon
      setDisplayPokemon(randomPokemon);
      console.log(clickedPokemon);
    }
  };

  return (
    <div className="grid_wrapper">
      <div className="grid">
        {displayPokemon.map((pokemon_instance, index) => (
          <button
            key={crypto.randomUUID()}
            className="grid-item fade-in"
            onClick={() => handleShowRandom(pokemon_instance)}
          >
            <img
              className="pokemon_sprite"
              src={pokemon_instance.image}
              alt={pokemon_instance.name}
            />
            <h2>{pokemon_instance.name}</h2>
            <div className="types">
              {pokemon_instance.types.map((type) => (
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
      {showWinModal && (
        <Modal onClose={() => setShowWinModal(false)}>
          <p>You won! Click Close to restart the game with a new set</p>
        </Modal>
      )}
    </div>
  );
}

export default Container;
