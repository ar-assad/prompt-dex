// PokemonCard.js

import React, { useState, useEffect } from "react";
import "../styles/PokemonCard.css";

const PokemonCard = ({ name, onClick }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    fetchPokemonDetails();
  }, [name]);

  const fetchPokemonDetails = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    setPokemonDetails(data);
  };

  return (
    <div className="pokemon-card" onClick={() => onClick(name)}>
      {pokemonDetails && (
        <>
          <img
            src={pokemonDetails.sprites.front_default}
            alt={`${name} sprite`}
            className="pokemon-sprite"
          />
          <p className="pokemon-name">{name}</p>
        </>
      )}
    </div>
  );
};

export default PokemonCard;
