import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Messages from '../Messages';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'
import DiscussionPost from '../Post/DiscussionPost'

const HomePage = () => (
  <Row style={{padding: 20}}>
    <Col className="col">friend suggestion</Col>
    <Col className="col-6"><DiscussionPost /></Col>
    <Col className="col">Recommendation</Col>
  </Row>

);

{/* <Messages /> */ }

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
