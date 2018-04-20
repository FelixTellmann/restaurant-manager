import React, { Component } from 'react';
import { Page } from '@shopify/polaris';
import { Route } from 'react-router-dom';
import Login from '../components/Login';
import Welcome from '../components/Welcome';
import Register from '../components/Register';
import Password from '../components/Password';

const Home = (props) => {
  return (
    <Page
      title="Restaurant Manager"
      separator
    >
      <Route exact path='/' component={Welcome} />
      <Route exact path='/' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/password' component={Password} />
    </Page>
  );
};
export default Home;