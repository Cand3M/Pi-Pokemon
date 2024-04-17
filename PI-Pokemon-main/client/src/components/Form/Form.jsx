import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';
import PokemonCard from '../Card/Card';

const Form = () => {
  const [pokemonData, setPokemonData] = useState({
    name: '',
    image: '',
    life: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: [],
  });

  const [createdPokemon, setCreatedPokemon] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Evita valores negativos para campos numéricos
    if (name === 'life' || name === 'attack' || name === 'defense' || name === 'speed' || name === 'height' || name === 'weight') {
      if (parseInt(value) < 0) return;
    }
    setPokemonData({ ...pokemonData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos
    if (!pokemonData.name || !pokemonData.image || !pokemonData.life || !pokemonData.attack || !pokemonData.defense) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Otras validaciones personalizadas
    // Por ejemplo, puedes verificar que los valores sean numéricos, que estén dentro de un rango específico, etc.
    // Aquí se puede agregar más lógica de validación según tus requisitos

    try {
      // Envía la solicitud al servidor para crear el nuevo Pokémon
      const response = await axios.post('http://localhost:3001/pokemons', pokemonData);
      const newPokemon = response.data;
      // Almacena el nuevo Pokémon creado en el estado para mostrarlo en la tarjeta
      setCreatedPokemon(newPokemon);
      // Muestra un mensaje de éxito y reinicia el formulario
      alert('Nuevo Pokémon creado exitosamente');
      setPokemonData({
        name: '',
        image: '',
        life: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: [],
      });
    } catch (error) {
      // Maneja los errores y muestra un mensaje al usuario
      console.error('Error al crear el nuevo Pokémon:', error);
      alert('Error al crear el nuevo Pokémon');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="name" value={pokemonData.name} onChange={handleChange} required />
        </label>
        <label>
          Imagen:
          <input type="text" name="image" value={pokemonData.image} onChange={handleChange} required />
        </label>
        <label>
          Vida:
          <input type="number" name="life" value={pokemonData.life} onChange={handleChange} required />
        </label>
        <label>
          Ataque:
          <input type="number" name="attack" value={pokemonData.attack} onChange={handleChange} required />
        </label>
        <label>
          Defensa:
          <input type="number" name="defense" value={pokemonData.defense} onChange={handleChange} required />
        </label>
        <label>
          Velocidad:
          <input type="number" name="speed" value={pokemonData.speed} onChange={handleChange} />
        </label>
        <label>
          Altura:
          <input type="number" name="height" value={pokemonData.height} onChange={handleChange} />
        </label>
        <label>
          Peso:
          <input type="number" name="weight" value={pokemonData.weight} onChange={handleChange} />
        </label>
        <button type="submit">Crear Pokémon</button>
      </form>
      {createdPokemon && (
        <div>
          <h2>Nuevo Pokémon Creado:</h2>
          <PokemonCard
            key={createdPokemon.id}
            pokemonId={createdPokemon.id}
            name={createdPokemon.name}
            image={createdPokemon.image}
            life={createdPokemon.life}
            attack={createdPokemon.attack}
            defense={createdPokemon.defense}
            speed={createdPokemon.speed}
            height={createdPokemon.height}
            weight={createdPokemon.weight}
            types={createdPokemon.types}
          />
        </div>
      )}
    </div>
  );
};

export default Form;
