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
import { withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import { Container, Row, Col, Table, Card, Image } from 'react-bootstrap'
import BookPrint from './BookPrint'
import FriendPrint from './FriendPrint'
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
    this.state.id = window.location.pathname.split('/')[3]
    // console.log(link)


    axios.get('http://localhost:4000/readers/' + this.state.id)
      .then((res) => {
        this.setState({ user: res.data })
        this.setState({ userfriends: this.state.user.friends })
        axios.get(link)
          .then((res) => {

            this.setState({ reader: res.data })

            if (this.state.user.friends.includes(this.state.reader._id)) {
              this.setState({ token: "Remove Friend" })
            } else {
              this.setState({ token: "Add Friend" })
            }

          }
          )
          .catch(() => {
            alert("Data Unavailabe")
          })
      }
      )
      .catch(() => {
        alert("Data Unavailabe")
      })


  }

  handleAddFriend = (event) => {

    if (this.state.token == "Add Friend") {
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
            <Col sm={6}>
              <Card style={{ width: '25rem', height: '9rem', backgroundColor: "#d1ecf0d8", border: "0px" }}  >
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
                    <Col sm={7}><h2>{reader.first_name} {reader.last_name}</h2>
                    {this.state.id != this.state.reader._id ? <input type="submit" value={this.state.token} onClick={this.handleAddFriend} /> : <></>}
                      
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
              <Row>
                <Card style={{ width: '10rem', backgroundColor: "#d1ecf0d8", border: "0px" }} >
                  <Card.Header>
                    Favourite Genras
                  </Card.Header>

                  {
                    reader.genre != undefined ? (reader.genre.length != 0 ? reader.genre.map((Genre, index) => (
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
              <Table width="700px" border="7" bordercolor="#925024" >
                <thead className="tableheader-style">
                  <tr align="center">
                    <th align="center"><font style={{ color: "#ebdb82d8" }} size="5">Books Read</font></th>
                  </tr>
                </thead>
                <tbody align="center" style={{ backgroundColor: "#ebdb82d8" }}>
                  <p></p>
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
                    <th><font style={{ color: "#ebdb82d8" }} size="5">Wish List</font></th>
                  </tr>
                </thead>
                <tbody align="center" style={{ backgroundColor: "#ebdb82d8" }}>
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

    return (bookIds != undefined ? (bookIds.length != 0 ? bookIds.map((bookId, index) => (

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

    if (friendIds != undefined) {
      return friendIds.length != 0 ? (friendIds.map((friendId, index) => (
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



  render() {

    return (
      <div style={{ backgroundColor: "#d1ecf0d8" }}>
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
