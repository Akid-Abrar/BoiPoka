import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import {Row,Col,Button,Container} from 'react-bootstrap'

const AdminPage = () => (
  <div>
    <Container>
    <h1 align="center">Admin</h1>
    <br></br>
    <br></br>
    <br></br>
        <center>
        <Button className='hover-zoom'href={ROUTES.BOOKADMIN}>Book Add</Button> 
        </center>
      <br></br> <br></br>
      <center>
        <Button href={ROUTES.AUTHORADMIN}>Author Add</Button>  
      </center>
      <br></br> <br></br>
      <center>
        <Button href={ROUTES.POSTADMIN}>Post Monitor</Button>  
      </center>
      <br></br> <br></br>
      <center>
        <Button href={ROUTES.USERADMIN}>User</Button>
      </center>
    
    <br></br>
      <br></br>
      <br></br>
    </Container>
  </div>
);

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage);
