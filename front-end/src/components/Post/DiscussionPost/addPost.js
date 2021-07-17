import axios from 'axios';
import React from 'react';
import { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { Button, Card, Col, Container, Form } from 'react-bootstrap'

// import { AiOutlineLike } from 'react-icons/AiOutlineLike';

class AddPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: '',
        }

        this.handlePost = this.handlePost.bind(this);
        this.handlePostSubmit = this.handlePostSubmit.bind(this);

    }

    componentDidMount(){

    }

    handlePost(event) {
        this.setState({ post: event.target.value })
    }

    handlePostSubmit(event) {
        const post = {
            creatorid: this.props.id,
            content: this.state.post,
        }
        // console.log("post",post);
        axios.post('http://localhost:4000/posts/', post).then((response) => {
            // console.log("wishlist");
            // console.log("post", response);

        }).catch((err) => {
            alert("not valid data")
        })
        // window.location.reload(false);
        // event.preventDefault();
        // this.componentDidMount();

    }


    render() {
        return (
            <div>
                <h6>Start a discussion</h6>
                <Form className="m-1" onSubmit={this.handlePostSubmit}>
                    <textarea
                        rows = "3" cols = "60"
                        value={this.state.post}
                        onChange={this.handlePost}
                        type="text"
                        className="textarea m-1"
                    />
                    <input type="submit" value="Post" />
                </Form>
            </div >

        );


    }
}

export default AddPost