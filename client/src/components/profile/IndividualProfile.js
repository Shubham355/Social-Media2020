import React, { useState, useEffect, Fragment } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { getProfileByID, clearProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileData from './ProfileData';
import Spinner from '../layout/Spinner';
import ProfileNotFound from './ProfileNotFound';
import axios from 'axios';

const IndividualProfile = ({ match }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfileByID = async (userID) => {
    try {
      const res = await axios.get(`/api/profile/user/${userID}`);
      setLoading(false);
      setProfile(res.data);
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileByID(match.params.user_id);
  }, [getProfileByID, match]);

  return loading && profile === null ? (
    <Spinner />
  ) : profile !== null ? (
    <Fragment>
      <Link to='/dashboard' className='btn btn-light my-1'>
        Go Back
      </Link>

      <ProfileData profile={profile} />
    </Fragment>
  ) : (
    <Fragment>
      <ProfileNotFound />
    </Fragment>
  );
};

// IndividualProfile.propTypes = {
//   profile: PropTypes.object.isRequired,
//   getProfileByID: PropTypes.func.isRequired,
//   clearProfile: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => ({
//   profile: state.profile,
// });

export default IndividualProfile;
