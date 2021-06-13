import React from 'react';
import {Component} from 'react'

class Reader extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
          reader: [],
          books_read: [],
        }
    }

    componentDidMount()
    {
        this.GetReader('60c1e2b8e75d4811348ac3e6')
    }

    GetReader(id)
    {
        var link = 'http://localhost:3000/readers/'+id
        fetch(link)
          .then(res => res.json())
          .then(json =>{
              this.setState({
                reader: json,
                books_read: json
              })
        });
    }
    GetBook

    render(){
        var {reader,books_read}= this.state;
        var f_name=reader.first_name;
        var l_name=reader.last_name;
        var name=f_name+" "+l_name;
        return(
          <div>
              <h1>{name}</h1>
              <h1>{}</h1>
          </div>

        );
    }
}


export default Reader;
