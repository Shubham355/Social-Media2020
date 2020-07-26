import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCurrentProfile, addExperience } from '../../actions/profile';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import DisplayExperience from './DisplayExperience';

const AddExperience = ({ profile, addExperience, history }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
    setFormData({
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
    });
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add an Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any Developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Title'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
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
            Current Job
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
            placeholder='Job Description'
            name='description'
            value={description}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
      </form>

      <h1 className='large text-primary my-2'>Delete an Experience</h1>
      <DisplayExperience experience={profile.experience} />

      <Link className='btn btn-light my-1' to='/profile'>
        Go Back
      </Link>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { addExperience })(
  withRouter(AddExperience)
);
