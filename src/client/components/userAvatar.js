/*
*	module dependencies
*/
import React from 'react';
import { Link } from 'react-router'

export default class UserAvatar extends React.Component{
	
	render(){
		let btnEnter;

		if(this.props.user.photo){
			btnEnter = <Link to={'/userprofile'}>
						<figure className="userAvatar">
							<img src={this.props.user.photo} alt="user"/>
						</figure>
					</Link>
		}else{
			btnEnter = <Link className="btn-entered btn-small-curve" to={'/userprofile'}>

						<p>Ingresa</p>
						<span className="icon-chevron-small-right"></span>
					</Link>
		}

		return <ul className="nav-right">
					
					<li className="btn-header-hidden btn-header-right">
						{btnEnter}
						
					</li>
				</ul>

	}
}
//<Link to={'/userprofile/${user._id}'}>