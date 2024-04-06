import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);

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
        return { ...pokemon, image, types };
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
    setFilteredPokemons(
      pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemons]);

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokemon by name"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="pokemon-list">
        {currentPokemons.map(pokemon => (
          <div key={pokemon.id} className="pokemon-card">
            <Link to={`/pokemon/${pokemon.id}`}>
              <img src={pokemon.image} alt={pokemon.name} />
              <h3>{pokemon.name}</h3>
              <p>Types: {pokemon.types.join(', ')}</p>
            </Link>
          </div>
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
