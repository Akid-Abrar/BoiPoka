import axios from 'axios';
import React from 'react';
import { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { Button, Card, Col, Container } from 'react-bootstrap'

class Suggestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            image: '',
        }

    }

    componentDidMount() {
        this.GetCommenter(this.props.id)
    }

    GetCommenter(id) {
        var link = 'http://localhost:4000/readers/' + id
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
    };

    render() {
        return (
            <Card>
                <div><img className="profile" src={this.state.image} />{this.state.first_name} {this.state.last_name}</div>
                <Button className="button-dark">Add Friend</Button>
            </Card>
        );

    }
}

export default Suggestion