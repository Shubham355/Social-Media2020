import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileByID } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileData from './ProfileData';

const IndividualProfile = ({
  match,
  getProfileByID,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getProfileByID(match.params.user_id);
    scrollToTop();
  }, [getProfileByID]);

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  return (
    <Fragment>
      <Link to='/dashboard' className='btn btn-light my-1'>
        Go Back
      </Link>

      <ProfileData profile={profile} />
    </Fragment>
  );
};

IndividualProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByID: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileByID })(IndividualProfile);
