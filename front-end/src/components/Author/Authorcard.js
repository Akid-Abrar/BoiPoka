import React, { Component } from 'react'
import Followauth from '../Follow_author/FollowAuthor';

const Authorcard = (props) => {
    return (
        <div>
        <div className="card">
        <div className="card-body">
        <h2 style = {{backgroundColor:"#925024"}}>About Author</h2>
        <h3 className="card-title">{props.firstname}  {props.lastname}</h3>
        
        <h6> </h6>
    
        </div>
        </div>
        <Followauth  handlefollow={props.handle} />
        </div>
    
    )

}
export default Authorcard;