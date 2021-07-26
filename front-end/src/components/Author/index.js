import axios from 'axios';
import React from 'react';
import {Component} from 'react'
import { compose } from 'recompose';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import {Container,Row,Col,Table,Card,Image} from 'react-bootstrap'
import BookPrint from './BookPrint'
import FriendPrint from './FriendPrint'
import '../styles.css'

const Info = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <Author authUser={authUser}/>
      </div>
    )}
  </AuthUserContext.Consumer>
);

class Author extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
          
          authorName: [],
          authors:'',
        }
        //const [authorName, setauthorName] = useState( 0 );
        //const [author, setauthor] = useState( 0 );
    }
    

    componentDidMount()
    {
        const id = "60ccc545ce420727b14a6b20";
        this.GetAuthorName(id)
        
    }

    GetAuthorName (id)
    {
        var link = 'http://localhost:4000/readers/findAuthorName/'+id
        var link1 = 'http://localhost:4000/authors/'+id

        const requestOne = axios.get(link)
        const requestTwo = axios.get(link1)

        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {

          const responseOne = responses[0]
        
          const responseTwo = responses[1]

          console.log("responseTwo")
          console.log(responseTwo.data)


          this.setState({authorName : responseOne.data[0]})
          this.setState({authors : responseTwo.data})
          console.log(this.state.authors)
        })).catch(errors => {
        
          // react on errors.
          alert("Data Unavailabe in author index "+errors)
        
        })
    
          

    }

    displayReader() {
      var callFollower;
      if(this.state.authors.followers !== undefined)
      {
        callFollower = this.displayFollower(this.state.authors.followers);
      }

      var callBooks;
      if(this.state.authors.books !== undefined)
      {
        callBooks = this.displayBook(this.state.authors.books);
      }
      var imgsrc="https://images.unsplash.com/photo-1591055749071-927e6ddffc82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
      return  (
        <div  className="author__display" class="row row-content align-items-center" style = {{marginBottom: "27px"}}>
          
          <Container>
            <Row>
              <Col sm={6}>
                <Card style={{ width: '25rem' , height : '9rem' , backgroundColor:"#d1ecf0d8" ,  border:"0px"}}  >
                  <Card.Body>
                    <Row>
                      <Col sm={5}>
                        <Image
                          height={100}
                          width={100}
                          roundedCircle
                          src={this.state.authors.image}
                        />
                      </Col>
                      <Col sm={7}><h2>
                        {this.state.authorName.first_name} {this.state.authorName.last_name}
                        </h2></Col>
                    </Row>
                  </Card.Body>
                </Card>
                <br></br>
                <font style = {{color:"black"}} size="5"><b>Followers</b></font>
                <br></br>
                <br></br>
                <Row>
                  {console.log("followers",this.state.authors.followers)} 
                  {callFollower}
                  <br></br>
                </Row>
                  <br></br>
              </Col>
              <Col sm={6}>
                  <Table width="700px" border="7" bordercolor="#925024" >
                    <thead className="tableheader-style">
                      <tr align="center">
                        <th align="center">
                          <font style = {{color:"#ebdb82d8"}} size="5">Books By {this.state.authorName.first_name} {this.state.authorName.last_name}</font>
                        </th>
                      </tr>
                    </thead>
                    <tbody align="center" style = {{backgroundColor:"#ebdb82d8"}}>
                      <br></br>
                      <tr>
                        {console.log("books",this.state.authors.books)} 
                        {callBooks}     
                      </tr>
                      
                    </tbody>
                  </Table>
             
              </Col>
              
            </Row>
            
          </Container>

          
        </div>
      );
    };

    displayBook(bookIds) {

      return bookIds.map((bookId, index) => (

          <div key={index} className="book__display_1">
            <div><BookPrint bookid={bookId}/></div>
            <br></br>
          </div>
      ));
    };

    displayFollower(followerIds) {
      console.log("from displayfriend",followerIds)

      return followerIds.map((followerId, index) => (
        <Col key={index} className="friend__display_1" sm={3}>
            <FriendPrint friendid={followerId}/>
        </Col>
      ));
    };
    
    

    render(){

        return(
          <div style = {{backgroundColor:"#d1ecf0d8"}}>
              <div className="display_1" >
              {this.displayReader()}
              </div>
          </div>

        );
    }
}

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Info);