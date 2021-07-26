import axios from 'axios';
import React from 'react';
import { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../../styles.css'
import { Button, Row, Col, Container } from 'react-bootstrap'
import {Link} from 'react-router-dom'

class ShowRating extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: '',
            book: '',
            bookid: '',
            author: ''
        }


    }

    componentDidMount() {
        this.GetReview(this.props.postid)
    }

    GetReview(id) {
        var link = 'http://localhost:4000/posts/' + id
        // console.log(link)
        // if (link !== undefined) {
        axios.get(link)
            .then((res) => {
                // console.log("data",res.data);
                this.setState({ rating: res.data.rating })
                this.setState({ bookid: res.data.bookid })

                axios.get('http://localhost:4000/books/' + this.state.bookid)
                    .then((res) => {
                        // console.log("data",res.data);
                        this.setState({ book: res.data })
                        this.GetAuthor()
                    }
                    )
                    .catch(() => {
                        var msg = "Book Unavailabe for id " + id
                        alert(msg)
                    })
            }
            )
            .catch(() => {
                var msg = "Post Unavailabe for id " + id
                alert(msg)
            })
    };

    GetAuthor() {
        axios.get('http://localhost:4000/authors/' + this.state.book.author)
            .then((res) => {
                // console.log("data",res.data);
                this.setState({ author: res.data })
            }
            )
            .catch(() => {
                var msg = "Authur Unavailabe for id " + this.state.book.author
                alert(msg)
            })
    }

    render() {

        return (
            <Row>
                <Col className="col-4 m-2">
                <Link to={'/info/'+ this.state.book.name}>
                    <img src={this.state.book.bookimage} style={{ height: "130px", padding: "5px"}} />
                </Link>
                    <div><b>{this.state.book.name}{' '}</b>
                    <i>By</i><br/>
                    {this.state.author.first_name} {' '}{this.state.author.last_name}
                    </div>
                </Col>

                <Col align="left">
                    <div style={{justifyContent: "center", marginTop: "20px"}}>
                    Rated it {'     '}<br/>

                    {Array.from({ length: this.state.rating }, (value, key) => <i className="fas fa-star" key={key}></i>)}

                    {Array.from({ length: 5 - this.state.rating }, (value, key) => <i className="far fa-star" key={key}></i>)}
                    </div>
                </Col>


            </Row>
        );

    }
}

export default ShowRating