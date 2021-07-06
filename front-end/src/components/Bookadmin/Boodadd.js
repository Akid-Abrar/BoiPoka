import React, { Component } from 'react'
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import { compose } from 'recompose';
import Upload from './image'



class Bookadd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            newBookData: {
                name: '',
                genre: [],
                publisher :'',
                release_year: '',
                description: '',
                author: '',
                bookimage: ''


            },
            editBookData: {
                _id:'',
                name: '',
                genre: [],
                release_year: '',
                publisher :'',
                description: '',
                author: '',
                bookimage: '',
                

            },
            newBookModal: false,
            editBookModal: false
        }

    }
    componentWillMount() {
      this._refreshBooks();
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
          //console.log(response.data);
            let { books } = this.state;

            books.push(response.data);

            this.setState({
                books, newBookModal: false, newBookData: {
                    name: '',
                    genre: [],
                    release_year: '',
                    publisher:'',
                    description: '',
                    author: '',
                    bookimage: ''

                }
            });
        });
    }

    imageadd(_id)
    {

    }

    //for update book
    updateBook() {
        let { name, genre
            , release_year,
            publisher,
            description,
            author,
            bookimage
        } = this.state.editBookData;

        axios.patch('http://localhost:4000/books/' + this.state.editBookData._id, {
            name, genre
            , release_year,
            publisher,
            description,
            author,
            bookimage
        }).then((response) => {
          console.log(response.data);
            this._refreshBooks();

            this.setState({
                editBookModal: false, editBookData: { 
                _id:'',
                name: '',
                genre: [],
                release_year: '',
                publisher:'',
                description: '',
                author: '',
                bookimage: '',
                 }
            })
        });
    }

    editBook( _id,name,genre,release_year,publisher,description,author,bookimage) {
        this.setState({
          editBookData: { _id, name,genre,release_year,publisher,description,author,bookimage}, editBookModal: ! this.state.editBookModal
        });
      }


      deleteBook(_id) {
        axios.delete('http://localhost:4000/books/' + _id).then((response) => {
          console.log(response.data);
          this._refreshBooks();
        });
      }
      _refreshBooks() {
        axios.get('http://localhost:4000/books').then((response) => {
         // console.log(response.data);
          this.setState({
            books: response.data
           
          })
        });
      }


    render() {
        let books = this.state.books.map((book) => {
            return (
              <tr >
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book._id}</td>
                <td>
                  <Button color="success" size="sm" className="mr-2" onClick={this.editBook.bind(this,book._id, book.name,book.genre,book.release_year,book.publisher,book.description,book.author,book.bookimage)}>Edit</Button>
                  <Button color="danger" size="sm" onClick={this.deleteBook.bind(this, book._id)}>Delete</Button>
                 {/* <Button color="danger" sizez="sm" Upload id={book._id}>Upload image</Button>*/}
                 
                 <Upload id={book._id}/>

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
                <Label for="name">Name</Label>
                <Input id="name" value={this.state.newBookData.name} onChange={(e) => {
                  let { newBookData } = this.state;
    
                  newBookData.name = e.target.value;
    
                  this.setState({ newBookData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="author">Author</Label>
                <Input id="author" value={this.state.newBookData.author} onChange={(e) => {
                  let { newBookData } = this.state;
    
                  newBookData.author = e.target.value;
    
                  this.setState({ newBookData });
                }} />
              </FormGroup>

              <FormGroup>
              <Label for="pub">Publisher</Label>
              <Input id="pub" value={this.state.newBookData.publisher} onChange={(e) => {
                let { newBookData } = this.state;
  
                newBookData.publisher = e.target.value;
  
                this.setState({ newBookData });
              }} />
            </FormGroup>

              <FormGroup>
                <Label for="realease">Release_year</Label>
                <Input id="release" value={this.state.newBookData.release_year} onChange={(e) => {
                  let { newBookData } = this.state;
    
                  newBookData.release_year = e.target.value;
    
                  this.setState({ newBookData });
                }} />
              </FormGroup>

              <FormGroup>
                <Label for="genre">Genre</Label>
                <Input id="genre" value={this.state.newBookData.genre} onChange={(e) => {
                  let { newBookData } = this.state;
    
                  newBookData.genre = e.target.value;
    
                  this.setState({ newBookData });
                }} />
              </FormGroup>

              <FormGroup>
                <Label for="description">Description</Label>
                <Input id="descrip" value={this.state.newBookData.description} onChange={(e) => {
                  let { newBookData } = this.state;
    
                  newBookData.description = e.target.value;
    
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
                <Label for="name">Name</Label>
                <Input id="name" value={this.state.editBookData.name} onChange={(e) => {
                  let { editBookData } = this.state;
    
                  editBookData.name = e.target.value;
    
                  this.setState({ editBookData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="author">Author</Label>
                <Input id="author" value={this.state.editBookData.author} onChange={(e) => {
                  let { editBookData } = this.state;
    
                  editBookData.author = e.target.value;
    
                  this.setState({ editBookData });
                }} />
              </FormGroup>

              <FormGroup>
                <Label for="publisher">Publisher</Label>
                <Input id="publisher" value={this.state.editBookData.publisher} onChange={(e) => {
                  let { editBookData } = this.state;
    
                  editBookData.publisher = e.target.value;
    
                  this.setState({ editBookData });
                }} />
              </FormGroup>

              <FormGroup>
                <Label for="genre">Genre</Label>
                <Input id="genre" value={this.state.editBookData.genre} onChange={(e) => {
                  let { editBookData } = this.state;
    
                  editBookData.genre = e.target.value;
    
                  this.setState({ editBookData });
                }} />
              </FormGroup>

              <FormGroup>
                <Label for="relyr">Release year</Label>
                <Input id="relyrr" value={this.state.editBookData.release_year} onChange={(e) => {
                  let { editBookData } = this.state;
    
                  editBookData.release_year = e.target.value;
    
                  this.setState({ editBookData });
                }} />
              </FormGroup>

              <FormGroup>
                <Label for="desc">Description</Label>
                <Input id="desc" value={this.state.editBookData.description} onChange={(e) => {
                  let { editBookData } = this.state;
    
                  editBookData.description = e.target.value;
    
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
                  
                  <th>Name</th>
                  <th>Author_id</th>
                  <th>Genre</th>
                  <th>idd</th>
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

class ImageUpload extends Component {
  constructor(props)
    {
        super(props)
        this.state = {
          bookimage : ''
        }
    }
  render(){
    return(
      
      <div>
        <Upload />
      </div>
    
    )
  }
}


const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Bookadd);