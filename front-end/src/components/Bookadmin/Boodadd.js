import React, { Component } from 'react'
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

class Bookadd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            newBookData: {
                name: '',
                genre: [],
                release_year: '',
                description: '',
                author: '',
                bookimage: ''


            },
            editBookData: {
                id: '',
                name: '',
                genre: [],
                release_year: '',
                description: '',
                author: '',
                bookimage: ''

            },
            newBookModal: false,
            editBookModal: false
        }

    }
    componentWillMount() {

    }

    toggleNewBookModal() {
        this.setState({
            newBookModal: !this.state.newBookModal
        });
    }
    toggleEditBookModal() {
        this.setState({
            editBookModal: !this.state.editBookModal
        });
    }

    //for adding book
    addBook() {
        axios.post('http://localhost:4000/books', this.state.newBookData).then((response) => {
            let { books } = this.state;

            books.push(response.data);

            this.setState({
                books, newBookModal: false, newBookData: {
                    name: '',
                    genre: [],
                    release_year: '',
                    description: '',
                    author: '',
                    bookimage: ''

                }
            });
        });
    }

    //for update book
    updateBook() {
        let { name, genre
            , release_year,
            description,
            author,
            bookimage
        } = this.state.editBookData;

        axios.patch('http://localhost:4000/books/' + this.state.editBookData.id, {
            name, genre
            , release_year,
            description,
            author,
            bookimage,
        }).then((response) => {
            this._refreshBooks();

            this.setState({
                editBookModal: false, editBookData: { id: '',
                name: '',
                genre: [],
                release_year: '',
                description: '',
                author: '',
                bookimage: '' }
            })
        });
    }

    editBook(id, name,genre,release_year,description,author,bookimage) {
        this.setState({
          editBookData: { id, name,genre,release_year,description,author,bookimage}, editBookModal: ! this.state.editBookModal
        });
      }


      deleteBook(id) {
        axios.delete('http://localhost:4000/books/' + id).then((response) => {
          this._refreshBooks();
        });
      }
      _refreshBooks() {
        axios.get('http://localhost:4000/books').then((response) => {
          this.setState({
            books: response.data
          })
        });
      }


    render() {
        let books = this.state.books.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                <td>{book.release_year}</td>
                <td>{book.genre}</td>
                <td>
                  <Button color="success" size="sm" className="mr-2" onClick={this.editBook.bind(this,book.id, book.name,book.genre,book.release_year,book.description,book.author,book.bookimage)}>Edit</Button>
                  <Button color="danger" size="sm" onClick={this.deleteBook.bind(this, book.id)}>Delete</Button>
                </td>
              </tr>
            )
          });
        return (
            <div className="App container">
            <Button className="my-3" color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add Book</Button>
            <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
            <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new book</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input id="title" value={this.state.newBookData.title} onChange={(e) => {
                  let { newBookData } = this.state;
    
                  newBookData.title = e.target.value;
    
                  this.setState({ newBookData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="rating">Rating</Label>
                <Input id="rating" value={this.state.newBookData.rating} onChange={(e) => {
                  let { newBookData } = this.state;
    
                  newBookData.rating = e.target.value;
    
                  this.setState({ newBookData });
                }} />
              </FormGroup>
    
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addBook.bind(this)}>Add Book</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>
    
          <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
            <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a new book</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input id="title" value={this.state.editBookData.title} onChange={(e) => {
                  let { editBookData } = this.state;
    
                  editBookData.title = e.target.value;
    
                  this.setState({ editBookData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="rating">Rating</Label>
                <Input id="rating" value={this.state.editBookData.rating} onChange={(e) => {
                  let { editBookData } = this.state;
    
                  editBookData.rating = e.target.value;
    
                  this.setState({ editBookData });
                }} />
              </FormGroup>
    
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateBook.bind(this)}>Update Book</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>
    
    
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Release year</th>
                  <th>Author</th>
                </tr>
              </thead>
    
              <tbody>
                {books}
              </tbody>
            </Table>
          </div>
        );
            

        
    }
}
export default Bookadd;