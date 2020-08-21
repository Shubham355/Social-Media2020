import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import ProfilePost from './ProfilePost';
import { connect } from 'react-redux';
import { deleteAccount } from '../../actions/profile';
import swal from 'sweetalert';

const ProfileData = ({ profile, posts, auth: { user }, deleteAccount }) => {
  const customDelete = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover your account!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteAccount();
      }
    });
  };

  return (
    <div className='profile-gird my-1'>
      <ProfileTop profile={profile} />
      <ProfileAbout profile={profile} />

      <div className='profile-exp bg-white p-2'>
        <h2 className='text-primary'>Experience</h2>
        {profile.experience.length > 0 ? (
          <Fragment>
            {profile.experience.map((experience) => (
              <ProfileExperience key={experience._id} experience={experience} />
            ))}
          </Fragment>
        ) : (
          <h4>No Experience Credentials</h4>
        )}
      </div>

      <div className='profile-edu bg-white p-2'>
        <h2 className='text-primary'>Education</h2>
        {profile.education.length > 0 ? (
          <Fragment>
            {profile.education.map((education) => (
              <ProfileEducation key={education._id} education={education} />
            ))}
          </Fragment>
        ) : (
          <h4>No Education Credentials</h4>
        )}
      </div>

      {profile.githubusername && (
        <ProfileGithub username={profile.githubusername} />
      )}

      {/* {profile.githubusername && <ProfilePost />} */}
      {/* <ProfilePost posts={posts} /> */}

      {posts.length > 0 ? (
        <ProfilePost posts={posts} />
      ) : (
        <div className='profile-edu bg-white p-2'>
          <h2 className='text-primary'>Posts</h2>
          <h4>No Post Found</h4>
        </div>
      )}

      {user._id === profile.user._id && (
        <div className='my-2'>
          <button onClick={() => customDelete()} className='btn btn-danger'>
            <i className='fas fa-user-minus'> Delete My Account</i>
          </button>
        </div>
      )}
    </div>
  );
};

ProfileData.propTypes = {
  profile: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteAccount })(ProfileData);
