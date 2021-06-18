import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import {Form,Button,Card,Row,Col,Container,Alert} from 'react-bootstrap'

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <div class="container">
        <h3>Password Change </h3>
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="passwordOne">
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        </Form.Group>
        <Form.Group controlId="passwordTwo">
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        </Form.Group>
        <Button variant="primary" disabled={isInvalid} type="submit">
          Change My Password
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
      <br/>
      </div>
    );
  }
}

export default withFirebase(PasswordChangeForm);
