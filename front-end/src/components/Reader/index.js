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
import {Container,Row,Col,Table,Card,Image} from 'react-bootstrap'
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
          reader: '',
          books: [],
          friends: [],
          genras:[],
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
            this.setState({reader : res.data[0]})
          }
          )
          .catch(() => {
            alert("Data Unavailabe")
          })
    }

    displayReader(reader) {
      // var imgsrc=
      return (
        <div className="reader__display row row-content align-items-center" style = {{marginBottom: "27px"}}>
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
                          src={reader.image}
                        />
                      </Col>
                      <Col sm={7}><h2>{reader.first_name} {reader.last_name}</h2></Col>
                    </Row>
                  </Card.Body>
                </Card>
                <br></br>
                <font style = {{color:"black"}} size="5"><b>Friends</b></font>
                <br></br>
                <br></br>
                <Row>
                  <br></br>
                  {/* {console.log(reader.friends)} */}
                  {this.displayFriend(reader.friends)}
                  <br></br>
                </Row>
                <Row>
                <Card style={{ width: '10rem'  , backgroundColor:"#d1ecf0d8" ,  border:"0px"}} >
                  <Card.Header>
                    Favourite Genras
                  </Card.Header>
                  
                  {
                      reader.genre !== undefined ? (reader.genre.length !== 0 ? reader.genre.map((Genre, index) => (
                        <Card.Body key={index} className="genre__display" >
                          <h4>{Genre}</h4>
                        </Card.Body >
                      )) : (<Card.Body className="genre__display" >
                        <h4>No Genre</h4>
                      </Card.Body >)) : (<Card.Body className="genre__display" >
                        <h4>No Genre</h4>
                      </Card.Body >)
                    
                    }
                  </Card>
                </Row>
                  
                <Row>
                    
                </Row>
                  <br></br>
              </Col>
              <Col sm={3}>
                  <Table width="700px"border="7" bordercolor="#925024" >
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
      )
    };

    displayBook(bookIds) {

      return (bookIds !== undefined ? (bookIds.length !== 0 ? bookIds.map((bookId, index) => (

        <div key={index} className="book__display">
          <div><BookPrint bookid={bookId} /></div>
          <br></br>
        </div>
      )) : (<div className="book__display">
        <div>No Books</div>
        <br></br>
      </div>)) : (<div className="book__display">
        <div>No Books</div>
        <br></br>
      </div>))
    };

    displayFriend(friendIds) {

      if (friendIds !== undefined) {
        return friendIds.length !== 0 ? (friendIds.map((friendId, index) => (
          <Col key={index} className="friend__display" sm={3}>
            <FriendPrint friendid={friendId} userid={this.state.reader._id} />
          </Col>
        ))) : (<Col className="friend__display" sm={3}>
          <Container style={{ paddingBottom: "20px" }}>No Friends</Container>
        </Col>)
      } else {
        return (
          <Col className="friend__display" sm={3}>
            <Container>No Friends</Container>
          </Col>
        )
      }
    };
    
    

    render(){

        return(
          <div style = {{backgroundColor:"#d1ecf0d8"}}>
              <div className="display" >
                {this.displayReader(this.state.reader)}
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
