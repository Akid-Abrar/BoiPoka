import axios from 'axios';
import React from 'react';
import {Component} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import {Image,OverlayTrigger,Button,Tooltip} from 'react-bootstrap'

class AuthorPrint extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
          authors: [],
        }

    }

    componentDidMount()
    {
        this.GetAuthor(this.props.authorid)
    }
    
  
    GetAuthor (authorid)
    {
          var link = 'http://localhost:4000/authors/'+authorid
          axios.get(link)
            .then((res) => {
              this.setState({authors : res.data})
              
            }
            )
            .catch(() => {
                var msg = "User Unavailabe for id "+authorid
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
                overlay={<Tooltip id="button-tooltip-2">{this.state.authors.first_name} {this.state.authors.last_name}</Tooltip>}
                >
                {({ ref, ...triggerHandler }) => (
                    <a href={`/authprofile/${this.props.authorid}/${this.props.user}`}>
                    <Button
                        variant="light"
                        style = {{  border:"0px"}}
                        {...triggerHandler}
                        className="d-inline-flex align-items-center"
                    >
                        <Image
                            ref={ref}
                            height={40}
                            width={40}
                            roundedCircle
                            src={this.state.authors.image}
                        />
                    </Button>
                    </a>
                )}
            </OverlayTrigger>
            <p>{this.state.authors.first_name}{' '}{this.state.authors.last_name}</p>
            </div>
          );
    }
}

export default AuthorPrint

