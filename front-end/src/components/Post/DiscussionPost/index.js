import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../../Session';

const axios = require('axios');

// const id = ({ match }) => (console.log(match.params.id))
// const res = ({ id }) => axios.get('http://localhost:4000/readers/?id=${id}')




class DiscussionPost extends React.Component{
  state = {
    id: this.props.match.params.id,
    reader: ''
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/readers/${this.state.id}`)
      .then(res => {
        const reader = res.data;
        this.state.reader = reader;
        console.log(res)
      })

    
  }

  render() {
    return (
      <div>
        <h3>{this.state.reader.first_name} {this.state.reader.last_name}</h3>
        {this.state.reader.email}
      </div>
    )
  }
}



const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(DiscussionPost);
