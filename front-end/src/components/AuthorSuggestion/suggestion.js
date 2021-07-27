import axios from 'axios';
import React from 'react';
import { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { Card, Button } from 'react-bootstrap'
// import ProfileView from '../ProfileView'
// import { PROFILE } from '../../constants/routes';
import { Link } from 'react-router-dom';

// import { useEffect, useRef } from "react";



class Suggestion extends Component {
    // _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            image: '',
            token: 'Follow'
        }


        this.handleAddFriend = this.handleAddFriend.bind(this);
        this.GetCommenter(this.props.id)


    }

    componentDidMount() {
        // this._isMounted = true;
    }

    GetCommenter(id) {
        var link = 'http://localhost:4000/authors/' + id
        // console.log(link)
        // if (link !== undefined) {
        axios.get(link)
            .then((res) => {
                // console.log("data",res.data);
                this.setState({ image: res.data.image })
                this.setState({ first_name: res.data.first_name })
                this.setState({ last_name: res.data.last_name })
            }
            )
            .catch(() => {
                var msg = "User Unavailabe for id " + id
                alert(msg)
            })
    }

    handleAddFriend = (event) => {

        // this.state.token = "Added"
        const body = {
            following: this.props.id
        }

        // console.log(this.props.user)
        // console.log(friend)

        axios.patch('http://localhost:4000/readers/addauthor/' + this.props.user, body).then((response) => {
            // console.log(this.props.user)
            // console.log(response)

        }).catch((err) => {
            alert("not valid data")
        })

        const body1 = {
            followers: this.props.user
        }

        // console.log(this.props.user)
        // console.log(friend)

        axios.patch('http://localhost:4000/authors/updateauthor/' + this.props.id, body1).then((response) => {
            // console.log(this.props.user)
            // console.log(response)

        }).catch((err) => {
            alert("not valid data")
        })
        // console.log("after patch")
        event.preventDefault();
        this.setState({ token: "Following" })

    }

    // componentWillUnmount() {
    //     this.setState = (state, callback) => {
    //         return;
    //     };
    // }


    render() {

        return (
            <Card className="friend">
                <div className="friend">
                    <a href={`/authprofile/${this.props.id}/${this.props.user}`}>
                        <div><img className="profile m-2" src={this.state.image} />{this.state.first_name} {this.state.last_name}</div>
                    </a>
                    <input type="submit" value={this.state.token} onClick={this.handleAddFriend} />
                </div>
            </Card>
        );

    }
}

export default Suggestion