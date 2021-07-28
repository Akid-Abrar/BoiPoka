import React, { Component } from 'react'
import { Image } from 'react-bootstrap'

import { ListGroup, Card, Form, Button, Container, Popover, Row, Col } from 'react-bootstrap';
import Addwish from '../wishlist/addwish';



const Bookcard = (props) => {
    return (

        <div>
            <Row style={{ padding: 20 }}>
                <Col className="col-6">
                    <Image
                        height={200}
                        width={130}
                        rounded
                        src={props.bookimage}
                    />
                    <br></br><br></br>
                    <div style={{backgroundColor:"#ebdb82d8" , width:"130px" , height:"32px"}}>
                    <center>
                        <h5>Avg_rating:{(props.avg_rating!==null || props.avg_rating!==undefined)?props.avg_rating:0}</h5>
                    </center>
                    </div>
                    {/* <Addwish val={props.val} handlewish={props.wish} /> */}
                    
                </Col>
                <Col className="col-6">
                <div >
                    <p><font style={{color:"#925024"}}><b>Genre:</b></font></p>
                 </div>   
                    <ul>
                        <ListGroup variant="flush" >
                            {props.genre.map((value, index) => {

                                return <ListGroup.Item style={{ backgroundColor: "#ebdb82d8" }} key={index}>{value}</ListGroup.Item>
                            })}
                        </ListGroup>
                    </ul>
                    <Card bg={'light'} text={'dark'} style={{ width: '28rem' }} className="mb-2">
                        <Card.Header style={{ backgroundColor: "#925024" }}>
                            
                            <font style={{color:"#ebdb82d8"}}><b>{props.nam}</b></font>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title > Description </Card.Title>
                            <Card.Text style={{ backgroundColor: "#ebdb82d8" }}>
                                {props.des}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br/><br/>
            
        </div>
    )

}
export default Bookcard;