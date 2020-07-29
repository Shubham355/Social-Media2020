import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = (props) => {
  return (
    <div id='searchWrapper'>
      <div class='input-icons'>
        <i className='fas fa-search icon' />
        <input id='searchBar' type='text' placeholder='Search' />
      </div>
    </div>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
