// HomePage.js
import React, { useState, useEffect } from 'react';
import PokemonCard from '../Card/Card';

const HomePage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState(null);
  const [filterByType, setFilterByType] = useState(null);

  const fetchPokemons = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const pokemonsData = data.results.slice(0, 100).map((pokemon, index) => ({
        id: index + 1,
        name: pokemon.name,
        url: pokemon.url
      }));

      // Obtener información adicional de cada pokemon
      const detailedPokemons = await Promise.all(pokemonsData.map(async pokemon => {
        const response = await fetch(pokemon.url);
        if (!response.ok) {
          throw new Error(`Failed to fetch data for pokemon ${pokemon.name}`);
        }
        const details = await response.json();
        const image = details.sprites.front_default;
        const types = details.types.map(type => type.type.name);
        const attack = details.stats.find(stat => stat.stat.name === 'attack').base_stat;
        return { ...pokemon, image, types, attack };
      }));

      setPokemons(detailedPokemons);
      setFilteredPokemons(detailedPokemons);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    let filtered = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterByType) {
      filtered = filtered.filter(pokemon =>
        pokemon.types.includes(filterByType)
      );
    }

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'attack') {
      filtered.sort((a, b) => b.attack - a.attack);
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, pokemons, filterByType, sortBy]);

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleTypeFilter = type => {
    setFilterByType(type);
    setCurrentPage(1);
  };

  const handleSort = option => {
    setSortBy(option);
    setCurrentPage(1);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokemon by name"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div>
        <button onClick={() => handleSort('name')}>Sort by Name</button>
        <button onClick={() => handleSort('attack')}>Sort by Attack</button>
      </div>
      <div>
        <h4>Filter by Type:</h4>
        <button onClick={() => handleTypeFilter('grass')}>Grass</button>
        <button onClick={() => handleTypeFilter('fire')}>Fire</button>
        <button onClick={() => handleTypeFilter('water')}>Water</button>
        <button onClick={() => handleTypeFilter('bug')}>Bug</button>
        <button onClick={() => handleTypeFilter('poison')}>Poison</button>
        <button onClick={() => handleTypeFilter('flying')}>Flying</button>
        <button onClick={() => handleTypeFilter('normal')}>Normal</button>
        
      </div>
      <div className="pokemon-list">
        {currentPokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemonId={pokemon.id} />
        ))}
      </div>
      <Pagination
        pokemonsPerPage={pokemonsPerPage}
        totalPokemons={filteredPokemons.length}
        paginate={paginate}
      />
    </div>
  );
};

const Pagination = ({ pokemonsPerPage, totalPokemons, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HomePage;
