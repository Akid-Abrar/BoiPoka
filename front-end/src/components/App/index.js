import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import FooterClass from '../Footer';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import DiscussionPost from '../Post/DiscussionPost';
import Bookadd from '../Bookadmin/Boodadd';
import Authoradd from '../AuthorAdmin/AuthorAdd';
import Postadd from '../PostAdmin/postAdd';
import Useradmin from '../Admin/user';

import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import ReaderPage from '../Reader';
import AuthorPage from '../Author'
import Genre from '../Genre'
//import Books from '../Books/books';
import Info from '../Books/books';



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
      <Route path={ROUTES.BOOK} component={Info} />
      <Route path={ROUTES.DISCUSSION} component={DiscussionPost} />
      <Route path={ROUTES.BOOKADMIN} component={Bookadd} />
      <Route path={ROUTES.AUTHORADMIN} component={Authoradd} />
      <Route path={ROUTES.POSTADMIN} component={Postadd} />
      <Route path={ROUTES.USERADMIN} component={Useradmin} />
      <FooterClass />
    </div>
  </Router>
);

export default withAuthentication(App);
