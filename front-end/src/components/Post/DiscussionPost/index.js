import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'recompose';
import { Component } from 'react'
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../../Session';

import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { Navbar, Nav, Form, FormControl, Button, Image } from 'react-bootstrap'
import Post from './post'
import profile from './profile.png'

const Info = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <DiscussionPost authUser={authUser} />
    )}
  </AuthUserContext.Consumer>
);

class DiscussionPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reader: '',
      id: '',
      posts: [],
    }

  }


  componentDidMount() {
    this.GetReader(this.props.authUser.email)


  }

  GetReader(email) {
    var link = 'http://localhost:4000/readers/email/' + email
    console.log(link)
    // if (link !== undefined) {
    axios.get(link)
      .then((res) => {
        this.setState({ reader: res.data[0] })
        this.setState({ id: res.data[0]._id })
        this.GetPost(this.state.id)
        // console.log(this.state.reader[0]._id)
      }
      )
      .catch(() => {
        alert("Data Unavailabe")
      })
    // }


  }

  GetPost(creatorid) {
    var link = 'http://localhost:4000/posts/creatorid/' + creatorid
    console.log(link)
    // if (link !== undefined) {
    axios.get(link)
      .then((res) => {
        this.setState({ posts: res.data })
      }
      )
      .catch(() => {
        alert("Data Unavailabe")
      })
    // }
  }

  displayPosts(reader, posts) {
    // console.log(this.state.posts)

    if (this.state.posts.length !== 0) {
      return (
        <div>
          <h5 className="user"><img className="profile" src={profile} />{this.state.reader.first_name} {this.state.reader.last_name}</h5>

          {this.displayPost(this.state.posts)}
        </div>
      );
    } else {
      return (
        <div>No posts to show</div>
      )
    }
  };

  displayPost(posts) {

    return posts.map((post, index) => (
      <div key={index} ><Post postid={post._id} /></div>

    ));
  };



  render() {

    return (
      <div>
        {this.displayPosts(this.state.posts)}
      </div>

    );
  }
}
const condition = authUser => !!authUser;
export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Info);

