import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { Row, Col } from 'react-bootstrap'

const Landing = () => (

 // <div style={{ backgroundColor: "#d1ecf0d8" }}>
    <Row>
      <Col>
        <img src={require('./logo.png')}/>
      </Col>
      <Col xs={6} className="welcome">
          <h1 align="center"><font style={{ color: "white" }} >ᗯEᒪᑕOᗰE TO ᗷOIᑭOKᗩ</font></h1>
      </Col>

    </Row>

 // </div>
);

export default Landing;
