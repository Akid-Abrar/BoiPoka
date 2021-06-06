import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"

import axios from 'axios'
class App extends Component {
  
  constructor() {
    super()
    this.state = {
      fullname: '',
      username: '',
      email: '',
      password: '',
      
    }

    this.changeFullname=this.changeFullname.bind(this)
    this.changeUsername=this.changeUsername.bind(this)
    this.changemail=this.changemail.bind(this)
    this.changepassword=this.changepassword.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
  }

  changeFullname(event)
  {
    this.setState(
      {
        fullname:event.target.value
      }
    )
  }
  
  changeUsername(event)
  {
    this.setState(
      {
        username:event.target.value
      }
    )
  }
  changemail(event)
  {
    this.setState(
      {
        email:event.target.value
      }
    )
  }

  changepassword(event)
  {
    this.setState(
      {
        password:event.target.value
      }
    )
  }

  onSubmit(event)
  {
    event.preventDefault()
    const registered={
      first_name:this.state.fullname,
      last_name:this.state.username,
      //email:this.state.email,
      password:this.state.password,
      
    }
    axios.post('http://localhost:3000/readers/add',registered).then(response =>
      console.log(response.data)
    )

    this.state = {
      fullname: '',
      username: '',
      email: '',
      password: ''
    }

  }


  render() {
   
    
    return (
      <div>
        <div className='container'>
          <div className='form-div'>
            <form onSubmit={this.onSubmit}>
              <input type='text'
                placeholder='Full name'
                onChange={this.changeFullname}
                value={this.state.fullname}
                className='form-control form-group'
              />
              <input type='text'
              placeholder='User name'
              onChange={this.changeUsername}
              value={this.state.username}
              className='form-control form-group'
            />

            <input type='text'
                placeholder='E-mail'
                onChange={this.changemail}
                value={this.state.email}
                className='form-control form-group'
              />

              <input type='password'
                placeholder='password'
                onChange={this.changepassword}
                value={this.state.password}
                className='form-control form-group'
              />

              <input type='submit' className='btn btn-danger btn-block' value='Submit'/>

            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
