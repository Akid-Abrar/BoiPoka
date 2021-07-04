import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import FooterClass from '../Footer';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import ReaderPage from '../Reader';
import AuthorPage from '../Author'
import Genre from '../Genre'

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
//demo demo demo@gmail.com demo123 demo123



const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.READER} component={ReaderPage} />
      <Route path={ROUTES.AUTHOR} component={AuthorPage} />
      <Route path={ROUTES.GENRE} component={Genre} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <FooterClass />
    </div>
  </Router>
);

export default withAuthentication(App);
