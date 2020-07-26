import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import ProfileActions from './ProfileActions';
import Spinner from '../layout/Spinner';
import ProfileData from './ProfileData';

const Profile = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    scrollToTop();
  }, [getCurrentProfile]);

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {/* <h1 className='large text-primary'>Profile</h1> */}
      {/* <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p> */}
      {profile !== null ? (
        <Fragment>
          <ProfileActions />
          <ProfileData profile={profile} />

          <div className='my-2'>
            <button onClick={() => deleteAccount()} className='btn btn-danger'>
              <i className='fas fa-user-minus'> Delete My Account</i>
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Profile
);
