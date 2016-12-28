/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom'

export default class PopupAddToPlan extends React.Component{
	
	unmountingItineraryFormPopup(ev){
		var popupShadow = document.querySelector('#popup-shadow');
		this.props.togglePopupAddToPlan(ev);
		this.props.fadeOut(popupShadow);
	}
	

	
	render(){
		

		return <div id="popup-add-to-plan" className="popup-add-to-plan">
					<span className="btn-close btn-close-popup icon-cross" onClick={this.unmountingItineraryFormPopup.bind(this)}></span>
					<div className="wrapper-popup-add-to-plan">
						<h4 className="text-big-normal-grey-o popup-plan-title">Seleccionar el plan</h4>
						<div className="wrapper-list-plans">
							<div className="row-plan">
								<figure>
									<img src=""/>
								</figure>
								<p className="text-medium-normal-grey-o">Feriado largo Nov</p>
								<div className="btn-save-plan text-medium-lighter-white-o">
									Guardar
								</div>
							</div>
							<div className="row-plan">
								<figure>
									<img src=""/>
								</figure>
								<p className="text-medium-normal-grey-o">Feriado largo Nov</p>
								<div className="btn-save-plan text-medium-lighter-white-o">
									Guardar
								</div>
							</div>
						</div>
						
						<div className="btn-create-new-plan">
							<p className="text-big-lighter-white-o">Crear un nuevo plan</p>
							<span className="icon-write"></span>
						</div>
						<div className="btn-add-to-car">
							<p className="text-big-lighter-white-o">A tu carro de compras</p>
							<span className="icon-cart"></span>
						</div>
					</div>
					<div className="wrapper-popup-create-new-plan">
						<h4 className="text-big-normal-grey-o popup-plan-title">¿Una nueva aventura?</h4>
						<form>
							<div className="form-field-create-plan">
								<input placeholder="Nombre del plan" type="text" name=""/>
								<span className="icon-bookmark"></span>
							</div>
							<div className="form-field-create-plan">
								<input placeholder="Invitar amigos" type="text" name=""/>
								<span className="icon-users"></span>
							</div>

						</form>
						<div className="btn-create-new-plan">
							<p className="text-big-lighter-white-o">Guardar</p>
							<span className="icon-write"></span>
						</div>
						<a href="">Retroceder</a>
					</div>
					
					
				</div>

	}
}
