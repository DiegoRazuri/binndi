/*
* Modul dependencies
*/

import React from 'react';
import BtnCreateEnterpriseProfile from './btnCreateEnterpriseProfile'

export default class EnterpriseProfileInfo extends React.Component{
	constructor (props){
		super(props);
		this.state={

		}
	}
	
	render(){



		
		return <div>
			
			<h1>Registra tu empresa... estos es la info</h1>
			
			
			<p>bla bla bla bla info...</p>
			<p>{this.props.user.name}</p>

			<BtnCreateEnterpriseProfile
						user = {this.props.user}
						createEnterprise = {this.props.createEnterprise}/>
		</div>

	}
}
