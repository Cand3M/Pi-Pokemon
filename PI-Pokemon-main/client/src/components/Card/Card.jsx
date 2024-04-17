import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Card.css'

const PokemonCard = ({ pokemonId }) => {
  const [pokemonInfo, setPokemonInfo] = useState(null);

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        setPokemonInfo(response.data);
      } catch (error) {
        console.error('Error fetching pokemon info:', error);
      }
    };

    fetchPokemonInfo();
  }, [pokemonId]);

  if (!pokemonInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-card">
      <Link to={`/pokemon/${pokemonInfo.id}`}>
        <img src={pokemonInfo.sprites.front_default} alt={pokemonInfo.name} />
        <h3>{pokemonInfo.name}</h3>
        <p>Types: {pokemonInfo.types.map(type => type.type.name).join(', ')}</p>
      </Link>
    </div>
  );
};

export default PokemonCard;
