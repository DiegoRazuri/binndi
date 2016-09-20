
/*
*	module dependencies
*/
import React from 'react';
import UserAvatar from './userAvatar'
import UserAdminPanelEnterpriseList from './userAdminPanelEnterpriseList'


export default class UserAdminPanel extends React.Component{
	constructor (props){
		super(props);
		this.state={

		}

		//this.addContact = this.addContact.bind(this);
				
	}



	render(){

		let adminList;
		
		if(this.props.user.enterprise.length > 0){

			adminList = <UserAdminPanelEnterpriseList 
							user={this.props.user}
							enterpriseSwitch= {this.props.enterpriseSwitch}/>

		}else{
			adminList = <ul>
				<li><a href="/logout"> cerrar sesión </a></li>
			</ul>
		}
		
		
		return <div>
			<h3>UserAdminPanel</h3>
			<UserAvatar user={this.props.user}/>
			{adminList}

		</div>

	}
}