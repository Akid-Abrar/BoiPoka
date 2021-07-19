import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import {Form,Button} from 'react-bootstrap'

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  firstname: '',
  lastname: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { firstname, lastname, email, passwordOne, isAdmin } = this.state;
    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        axios.post('http://localhost:4000/readers/add',{
          first_name:firstname,
          last_name:lastname,
          email:this.state.email,
          
        }).then(response =>
        console.log(response.data)
      )
      return this.props.firebase.user(authUser.user.uid).set({
        firstname,
        lastname,
        email,
        roles,
      });

      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      firstname,
      lastname,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      firstname === '' ||
      lastname === '';

    return (
      <div class="container mt-2" align='center'>
        <h2>Sign Up</h2>
      <Form onSubmit={this.onSubmit}>
      <Form.Group controlId="first_name">
        <input
          name="firstname"
          value={firstname}
          onChange={this.onChange}
          type="text"
          placeholder="First Name"
        />
        </Form.Group>
        <Form.Group controlId="last_name">
        <input
          name="lastname"
          value={lastname}
          onChange={this.onChange}
          type="text"
          placeholder="Last Name"
        />
        </Form.Group>
        <Form.Group controlId="email">
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        </Form.Group>
        <Form.Group controlId="password">
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        </Form.Group>
        <Form.Group controlId="confirm-password">
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        </Form.Group>
        <br/>
        <label>
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label>
        <br/><br/>
        <Button disabled={isInvalid} type="submit">
          Sign Up
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
      <br/>
      </div>
    );
  }
}

const SignUpLink = () => (
  <div>
    <p align="center">
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
    <p align="center">
      If you want to create an author account,please contact us at <font color="red">support.boipoka@gmail.com</font>
    </p>
  </div>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };