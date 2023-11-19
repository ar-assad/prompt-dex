// PokemonModal.js

import React, { useState, useEffect } from 'react';
import '../styles/PokemonModal.css';

const PokemonModal = ({ isOpen, onClose, pokemonName }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setNotFound(false); // Reset notFound state when the modal opens
    if (isOpen) {
      fetchPokemonDetails();
    }
  }, [isOpen, pokemonName]);

  const fetchPokemonDetails = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      const data = await response.json();
      setPokemonDetails(data);
    } catch (error) {
      setNotFound(true);
    }
  };

  const handleClose = () => {
    setPokemonDetails(null);
    setNotFound(false);
    onClose();
  };

  return (
    <div className={`pokemon-modal ${isOpen ? 'open' : 'closed'}`} onClick={handleClose}>
      {pokemonDetails && !notFound && (
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <h2>{pokemonDetails.name.toUpperCase()}</h2>
          <img
            src={pokemonDetails.sprites.front_default}
            alt={`${pokemonDetails.name} sprite`}
            className="pokemon-sprite"
          />
          <div className="type-container">
            <p>Types:</p>
            <div className="type-card">
              {pokemonDetails.types.map((type) => (
                <div key={type.type.name} className="type-item">
                  {type.type.name.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
          <p>Stats:</p>
          <table className="stats-table">
            <thead>
              <tr>
                <th className="stats-heading">Stat</th>
                <th className="stats-heading">Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemonDetails.stats.map((stat) => (
                <tr key={stat.stat.name} className="stats-row">
                  <td>{stat.stat.name.toUpperCase()}</td>
                  <td>{stat.base_stat}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="abilities-container">
            <p>Abilities:</p>
            <div className="ability-card">
              {pokemonDetails.abilities.map((ability) => (
                <div key={ability.ability.name} className="ability-item">
                  {ability.ability.name.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {notFound && (
        <div className="modal-content not-found" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <p>No such pokemon named {pokemonName} :(</p>
        </div>
      )}
    </div>
  );
};

export default PokemonModal;
