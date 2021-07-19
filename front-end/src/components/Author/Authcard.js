import React, { Component } from 'react'
import { Image } from 'react-bootstrap';


const Authcard = (props) => {
    return (
        <div>
        <div className="card">
        <div className="card-body">
        <div className="card-title">
        
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