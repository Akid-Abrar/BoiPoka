import React, { Component } from 'react'
import { Image } from 'react-bootstrap'

import { ListGroup, Card, Form, Button, OverlayTrigger, Popover, Row, Col } from 'react-bootstrap';
import Addwish from '../wishlist/addwish';



const Bookcard = (props) => {
    return (

        <div>
            <Row style={{ padding: 20 }}>
                <Col className="col-6">
                    <Image
                        height={100}
                        width={100}
                        rounded
                        src={props.bookimage}
                    />




                    <h5>Avg_rating:{props.avg_rating}</h5>

                    <Addwish handlewish={props.wish} />
                    <a href={`/review/${props.id}`}>
                        <Button className="btn btn-dark m-2">
                            Add Review
                        </Button>
                    </a>
                </Col>
                <Col className="col-6">
                <p>Genre:</p>
                <ul>
                    <ListGroup variant="flush" >
                        {props.genre.map((value, index) => {

                            return <ListGroup.Item style = {{backgroundColor:"#ebdb82d8"}} key={index}>{value}</ListGroup.Item>
                        })}
                    </ListGroup>
                </ul>
                <Card bg={'light'} text={'dark'}  style={{ width: '28rem' }} className="mb-2">
                    <Card.Header style = {{backgroundColor:"#925024"}}>{props.nam}</Card.Header>
                    <Card.Body>
                        <Card.Title > Description </Card.Title>
                        <Card.Text style = {{backgroundColor:"#ebdb82d8"}}>
                            {props.des}
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </div>
    )

}
export default Bookcard;