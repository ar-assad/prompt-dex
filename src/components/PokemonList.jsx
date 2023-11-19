// PokemonList.js

import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import PokemonModal from "./PokemonModal";
import "../styles/PokemonList.css";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPokemonList();
  }, [offset]);

  const fetchPokemonList = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=15&offset=${offset}`
    );
    const data = await response.json();
    setPokemonList(data.results);
  };

  const handlePokemonClick = (name) => {
    setSelectedPokemon(name);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  const handleNextClick = () => {
    setOffset((prevOffset) => prevOffset + 15);
  };

  const handlePrevClick = () => {
    setOffset((prevOffset) => Math.max(0, prevOffset - 15));
  };

  const handleSearch = () => {
    // Convert the query to lowercase before searching
    const lowerCaseQuery = searchQuery.toLowerCase();
    if (lowerCaseQuery.trim() !== '') {
      setSelectedPokemon(lowerCaseQuery);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>PokeDex</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter Pokemon Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="pokemon-list">
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            onClick={handlePokemonClick}
          />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevClick} disabled={offset === 0}>
          Prev
        </button>
        <button onClick={handleNextClick}>Next</button>
      </div>
      <PokemonModal
        isOpen={selectedPokemon !== null}
        onClose={handleCloseModal}
        pokemonName={selectedPokemon}
      />
    </div>
  );
};

export default PokemonList;
