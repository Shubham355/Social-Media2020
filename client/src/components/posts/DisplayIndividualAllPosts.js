import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const DisplayIndividualAllPosts = ({ match, history }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getParticularUserAllPosts = async (userID) => {
    const res = await axios.get(`/api/posts/user/${userID}`);

    setPosts(res.data);
    setLoading(false);
  };

  useEffect(
    () => {
      getParticularUserAllPosts(match.params.user_id);
    },
    getParticularUserAllPosts,
    match
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link
        onClick={() => {
          history.goBack();
        }}
        className='btn btn-light my-1'
      >
        Go Back
      </Link>

      <div className='profile-posts'>
        <h2 className='text-primary my-1'>All Posts of {posts[0].name}</h2>
        {posts.length > 0 && (
          <Fragment>
            {posts.map((post) => (
              <div key={post._id} className='p_posts bg-white p-1 my-1'>
                <div>
                  <p>{post.text}</p>
                </div>
                <div>
                  <ul>
                    <li className='badge badge-light'>
                      <Link to={`/posts/${post._id}/likes`}>
                        Like: {post.likes.length}
                      </Link>
                    </li>
                    <li className='badge badge-light'>
                      <Link to={`/posts/${post._id}/dislikes`}>
                        Dislike: {post.dislikes.length}
                      </Link>
                    </li>
                    <li className='badge badge-light'>
                      <Link to={`/posts/${post._id}`}>
                        Comments: {post.comments.length}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default withRouter(DisplayIndividualAllPosts);
