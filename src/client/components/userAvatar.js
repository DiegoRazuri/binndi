/*
*	module dependencies
*/
import React from 'react';

export default class UserAvatar extends React.Component{
	
	render(){
//		console.log(e_id)
		return <figure className="userAvatar">
			<img src={this.props.user.photo} alt="user"/>
		</figure>
	}
}