import axios from 'axios';
import {
  GET_PROFILE,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
} from './types';
// import { setAlert } from './alert';
import swal from 'sweetalert';

// Get  profile of current user
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by ID
export const getProfileByID = (userID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userID}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    // dispatch({ type: CLEAR_PROFILE });
  }
};

// Get Github Repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create/Update Profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      'Content-Type': 'application/json',
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    const title = edit ? 'Profile Updated' : 'Profile Created';
    swal({ title, icon: 'success' });

    // dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    history.push('/profile');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors.length === 2) {
      swal({ title: 'Status & Skills are required!', icon: 'warning' });
    } else {
      swal({ title: errors[0].msg, icon: 'warning' });
      // errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      'Content-Type': 'application/json',
    };

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    swal({ title: 'Experience Added', icon: 'success' });
    // dispatch(setAlert('Experience Added', 'success'));

    history.push('/add-experience');
  } catch (err) {
    // console.log(err)
    const errors = err.response.data.errors;

    if (errors.length === 3) {
      swal({
        title: 'Title, Company & From date are required!',
        icon: 'warning',
      });
    } else {
      if (errors.length === 2) {
        swal({ title: errors[0].msg, icon: 'warning' });
      } else {
        swal({ title: errors[0].msg, icon: 'warning' });
        // errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      'Content-Type': 'application/json',
    };

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    swal({ title: 'Education Added', icon: 'success' });
    // dispatch(setAlert('Education Added', 'success'));

    history.push('/add-education');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors.length === 4) {
      swal({
        title: 'School name, Degree, Field Of Study & From date are required!',
        icon: 'warning',
      });
    } else {
      if (errors.length === 3) {
        swal({ title: errors[0].msg, icon: 'warning' });
      } else {
        if (errors.length === 2) {
          swal({ title: errors[0].msg, icon: 'warning' });
        } else {
          swal({ title: errors[0].msg, icon: 'warning' });
          // errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
      }
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    swal({ title: 'Experience Removed', icon: 'success' });

    // dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    swal({ title: 'Education Removed', icon: 'success' });
    // dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Account & Profile
export const deleteAccount = () => async (dispatch) => {
  try {
    await axios.delete('/api/profile');

    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: ACCOUNT_DELETED });

    swal({
      title: 'Your Account has been permanently deleted',
      icon: 'success',
    });
    // dispatch(setAlert('Your Account has been permanently deleted', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Clear Profile
export const clearProfile = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
};
