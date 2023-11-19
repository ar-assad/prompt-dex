// App.js

import React from "react";
import PokemonList from "./components/PokemonList";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <div className="app-content">
        <PokemonList />
      </div>
    </div>
  );
};

export default App;
