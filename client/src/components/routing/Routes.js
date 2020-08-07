import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import Profile from '../profile/Profile';
import IndividualProfile from '../profile/IndividualProfile';
import CreateProfile from '../profile/CreateProfile';
import EditProfile from '../profile/EditProfile';
import AddExperience from '../profile/AddExperience';
import AddEducation from '../profile/AddEducation';
import PrivateRoute from '../routing/PrivateRoute';
import SinglePost from '../posts/SinglePost';
import NotFound from '../layout/NotFound';
import DisplayIndividualAllPosts from '../posts/DisplayIndividualAllPosts';
import LikePage from '../posts/LikePage';
import DislikePage from '../posts/DislikePage';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <PrivateRoute
          exact
          path='/profile/:user_id'
          component={IndividualProfile}
        />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts/:post_id' component={SinglePost} />
        <PrivateRoute
          exact
          path='/profile/all-posts/:user_id'
          component={DisplayIndividualAllPosts}
        />
        <PrivateRoute exact path='/posts/:post_id/likes' component={LikePage} />
        <PrivateRoute
          exact
          path='/posts/:post_id/dislikes'
          component={DislikePage}
        />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
