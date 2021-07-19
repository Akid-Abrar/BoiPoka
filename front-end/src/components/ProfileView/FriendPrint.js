import axios from 'axios';
import React from 'react';
import {Component} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import {Image,OverlayTrigger,Button,Tooltip} from 'react-bootstrap'

class FriendPrint extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
          friends: [],
        }

    }

    componentDidMount()
    {
        this.GetFriend(this.props.friendid)
    }
    
  
    GetFriend (friendid)
    {
          var link = 'http://localhost:4000/readers/'+friendid
          axios.get(link)
            .then((res) => {
              this.setState({friends : res.data})
              
            }
            )
            .catch(() => {
                var msg = "User Unavailabe for id "+friendid
                alert(msg)
            })
    }

    render()
    {
        // var imgsrc="https://images.unsplash.com/photo-1591055749071-927e6ddffc82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
        return(

            <div>
            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">{this.state.friends.first_name} {this.state.friends.last_name}</Tooltip>}
                >
                {({ ref, ...triggerHandler }) => (
                    <a href={`/profile/${this.state.friends._id}/${this.props.userid}`}>
                    <Button
                        variant="light"
                        style = {{backgroundColor:"#d1ecf0d8" , border:"0px"}}
                        {...triggerHandler}
                        className="d-inline-flex align-items-center"
                    >
                        <Image
                            ref={ref}
                            height={40}
                            width={40}
                            roundedCircle
                            src={this.state.friends.image}
                        />
                    </Button>
                    </a>
                )}
            </OverlayTrigger>
            <p>{this.state.friends.first_name}</p>
            </div>
          );
    }
}

export default FriendPrint

