/*
*	module dependencies
*/
import React from 'react';

export default class MessageUserPopup extends React.Component{


	showingMessageUser(){
		this.props.showPopupMessageUser();
	}



	
	render(){
		

		return <div id="popup-shadow" className="popup-login popup-message">
				<div className="wrapper-popup-login">
					<span className="btn-close btn-close-popup icon-cross" onClick={this.showingMessageUser.bind(this)}></span>
					<div className="popup-login-wrapper-content">
						<figure><img src="https://s3-sa-east-1.amazonaws.com/binndi/landing/Logo-FondoBlanco.png" /></figure>
						<h4>¡Gracias por registrarte! ¡PRÓXIMAMENTE SERÁ EL LANZAMIENTO, no te imaginas lo que tenemos para ti!</h4>

					</div>
					
				</div>
			</div>

	}
}
