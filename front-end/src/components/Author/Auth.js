import React, { Component } from 'react'
import Authcard from './Authcard'
const Auth = (props) => {
    return (
       
        <div >
        { 
           
            props.newauth.map((a, i) => {
            return <Authcard 
            key={i}
            
            bio={a["biography"]}
            image={a["image"]}
            follow={a["followers"]}
            
            
            />
        })
        
    } 
    

   
            
        </div>
    )

}
export default Auth;