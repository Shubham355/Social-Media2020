import axios from 'axios';
// import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  UPDATE_DISLIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_CURRENT_USER_POSTS,
} from '../actions/types';
import swal from 'sweetalert';

// Get current user all posts
export const getCurrentUserAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts/user/me');

    dispatch({
      type: GET_CURRENT_USER_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all the posts of a particular user
export const getParticularUserAllPosts = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/user/${userId}`);

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, data: res.data },
    });
  } catch (err) {
    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    // }

    // swal({ title: 'Post already liked', icon: 'warning' });

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/removelike/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, data: res.data },
    });
  } catch (err) {
    // const errors = err.response.data.errors;

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Dislike
export const dislike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/dislike/${postId}`);

    dispatch({
      type: UPDATE_DISLIKES,
      payload: { postId, data: res.data },
    });
  } catch (err) {
    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    // }

    // swal({ title: 'Post already disliked', icon: 'warning' });

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove Dislike
export const removeDislike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/removedislike/${postId}`);

    dispatch({
      type: UPDATE_DISLIKES,
      payload: { postId, data: res.data },
    });
  } catch (err) {
    // const errors = err.response.data.errors;

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}`);

    dispatch({
      type: DELETE_POST,
      payload: postId,
    });

    swal({ title: 'Post Removed', icon: 'success' });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => swal({ title: error.msg, icon: 'error' }));
      // errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Post
export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    swal({ title: 'Post Created', icon: 'success' });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get post by id
export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    swal({ title: 'Comment Added', icon: 'success' });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    swal({ title: 'Comment Removed', icon: 'success' });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
