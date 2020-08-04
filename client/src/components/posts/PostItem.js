import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
  addLike,
  removeLike,
  dislike,
  removeDislike,
  deletePost,
} from '../../actions/post';
import swal from 'sweetalert';

const PostItem = ({
  addLike,
  removeLike,
  dislike,
  removeDislike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, dislikes, comments, date },
  showActions,
}) => {
  const customDelete = (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this post!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletePost(id);
      }
    });
  };

  const likeButton = (postId) => {
    likes.filter((like) => like.user === auth.user._id).length > 0
      ? removeLike(postId)
      : addLike(postId);
  };

  const dislikeButton = (postId) => {
    dislikes.filter((dislike) => dislike.user === auth.user._id).length > 0
      ? removeDislike(postId)
      : dislike(postId);
  };

  return (
    <div className='post bg-white p-1 my-1'>
      <div className="topPadding">
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4 className="topPadding">{name}</h4>
        </Link>
      </div>

      <div>
        <p className='my-1 centeredText'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        {showActions && (
          <Fragment>
            <button
              onClick={(e) => likeButton(_id)}
              type='button'
              className='btn btn-light mx-8percent'
            >
              {likes.filter((like) => like.user === auth.user._id).length >
              0 ? (
                <i className='fas fa-thumbs-up' />
              ) : (
                <i className='fa fa-thumbs-o-up'></i>
              )}{' '}
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button
              onClick={(e) => dislikeButton(_id)}
              type='button'
              className='btn btn-light mx-8percent'
            >
              {dislikes.filter((dislike) => dislike.user === auth.user._id)
                .length > 0 ? (
                <i className='fas fa-thumbs-down' />
              ) : (
                <i className='fa fa-thumbs-o-down'></i>
              )}{' '}
              {dislikes.length > 0 && <span>{dislikes.length}</span>}
            </button>
            <Link to={`/posts/${_id}`} className='btn mx-8percent'>
              <i className='fa fa-comment-o'></i>{' '}
              {comments.length > 0 && <span>{comments.length}</span>}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={(e) => customDelete(_id)}
                type='button'
                className='btn btn-danger mx-8percent'
              >
                <i className='fa fa-trash'></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  removeDislike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  dislike,
  removeDislike,
  deletePost,
})(PostItem);
