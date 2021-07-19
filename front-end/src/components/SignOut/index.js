import React from 'react';

import { withFirebase } from '../Firebase';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import { Nav} from 'react-bootstrap'

const SignOutButton = ({ firebase }) => (
  <Nav.Link onClick={firebase.doSignOut}><i className="fas fa-sign-out-alt"></i>Sign Out</Nav.Link>
);

export default withFirebase(SignOutButton);
