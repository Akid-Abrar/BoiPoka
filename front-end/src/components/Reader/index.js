import axios from 'axios';
import React from 'react';
import {Component} from 'react'
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import {Navbar,Nav,Form,FormControl,Button,Card} from 'react-bootstrap'
import BookPrint from './BookPrint'

const Info = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
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

      return readers.map((reader, index) => (
        <div key={index} className="reader__display" class="row row-content align-items-center">
          <Card style={{ width: '35rem' , height : '10rem'}} bg={'light'} >
            <Card.Body>
              <Card.Text>
                <h3>{reader.first_name} {reader.last_name}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
          <div>
            <label>Books Read</label>
            {this.displayBook(reader.books_read)}
          </div>
          <div>
            <label>WishList</label>
            {this.displayBook(reader.wishlist)}
          </div>
          
        </div>
      ));
    };

    displayBook(bookIds) {

      return bookIds.map((bookId, index) => (
        <div key={index} className="book__display">
            <div><BookPrint bookid={bookId}/></div>
        </div>
      ));
    };

    render(){

        return(
          <div>
              <div className="display">
                {this.displayReader(this.state.readers)}
              </div>
          </div>

        );
    }
}
export default Info;
