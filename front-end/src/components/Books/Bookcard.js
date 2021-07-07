import React, { Component } from 'react'
import {Image} from 'react-bootstrap'

import { ListGroup, Card } from 'react-bootstrap';

var p= process.cwd() + 'back-end/upload/food.jpg';
console.log(p);

const Bookcard = (props) => {
    return (

        <div>
        <Image
        height={100}
        width={100}
        rounded
        src={props.bookimage}
      />
            <div>
                <h5>Avg_rating:{props.avg_rating}</h5>
                <p>Genre:</p>
                <ul>
                    <ListGroup variant="flush">
                        {props.genre.map((value, index) => {

                            return <ListGroup.Item key={index}>{value}</ListGroup.Item>
                        })}
                    </ListGroup>

                </ul>
                <Card bg={'light'} text={'dark'}  style={{ width: '28rem' }} className="mb-2">
                    <Card.Header>{props.nam}</Card.Header>
                    <Card.Body>
                        <Card.Title> Description </Card.Title>
                        <Card.Text>
                            {props.des}
                        </Card.Text>
                    </Card.Body>
                </Card>


            </div>
        </div>
    )

}
export default Bookcard;