import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
// import { getCurrentUserAllPosts } from '../../actions/post';

const ProfilePost = ({ posts }) => {
  return (
    <div className='profile-posts'>
      <h2 className='text-primary my-1'>Posts</h2>
      {posts.length > 0 &&
        posts.map((post) => (
          <div key={post._id} className='p_posts bg-white p-1 my-1'>
            <div>
              {/* <h4>
            <a
              href="#!"
              target='_blank'
              rel='noopener noreferrer'
            >
              {repo.name}
            </a>
          </h4> */}
              <p>{post.text}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-light'>Like: {post.likes.length}</li>
                <li className='badge badge-light'>
                  Dislike: {post.dislikes.length}
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
    </div>
  );
};

ProfilePost.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default ProfilePost;
