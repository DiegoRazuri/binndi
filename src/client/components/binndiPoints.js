/*
*	module dependencies
*/
import React from 'react';

export default class BinndiPoints extends React.Component{

	

	
	render(){
		

		return <div className="section-binndi-points">
					<div className="grid-a">
						<div className="wrapper-header-info">
							<span className="icon-trophy ico"></span>
							<h3 className="text-small-normal-grey-m">Dedicate a disfrutar de nuevas experiencias y deja que Binndi se encargue del resto.</h3>	
						</div>
						<ol>
							<li className="text-halfmedium-normal-grey-o">Elige tu destino y planifica tu viaje con nosotros.</li>
							<li className="text-halfmedium-normal-grey-o">Binndi te mostrara los retos e hitos que debes cumplir.</li>
							<li className="text-halfmedium-normal-grey-o">Cada vez que cumplas uno, acumularas binndis.</li>
							<li className="text-halfmedium-normal-grey-o">Con esos binndis podrás pagar pasajes, hospedajes, y más.</li>
						</ol>
						
						
					</div>
					<div className="grid-b">
						<div className="section-binndi-points-popup-login">
							<div className="popup-login-wrapper-content">
								<h4>¡Ingresa y gana tus primeros 100 binndis!</h4>
								<a href="/auth/facebook" className="btn-login btn-login-fb">
									<span className="icon-facebook"></span>
									<p>Ingresa con Facebook</p>
									<span className="icon-chevron-small-right"></span>
								</a>
								<p className="text-terms-conditions">Al registrarme, acepto <a href="#">Condiciones del servicio</a>, <a href="#">Condiciones sobre pagos</a>, <a href="#">Politica de privacidad y de cookies</a>, <a href="#">Politica de reembolso al cliente</a> y <a href="#">Condiciones de la Garantia</a> en Binndi.</p>
							</div>
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