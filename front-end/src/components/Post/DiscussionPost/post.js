import axios from 'axios';
import React from 'react';
import { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import User from './user'
import { Button, Card, Col, Container, Form } from 'react-bootstrap'

// import { AiOutlineLike } from 'react-icons/AiOutlineLike';

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: '',
            comment: '',
        }

        this.handleComment = this.handleComment.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);

    }

    componentDidMount() {
        this.GetPost(this.props.postid)
    }


    GetPost(postid) {
        var link = 'http://localhost:4000/posts/' + postid
        // console.log(link)
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
                <div key={index} className="comment-dark p-2">
                    <User id={comment.commentatorid} />
                    <Card className="comment" key={index}>
                        {comment.comment}
                    </Card>
                </div>
            ));
        } else {
            return (<></>)
        }
    };

    handleComment(event) {
        this.setState({ comment: event.target.value })
    }

    handleCommentSubmit(event) {
        const comments={
            commentatorid: this.props.currentuserid,
            comment: this.state.comment,
        }
        const post= {comments}
        // console.log(comments);
        axios.patch('http://localhost:4000/posts/addcomment/' + this.props.postid, post).then((response) => {
            // console.log("wishlist");
            // console.log("patch", response);

        }).catch((err) => {
            alert("not valid data")
        })
        window.location.reload(false);
        event.preventDefault();
        // this.componentDidMount();

    }


    PrintPosts(post) {
        return (
            <Card>
                <User id={post.creatorid} />
                <Card>
                    <div className="post" style={{ backgroundColor: "#d1ecf0d8", border: "7px", bordercolor: "#925024" }}>
                        <h5>{post.content}</h5>
                    </div>

                </Card>
                <div>
                    <i className="far fa-heart mr-4"></i><i className="far fa-comment"></i>
                </div>
                { this.PrintComments(post.comments)}

                <Form className="m-2" onSubmit={this.handleCommentSubmit}>
                    <input
                        value={this.state.comment}
                        onChange={this.handleComment}
                        type="text"
                        placeholder="Add a comment"
                        className="mr-2"
                    />
                    <input type="submit" value="Post" />
                </Form>
                {/* {console.log("hello", post)} */}
            </Card >

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