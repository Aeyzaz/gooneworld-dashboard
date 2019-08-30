import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import savedsearch from './savedsearch';

const SavedSearch = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/savedsearch`} />
            <Route path={`${match.url}/list`} component={savedsearch} />
            <Redirect to="/error" />
        </Switch>
    </div>
);
export default SavedSearch;