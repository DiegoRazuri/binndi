/*
*	module dependencies
*/
import React from 'react';

export default class LogginPopup extends React.Component{
	constructor (props){
		super(props);
		this.state={

		}
	}



	
	render(){
		

		return <div>
			
			<h1>Inicia Sesión</h1>
			
			<div className="wrapperBtnLoggin">
				<a className="btnLogin" id="btnLoginFacebook" href="/auth/facebook">
					<span className="ico-login icon-facebook-with-circle"></span>
					<p>Registrate con Facebook</p>
					<span className="icon-circle_wrapper">
						<span className="icon-angle-right"></span>
					</span>
				</a>
			</div>
			
		</div>

	}
}
