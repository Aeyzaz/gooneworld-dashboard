import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import listings from './listings';
/*import listingadd_com from './listingadd_com';
import listingadd_imp from './listingadd_imp';
import listingadd_buss from './listingadd_buss';*/
import listingadd_sale from './listingadd_sale';
import listingedit_sale from './listingedit_sale';
import listingadd_landsale from './listingadd_landsale';
import listingedit_landsale from './listingedit_landsale';
import listingadd_rent from './listingadd_rent';
import listingedit_rent from './listingedit_rent';
import listingphotos from './listingphotos';

const Listings = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/listings`} />
            <Route path={`${match.url}/list`} component={listings} />
            {/*<Route path={`${match.url}/listingadd_com`} component={listingadd_com} />
            <Route path={`${match.url}/listingadd_imp`} component={listingadd_imp} />
            <Route path={`${match.url}/listingadd_buss`} component={listingadd_buss} />*/}
            <Route path={`${match.url}/listingadd_sale`} component={listingadd_sale} />
            <Route path={`${match.url}/listingadd_rent`} component={listingadd_rent} />
            <Route path={`${match.url}/listingadd_landsale`} component={listingadd_landsale} />
            <Route path={`${match.url}/listingphotos/:id`} component={listingphotos} />
            <Route exact path={`${match.url}/listingedit_sale/:id`} component={listingedit_sale}></Route>
            <Route exact path={`${match.url}/listingedit_rent/:id`} component={listingedit_rent}></Route>
            <Route exact path={`${match.url}/listingedit_landsale/:id`} component={listingedit_landsale}></Route>

            <Redirect to="/error" />
        </Switch>
    </div>
);
export default Listings;