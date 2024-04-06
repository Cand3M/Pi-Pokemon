import React from 'react';
import './CardsContainer.css';
import { Link } from 'react-router-dom';

function CardsContainer({ game, handleCardClick }) {
  const { id, name, image, genres, image_background } = game; 

  const handleClick = () => {
    handleCardClick(id);
  };

  return (
    <div className="video-game-card" onClick={handleClick}>
      {image ? <img src={image} alt={name} /> : <img src={image_background} alt={name} />}
      <Link to={`/detail/${id}`}>
      <h3>{name}</h3>
      </Link>
      <p>{genres && genres.map(genre => genre.name).join(', ')}</p>
    </div>
  );
}

export default CardsContainer;

