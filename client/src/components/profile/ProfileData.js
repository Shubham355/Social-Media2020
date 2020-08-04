import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import ProfilePost from './ProfilePost';

const ProfileData = ({ profile, posts }) => {
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
    </div>
  );
};

ProfileData.propTypes = {
  profile: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
};

export default ProfileData;
