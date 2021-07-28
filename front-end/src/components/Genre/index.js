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
import {Row,Col,Form,FormGroup,Card,ListGroup,Button} from 'react-bootstrap';
import Select from 'react-select';
import { read } from '@popperjs/core';




const ShowChooseGenre = () => (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <Genre authUser={authUser}/>
        </div>
      )}
    </AuthUserContext.Consumer>
  );

class Genre extends Component
{
  constructor(props)
    {
        super(props);
        this.state = {
          reader: '',
          chosengenres: []
        }
    }
    componentDidMount()
    {
        this.GetReader(this.props.authUser.email)
    }

    GetReader (email)
    {
        var link = 'http://localhost:4000/readers/email/'+email
        //console.log(link)
        axios.get(link)
          .then((res) => {
            this.setState({reader : res.data[0]})
            //console.log('reader',res.data[0])
          }
          )
          .catch(() => {
            alert("Data Unavailabe in get reader in genre")
          })
    }
    choose(reader) {

      //console.log('choose called');
        var Genras=[
          {value:'1',label:'drama'},
          {value:'2',label:'thriller'},
          {value:'3',label:'fiction'},
          {value:'4',label:'romantic'},
          {value:'5',label:'mystery'},
        ]

        var handler = (e) =>
        {
          this.setState({ chosengenres: Array.isArray(e)?e.map(x=>x.label):[] });
          
        }
        var submit = () =>
        {
          var link='http://localhost:4000/readers/updategenre/' + reader._id
          var G 

          this.state.chosengenres.map((g,index) =>
            {
              var bool='false';

              this.state.reader.genre.map((g1,i)=>{
                //console.log('w',w);
                //console.log('wish',book.wishlist);
                if(g1 === g)
                {
                   bool='true';
                   //console.log('match for',g)
                } 
              });

              if(bool==='false')
              {
                //console.log('false for ',g)
                G={genre:g}
                axios.patch(link,G).then((response) => {
                  //console.log("genre added ",G);
                  //console.log(response.data);
      
                }).catch((err) => {
                  alert("not valid data")
                })
              }
            }
            
          )

         window.location.href = "http://localhost:3000/reader" 
          
        }
        return(
          <div>
            <center><h1>Choose Your Genres</h1></center>
            <br></br>
            <Row>
              <Col sm={3}></Col>
              <Col sm={6}>
              <Select isMulti options={Genras} onChange={handler}></Select>
              <Button onClick={submit}>Submit</Button>
              </Col>
            </Row>
            
          </div>
        );

  };

  render(){

    return(
      <div>
          <div className="display" >
            {this.choose(this.state.reader)}
          </div>
      </div>

    );
}
}


const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(ShowChooseGenre);


 