import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import PostItem from './PostItem';
import Spinner from '../layout/Spinner';
import { Link, withRouter } from 'react-router-dom';
import ListOfPeople from '../posts/ListOfPeople';

const DislikePage = ({ getPost, match, post: { post, loading }, history }) => {
  useEffect(() => {
    getPost(match.params.post_id);
  }, [getPost, match]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link
        onClick={() => {
          history.goBack();
        }}
        className='btn'
      >
        Go Back
      </Link>
      <PostItem post={post} showActions={false} />

      {post.dislikes.length > 0 ? (
        <Fragment>
          <p className='lead'>People who disliked this post :</p>
          <ListOfPeople lists={post.dislikes} />
        </Fragment>
      ) : (
        <Fragment>
          <p className='lead'>People who disliked this post :</p>
          <p className='lead'>None</p>
        </Fragment>
      )}
    </Fragment>
  );
};

DislikePage.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(withRouter(DislikePage));
