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
import AddPost from './addPost'
// import profile from './profile.png'

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
      result: [],
      posts: [],
    }

  }


  componentDidMount() {
    this.GetPost(this.props.authUser.email)

  }


  GetPost(email) {

    var link = 'http://localhost:4000/readers/email/' + email
    // console.log(link)
    // if (link !== undefined) {
    axios.get(link)
      .then((res) => {
        this.setState({ reader: res.data[0] })
        this.setState({ id: res.data[0]._id })

        link = 'http://localhost:4000/posts/'
        // console.log(link)

        axios.get(link).then((res) => {
          this.setState({ result: res.data })
          // console.log('result', this.state.result);
          this.state.result.map((r, index) => {
            if (r.creatorid == this.state.id || (this.state.reader.friends.includes(r.creatorid)) || (this.state.reader.following.includes(r.creatorid))) {
              this.state.posts.push(r)
            }
            // console.log('hello');

          });
          this.state.posts.sort(function (x, y) {
            return x.timestamp < y.timestamp ? -1 : 1;
          })
          // console.log('post', this.state.posts);

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

  displayPosts(reader, posts) {
    // console.log(this.state.posts)

    if (this.state.posts.length !== 0) {
      return (
        <div>
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
      <div key={index} ><Post postid={post._id} currentuserid={this.state.id} /></div>

    ));
  };



  render() {

    return (

      <div>
        <div>
          <AddPost id={this.state.id} />
        </div>
        <div className="mt-3">
          {this.displayPosts(this.state.posts)}
        </div>

      </div>

    );
  }
}
const condition = authUser => !!authUser;
export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Info);

