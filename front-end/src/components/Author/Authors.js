import React, { Component } from 'react'
import Authorcard from './Authorcard';
const Authors = (props) => {
    return (
        <div >
        {
            props.auth.map((a, i) => {
            return <Authorcard 
            key={i}
            firstname={a["first_name"]}
            lastname={a["last_name"]}
            
            />
        })
    }
            
        </div>
    )

}
export default Authors;