import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { addLike, dislike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  dislike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, dislikes, comments, date },
  showActions,
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>

    <div>
      <p className='my-1'>{text}</p>
      <p className='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>

      {showActions && (
        <Fragment>
          <button
            onClick={(e) => addLike(_id)}
            type='button'
            className='btn btn-light'
          >
            {likes.filter((like) => like.user === auth.user._id).length > 0 ? (
              <i className='fas fa-thumbs-up' />
            ) : (
              <i className='fa fa-thumbs-o-up'></i>
            )}{' '}
            {likes.length > 0 && <span>{likes.length}</span>}
          </button>
          <button
            onClick={(e) => dislike(_id)}
            type='button'
            className='btn btn-light'
          >
            {dislikes.filter((dislike) => dislike.user === auth.user._id).length > 0 ? (
              <i className='fas fa-thumbs-down' />
            ) : (
              <i className='fa fa-thumbs-o-down'></i>
            )}{' '}
            {dislikes.length > 0 && <span>{dislikes.length}</span>}
          </button>
          <Link to={`/posts/${_id}`} className='btn'>
            <i className='fa fa-comment-o'></i>{' '}
            {comments.length > 0 && <span>{comments.length}</span>}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={(e) => deletePost(_id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times'></i>
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, dislike, deletePost })(
  PostItem
);
