import React from 'react';

import { withFirebase } from '../Firebase';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import {Button} from 'react-bootstrap'

const SignOutButton = ({ firebase }) => (
  <Button type="button" variant="outline-info" onClick={firebase.doSignOut}>Sign Out</Button>
);

export default withFirebase(SignOutButton);
