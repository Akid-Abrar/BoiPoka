import axios from 'axios';
import React from 'react';
import { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import User from './user'
import { Button, Card, Col, Container } from 'react-bootstrap'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: '',
        }

    }

    componentDidMount() {
        this.GetPost(this.props.postid)
    }


    GetPost(postid) {
        var link = 'http://localhost:4000/posts/' + postid
        console.log(link)
        // if (link !== undefined) {
        axios.get(link)
            .then((res) => {
                this.setState({ post: res.data })
            }
            )
            .catch(() => {
                var msg = "Post Unavailabe for id " + postid
                alert(msg)
            })
        // }
        // this.PrintPosts(this.state.post)
    };

    PrintComments(comments) {
        if (comments.length !== 0) {
            return comments.map((comment, index) => (
                <div key={index}>
                    <User id={comment.commentatorid}/>
                    <Card className="comment" key={index}>
                        {comment.comment}
                    </Card>
                </div>
            ));
        } else {
            return (<></>)
        }
    };

    PrintPosts(post) {
        return (
            <div>
                <Card><h5>{post.content}</h5></Card>
                {this.PrintComments(post.comments)}
                {/* {console.log("hello", post)} */}
            </div>

        );


    };


    render() {
        // console.log(this.state.allPosts)
        if (this.state.post !== '') {
            return (
                <>{this.PrintPosts(this.state.post)}</>
            );
        } else {
            return (<></>);
        }


    }
}

export default Post