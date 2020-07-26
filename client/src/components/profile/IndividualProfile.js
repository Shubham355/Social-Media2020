import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileByID, clearProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileData from './ProfileData';
import Spinner from '../layout/Spinner';
import ProfileNotFound from './ProfileNotFound';

const IndividualProfile = ({
  match,
  clearProfile,
  getProfileByID,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    clearProfile();
    getProfileByID(match.params.user_id);
    scrollToTop();
  }, [getProfileByID, match]);

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  return loading && profile === null ? (
    <Spinner />
  ) : profile === null ? (
    <Fragment>
      <ProfileNotFound />
    </Fragment>
  ) : (
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
  clearProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileByID, clearProfile })(
  IndividualProfile
);
