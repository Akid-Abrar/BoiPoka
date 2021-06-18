import React, { Component } from 'react';
import axios from 'axios';
import {
    AuthUserContext,
    withAuthorization,
    withEmailVerification,
  } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import {Row,Col,Form,FormControl,Button,Card,ListGroup} from 'react-bootstrap'


const ShowChooseGenre = () => (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <Genre />
        </div>
      )}
    </AuthUserContext.Consumer>
  );

class Genre extends Component {
    constructor(props) {
      super(props);
      this.state = {
        genre: [],
      }
    }

    onChangeCheckbox = event => {
        var link = 'http://localhost:4000/readers/email/'
        console.log(link)
        axios.get(link)
          .then((res) => {
            this.setState({genre : res.data})
          }
          )
          .catch(() => {
            alert("Data Unavailabe")
          })
    };

    render(){

        return(
            <div className="display" class= "container">
                <div class="row row-content align-items-center">
                <div class="col-12 col-sm-4 col-md-3">
                   <h3>Here Are some Options For You</h3>
                </div>
                <div class="col col-sm col-md">
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalCheck">
                        <Card style={{ width: '18rem' }} bg={'info'} text={'dark'}>
                            <Card.Header align="center"><b>Chooose Options</b></Card.Header>
                                <ListGroup variant="flush" >
                                    <ListGroup.Item>
                                        <Col sm={{ span: 10, offset: 2 }}>
                                            <Form.Check onChange={this.onChangeCheckbox} label="Mystry" />
                                        </Col>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Col sm={{ span: 10, offset: 2 }}>
                                            <Form.Check onChange={this.onChangeCheckbox} label="Thriller" />
                                        </Col>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Col sm={{ span: 10, offset: 2 }}>
                                            <Form.Check onChange={this.onChangeCheckbox} label="Science Fiction" />
                                        </Col>
                                    </ListGroup.Item>
                                </ListGroup>
                        </Card>
                    </Form.Group>
                </Form>
                </div>
                </div>
                <div>
                   {this.state.genre}
                </div>
            </div>

        );
    }

}

export default ShowChooseGenre