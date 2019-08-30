import React, {Component} from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';

class DirectLink extends Component{
	
	componentWillMount(){
		
		let { match, history } = this.props;
		let {_iduser, _token } = match.params;
		//return console.log(_iduser, _token);
		
		this.accessToken(_iduser, _token).
		then(data => {
			//history.push('/app/dashboards/default');
			location.href='/app/dashboards/default';
		}).
		catch(
			(error) => history.push('/login')
		);
		
		console.log("match ",match );

	}

	//5d07d1ccae7c3d773b3b3fdd
	//FeiKjyDgdKEuofhCt03kBkq6XGAX7sDjMBU6FYShruVWTHCoa0VmgdPD2LIPah64
	accessToken = (iduser,token) =>{
		axios.defaults.headers.common['Authorization'] = token;

		return new Promise((resolve,reject) => {
			axios.get(`https://api.gooneworld.com/api/Users/${iduser}`).
				then(response => {
					let { data } = response;

					localStorage.setItem('user_id', iduser);
                	localStorage.setItem('user_email', data.email);
                	localStorage.setItem('token', token);

					console.log(data);
					resolve(data)
				}).
				catch(error => {
					reject(error)
				});	
		})
		
		
	}

	render(){
		/*return <div id="loader-wrapper"><div id="loader"><div className="preloader"></div></div></div>*/
		return <div className="loading"></div>
     				
	}
	
}

export default withRouter(DirectLink);