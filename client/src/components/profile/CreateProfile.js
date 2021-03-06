import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import SetProfileImage from '../profile_image/setProfileImage';

const CreateProfile = ({ createProfile, history, auth }) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
    githubusername: '',
    youtube: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      {/* <div className='edit-profile-image p-1'>
        <div className='image-edit'>
          <img className='round-img my-1' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAWJElEQVR4Xu2d6dMUNRCHF+8DD0RFQbxRUUAt//+PfrFKRVRAwAtPUHm9X2+tJ/pb+x1mdqd3kplkNlO1te+RyWQ6z3S6O53MvldfffXvRT2qBCaSwL4K4ESSr5cNEqgAVhAmlUAFcFLx14tXACsDk0qgAjip+OvFK4CVgUklUAGcVPz14hXAysCkEqgATir+evEKYGVgUglUACcVf714BbAyMKkEKoCTir9evAJYGZhUAhXAScVfL14BrAxMKoEK4KTirxevAFYGJpVABXBS8deLVwArA5NKoAI4qfjrxSuAlYFJJVABnFT89eIVwMrApBKoAE4q/nrxCmBlYFIJVAAnFX+9+NYC+Pff/26Jc8MNNyz4mc++ffvCR79bPFROf9P5+m5Dibp0DX7+888/Q90cupauZ89XW7YBz60FkI7/66+/Fr///vvipptuWtxyyy3hd74B5bfffgu/C6A777wzlLvtttvC59Zbb13ceOONASTKU88ff/wRPt9///3il19+CT8DE/ByLj9TJ+UtmAJOcFKWcrr+nEHcagCloehoq8mA8O677w4fwON3gFt1WM1JfcAHhD/99NPixx9/XP4s7desC0gBk8/NN98c/l0BnPGjBzB0urQggD344IOLAwcOBOD4oOEEAmDoHM6z8DbFRFnKcD5gC6zd3d3Ft99+u/jmm28WP//883LYpwzQ8Q24nMtnG46t1YCAB0R33XXX4t577w3abv/+/UubcJWdJvisPWftRtl3Tc0qqABxZ2dnce3ataAd7VAt6FfZlnMCc2sBROM98MAD4YO2o8Nlp9nhT9pOw2ETPgtq05EQlFabWc3566+/hqH5ypUrAUZARBPKPp0TaF33MisArcbREKgO1zBImUcffXTx2GOPjT7MdWk1wPv6668Xn3/++eKHH34IDwKHtCFt528yA+YE5qwApGNsSEW2FB4tnXnHHXcsjh49urjvvvuWoZAxO7MLQP0d+K5evRpsRNmR0sZ6kMZs7xjXmhWACnkgOMXc6Di0B3be448/vhxupV3GELKu0QWghlx5wmhCPjw48ojRkpgNhHvmdMwKQIUw6FA6SnbdI488sjh8+HDQgnI++B4bwnVBa4VvABGbEAhxUmwQfG6acFYA0oHW4MezJaxy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' alt='Profile Image' />
          <SetProfileImage user_id={auth.user._id} />
        </div>
      </div> */}
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          {/* <select name='status' value={status} onChange={(e) => onChange(e)}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select> */}
          <input
            type='text'
            placeholder='* Select Professional Status (for eg. Manager)'
            name='status'
            value={status}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Website (Please include http://)'
            name='website'
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            City & state suggested (eg. Mumbai, Maharashtra)
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            If you want your latest repos and a github link, include your
            username
          </small>
        </div>

        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='Youtube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
