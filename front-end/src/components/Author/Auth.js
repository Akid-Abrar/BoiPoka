import React, { Component } from 'react'
import Authcard from './Authcard'
const Auth = (props) => {
    return (
       
        <div >
        { 
           
            props.newauth.map((a, i) => {
            return <Authcard 
            key={i}
            fname={a["first_name"]}
            lname={a["last_name"]}
            bio={a["biography"]}
            image={a["image"]}
            follow={a["followers"]}
            ownid={props.ownid}
            userid={props.userid}
            handle={props.handlefollow}
            
            
            />
        })
        
    } 
    

   
            
        </div>
    )

}
export default Auth;