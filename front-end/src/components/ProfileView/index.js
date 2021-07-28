import axios from 'axios';
import React from 'react';
import { Component } from 'react'
// import { useParams } from 'react-router-dom'
import { compose } from 'recompose';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
// import { withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import { Container, Row, Col, Table, Card, Image ,Button} from 'react-bootstrap'
import BookPrint from './BookPrint'
import FriendPrint from './FriendPrint'
import AuthorPrint from './AuthorPrint'
import '../styles.css'

const Info = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <ProfileView authUser={authUser} />
      </div>
    )}
  </AuthUserContext.Consumer>
);

class ProfileView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reader: '',
      user: '',
      books: [],
      friends: [],
      userfriends: [],
      genras: [],
      token: '',
      id: ''
    }
    // console.log("inside profile")
    this.handleAddFriend = this.handleAddFriend.bind(this);

  }


  componentDidMount() {
    this.GetReader()
  }

  GetReader() {
    // const {id} = window.location.href
    // console.log(window.location.pathname.split('/')[2])
    var link = 'http://localhost:4000/readers/' + window.location.pathname.split('/')[2]
    console.log('this.state.id(before) : ',window.location.pathname.split('/')[3])
    this.setState({id:window.location.pathname.split('/')[3]})
     console.log('link',link)
     console.log('this.state.id : ',this.state.id)


    axios.get('http://localhost:4000/readers/' + window.location.pathname.split('/')[3])
      .then((res) => {
        console.log('1st query',res.data)
        this.setState({ user: res.data})
        this.setState({ userfriends: this.state.user.friends })
        axios.get(link)
          .then((res) => {

            this.setState({ reader: res.data})

            if (this.state.user.friends.includes(this.state.reader._id)) {
              this.setState({ token: "Remove Friend" })
            } else {
              this.setState({ token: "Add Friend" })
            }

          }
          )
          .catch(() => {
            alert("Data Unavailabe for reader")
          })
      }
      )
      .catch(() => {
        alert("Data Unavailabe reader1")
      })


  }

  handleAddFriend = (event) => {

    if (this.state.token === "Add Friend") {
      this.state.userfriends.push(this.state.reader._id)
      const friend = {
        friends: this.state.userfriends
      }
      axios.patch('http://localhost:4000/readers/updatefriend/' + this.state.id, friend).then((response) => {
        console.log(friend)
        console.log(this.state.id)
      }).catch((err) => {
        alert("not valid data")
      })

      event.preventDefault();
      this.setState({ token: "Remove Friend" })
    }
    else {
      this.state.userfriends.pop(this.state.reader._id)
      const friend = {
        friends: this.state.userfriends
      }
      axios.patch('http://localhost:4000/readers/updatefriend/' + this.state.id, friend).then((response) => {

      }).catch((err) => {
        alert("not valid data")
      })
      event.preventDefault();
      this.setState({ token: "Add Friend" })
    }


  }

  displayReader(reader) {
    // var imgsrc=
    return (
      <div className="reader__display row row-content align-items-center" style={{ marginBottom: "27px" }}>
        <Container>

          <Row>
            <Col sm={8}>
              <Card style={{ width: '25rem', height: '9rem',  border: "0px" }}  >
                <Card.Body>
                  <Row>
                    <Col sm={4}>
                      <Image
                        height={100}
                        width={100}
                        roundedCircle
                        src={reader.image}
                      />
                    </Col>
                    <Col sm={8}><h3 style={{ justifyContent: 'center', marginTop: "25px" }}>{reader.first_name} {reader.last_name}</h3>
                    
                    {this.state.id !== this.state.reader._id ?<Button type="submit"  style={{backgroundColor:"#6E9B7A"}} onClick={this.handleAddFriend}>{this.state.token}</Button>: <></>}
                    </Col>

                  </Row>
                </Card.Body>
              </Card>
              <br></br>
              <font style={{ color: "black" }} size="5"><b>Friends</b></font>
              <br></br>
              <br></br>
              <Row>
                <br></br>
                {/* {console.log(reader.friends)} */}
                {this.displayFriend(reader.friends)}
                <br></br>
              </Row>
              <br></br>
              <font style={{ color: "black" }} size="5"><b>Following</b></font>
              <br></br>
              <br></br>
              <Row>
                <br></br>
                {/* {console.log(reader.friends)} */}
                {this.displayAuthor(reader.following)}
                <br></br>
              </Row>
              <Row>
                <Card style={{ width: '20rem', backgroundColor: "#925024", border: "0px" }} >
                  <Card.Header align="center" >
                    <font size="5" style={{color:"#ebdb82d8"}}><b>Favourite Genres</b></font>
                  </Card.Header>

                  {
                    reader.genre !== undefined ? (reader.genre !== null ? reader.genre.map((Genre, index) => (
                      <Card.Body align="center" style={{backgroundColor: "#ebdb82d8", border: "0px" }}key={index} className="genre__display" >
                        <h5>{Genre}</h5>
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
            
            <Col sm={4}>
              <Table width="900px" border="7" bordercolor="#925024">
                <thead bgcolor="#925024" align="center">
                  <tr align="center">
                    <th><font style={{ color: "#ebdb82d8" }} size="5">Wish List</font></th>
                  </tr>
                </thead>
                <tbody align="left" style={{ backgroundColor: "#ebdb82d8" }}>
                  <br></br>
                  {this.displayBook(reader.wishlist)}
                </tbody>
              </Table>

              <Table width="300px" border="7" bordercolor="#925024" >
                <thead className="tableheader-style">
                  <tr align="center">
                    <th align="center"><font style={{ color: "#ebdb82d8" }} size="5">Books Read</font></th>
                  </tr>
                </thead>
                <tbody align="left" style={{ backgroundColor: "#ebdb82d8" }}>
                  <br></br>
                  <tr>
                    {this.displayBook(reader.books_read)}

                  </tr>

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
      <div align="center">No Books</div>
      <br></br>
    </div>)) : (<div className="book__display">
      <div align="center" >No Books</div>
      <br></br>
    </div>))
  };

  displayFriend(friendIds) {

    if (friendIds !== undefined) {
      return friendIds.length !== 0 ? (friendIds.map((friendId, index) => (
        <Col key={index} className="friend__display" sm={3}>
          <FriendPrint friendid={friendId} userid={this.state.id} />
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

  displayAuthor(friendIds) {

    if (friendIds !== undefined) {
      return friendIds.length !== 0 ? (friendIds.map((friendId, index) => (
        <Col key={index} className="friend__display" sm={3}>
          <AuthorPrint authorid={friendId} user={this.state.reader._id} />
        </Col>
      ))) : (<Col className="friend__display" sm={3}>
        <Container style={{ paddingBottom: "20px" }}>No Author</Container>
      </Col>)
    } else {
      return (
        <Col className="friend__display" sm={3}>
          <Container>No Author</Container>
        </Col>
      )
    }
  };



  render() {

    return (
      <div >
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
