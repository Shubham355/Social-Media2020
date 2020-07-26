import React, { Fragment } from 'react';

const ProfileNotFound = () => {
  return (
    <Fragment>
      <h1 className='large text-primary'>
        <i className='fas fa-exclamation-triangle'></i> Profile Not Found
      </h1>
      <p className='lead'>Sorry, the user has not created the profile</p>
    </Fragment>
  );
};

export default ProfileNotFound;
