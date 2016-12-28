/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom'

export default class BtnAddToPlan extends React.Component{
	

	mountingItineraryFormPopup(ev){

		this.props.togglePopupAddToPlan(ev);
		
		var popupShadow = document.querySelector('#popup-shadow');
		this.props.fadeIn(popupShadow, 1);
	}

	

	
	render(){
		

		return <a className="btn-add-to-plan transparent-btn" href="#" onClick={this.mountingItineraryFormPopup.bind(this)}>
					<span className=" icon-write"></span>
					<p className="text-medium-bold-white-m">Agregar</p>
				</a>

	}
}
