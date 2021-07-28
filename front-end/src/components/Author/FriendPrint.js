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
        
        return(

            <div>
            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">{this.state.friends.first_name}</Tooltip>}
                >
                {({ ref, ...triggerHandler }) => (
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
                )}
            </OverlayTrigger>
            <p>{this.state.friends.first_name}</p>
            </div>
          );
    }
}

export default FriendPrint

