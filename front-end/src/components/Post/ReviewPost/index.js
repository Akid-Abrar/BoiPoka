import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'recompose';
import { Component } from 'react'
import { HoverRating } from './rating'
// import { BrowserRouter, Route } from 'react-router-dom';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../../Session';
// import { browserHistory } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { Navbar, Container, Form, FormControl, Button, Image } from 'react-bootstrap'

// import { makeStyles } from '@material-ui/core/styles';
// import Rating from '@material-ui/lab/Rating';
// import Box from '@material-ui/core/Box';




const Info = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <ReviewPost authUser={authUser} />
    )}
  </AuthUserContext.Consumer>
);


class ReviewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reader: '',
      id: '',
      book: '',
      post: '',
      rate: 0,
      token: 'Save'
    }

    this.handlePost = this.handlePost.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.GetBook(this.props.authUser.email)


  }


  componentDidMount() {


  }


  GetBook(email) {

    var link = 'http://localhost:4000/readers/email/' + email
    // console.log(link)
    // if (link !== undefined) {
    axios.get(link)
      .then((res) => {
        this.setState({ reader: res.data[0] })
        this.setState({ id: res.data[0]._id })

        link = 'http://localhost:4000/books/' + window.location.pathname.split('/')[2]
        // console.log(link)

        axios.get(link).then((res) => {
          this.setState({ book: res.data })

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




  handlePost(event) {
    this.setState({ post: event.target.value })
  }

  handlePostSubmit(event) {
    // event.preventDefault();
    const post = {
      type: 2,
      creatorid: this.state.id,
      content: this.state.post,
      rating: this.state.rate,
      bookid: this.state.book._id,

    }


    // console.log("post",post);

    axios.post('http://localhost:4000/posts/', post).then((response) => {
      // console.log("wishlist");
      // console.log("post", response);

    }).catch((err) => {
      alert("not valid data")
    })

    const reviews = [{
      reviewer: this.state.id,
      content: this.state.post,
    }]

    const book = { reviews }

    axios.patch('http://localhost:4000/books/addreview/' + this.state.book._id, book).then((response) => {
      console.log('review', response);
    }).catch((err) => {
      alert("not valid data")
    })

    var rating_giver1 = this.state.book.rating_giver;
    rating_giver1.push(this.state.id);
    var avg_rating1 = (this.state.book.avg_rating + this.state.rate) / (rating_giver1.length);

    const book1 = {
      rating_giver: rating_giver1,
      avg_rating: avg_rating1
    }

    axios.patch('http://localhost:4000/books/rating/' + this.state.book._id, book1).then((response) => {
      console.log('rating', response);
    }).catch((err) => {
      alert("not valid data")
    })


    event.preventDefault();
    this.setState({ token: "Saved" })
    window.location.href = "http://localhost:3000/home"


  }

  handleRateChange = (newrate) => { this.setState({ rate: newrate }); }

  render() {


    return (

      <Container align="center">
        <div className="p-3">
          <img src={this.state.book.bookimage} style={{ height: "130px" }} />
          <h6 className="mt-2">Rate <b>{this.state.book.name}</b></h6>
          <HoverRating rate={this.state.rate} onChangeName={this.handleRateChange} />
          {console.log(this.state.rate)}
        </div>
        <div>
          <h6>Give a Review</h6>
          <Form className="m-1" onSubmit={this.handlePostSubmit}>
            <textarea
              rows="3" cols="60"
              value={this.state.post}
              onChange={this.handlePost}
              type="text"
              className="textarea m-2 p-2"
            />
            <div>
              <input type="submit" value={this.state.token} />
            </div>

          </Form>
        </div >
        <div className="mt-3">
        </div>


      </Container>

    );
  }
}



const condition = authUser => !!authUser;
export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Info);






