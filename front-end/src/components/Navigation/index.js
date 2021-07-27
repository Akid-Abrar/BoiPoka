import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import SearchArea from '../Search/Searcharea';


import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import { Navbar, Nav, Form, FormControl, Button, Row, Col } from 'react-bootstrap'
import logo from './logo2.png'

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => authUser ? (<NavigationAuth authUser={authUser} />) : (<NavigationNonAuth />)
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (

  <div>
    <Navbar bg="navbar-dark" variant="dark" sticky="top">
      <Navbar.Brand href={ROUTES.HOME}><img src={logo} style={{ height: '40px', width: '40px' }} />BoiPoka</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href={ROUTES.HOME}><i className="fas fa-home"></i>
      Home</Nav.Link>
        <Nav.Link href={ROUTES.READER}><i className="fas fa-user"></i>Profile </Nav.Link>
        {!!authUser.roles[ROLES.ADMIN] && (<Nav.Link href={ROUTES.ADMIN}><i class="fas fa-users-cog"></i>Admin</Nav.Link>)}
        {/* <Nav.Link href={ROUTES.AUTHOR}><i className="fas fa-user-tie"></i>Sample Author</Nav.Link> */}


        <SignOutButton />
        <SearchArea />

      </Nav>

      {/*<Form inline>
    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
  </Form>
  <Form inline> */}


    </Navbar>
    {/* <Row>
      <Col></Col>
      <Col align="center" className="m-2"><SearchArea /></Col>
      <Col></Col>
    </Row> */}
    </div>
);

const NavigationNonAuth = () => (

  <Navbar bg="navbar-dark" variant="dark" sticky="top">
    <Navbar.Brand href="/"><img src={logo} style={{ height: '40px', width: '40px' }} />BoiPoka</Navbar.Brand>
    <Nav className="ml-auto justify-content-right">
      {/* <Nav.Link href={ROUTES.HOME}>Home</Nav.Link> */}
      <Nav.Link href={ROUTES.SIGN_IN}><i className="fas fa-sign-in-alt"></i>Sign In</Nav.Link>
    </Nav>



  </Navbar>

);

export default Navigation;
