import React from 'react';
import { compose } from 'recompose';
import Info from '../Books/books';
//import Image from '../Imageup/Image';
import { withAuthorization, withEmailVerification } from '../Session';
import Messages from '../Messages';

const HomePage = () => (
  <div>
  <Info />
{/*<Image /> */} 
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
  
);

{/* <Messages /> */}

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
