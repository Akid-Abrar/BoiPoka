import React from 'react';
import {Component} from 'react'

class Landing extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
          items: [],
        }
    }

    componentDidMount()
    {
        fetch('http://localhost:3000/readers/60c2081de75d4811348ac3ee')
          .then(res => res.json())
          .then(json =>{
              this.setState({
                items: json,
              })
        });
    }

    render(){
        var {items}= this.state;
        var f_name=items.first_name;
        var l_name=items.last_name;
        var name=f_name+" "+l_name;
        return(
          <div>
              <h1>{name}</h1>
          </div>

        );
    }
}


export default Landing;
