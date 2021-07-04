import React, { Component } from 'react';
import { compose } from 'recompose';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import {Button} from 'react-bootstrap'
import * as ROUTES from '../../constants/routes';



const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1 align="center">Account: {authUser.email}</h1>
        <ImageUpload />
        <br/><br />
        <div class="container" align="center">
          <Button variant="secondary" href={ROUTES.GENRE}>Click To Choose Genre</Button>
        </div>
        <br/><br/>
        <PasswordForgetForm />
        <PasswordChangeForm />
        <br/><br/>
      </div>
    )}
  </AuthUserContext.Consumer>
);

class ImageUpload extends Component {
  constructor(props)
    {
        super(props)
        this.state = {
          image : ''
        }
    }
  render(){
    return(
      <div>
        <h1>Image Upload</h1>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);
