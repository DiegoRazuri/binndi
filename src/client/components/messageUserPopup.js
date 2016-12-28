/*
*	module dependencies
*/
import React from 'react';

export default class MessageUserPopup extends React.Component{


	showingMessageUser(){
		this.props.showPopupMessageUser();
	}



	
	render(){
		

		return <div id="popup-shadow" className="popup-login">
				<div className="wrapper-popup-login">
					<span className="btn-close btn-close-popup icon-cross" onClick={this.showingMessageUser.bind(this)}></span>
					<div className="popup-login-wrapper-content">
						<figure><img src="style/img/Logo-FondoBlanco.png" /></figure>
						<h4>¡Gracias por registrarte en Binndi! Anda pensando cual sera tu próxima aventura, no te imaginas lo que tenemos para ti!</h4>

					</div>
					
				</div>
			</div>

	}
}
