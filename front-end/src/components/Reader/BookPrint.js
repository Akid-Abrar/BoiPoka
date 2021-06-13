import axios from 'axios';
import React from 'react';
import {Component} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import {Button,Card} from 'react-bootstrap'

class BookPrint extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
          books: [],
        }

    }

    componentDidMount()
    {
        this.GetBook(this.props.bookid)
    }
    
  
    GetBook (bookid)
    {
          var link = 'http://localhost:4000/books/'+bookid
          console.log(link)
          axios.get(link)
            .then((res) => {
              this.setState({books : res.data})
              console.log("got")
              console.log(res.data)
            }
            )
            .catch(() => {
                var msg = "Book Unavailabe for id "+bookid
                alert(msg)
            })
    }

    render()
    {
        return(
            <div>
                <Card style={{ width: '18rem' }} bg={'light'}>
                    <Card.Body>
                        <Card.Text>
                            <h3>{this.state.books.name}</h3>
                        </Card.Text>
                    </Card.Body>
                </Card> 
            </div>
  
          );
    }
}

export default BookPrint