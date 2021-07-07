import React, { Component } from 'react';
import { compose } from 'recompose';
import Upload from './image'

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
import {Container,Row,Col,Table,Card,Image} from 'react-bootstrap'
import info from '../Reader'

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div style = {{backgroundColor:"#d1ecf0d8"}}>
        <Container>
        <Row>
          <Col sm={3}></Col>
          <Col><h1 align="center">Account: {authUser.email}</h1></Col>
        </Row>
        <Row><Col></Col></Row>
        <Row >
          <Col sm={3}>
          <ImageUpload />
          </Col>
          <Col sm={7}>
            info dekhabo
          </Col>
        </Row>
        <br/><br />
        <br></br>
        <Row >
          <Col sm={3} align="center">
          <Button variant="secondary" href={ROUTES.GENRE}>Click To Choose Genre</Button>
          </Col>
        </Row>
        </Container>
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
      <AuthUserContext.Consumer>
      {authUser => (
      <div>
        <Upload id = {authUser.email}/>
      </div>
      )}
      </AuthUserContext.Consumer>
    )
  }
}

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);
