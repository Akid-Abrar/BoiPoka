import axios from 'axios';
import React from 'react';
import { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../Post/DiscussionPost/style.css'
import User from '../Post/DiscussionPost/user'
import { Button, Card, Col, Container, Form } from 'react-bootstrap'

// import { AiOutlineLike } from 'react-icons/AiOutlineLike';

class PrintReview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: '',
        }


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

    


    PrintPosts(post) {
        var date = new Date(post.createdAt)
        // console.log("in show")

        return (
            <Card className="p-2 m-2">
                <div align="right"><i> {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}{' '} at  {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
                </i></div>
                <User id={post.creatorid} userid={this.props.currentuserid} />

                <div style={{justifyContent: "center", marginTop: "20px"}}>
                    Rated it {'     '}<br/>

                    {Array.from({ length: this.state.post.rating }, (value, key) => <i className="fas fa-star" key={key}></i>)}

                    {Array.from({ length: 5 - this.state.post.rating }, (value, key) => <i className="far fa-star" key={key}></i>)}
                    </div>
                <Card >
                    <div className="post p-2 m-2" style={{ border: "7px", bordercolor: "#925024" }}>
                        <h5>{post.content}</h5>
                    </div>

                </Card>

                {/* {console.log("hello", post)} */}
            </Card >

        );


    };


    render() {
        // console.log('in printreview')
        this.GetPost(this.props.id)
        if (this.state.post !== '') {
            return (
                <>{this.PrintPosts(this.state.post)}</>
            );
        } else {
            return (<></>);
        }


    }
}

export default PrintReview