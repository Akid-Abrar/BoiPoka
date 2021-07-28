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
            comments:[],
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
      deletePost(_id) 
      {
        axios.delete('http://localhost:4000/posts/' + _id).then((response) => {
          //console.log(response.data);
          this._refresPosts();
        });
      }
      deleteComment(_postid,_commentid)
      {
        ///post/:postId/comment/:commentId
        var link = 'http://localhost:4000/posts/post/'+_postid+'/comment/'+_commentid;
        //('link',link)
        axios.delete(link).then((response) => {
         // console.log(response.data);
          this._refresPosts();
        });
      }
      _refresPosts() {
        axios.get('http://localhost:4000/posts').then((response) => {
          //console.log('data',response.data);
          this.setState({
            posts: response.data
            
          })
          //console.log((posts)
        });
      }


    render() {
        let posts = this.state.posts.map((post) => {
            return (
              <tr >
                <td>
                  {post.content}
                  {/* {console.log('comments',post.comments)} */}
                </td>
                <td>
                  <Button color="danger" size="sm" onClick={this.deletePost.bind(this, post._id)}>Delete Post</Button>
                 {/* <Button color="danger" sizez="sm" Upload id={book._id}>Upload image</Button>*/}
                </td>
                <td>
                 
                  {post.comments.map((comment,index)=>(
                      
                      <div key={index} className="comm__display">
                        
                          {/* {console.log('singlecomment',comment)} */}
                          <td>{comment.comment}</td>
                          <td><Button color="danger" size="sm" onClick={this.deleteComment.bind(this, post._id,comment._id)}>Delete Comment</Button></td>
                      </div>
                    ))}
                   
                </td>
                
                 

                
              </tr>
            )
          });
        return (
            <div className="App container">
    
            <Container>
            <Table >
              <thead>
                <tr>
                  <th>Posts</th>
                  <th>Comments</th>
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