import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ProfileData from './ProfileData';
import Spinner from '../layout/Spinner';
import ProfileNotFound from './ProfileNotFound';
import axios from 'axios';

const IndividualProfile = ({ match, history }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [posts, setPosts] = useState([]);

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

  const getParticularUserAllPosts = async (userID) => {
    try {
      const res = await axios.get(`/api/posts/user/${userID}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfileByID(match.params.user_id);
    getParticularUserAllPosts(match.params.user_id);
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : profile !== null ? (
    <Fragment>
      <Link
        onClick={() => {
          history.goBack();
        }}
        className='btn btn-light my-1'
      >
        Go Back
      </Link>

      <ProfileData profile={profile} posts={posts} />
    </Fragment>
  ) : (
    <Fragment>
      <ProfileNotFound />
    </Fragment>
  );
};

export default withRouter(IndividualProfile);
