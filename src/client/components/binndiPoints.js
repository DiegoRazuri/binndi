/*
*	module dependencies
*/
import React from 'react';

export default class BinndiPoints extends React.Component{

	
	handleSendUserEmail(e){
		e.preventDefault();

		let userEmail_uef = ReactDom.findDOMNode(this.refs.userEmail_uef).value.trim()
	
		console.log("se tomo los datos correctamente")
		console.log(userEmail_uef)

		let json = {
			userEmail : userEmail_uef
		}

		this.props.sendUserEmail.call(null, json, 0)

		ReactDom.findDOMNode(this.refs.userEmail_uef).value = '';

		return;

	}
	
	render(){

		let userForm;

		if(this.props.user != false && this.props.user.userState != 0){
			userForm = <div className="popup-login-wrapper-content">
							<h4>¡Gracias por registrate!</h4>
							<h4>Te avisaremos cuando sea el lanzamiento oficial para que canjees tus binndis.</h4>						
						</div>
		}else if(this.props.user != false && this.props.user.userState ==0){
			userForm = <div className="popup-login-wrapper-content">
							<h4>¡Te obsequiamos 100 binndis!</h4>
							<h4>¡Déjanos tu correo para avisarte el día del lanzamiento oficial!</h4>
							<form className="formUserEmail">
								<div className="input-box">
									<input type="email" name="" ref="userEmail_uef"  placeholder="Correo electrónico"/>
									<span className="icon-arrow-right-thick btn-ico" onClick={this.handleSendUserEmail.bind(this)}></span>
								</div>
							</form>					
						</div>

			
		}else{
			userForm = <div className="popup-login-wrapper-content">
							<h4>¡Ingresa y gana tus primeros 100 binndis!</h4>
							<a href="/auth/facebook" className="btn-login btn-login-fb">
								<span className="icon-facebook"></span>
								<p>Ingresa con Facebook</p>
								<span className="icon-chevron-small-right"></span>
							</a>
							<p className="text-terms-conditions">Al registrarme, acepto <a href="#">Condiciones del servicio</a>, <a href="#">Condiciones sobre pagos</a>, <a href="#">Politica de privacidad y de cookies</a>, <a href="#">Politica de reembolso al cliente</a> y <a href="#">Condiciones de la Garantia</a> en Binndi.</p>
						
						</div>
		
		
		}
		return <div className="section-binndi-points">
					<div className="grid-a">
						<div className="wrapper-header-info">
							<span className="icon-trophy ico"></span>
							<h3 className="text-small-normal-grey-m">Dedícate a disfrutar de nuevas experiencias y deja que Binndi se encargue del resto.</h3>	
						</div>
						<ol>
							<li className="text-halfmedium-normal-grey-o">Elige tu destino y planifica tu viaje con nosotros.</li>
							<li className="text-halfmedium-normal-grey-o">Binndi te mostrará los retos e hitos que debes cumplir.</li>
							<li className="text-halfmedium-normal-grey-o">Cada vez que cumplas uno, acumularás binndis.</li>
							<li className="text-halfmedium-normal-grey-o">Con esos binndis podrás pagar actividades para realizar en tu destino.</li>
						</ol>
						
						
					</div>
					<div className="grid-b">
						<div className="section-binndi-points-popup-login">
							{userForm}
						</div>
					</div>
					<div className="grid-c">
						<figure>
							<img src="https://s3-sa-east-1.amazonaws.com/binndi/landing/ptsbnnd-info-vectores.png"/>	
						</figure>
						
					</div>
					
				</div>

	}
}