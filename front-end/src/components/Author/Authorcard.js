import React, { Component } from 'react'

const Authorcard = (props) => {
    return (
        
        <div className="card">
        <div className="card-body">
        <h2 className="card-title">By:{props.firstname}  {props.lastname}</h2>
        
    
        </div>
        </div>
    )

}
export default Authorcard;