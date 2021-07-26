import React, { Component ,useState } from 'react';
import axios from 'axios';
import { compose } from 'recompose';
import {
    AuthUserContext,
    withAuthorization,
    withEmailVerification,
  } from '../Session';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import {Row,Col,Form,FormGroup,Card,ListGroup,Button,Container} from 'react-bootstrap';
import Select from 'react-select';



class Genre extends Component
{
  constructor(props)
    {
        super(props);
        this.state = {
          books:'',
          chosengenres: []
        }
    }

    componentDidMount()
    {
        this.GetBook(this.props.bookid)
    }
    
  
    GetBook (bookid)
    {
          var link = 'http://localhost:4000/books/'+bookid
          console.log(link)
          axios.get(link)
            .then((res) => {
              this.setState({books : res.data})
            }
            )
            .catch(() => {
                var msg = "Book Unavailabe for id "+bookid
                alert(msg)
            })
    }
    choose() {

      console.log('choose called with id',this.state.books._id);
        var Genras=[
          {value:'1',label:'Drama'},
          {value:'2',label:'Thriller'},
          {value:'3',label:'Fiction'},
          {value:'4',label:'Romantic'},
          {value:'5',label:'Mystery'},
          {value:'6',label:'Magical Realism'},
          {value:'7',label:'Political Satire'},
          {value:'6',label:'Autobiography'},
          {value:'7',label:'Biography'},

          
        ]

        var handler = (e) =>
        {
          this.setState({ chosengenres: Array.isArray(e)?e.map(x=>x.label):[] });
          
        }
        var submit = () =>
        {
        
          console.log('id',this.state.books._id)
          var link='http://localhost:4000/books/updategenre/' + this.state.books._id
          var G 

          this.state.chosengenres.map((g,index) =>
            {
              var bool='false';

              this.state.books.genre.map((g1,i)=>{
                if(g1 === g)
                {
                   bool='true';
                   console.log('match for',g)
                } 
              });

              if(bool==='false')
              {
                console.log('false for ',g)
                G={genre:g}
                axios.patch(link,G).then((response) => {
                  console.log("genre added ",G);
                  console.log(response.data);
      
                }).catch((err) => {
                  alert("not valid data")
                })
              }
            }
            
          )

          
          
        }
        return(
          <div>
              <Container>
                <Row>
                    <Col sm={9}>
                        <Select isMulti options={Genras} onChange={handler}>Select Genre</Select>
                    </Col>
                    <Col sm={3}>
                        <Button size="sm" className="mr-2" onClick={submit}>Submit</Button>
                    </Col>
                    
                </Row>
              </Container>
            
            
          </div>
        );

  };

  render(){

    return(
      <div>
          <div className="display" >
            {this.choose()}
          </div>
      </div>

    );
}
}

export default Genre


 