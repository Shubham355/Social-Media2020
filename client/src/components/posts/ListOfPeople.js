import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListOfPeople = ({ lists }) => {
  return lists.map((list) => (
    <div className='peopleList'>
      <div>
        <Link to={`/profile/${list.user.id}`}>
          <img
            src={list.user.avatar}
            alt='Profile Photo'
            className='round-img peopleListImage'
          />{' '}
        </Link>
      </div>
      <div className='peopleListName'>
        <Link to={`/profile/${list.user.id}`}>
          <span>{list.user.name}</span>
        </Link>
      </div>
    </div>
  ));
};

ListOfPeople.propTypes = {
  lists: PropTypes.object.isRequired,
};

export default ListOfPeople;
