import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar-edit';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Profile_Picture from './Profile_Picture';
// import 'bootstrap/dist/css/bootstrap.min.css';

const SetProfileImage = ({ user_id }) => {
  const [toggleDisplay, setToggleDisplay] = useState(false);

  return (
    <Fragment>
      <div className='edit-btn'>
        <button
          onClick={(e) => {
            setToggleDisplay(!toggleDisplay);
          }}
        >
          <i class='fa fa-pencil-square-o'></i>
        </button>
      </div>

      <Modal
        isOpen={toggleDisplay}
        toggle={() => {
          setToggleDisplay(!toggleDisplay);
        }}
      >
        <ModalHeader
          toggle={() => {
            setToggleDisplay(!toggleDisplay);
          }}
        ></ModalHeader>
        <ModalBody>
          <span className='lead'>Change Profile Image</span>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12'>
                <Profile_Picture
                  setToggleDisplay={setToggleDisplay}
                  toggleDisplay={toggleDisplay}
                  user_id={user_id}
                />
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

SetProfileImage.propTypes = {
  user_id: PropTypes.string.isRequired,
};

export default SetProfileImage;
