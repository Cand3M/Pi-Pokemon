import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className="pokemon-details">
      <img src={pokemonInfo.sprites.front_default} alt={pokemonInfo.name} />
      <div>
        <h4>Types:</h4>
        <ul>
          {pokemonInfo.types.map((type, index) => (
            <li key={index}>{type.type.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonCard;
