import React, { Component } from 'react'
import { Image } from 'react-bootstrap';
import Followauth from '../Follow_author/FollowAuthor';

const Authcard = (props) => {
    return (
        <div>
        <div className="card">
        <div className="card-body">
        <div className="card-title">
        
       
        <h2 style = {{backgroundColor:"#925024"}}>About Author</h2>
        <a href={`/authprofile/${props.userid}/${props.ownid}`}>
        <h3 className="card-title">{props.fname}  {props.lname}</h3>
        </a>
        
        
    
       
        <Followauth val={props.val} handlefollow={props.handle} />
        <Image
        height={100}
        width={100}
        roundedCircle
        src={props.image}
        alt="image"
       /> 
    
      <div className="card-text" style = {{backgroundColor:"#ebdb82d8"}}>{props.follow.length} Followers  </div> 
            </div>
        
        <div className="card-text" style = {{backgroundColor:"#ebdb82d8"}}>{props.bio}  </div>
        
        
    
        </div>
        </div>
        
        </div>
    
    )

}
export default Authcard;