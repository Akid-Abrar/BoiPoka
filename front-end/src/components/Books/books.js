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
import { CardDeck, Card ,Row,Col,Button} from 'react-bootstrap';


const Info = (props) => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div >
               
                <Books   searchname={props.match.params.value} authUser={authUser} />
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
            token: 'Add to wishlist',
            ftoken:'Follow Author',
            rtoken:'Read'
        }
        this.handlewish = this.handlewish.bind(this);
        this.handlefollow=this.handlefollow.bind(this);
        this.handleread = this.handleread.bind(this);

    }

    componentDidMount() {
        
        
        this.searchbook();
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
      //  this.searchbook();

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
       
      
        const search = { name: this.props.searchname };
        
        axios.post("http://localhost:4000/books/bookname", search).then((response) => {
            //console.log(this.state.user);
            this.setState({ books: response.data });

            if(this.state.user[0].wishlist.includes(this.state.books[0]._id))
                {
                    
                    this.setState({ token: "Remove from wishlist" });
                }
                else
                {
                    this.setState({ token: "Add to wishlist" });
                }
            if(this.state.user[0].books_read.includes(this.state.books[0]._id))
                {
                    
                    this.setState({ rtoken: "Remove from Read" });
                }
                else
                {
                    this.setState({ rtoken: "Read" });
                }

            const author =  response.data[0].author ;
            axios.get("http://localhost:4000/authors/" +author).then((res) => {
               
                this.setState({ newAuthor: [res.data] });

                this.setState({authornew:res.data._id});

                if(this.state.newAuthor[0].followers.includes(this.state.usernew))
                    {
                        this.setState({ftoken:"Unfollow Author"});
                    }
                    else
                    {
                        this.setState({ftoken:"Follow Author"});
                    }
            }).catch(() => {
               console.log("Data Unavailabe in book's searchbook(inner) author from author");

            })
        }).catch(() => {
            console.log("Data Unavailableb in book's searchbook(outer)")

        })
    }

    handlesearch = (e) => {
        console.log(e.target.value);
    }

    handlewish = (e) => {
        let book;
        let userid = this.state.user[0]['_id'];
        //console.log('userid',userid);
        this.state.books.map((b, i) => {
            book = { wishlist: b['_id'] };
        });
        if (this.state.token === "Add to wishlist") {
            e.preventDefault();
            axios.patch('http://localhost:4000/readers/updatebook/' + userid, book).then((response) => {       
                console.log(response.data);
        }).catch((err)=>{
            console.log(err);
        });

            this.setState({ token: "Remove from wishlist" });
     
        }
        else{
            e.preventDefault();
            axios.patch('http://localhost:4000/readers/pullbook/' + userid, book).then((response) => {
            }).catch((err)=>{
                console.log(err);
            });

            this.setState({ token: "Add to wishlist" });
        
        }
    }

    handleread = (e) => {
        let book;
        let userid = this.state.user[0]['_id'];
        //console.log('userid',userid);
        this.state.books.map((b, i) => {
            book = { books_read: b['_id'] };
        });
        if (this.state.rtoken === "Read") {
            e.preventDefault();
            axios.patch('http://localhost:4000/readers/updateBookRead/' + userid, book).then((response) => {       
                console.log(response.data);
        }).catch((err)=>{
            console.log(err);
        });

            this.setState({ rtoken: "Remove from Read" });

            if(this.state.user[0].wishlist.includes(this.state.books[0]._id))
                {
                    this.setState({ token: "Remove from wishlist" });
                    this.handlewish(e)
                }

     
        }
        else{
            console.log('inside else')
            e.preventDefault();
            axios.patch('http://localhost:4000/readers/pullReadBook/' + userid, book).then((response) => {

                console.log(response.data);
            }).catch((err)=>{
            console.log(err);
            });

            this.setState({ rtoken: "Read" });
        
        }
    }
    //handle following author
    handlefollow = (e) => {
        //e.preventDefault();
        console.log('hlloo');
        let follower;
        let userid = this.state.user[0]._id;
        
        let writer=this.state.newAuthor[0]._id;
        let folauth={following:writer};
       
            follower={followers:userid};
            if (this.state.ftoken === "Follow Author") {
                e.preventDefault();

            axios.patch('http://localhost:4000/authors/updateauthor/' +writer , follower).then((response) => {
           // console.log("followerlist");
            //console.log(response.data);

        }).catch((err) => {
            alert("not valid data");
        });
        axios.patch('http://localhost:4000/readers/updatefollow/' +userid , folauth).then((response) => {
            console.log("followinglist");
            console.log(response.data);

        }).catch((err) => {
            alert("not valid data");
        });
        this.setState({ ftoken: "Unfollow Author" });
    }
    else if(this.state.ftoken === "Unfollow Author")
        {
            e.preventDefault();

            axios.patch('http://localhost:4000/authors/pullauthor/' +writer , follower).then((response) => {
            console.log("followerlist");
            console.log(response.data);

    }).catch((err) => {
        alert("not valid data");
    });

    axios.patch('http://localhost:4000/readers/removefollow/' +userid , folauth).then((response) => {
        console.log("followinglist");
        console.log(response.data);

    }).catch((err) => {
        alert("not valid data");
    });
    this.setState({ ftoken: "Follow Author" });
    }
            
       

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
            {/* this.props.searchname!=='' ?this.searchbook() :null*/}
            {this.refresh()}
             {this.state.books.length >0 ?
                <CardDeck>
                <Row style={{padding: 20}}>
                       <Col className="col">
                         
                       <Card >
                        <Card.Body > 
                            <Row>
                            <Col sm={6} >
        
                                <Button type="submit" onClick={this.handlewish} >{this.state.token}</Button>
                            
                            </Col>
                            <Col sm={6} >
                                <Button type="submit" onClick={this.handleread} >{this.state.rtoken}</Button>
                            </Col>
                        </Row>
                            <Booklist val={this.state.token} handlewish={this.handlewish}  books={this.state.books} />
                            </Card.Body> 
                            </Card> 
                           
                       </Col>

                       <Col className="col-4">
                    <Card>
                        <Card.Body >
                             <Auth  val={this.state.ftoken} handlefollow={this.handlefollow}  newauth={this.state.newAuthor}
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