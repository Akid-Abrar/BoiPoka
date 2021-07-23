import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import {Row,Col,Button,Container} from 'react-bootstrap'

const UserPage = () => (
    <div>
        <Row>
            <Col>
                <Switch>
                    <Route exact path={ROUTES.USERADMINDETAILS} component={UserItem} />
                    <Route exact path={ROUTES.USERADMIN} component={UserList} />
                </Switch>
            </Col>
        </Row>
    </div>
);

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(UserPage);