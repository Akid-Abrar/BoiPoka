import React, { Component } from 'react'
import axios from 'axios';
import {  Table, Button,Container } from 'reactstrap';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import { compose } from 'recompose';



class PostAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            newPostData: {
                content:'',
                comments:[]
            },
            newPostModal: false,
        }

    }
    componentWillMount() {
      this._refresPosts();
    }

    toggleNewPostModal() {
        this.setState({
            newPostModal: !this.state.newPostModal
        });
    }
      deletePost(_id) {
        axios.delete('http://localhost:4000/posts/' + _id).then((response) => {
          console.log(response.data);
          this._refresPosts();
        });
      }
      _refresPosts() {
        axios.get('http://localhost:4000/posts').then((response) => {
         // console.log(response.data);
          this.setState({
            posts: response.data
           
          })
        });
      }


    render() {
        let posts = this.state.posts.map((post) => {
            return (
              <tr >
                <td>{post.content}</td>
                <td>
                  <Button color="danger" size="sm" onClick={this.deletePost.bind(this, post._id)}>Delete</Button>
                 {/* <Button color="danger" sizez="sm" Upload id={book._id}>Upload image</Button>*/}
                </td>
                 

                
              </tr>
            )
          });
          //baki
        return (
            <div className="App container">
    
            <Container>
            <Table >
              <thead>
                <tr>
                  <th>Content</th>
                </tr>
              </thead>
    
              <tbody>
                {posts}
              </tbody>
            </Table>
            </Container>
          </div>
        );
            

        
    }
}


const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(PostAdd);