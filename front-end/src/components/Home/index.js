import React, { Component } from 'react';
import { compose } from 'recompose';
import SearchArea from '../Search/Searcharea';
//import Image from '../Imageup/Image';
import { withAuthorization, withEmailVerification } from '../Session';
// import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'
import DiscussionPost from '../Post/DiscussionPost'
import FriendSuggestion from '../FriendSuggestion'
import AuthorSuggestion from '../AuthorSuggestion'
import Recommendation from '../Recommendation'

class HomePage extends Component {

  componentDidMount() { }

  render() {
    return (
      <div>

        <Row style={{ padding: "20px", marginBottom: "27px" }}>
          <Col className="col">
            <FriendSuggestion />
            <br />
            <br />
            <AuthorSuggestion />
          </Col>
          <Col className="col-6"><DiscussionPost /></Col>
          <Col className="col">
            <Recommendation />
          </Col>
        </Row>
      </div>
    );
  }

}






{/* <Messages /> */ }

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
