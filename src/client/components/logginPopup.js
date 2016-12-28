/*
*	module dependencies
*/
import React from 'react';

export default class LogginPopup extends React.Component{


	showingPopupLogin(){
		this.props.showPopupLogin();

	}



	
	render(){
		

		return <div id="popup-shadow" className="popup-login">
				<div className="wrapper-popup-login">
					<span className="btn-close btn-close-popup icon-cross" onClick={this.showingPopupLogin.bind(this)}></span>
					<div className="popup-login-wrapper-content">
						<h4>Encuentra en un solo lugar todo lo que necesitas para vivir nuevas experiencias.</h4>
						<a href="/auth/facebook" className="btn-login btn-login-fb">
							<span className="icon-facebook"></span>
							<p>Ingresa con Facebook</p>
							<span className="icon-chevron-small-right"></span>
						</a>
						<p className="text-terms-conditions">Al registrarme, acepto <a href="#">Condiciones del servicio</a>, <a href="#">Condiciones sobre pagos</a>, <a href="#">Politica de privacidad y de cookies</a>, <a href="#">Politica de reembolso al cliente</a> y <a href="#">Condiciones de la Garantia</a> en Binndi.</p>
					</div>
					
				</div>
			</div>

	}
}
