import axios from 'axios';
import React from 'react';
import {Component} from 'react'
import { compose } from 'recompose';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import {Container,Row,Col,Table,Button,Card,Image,Array} from 'react-bootstrap'
import BookPrint from './BookPrint'
import FriendPrint from './FriendPrint'
import '../styles.css'

const Info = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <Reader authUser={authUser}/>
      </div>
    )}
  </AuthUserContext.Consumer>
);

class Reader extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
          readers: [],
          books: [],
          friends: [],
        }
    }
    

    componentDidMount()
    {
        this.GetReader(this.props.authUser.email)
    }

    GetReader (email)
    {
        var link = 'http://localhost:4000/readers/email/'+email
        console.log(link)
        axios.get(link)
          .then((res) => {
            this.setState({readers : res.data})
          }
          )
          .catch(() => {
            alert("Data Unavailabe")
          })
    }

    displayReader(readers) {
      var imgsrc="https://images.unsplash.com/photo-1591055749071-927e6ddffc82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
      return readers.map((reader, index) => (
        <div key={index} className="reader__display" class="row row-content align-items-center">
          <Container>
            <Row>
              <Col sm={6}>
                <Card style={{ width: '25rem' , height : '9rem' , backgroundColor:"#d1ecf0d8" ,  border:"0px"}}  >
                  <Card.Body>
                    <Row>
                      <Col sm={5}>
                        <Image
                          height={100}
                          width={100}
                          roundedCircle
                          src={imgsrc}
                        />
                      </Col>
                      <Col sm={7}><h2><br></br>{reader.first_name} {reader.last_name}</h2></Col>
                    </Row>
                  </Card.Body>
                </Card>
                <br></br>
                <font style = {{color:"black"}} size="5"><b>Friends</b></font>
                <br></br>
                <br></br>
                <Row>
                  <br></br>
                  {this.displayFriend(reader.friends)}
                  <br></br>
                </Row>
                  <br></br>
              </Col>
              <Col sm={3}>
                  <Table border="7" bordercolor="#925024" >
                    <thead className="tableheader-style">
                      <tr align="center">
                        <th align="center"><font style = {{color:"#ebdb82d8"}} size="5">Books Read</font></th>
                      </tr>
                    </thead>
                    <tbody align="center" style = {{backgroundColor:"#ebdb82d8"}}>
                      <br></br>
                      <tr>
                          {this.displayBook(reader.books_read)}
                           
                      </tr>
                      
                    </tbody>
                  </Table>
             
              </Col>
              <Col sm={3}>
              <Table border="7" bordercolor="#925024">
                <thead bgcolor="#925024" align="center">
                  <tr align="center">
                    <th><font style = {{color:"#ebdb82d8"}} size="5">Wish List</font></th>
                  </tr>
                </thead>
                <tbody align="center" style = {{backgroundColor:"#ebdb82d8"}}>
                  <br></br>
                  {this.displayBook(reader.wishlist)}
                </tbody>
              </Table>          
              </Col>
              
            </Row>
            
          </Container>

          
        </div>
      ));
    };

    displayBook(bookIds) {

      return bookIds.map((bookId, index) => (

          <div key={index} className="book__display">
            <div><BookPrint bookid={bookId}/></div>
            <br></br>
          </div>
      ));
    };

    displayFriend(friendIds) {

      return friendIds.map((friendId, index) => (
        <Col key={index} className="friend__display" sm={3}>
            <FriendPrint friendid={friendId}/>
        </Col>
      ));
    };
    
    

    render(){

        return(
          <div style = {{backgroundColor:"#d1ecf0d8"}}>
              <div className="display" >
                {this.displayReader(this.state.readers)}
              </div>
          </div>

        );
    }
}

const condition = authUser => !!authUser;
//see overlays

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Info);