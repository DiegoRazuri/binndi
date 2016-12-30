/*
*	module dependencies
*/
import React from 'react';

export default class MessageEnterprisesPopup extends React.Component{


	showingMessageEnterprises(){
		this.props.showPopupMessageEnterprises();
	}



	
	render(){
		

		return <div id="popup-shadow" className="popup-login popup-message">
				<div className="wrapper-popup-login">
					<span className="btn-close btn-close-popup icon-cross" onClick={this.showingMessageEnterprises.bind(this)}></span>
					<div className="popup-login-wrapper-content">
						<figure><img src="https://s3-sa-east-1.amazonaws.com/binndi/landing/Logo-FondoBlanco.png" /></figure>
						<h4>¡Gracias por aplicar a Binndi! Estamos ansiosos por trabajar contigo. Estaremos en contacto muy pronto.</h4>

					</div>
					
				</div>
			</div>

	}
}
