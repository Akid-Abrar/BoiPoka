import React, { Component } from 'react'
import axios from 'axios';
import { Input, Form,FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button,Container } from 'reactstrap';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import { compose } from 'recompose';
import Upload from './image'



class Authoradd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            newAuthorData: {
                first_name:'',
                last_name:'',
                image:'',
                biography: '',
                books : [],
                followers: []

            },
            editAuthorData: {
                _id:'',
                first_name:'',
                last_name:'',
                image:'',
                biography: '',
                books : [],
                followers: []     

            },
            newAuthorModal: false,
            editAuthorModal: false
        }

    }
    componentWillMount() {
      this._refreshAuthors();
    }

    toggleNewAuthorModal() {
        this.setState({
          newAuthorModal: !this.state.newAuthorModal
        });
    }
    toggleEditAuthorModal() {
        this.setState({
            editAuthorModal: !this.state.editAuthorModal
        });
    }
    //for adding Author
    addAuthor() {
        //baki
        axios.post('http://localhost:4000/authors', this.state.newAuthorData).then((response) => {
          
            let { authors } = this.state;

            authors.push(response.data);

            this.setState({
                authors, newAuthorModal: false, newAuthorData: {
                  first_name:'',
                  last_name:'',
                  image:'',
                  biography: '',
                  books : [],
                  followers: []

                }
            });
        });
    }

    imageadd(_id)
    {

    }

    //for update author
    updateAuthor() {
        let { 
              first_name,
              last_name,
              image,
              biography,
              books,
              followers
        } = this.state.editAuthorData;

        //baki
        axios.patch('http://localhost:4000/authors/' + this.state.editAuthorData._id, {
                    first_name,
                    last_name,
                    image,
                    biography,
                    books,
                    followers,
                  
        }).then((response) => {
            this._refreshAuthors();

            this.setState({
                editAuthorModal: false, editAuthorData: { 
                  _id:'',
                  first_name:'',
                  last_name:'',
                  image:'',
                  biography: '',
                  books: [],
                  followers: []
              }
            })
        });
    }

    editAuthor( _id,first_name,last_name,image,biography,books,followers) {
        this.setState({
          editAuthorData: { _id, first_name,last_name,image,biography,books,followers}, editAuthorModal: ! this.state.editAuthorModal
        });
      }

      //baki
      deleteAuthor(_id) {
        axios.delete('http://localhost:4000/authors/' + _id).then((response) => {
          //console.log(response.data);
          this._refreshAuthors();
        });
      }
      _refreshAuthors() {
        axios.get('http://localhost:4000/authors').then((response) => {
         // console.log(response.data);
          this.setState({
            authors: response.data
           
          })
        });
      }


    render() {
        let authors = this.state.authors.map((author) => {
            return (
              <tr >
                <td>{author.first_name} {author.last_name}</td>
                <td>{author.biography}</td>
                <td>
                  <Button color="success" size="sm" className="mr-2" onClick={this.editAuthor.bind(this,author._id, author.first_name,author.last_name,author.image,author.biography,author.books,author.followers)}>Edit</Button>
                </td>
                <td>
                  <Button color="danger" size="sm" onClick={this.deleteAuthor.bind(this, author._id)}>Delete</Button>
                 {/* <Button color="danger" sizez="sm" Upload id={book._id}>Upload image</Button>*/}
                </td>
                <td>
                  <Upload id={author._id}/>
                </td>
                 

                
              </tr>
            )
          });
          //baki
        return (
            <div className="App container">
            <Button className="my-3" color="primary" onClick={this.toggleNewAuthorModal.bind(this)}>Add Author</Button>
            <Modal isOpen={this.state.newAuthorModal} toggle={this.toggleNewAuthorModal.bind(this)}>
            <ModalHeader toggle={this.toggleNewAuthorModal.bind(this)}>Add New Author</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="f_name">First Name</Label>
                <Input id="f_name" value={this.state.newAuthorData.first_name} onChange={(e) => {
                  let { newAuthorData } = this.state;
    
                  newAuthorData.first_name = e.target.value;
    
                  this.setState({ newAuthorData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="l_name">Last Name</Label>
                <Input id="l_name" value={this.state.newAuthorData.last_name} onChange={(e) => {
                  let { newAuthorData } = this.state;
    
                  newAuthorData.last_name = e.target.value;
    
                  this.setState({ newAuthorData });
                }} />
              </FormGroup>

              <FormGroup>
              <Label for="bio">Biography</Label>
              
              <Input size='lg' id="bio" value={this.state.newAuthorData.biography} rows={3} onChange={(e) => {
                let { newAuthorData } = this.state;
  
                newAuthorData.biography = e.target.value;
  
                this.setState({ newAuthorData });
              }} />
            </FormGroup>
    
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addAuthor.bind(this)}>Add Author</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewAuthorModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>
    
          <Modal isOpen={this.state.editAuthorModal} toggle={this.toggleEditAuthorModal.bind(this)}>
            <ModalHeader toggle={this.toggleEditAuthorModal.bind(this)}>Edit Author</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="fname">First Name</Label>
                <Input id="fname" value={this.state.editAuthorData.first_name} onChange={(e) => {
                  let { editAuthorData } = this.state;
    
                  editAuthorData.first_name = e.target.value;
    
                  this.setState({ editAuthorData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="lname">Last Name</Label>
                <Input id="lname" value={this.state.editAuthorData.last_name} onChange={(e) => {
                  let { editAuthorData } = this.state;
    
                  editAuthorData.last_name = e.target.value;
    
                  this.setState({ editAuthorData });
                }} />
              </FormGroup>

              <FormGroup>
                <Label for="bio">Biography</Label>
                <Input id="bio" value={this.state.editAuthorData.biography} onChange={(e) => {
                  let { editAuthorData } = this.state;
    
                  editAuthorData.biography = e.target.value;
    
                  this.setState({ editAuthorData });
                }} />
              </FormGroup>
    
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateAuthor.bind(this)}>Update Author</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditAuthorModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>
    
            <Container>
            <Table >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Bio</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>Image Upload</th>
                </tr>
              </thead>
    
              <tbody>
                {authors}
              </tbody>
            </Table>
            </Container>
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
)(Authoradd);