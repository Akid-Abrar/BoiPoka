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
// import AddPost from './addPost'
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
      post: '',
    }

    this.handlePost = this.handlePost.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.GetPost(this.props.authUser.email)


  }


  componentDidMount() {


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
            alert("Data Unavailabe for inner in discussionpost")
          })

      }
      )
      .catch(() => {
        alert("Data Unavailabe for outer in discussionpost")
      })


  }

  displayPosts() {
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
      <div className="mt-5" key={index} ><Post postid={post._id} currentuserid={this.state.id} /></div>

    ));
  };


  handlePost(event) {
    this.setState({ post: event.target.value })
  }

  handlePostSubmit(event) {
    const post = {
      creatorid: this.state.id,
      content: this.state.post,
    }
    // console.log("post",post);

    axios.post('http://localhost:4000/posts/', post).then((response) => {
      // console.log("wishlist");
      // console.log("post", response);

    }).catch((err) => {
      alert("not valid data")
    })

    event.preventDefault();
    this.state.post = '';
    window.location.reload(false);

  }

  // componentWillUnmount() {
  //   this.setState = (state, callback) => {
  //     return;
  //   };
  // }



  render() {


    return (

      <div>
        <div>
          <h6>Start a discussion</h6>
          <Form className="m-1" onSubmit={this.handlePostSubmit}>
            <textarea
              rows="3" cols="60"
              value={this.state.post}
              onChange={this.handlePost}
              type="text"
              className="textarea m-1"
            />
            <input type="submit" value="Post" />
          </Form>
        </div >
        <div className="mt-3">
          {this.displayPosts()}
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

