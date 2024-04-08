// DetailPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DetailPage = ({ match }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const { params } = match;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
        setPokemon(response.data);
      } catch (error) {
        console.error('Error fetching pokemon details:', error);
      }
    };

    fetchPokemon();
  }, [match]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-details">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>ID: {pokemon.id}</p>
      <p>Vida: {pokemon.stats[0].base_stat}</p>
      <p>Ataque: {pokemon.stats[1].base_stat}</p>
      <p>Defensa: {pokemon.stats[2].base_stat}</p>
      {pokemon.stats.length > 5 && (
        <>
          <p>Velocidad: {pokemon.stats[5].base_stat}</p>
          <p>Altura: {pokemon.height}</p>
          <p>Peso: {pokemon.weight}</p>
        </>
      )}
      <div>
        <h4>Tipos:</h4>
        <ul>
          {pokemon.types.map((type, index) => (
            <li key={index}>{type.type.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailPage;
