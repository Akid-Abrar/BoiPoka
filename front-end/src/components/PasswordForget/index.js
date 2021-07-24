import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import { Form, Button, Container } from 'react-bootstrap'

const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <Container>
        <div className="container mt-5" align="center" style={{ justifyContent: "center" }}>
          <h3> Forgot Password ? </h3>
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="passwordOne">
              <input
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
            </Form.Group>
            <Button variant="primary" disabled={isInvalid} type="submit">
              Reset My Password
            </Button>

            {error && <p>{error.message}</p>}
          </Form>
          <br />
        </div>
      </Container>
    );
  }
}

const PasswordForgetLink = () => (
  <p align="center">
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
