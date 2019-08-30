import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import favorites from './favorites';

const Favorites = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/favorites`} />
            <Route path={`${match.url}/list`} component={favorites} />
            <Redirect to="/error" />
        </Switch>
    </div>
);
export default Favorites;