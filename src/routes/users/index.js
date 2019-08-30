import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import useredit from './useredit';

const Users = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/useredit`} />
            <Route path={`${match.url}/useredit`} component={useredit} />
            <Redirect to="/error" />
        </Switch>
    </div>
);
export default Users;