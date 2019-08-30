import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import TopNav from 'Containers/TopNav'
import Sidebar from 'Containers/Sidebar';

import dashboards from './dashboards';
import layouts from './layouts';
import ui from './ui';

					
import users from './users';
import listings from './listings';	
import favorites from './favorites';
import savedsearch from './savedsearch';

import { connect } from 'react-redux';

class MainApp extends Component {
	render() {
		const { match, containerClassnames} = this.props;
		return (
			<div id="app-container" className={containerClassnames}>
				<TopNav history={this.props.history} />
				<Sidebar/>
				<main>
					<div className="container-fluid">
						<Switch>
							<Route path={`${match.url}/dashboards`} component={dashboards} />
							<Route path={`${match.url}/users`} component={users} />
							<Route path={`${match.url}/listings`} component={listings} />
							<Route path={`${match.url}/favorites`} component={favorites} />
							<Route path={`${match.url}/savedsearch`} component={savedsearch} />
							<Redirect to="/error" />
						</Switch>
					</div>
				</main>
			</div>
		);
	}
}
const mapStateToProps = ({ menu }) => {
	const { containerClassnames} = menu;
	return { containerClassnames };
  }
  
export default withRouter(connect(mapStateToProps, {})(MainApp));