import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import defaultDash from './default';
import contentDash from './content';
import analyticsDash from './analytics';
import ecommerceDash from './ecommerce';
import forms from './forms';
import pricing from './pricing';
import optoutnews from './newsletter_optout';

const Dashboards = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/default`} />
            <Route path={`${match.url}/default`} component={defaultDash} />
            <Route path={`${match.url}/pricing`} component={pricing} />
            <Route path={`${match.url}/newsletter_optout`} component={optoutnews} />
            <Redirect to="/error" />

        </Switch>
    </div>
);
export default Dashboards;