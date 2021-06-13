import React from 'react';

import { withFirebase } from '../Firebase';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import {Button, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom';

const SignOutButton = ({ firebase }) => (
  <Nav.Link onClick={firebase.doSignOut}>Sign Out</Nav.Link>
);

export default withFirebase(SignOutButton);
