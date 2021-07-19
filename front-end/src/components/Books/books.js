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
import { CardDeck, Card ,Row,Col} from 'react-bootstrap';


const Info = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div >
                <Books authUser={authUser} />
            </div>
        )}
    </AuthUserContext.Consumer>
);




class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            Author: [],
            searchfield: '',
            user: [],
            newAuthor:[]
        }

    }

    componentDidMount() {
        //console.log(this.props.authUser.email);
        this.GetReader(this.props.authUser.email)

    }

    GetReader(email) {
        var link = 'http://localhost:4000/readers/email/' + email;
        console.log(link)
        axios.get(link)

            .then((res) => {
                this.setState({ user: res.data })
                console.log(this.state.user);
            }
            )
            .catch(() => {
                alert("Data Unavailabe")
            })
    }

    searchbook = (e) => {
        let val;
        e.preventDefault();
        const search = { name: this.state.searchfield };
        axios.post("http://localhost:4000/books/bookname", search).then((response) => {
            console.log(this.state.user);
            this.setState({ books: [response.data] });

            const author =  response.data['author'] ;
            
            axios.get("http://localhost:4000/readers/auth/" +author).then((response) => {

                this.setState({ Author: [response.data] });
               // console.log('author');
                //console.log(response.data);

            }).catch(() => {
                alert("Data Unavailabe")

            })
    
            axios.get("http://localhost:4000/authors/" +author).then((response) => {

                this.setState({ newAuthor: [response.data] });
                console.log(' new author');
                console.log(response.data);

            }).catch(() => {
                alert("Data Unavailabe")

            })







        }).catch(() => {
            alert("Data Unavailable")

        })



    }

    handlesearch = (e) => {
        console.log(e.target.value);
        this.setState({ searchfield: e.target.value });

    }

    handlewish = (e) => {
        e.preventDefault();
        let book;
        let userid = this.state.user[0]['_id'];
        //console.log(userid);
        this.state.books.map((b, i) => {
           // console.log(b['_id']);
            book = { wishlist: b['_id'] };
        })

        axios.patch('http://localhost:4000/readers/updatebook/' + userid, book).then((response) => {
           // console.log("wishlist");
            //console.log(response.data);

        }).catch((err) => {
            alert("not valid data")
        })
    }

    //handle following author
    handlefollow = (e) => {
        e.preventDefault();
        
        let userid = this.state.user[0]['_id'];
        let follower;
        let writer;
        console.log(userid);
        this.state.Author.map((b, i) => {
            console.log( b['author_id']);
            writer=b['author_id'];
            follower={followers:userid};

            axios.patch('http://localhost:4000/authors/updateauthor/' +writer , follower).then((response) => {
            console.log("followerlist");
            console.log(response.data);

        }).catch((err) => {
            alert("not valid data")
        })
            
        })

    }

    render() {
        return (
            <div style = {{marginBottom: "27px"}}>
            
                <SearchArea searchbook={this.searchbook} handlesearch={this.handlesearch} />
                
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


                            <Authors handlefollow={this.handlefollow} auth={this.state.Author}  />
                            <Auth newauth={this.state.newAuthor} />
                           
                        </Card.Body>
                       
                    </Card>
                    </Col> 
                    </Row>
                </CardDeck>
            </div>

        );
    }
}
const condition = authUser => !!authUser;
export default compose(
    withEmailVerification,
    withAuthorization(condition),
  )(Info);