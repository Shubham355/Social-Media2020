import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCurrentProfile, addEducation } from '../../actions/profile';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import DisplayEducation from './DisplayEducation';
import Spinner from '../layout/Spinner';

const AddEducation = ({
  getCurrentProfile,
  profile: { profile, loading },
  addEducation,
  history,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
    setFormData({
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
    });
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any school or bootcamp that
        you have attended
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School'
            name='school'
            value={school}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree'
            name='degree'
            value={degree}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Field of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <h4>
            <input
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
            Current School
          </h4>
        </div>

        {!toDateDisabled && (
          <Fragment>
            <div className='form-group'>
              <h4>To Date</h4>
              <input
                type='date'
                name='to'
                value={to}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <div className='form-group'>
          <textarea
            placeholder='Description'
            name='description'
            value={description}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
      </form>

      <h1 className='large text-primary my-2'>Delete an Education</h1>

      {!loading && profile !== null && (
        <Fragment>
          <DisplayEducation education={profile.education} />
        </Fragment>
      )}

      <Link className='btn btn-light my-1' to='/profile'>
        Go Back
      </Link>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, addEducation })(
  withRouter(AddEducation)
);
