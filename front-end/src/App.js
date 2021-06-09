import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"

import axios from 'axios'
class App extends Component {
  
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      
    }

    this.changeFirstName=this.changeFirstName.bind(this)
    this.changeLastName=this.changeLastName.bind(this)
    this.changemail=this.changemail.bind(this)
    this.changepassword=this.changepassword.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
  }

  changeFirstName(event)
  {
    this.setState(
      {
        fullname:event.target.value
      }
    )
  }
  
  changeLastName(event)
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
      first_name:this.state.first_name,
      last_name:this.state.last_name,
      email:this.state.email,
      password:this.state.password,
      
    }
    axios.post('http://localhost:4000/readers/add',registered).then(response =>
      console.log(response.data)
    )
    this.state = {
      first_name: '',
      last_name: '',
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
              <div className="FirstName">
                <label for="inputFirstName" class="col-sm-2 col-form-label">First Name</label>
                <div class="col-sm-2">
                  <input type='text'
                    placeholder='First Name'
                    onChange={this.changeFirstName}
                    value={this.state.first_name}
                    className='form-control form-group'
                  />
                </div>
              </div>
              <div className="LastName">
                <label for="inputLastName" class="col-sm-2 col-form-label">Last Name</label>
                <div class="col-sm-2">
                  <input type='text'
                    placeholder='User name'
                    onChange={this.changeLastName}
                    value={this.state.last_name}
                    className='form-control form-group'
                  />
                </div>
             </div>
             <div className="Email">
                <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-2">
                  <input type='text'
                    placeholder='E-mail'
                    onChange={this.changemail}
                    value={this.state.email}
                    className='form-control form-group'
                  />
                </div>
             </div>
             <div className="Password">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-2">
                  <input type='password'
                    placeholder='password'
                    onChange={this.changepassword}
                    value={this.state.password}
                    className='form-control form-group'
                  />
               </div>
             </div>
             <br></br>
             <div className="SubmitBtn">
                <div class="col-sm-2">
                  <input type='submit' className='btn btn-danger btn-block' value='Submit'/>
                </div>
             </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
