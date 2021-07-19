import axios from 'axios';
import React from 'react';
import {Component} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import {Image,OverlayTrigger,Button,Tooltip} from 'react-bootstrap'

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
            }
            )
            .catch(() => {
                var msg = "Book Unavailabe for id "+bookid
                alert(msg)
            })
    }

    render()
    {
        // var imgsrc="https://images.unsplash.com/photo-1591055749071-927e6ddffc82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
        return(
        <div>    
            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">{this.state.books.name}</Tooltip>}
                >
                {({ ref, ...triggerHandler }) => (
                    <Button
                        variant="light"
                        borderless
                        style = {{backgroundColor:"#ebdb82d8" , border:"0px"}}
                        {...triggerHandler}
                        className="d-inline-flex align-items-center"
                    >
                        <Image
                            ref={ref}
                            height={40}
                            width={30}
                            rounded
                            src={this.state.books.bookimage}
                        />
                        <span className="ml-1">{this.state.books.name}</span>
                    </Button>
                )}
            </OverlayTrigger>
            <br />
        </div>
  
          );
    }
}

export default BookPrint