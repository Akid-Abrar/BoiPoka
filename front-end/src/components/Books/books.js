import React, { Component } from 'react'
import SearchArea from '../Search/Searcharea';
import Booklist from './Booklist';
import Authors from '../Author/Authors';
import Auth from '../Author/Auth';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import axios from 'axios';
import {
    AuthUserContext

} from '../Session';
import { CardDeck, Card ,Row,Col,OverlayTrigger,Tooltip} from 'react-bootstrap';


const Info = (props) => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div >
               
                <Books searchname={props.match.params.value} authUser={authUser} />
            </div>
        )}
    </AuthUserContext.Consumer>
);




class Books extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            books: [],
            allbook:[],
            Author: [],
            searchfield: props.searchname,
            user: [],
            newAuthor: [],
            authornew: '',
            usernew: '',
        }


    }

    componentDidMount() {
        
        

        let suggestion = [];
        this.GetReader(this.props.authUser.email);
        axios.get("http://localhost:4000/books").then((res)=>
        {
            res.data.map((b,i)=>{
             suggestion.push(b["name"]);
            })
            this.setState({ allbook: suggestion });
            //console.log(this.state.allbook);
        }).catch(() => {
            alert("Data Unavailabe in book's componentDidMount")
        })

    }

    GetReader(email) {
        var link = 'http://localhost:4000/readers/email/' + email;
        console.log(link)
        axios.get(link)

            .then((res) => {
                this.setState({ user: res.data });
                this.setState({usernew:res.data[0]._id});
                console.log(res.data[0]._id);
            }
            )
            .catch(() => {
                alert("Data Unavailabe ib book's GetReader")
            })
    }
     
    searchbook = () => {
       
      // console.log(this.props.match.params.value);
       
        //const search = { name:this.props.match.params.value  };
        //console.log(id);
        const search = { name: this.props.searchname };
        
        axios.post("http://localhost:4000/books/bookname", search).then((response) => {
            //console.log(this.state.user);
            this.setState({ books: response.data });
            //console.log("book array");
           // console.log(this.state.books);

            const author =  response.data[0]['author'] ;
            
          /*  axios.get("http://localhost:4000/readers/auth/" +author).then((response) => {
                
               // console.log(response.data);
                this.setState({ Author: [response.data] });
               // console.log('author');
                //console.log(this.state.Author);

            }).catch(() => {
                alert("Data Unavailabe in book's searchbook(inner) in author from reader")

            })*/
    
            axios.get("http://localhost:4000/authors/" +author).then((res) => {
               
                this.setState({ newAuthor: [res.data] });
                this.setState({authornew:res.data._id});
                
             // console.log('hi',res.data._id);
                
               

            }).catch(() => {
                alert("Data Unavailabe in book's searchbook(inner) author from author")

            })
        }).catch(() => {
            console.log("Data Unavailableb in book's searchbook(outer)")

        })



    }

    handlesearch = (e) => {
        console.log(e.target.value);
        

    }

    handlewish = (e) => {
        e.preventDefault();

        let book;
        let bool='false';
        let userid = this.state.user[0]['_id'];
        console.log('userid',userid);
        this.state.books.map((b, i) => {
            
           console.log('bookid',b['_id']);
            book = { wishlist: b['_id'] };
        });
        this.state.user[0]['wishlist'].map((w,i)=>{
            console.log('w',w);
            console.log('wish',book.wishlist);
            if(w=== book.wishlist)
            {
               bool='true';
               console.log(bool);
            } 
        });


    
        if(bool==='false')
        {
            
                 axios.patch('http://localhost:4000/readers/updatebook/' + userid, book).then((response) => {

                       
                       
                       console.log("KI RE VAI");
                       console.log(response.data);
        }).catch((err)=>{
        console.log(err);

    })
        }
        else
        {
            
            console.log('try not');
            
        }
    
  /* try{
     const res=  await axios.patch('http://localhost:4000/readers/updatebook/' + userid, book);/*.then((response) => {*/
            
            
           // console.log("KI RE VAI");
          //  console.log(res.data); 
     /*   }catch(err)  {
           alert("not valid data"); 
        }   */
         
      
        
    
};

    //handle following author
    handlefollow = (e) => {
        e.preventDefault();
        
        let userid = this.state.user[0]['_id'];
        let follower;
        let writer;
        console.log(userid);
        this.state.newAuthor.map((b, i) => {
            console.log( b['_id']);
            writer=b['_id'];
            follower={followers:userid};

            axios.patch('http://localhost:4000/authors/updateauthor/' +writer , follower).then((response) => {
            console.log("followerlist");
            console.log(response.data);

        }).catch((err) => {
            alert("not valid data");
        });
            
        });

    }

    refresh=()=> {
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }

    render() {
        
               
           
        return (
            <div style = {{marginBottom: "27px"}}>
            
             
             {/* <Button variant="outline-info"  onClick={this.searchbook}>
        Search </Button>*/}
            {this.searchbook()}
            {this.refresh()}
             {this.state.books.length >0 ?
                <CardDeck>
                <Row style={{padding: 20}}>
                    

                       
                       <Col className="col">
                         
                       <Card >
                        <Card.Body > 

                            <Booklist handlewish={this.handlewish}  books={this.state.books} />
                            </Card.Body> 
                            </Card> 
                           
                       </Col>

                       <Col className="col-4">
                    <Card>
                        <Card.Body >

                           
                        
                             <Auth handlefollow={this.handlefollow}  newauth={this.state.newAuthor}
                             userid={this.state.authornew}
                              ownid={this.state.usernew}
                              />
        
                        </Card.Body>
                       
                    </Card>
                    </Col> 
                    </Row>
                </CardDeck>
                : null}
            </div>

        );
    }
}
const condition = authUser => !!authUser;
export default compose(
    withEmailVerification,
    withAuthorization(condition),
  )(Info);