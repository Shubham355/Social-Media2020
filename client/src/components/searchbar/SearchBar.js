import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';

const SearchBar = ({ getAllProfiles, profiles }) => {
  useEffect(() => {
    getAllProfiles();
    document.getElementById('searchBar').value = '';
  }, [getAllProfiles]);

  const matchList = document.getElementById('card');

  let matches = [];

  const handleChange = (e) => {
    if (e.length === 0) {
      matches = [];
      matchList.innerHTML = '';
    }

    let profileList = profiles.map((profile) => {
      if (profile.user !== null) {
        return profile.user;
      }
    });

    profileList = profileList.filter((list) => list !== undefined);

    if (e !== '') {
      // Get matches to current text input
      matches = profileList.filter((profile) => {
        const regex = new RegExp(`^${e}`, 'gi');
        if (profile.name.match(regex)) {
          return profile;
        }
      });

      if (matches.length > 0) {
        document.getElementById('card').style.borderWidth = '1px';
      }

      // console.log(matches);

      display_result(matches);
    } else {
      document.getElementById('card').style.borderWidth = '0px';
    }
  };

  const display_result = (matches) => {
    if (matches.length > 0) {
      console.log(matches);
      const html = matches
        .map(
          (match) =>
            `<div style="display:flex; margin-bottom:1rem">
            <div>
            <a href="/profile/${match._id}"><span><img style="margin-left: 2rem; border-radius:50%;  width: 30;
            height: 30; " src="${match.avatar}" alt="Profile Photo" width="40" height="40"></span></a>
            </div>
            <div style="padding-top: 0.6rem; padding-left:1rem">
            <a href="/profile/${match._id}"><span>${match.name}</span></a>
            </div>
            </div>`
        )
        .join('');

      matchList.innerHTML = html;
    }
  };

  return (
    <div id='searchWrapper'>
      <div class='input-icons'>
        <i className='fas fa-search icon' />
        <input
          id='searchBar'
          type='text'
          placeholder='Search'
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div className='centerDiv'>
        <div id='card'></div>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  profiles: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
});

export default connect(mapStateToProps, { getAllProfiles })(SearchBar);
