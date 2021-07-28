import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'recompose';
import { Component } from 'react'
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';

import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { Navbar, Nav, Form, FormControl, Button, Image } from 'react-bootstrap'
import Suggestion from './suggestion'
// import profile from './profile.png'

const Info = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Recommendation authUser={authUser} />
    )}
  </AuthUserContext.Consumer>
);

class Recommendation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      reader: '',
      result: [],
      suggestion: [],
      genre: []
    }

  }


  componentDidMount() {
    this.GetUser(this.props.authUser.email)

  }


  GetUser(email) {

    var link = 'http://localhost:4000/readers/email/' + email
    // console.log(link)
    // if (link !== undefined) {
    axios.get(link)
      .then((res) => {
        this.setState({ reader: res.data[0] })
        this.setState({ id: this.state.reader._id })
        this.setState({ genre: this.state.reader.genre })

        var link1 = 'http://localhost:4000/books/'
        // console.log('reader',this.state.reader.friends)
        console.log('id', this.state.genre)

        axios.get(link1).then((res) => {
          this.setState({ result: res.data })
          this.state.result.map((r, index) => {
            if ((this.state.reader.wishlist.includes(r._id) === false) && (this.state.reader.books_read.includes(r._id) === false)) {
              if (this.state.genre !== undefined || this.state.genre !== null) {
                // var isin = this.state.genre.some(function (e) {
                //   return r.genre.includes(e);
                // });
                // if (isin) {
                //   this.state.suggestion.push(r)
                // }
                // console.log(r.genre)
                var flag = false;
                for (let i=0;i<r.genre.length;i++) {
                  // console.log(r.genre[i])
                  if (this.state.genre.includes(r.genre[i].toLowerCase())) {
                    flag=true;
                    // console.log("in")
                    break;
                    
                  }
                }
                if (flag) {
                  this.state.suggestion.push(r)
                }

              }
            }

          });

          //   console.log('suggestion', this.state.suggestion);

        }
        )
          .catch(() => {
            alert("Data Unavailabe for link1 in recommendation")
          })

      }
      )
      .catch(() => {
        alert("Data Unavailabe for link in recommendation")
      })


  }



  displayUser() {

    return this.state.suggestion.map((s, index) => (
      <div key={index} ><Suggestion id={s._id} user={this.state.id} /></div>

    ));
  };



  render() {

    return (

      <div>
        <div className="m-4 p-2" style={{backgroundColor: "#ebdb82d8"}} align="center">
          <h5><font style={{color: "#925024"}}><b>Book recommendation for you</b></font></h5>
        </div>
        <div className="mt-3">
          {this.displayUser()}
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

