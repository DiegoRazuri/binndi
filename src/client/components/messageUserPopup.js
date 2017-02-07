/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';

export default class MessageUserPopup extends React.Component{


	showingMessageUser(){
		this.props.showPopupMessageUser();
	}

	handleSendUserEmail(e){
		e.preventDefault();

		let userEmail_uef = ReactDom.findDOMNode(this.refs.userEmail_uef).value.trim()
	
		

		let json = {
			userEmail : userEmail_uef
		}

		this.props.sendUserEmail.call(null, json, 1)

		ReactDom.findDOMNode(this.refs.userEmail_uef).value = '';

		return;

	}


	
	render(){
		

		return <div id="popup-shadow" className="popup-login popup-message">
				<div className="wrapper-popup-login">
					<span className="btn-close btn-close-popup icon-cross" onClick={this.showingMessageUser.bind(this)}></span>
					<div className="popup-login-wrapper-content">
						<figure><img src="https://s3-sa-east-1.amazonaws.com/binndi/landing/Logo-FondoBlanco.png" /></figure>
						<h4>¡Te obsequiamos 100 Binndis<br/>para que canjees por descuentos!<br/>¡Déjanos tu correo para avisarte<br/>el día del LANZAMIENTO OFICIAL!</h4>
						<form className="formUserEmail">
							<div className="input-box">
								<input type="email" name="" ref="userEmail_uef"  placeholder="Correo electrónico"/>
								<span className="icon-arrow-right-thick btn-ico" onClick={this.handleSendUserEmail.bind(this)}></span>
							</div>
						</form>
					</div>
					
				</div>
			</div>

	}
}