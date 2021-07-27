import axios from 'axios';
import React from 'react';
import { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { Card} from 'react-bootstrap'
// import ProfileView from '../ProfileView'
// import { PROFILE } from '../../constants/routes';
import { Link } from 'react-router-dom';

// import { useEffect, useRef } from "react";



class Suggestion extends Component {
    // _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            image: '',
            token: 'Add to wishlist'
        }


        this.handleAdd = this.handleAdd.bind(this);
        this.GetBook(this.props.id)


    }

    componentDidMount() {
        // this._isMounted = true;
    }

    GetBook(id) {
        var link = 'http://localhost:4000/books/' + id
        // console.log(link)
        // if (link !== undefined) {
        axios.get(link)
            .then((res) => {
                // console.log("data",res.data);
                this.setState({ image: res.data.bookimage })
                this.setState({ name: res.data.name })
            }
            )
            .catch(() => {
                var msg = "Book Unavailabe for id " + id
                alert(msg)
            })
    }

    handleAdd = (event) => {

        // this.state.token = "Added"
        const body = {
            wishlist: this.props.id
        }

        // console.log(this.props.user)
        // console.log(friend)

        axios.patch('http://localhost:4000/readers/updatebook/' + this.props.user, body).then((response) => {
            // console.log(this.props.user)
            // console.log(response)

        }).catch((err) => {
            alert("not valid data")
        })
        // console.log("after patch")
        event.preventDefault();
        this.setState({ token: "Added" })

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
                <Link to={'./info/'+ this.state.name}>
                        <div><img className="m-2" src={this.state.image} style={{height:"90px"}}/>{this.state.name}</div>
                    </Link>
                    <input type="submit" value={this.state.token} onClick={this.handleAdd} />
                </div>
            </Card>
        );

    }
}

export default Suggestion