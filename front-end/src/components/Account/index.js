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
      <div style = {{ marginBottom: "27px"}}>
        <Container>
          <br></br><br></br>
        <Row>
          <Col sm={5}>
            <Row><h6 align="center">Account: {authUser.email}</h6></Row>
            <br></br><br></br>
            <Row><Upload id = {authUser.email}/></Row>
            <br></br><br></br>
            <center>
            <Row>
            
              <Button variant="secondary" href={ROUTES.GENRE}>Click To Choose Genre</Button>
            
            </Row>
            </center>
            
          </Col>
          <Col sm={7}>
            <PasswordForgetForm />
            <PasswordChangeForm />
          </Col>
        </Row>
        </Container>
        <br/><br/>
        
        <br/><br/>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);
