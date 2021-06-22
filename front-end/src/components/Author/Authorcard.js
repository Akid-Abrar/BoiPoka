import React, { Component } from 'react'

const Authorcard = (props) => {
    return (
        
        <div className="card">
        <div className="card-body">
        <h2>About Author</h2>
        <h3 className="card-title">{props.firstname}  {props.lastname}</h3>
        
    
        </div>
        </div>
    )

}
export default Authorcard;