import axios from 'axios';
import React from 'react';
import { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../../styles.css'
import { Button, Card, Col, Container } from 'react-bootstrap'

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
        }

    }

    componentDidMount() {
        this.GetCommenter(this.props.id)
    }

    GetCommenter(id) {
        var link = 'http://localhost:4000/readers/' + id
        console.log(link)
        // if (link !== undefined) {
        axios.get(link)
            .then((res) => {
                this.setState({ first_name: res.data.first_name })
                this.setState({ last_name: res.data.last_name })
            }
            )
            .catch(() => {
                var msg = "User Unavailabe for id " + id
                alert(msg)
            })
    };

    render() {
        return (
            <>{this.state.first_name} {this.state.last_name}</>
        );

    }
}

export default User