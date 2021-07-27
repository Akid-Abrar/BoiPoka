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
import { CardDeck, Card, Row, Col, Button, Container } from 'react-bootstrap';
import PrintReview from './printReviews'

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
            allbook: [],
            Author: [],
            searchfield: props.searchname,
            user: [],
            newAuthor: [],
            authornew: '',
            usernew: '',
            token: 'Add to wishlist',
            ftoken:'Follow Author',
            posts: []
        }
        this.handlewish = this.handlewish.bind(this);
        this.handlefollow = this.handlefollow.bind(this);
        

    }

    componentDidMount() {
        
        
        this.searchbook();
        let suggestion = [];
        this.GetReader(this.props.authUser.email);
        axios.get("http://localhost:4000/books").then((res) => {
            res.data.map((b, i) => {
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
                this.setState({ usernew: res.data[0]._id });
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
            this.GetPosts();

            
          //  this.state.user[0].wishlist.map((wish,i)=>{
               // console.log('wih',wish);
               // console.log('id',this.state.books[0]._id);
              /*  if(wish===this.state.books[0]._id)
                {
                    console.log('state',this.state.token);
                    console.log('true',wish);
                    this.setState({ token: "Remove from list" });
                }
                else
                {
                    this.setState({ token: "Add to wishlist" });
                }
            }); */

            if(this.state.user[0].wishlist.includes(this.state.books[0]._id))
                {
                    
                    this.setState({ token: "Remove from list" });
                }
                else {
                    this.setState({ token: "Add to wishlist" });
                }

            const author = response.data[0].author;



            axios.get("http://localhost:4000/authors/" + author).then((res) => {

                this.setState({ newAuthor: [res.data] });

                this.setState({authornew:res.data._id});
               /* this.state.newAuthor[0].followers.map((a,i)=>{
                    console.log('usernew',this.state.usernew);
                    if(a.includes(this.state.usernew))
                    {
                        this.setState({ftoken:"Unfollow Author"});
                    }
                    else {
                        this.setState({ ftoken: "Follow Author" });
                    }
                }); */

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
        let bool = 'false';
        let userid = this.state.user[0]['_id'];
        //console.log('userid',userid);
        this.state.books.map((b, i) => {

            console.log('bookid', b['_id']);
            book = { wishlist: b['_id'] };
        });
        /* this.state.user[0]['wishlist'].map((w,i)=>{
             console.log('w',w);
             console.log('wish',book.wishlist);
             if(w=== book.wishlist)
             {
                bool='true';
                console.log(bool);
             } 
         });  */


        if (this.state.token === "Add to wishlist") {
            e.preventDefault();
            axios.patch('http://localhost:4000/readers/updatebook/' + userid, book).then((response) => {




                console.log(response.data);
            }).catch((err) => {
                console.log(err);
            });


            this.setState({ token: "Remove from list" });

        }
        else {
            e.preventDefault();
            axios.patch('http://localhost:4000/readers/pullbook/' + userid, book).then((response) => {

                console.log(response.data);
            }).catch((err) => {
                console.log(err);
            });


            this.setState({ token: "Add to wishlist" });

        }
    }



    //handle following author
    handlefollow = (e) => {
        //e.preventDefault();
        console.log('hlloo');
        let follower;
        let userid = this.state.user[0]._id;

        let writer = this.state.newAuthor[0]._id;
        console.log(userid);
        console.log(writer);

        follower = { followers: userid };
        if (this.state.ftoken === "Follow Author") {
            e.preventDefault();

            axios.patch('http://localhost:4000/authors/updateauthor/' + writer, follower).then((response) => {
                console.log("followerlist");
                console.log(response.data);

            }).catch((err) => {
                alert("not valid data");
            });
            this.setState({ ftoken: "Unfollow Author" });
        }
        else if (this.state.ftoken === "Unfollow Author") {
            e.preventDefault();

            axios.patch('http://localhost:4000/authors/pullauthor/' + writer, follower).then((response) => {
                console.log("followerlist");
                console.log(response.data);

            }).catch((err) => {
                alert("not valid data");
            });
            this.setState({ ftoken: "Follow Author" });
        }



    }

    refresh = () => {
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }

    GetPosts() {
        var link = 'http://localhost:4000/posts/book/' + this.state.books[0]._id
        // console.log(link)
        // if (link !== undefined) {
        axios.get(link)
            .then((res) => {
                this.setState({posts:res.data})
                
            }
            )
            .catch(() => {
                var msg = "Post Unavailabe for id " + this.state.books[0]._id
                alert(msg)
            })
        // }
        // this.PrintPosts(this.state.post)
    };

    displayPosts() {
        // console.log(this.state.posts)
    
        if (this.state.posts.length !== 0) {
          return (
            <div>
              {this.displayPost(this.state.posts)}
            </div>
          );
        } else {
          return (
            <div>No Review to show</div>
          )
        }
      };
    
      displayPost(posts) {
    
        return posts.map((post, index) => (
          <div className="mt-1" key={index} ><PrintReview id={post._id} currentuserid={this.state.usernew} /></div>
    
        ));
      };


    render() {



        return (
            <div style={{ marginBottom: "27px" }}>


                {/* <Button variant="outline-info"  onClick={this.searchbook}>
        Search </Button>*/}
                {/* this.props.searchname!=='' ?this.searchbook() :null*/}
                {this.refresh()}
                {this.state.books.length > 0 ?
                    <CardDeck>
                        <Row style={{ padding: 20 }}>



                            <Col className="col">

                                <Card >
                                    <Card.Body >
                                        <div >

                                            <input type="submit" value={this.state.token} onClick={this.handlewish} />

                                        </div>
                                        <Booklist val={this.state.token} handlewish={this.handlewish} books={this.state.books} user={this.state.usernew} />
                                        <a href={`/review/${this.state.books[0]._id}`}>
                                            <Button className="btn btn-dark m-2">
                                                Add Review
                        </Button>
                                        </a>
                                        {/* <a href={`/seereview/${this.state.books[0]._id}`}>
                                            <Button className="btn btn-dark m-2">
                                                View Reviews
                        </Button>
                                        </a> */}
                                    </Card.Body>


                                </Card>
                                <Card>
                                <div style={{ backgroundColor: "#9e5a2d", color: "white", margin: "5px", padding: "5px" }} align="center">
                                    <h5>Reviews</h5>
                                </div>
                                <Row>
                                    <Col></Col>
                                    <Col className="col-8">
                                        {this.displayPosts()}
                                    </Col>
                                    <Col></Col>
                                </Row>
                                </Card>


                            </Col>

                            <Col className="col-4">
                                <Card>
                                    <Card.Body >



                                        <Auth val={this.state.ftoken} handlefollow={this.handlefollow} newauth={this.state.newAuthor}
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