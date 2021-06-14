import React, { Component } from 'react'
import SearchArea from '../Search/Searcharea';
import Booklist from './Booklist';
import Authors from '../Author/Authors';
import axios from 'axios';
import { CardDeck, Card } from 'react-bootstrap';


class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            Author: [],
            searchfield: ''
        }

    }
    searchbook = (e) => {
        let val;
        e.preventDefault();
        const search = { name: this.state.searchfield };
        axios.post("http://localhost:4000/books/bookname", search).then((response) => {
            // console.log(response.data);
            this.setState({ books: [response.data] });

            const author = { id: response.data['author'] };
            axios.post("http://localhost:4000/readers/auth", author).then((response) => {
                //console.log(response.data['first_name']);
                //console.log(response.data['last_name']);
                this.setState({ Author: [response.data] });
                console.log(this.state.Author);
            })


        })



    }




    handlesearch = (e) => {
        console.log(e.target.value);
        this.setState({ searchfield: e.target.value });

    }
    render() {
        return (
            <div>
                
                    <SearchArea searchbook={this.searchbook} handlesearch={this.handlesearch} />
                    <CardDeck>
                    <Card>
                        <Card.Body>
                           
                            

                                <Booklist books={this.state.books} />
                            
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            
                            
                    <Authors auth={this.state.Author} />
                   
                    </Card.Body>
                    </Card>
                </CardDeck>
            </div>

        );
    }
}

export default Books;