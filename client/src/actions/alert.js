import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';
// import swal from 'sweetalert';

export const setAlert = (msg, alertType, timeout = 3000) => (dispatch) => {
  const id = uuid();

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

// export const confirmDelete = () => {
//   swal({
//     title: 'Are you sure?',
//     text: 'Once deleted, you will not be able to recover this post!',
//     icon: 'warning',
//     buttons: true,
//     dangerMode: true,
//   }).then((willDelete) => {
//     if(willDelete) {
//       try {
//         await axios.delete(`/api/posts/${postId}`);

//         dispatch({
//           type: DELETE_POST,
//           payload: postId,
//         });

//         dispatch(setAlert('Post Removed', 'success'));
//       } catch (err) {
//         const errors = err.response.data.errors;

//         if (errors) {
//           errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//         }

//         dispatch({
//           type: POST_ERROR,
//           payload: { msg: err.response.statusText, status: err.response.status },
//         });
//       }
//     }
//   });
// };

// export const customAlert = (title, text, icon, button = 'OK') => {
//   swal({
//     title,
//     text,
//     icon,
//     button,
//   });
// };
