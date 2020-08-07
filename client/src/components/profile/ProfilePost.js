import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfilePost = ({ posts }) => {
  return (
    <div className='profile-posts'>
      <h2 className='text-primary my-1'>Posts</h2>
      {posts.length > 3 ? (
        <Fragment>
          {posts.slice(0, 3).map((post) => (
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
          <div className='linkToRight'>
            <Link to={`/profile/all-posts/${posts[0].user}`}>
              See All Posts
            </Link>
          </div>
        </Fragment>
      ) : (
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
  );
};

ProfilePost.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default ProfilePost;
