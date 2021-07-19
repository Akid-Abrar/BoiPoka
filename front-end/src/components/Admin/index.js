import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import Bookadd from '../Bookadmin/Boodadd';
import Authoradd from '../AuthorAdmin/AuthorAdd';

import { withAuthorization, withEmailVerification } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import {Row,Col} from 'react-bootstrap'

const AdminPage = () => (
  <div style = {{marginBottom: "27px"}}>
    <h1>Admin</h1>
    <Row>
      <Col sm={9}><Bookadd /></Col>
      <Col sm={3}>
        <Switch>
          <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
          <Route exact path={ROUTES.ADMIN} component={UserList} />
        </Switch>
      </Col>
    </Row>
    <Row>
      <Authoradd />
    </Row>
  </div>
);

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage);
