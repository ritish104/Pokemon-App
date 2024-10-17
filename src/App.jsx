
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };
    fetchPokemon();
  }, []);


  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Pokemon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="card-container">
        {filteredPokemon.length ? (
          filteredPokemon.map((pokemon, index) => (
            <Card key={index} pokemon={pokemon} />
          ))
        ) : (
          <p>No Pokémon found</p>
        )}
      </div>
    </div>
  );
};

const Card = ({ pokemon }) => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await axios.get(pokemon.url);
      setPokemonData(response.data);
    };
    fetchPokemonData();
  }, [pokemon.url]);

  return (
    <div className="card">
      {pokemonData ? (
        <>
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemon.name}
            className="pokemon-image"
          />
          <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
