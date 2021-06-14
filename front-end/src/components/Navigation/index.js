import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose'

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import SearchArea from '../Search/Searcharea';


import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap'

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>authUser ? (<NavigationAuth authUser={authUser} />) : (<NavigationNonAuth />)
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (

<div>
<Navbar bg="navbar-dark" variant="dark">
<Navbar.Brand href="#home">BoiPoka</Navbar.Brand>
<Nav className="mr-auto">
<Nav.Link href={ROUTES.LANDING}>Landing</Nav.Link>
 <Nav.Link href={ROUTES.HOME}>Home</Nav.Link>
 <Nav.Link href={ROUTES.ACCOUNT}>Account </Nav.Link>
 {!!authUser.roles[ROLES.ADMIN] && (<Nav.Link href={ROUTES.ADMIN}>Admin</Nav.Link> )}
 <SignOutButton />
</Nav>


</Navbar>
    
    </div>
);

const NavigationNonAuth = () => (
  
     <Navbar bg="navbar-dark" variant="dark">
     <Navbar.Brand href="#home">BoiPoka</Navbar.Brand>
     <Nav className="mr-auto">
      <Nav.Link href={ROUTES.HOME}>Home</Nav.Link>
      <Nav.Link href={ROUTES.SIGN_IN}>Sign In</Nav.Link>
     </Nav>
   
   
   
    </Navbar>  
  
);

export default Navigation;
