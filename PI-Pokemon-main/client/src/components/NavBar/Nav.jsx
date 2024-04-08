import React from 'react';

const Nav = ({ handleFilterType, handleFilterOrigin, handleSortAlphabetically, handleSortByAttack }) => {
  return (
    <div className="nav">
      <button onClick={handleFilterType}>Filter by Type</button>
      <button onClick={handleFilterOrigin}>Filter by Origin</button>
      <button onClick={handleSortAlphabetically}>Sort Alphabetically</button>
      <button onClick={handleSortByAttack}>Sort by Attack</button>
    </div>
  );
};

export default Nav;
