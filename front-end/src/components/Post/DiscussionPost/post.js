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
            likes:[],
            isLiked: '',
        }

        this.handleComment = this.handleComment.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);

    }

    componentDidMount() {
        
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
                <div key={index} className="comment-dark">
                    <User id={comment.commentatorid} userid={this.props.currentuserid}/>
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
        const comments = {
            commentatorid: this.props.currentuserid,
            comment: this.state.comment,
        }
        const post = { comments }
        // console.log(comments);
        axios.patch('http://localhost:4000/posts/addcomment/' + this.props.postid, post).then((response) => {
            // console.log("wishlist");
            // console.log("patch", response);

        }).catch((err) => {
            alert("not valid data")
        })
        // window.location.reload(false);
        event.preventDefault();
        this.setState({comment: ''})
        // window.location.reload(false);
        // this.componentDidMount();

    }

    handleLike=(event)=>{
        
        this.state.isLiked = !this.state.isLiked
        if (this.state.isLiked) {
            this.state.likes.push(this.props.currentuserid)
        }else{
            this.state.likes.pop(this.props.currentuserid)
        }

        const like = {
            like: this.state.likes
        }
        axios.patch('http://localhost:4000/posts/like/' + this.props.postid, like).then((response) => {
            // console.log(this.props.postid);
            // console.log(like);

        }).catch((err) => {
            alert("not valid data")
        })
        event.preventDefault();
    }

    updateLike(post){
        if (post.like != null) {
            this.state.likes = post.like
        }
        
        if (this.state.likes.includes(this.props.currentuserid)) {
            this.state.isLiked = true
        }
        else this.state.isLiked = false
    }


    PrintPosts(post) {
        var like = <i className="fas fa-heart mr-1"></i>
        var unlike = <i className="far fa-heart mr-1"></i>
        this.updateLike(post)

        return (
            <Card>
                <User id={post.creatorid} userid={this.props.currentuserid}/>
                <Card>
                    <div className="post" style={{ backgroundColor: "#d1ecf0d8", border: "7px", bordercolor: "#925024" }}>
                        <h5>{post.content}</h5>
                    </div>

                </Card>
                <div>
                <a href="#"  onClick={this.handleLike}> {this.state.isLiked==false ? unlike:like} </a>{this.state.likes.length}
                <a href="#comment"><i className="far fa-comment fa-1.5x ml-4">{" "}{post.comments.length}</i></a>
                </div>
                { this.PrintComments(post.comments)}

                <Form className="m-2" onSubmit={this.handleCommentSubmit}>
                    <input
                        id="comment"
                        value={this.state.comment}
                        onChange={this.handleComment}
                        type="text"
                        placeholder="Add a comment"
                        className="mr-2"
                    />
                    <input type="submit" value="Add"/>
                </Form>
                {/* {console.log("hello", post)} */}
            </Card >

        );


    };


    render() {
        // console.log(this.state.allPosts)
        this.GetPost(this.props.postid)
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