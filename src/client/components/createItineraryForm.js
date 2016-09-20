/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';

export default class CreateItineraryForm extends React.Component{

	// PROPS
	// this.props.user
	// this.props.createItinerary
	
	closeForm(ev){
		document.getElementById('wrapperPopups').style.display = 'none';
		ReactDom.unmountComponentAtNode(document.getElementById('wrapperPopups'));
	}


	handleCreateItinerarySubmit(e){
		e.preventDefault();
		var administrator_cif = ReactDom.findDOMNode(this.refs.administrator_cif).value.trim()
		var title_cif = ReactDom.findDOMNode(this.refs.title_cif).value.trim()
		


		var formdata = new FormData();

		formdata.append('Content-Type', 'multipart/formdata');
		formdata.append( "administrator_id", administrator_cif);
		formdata.append( "title", title_cif);



/*

		if(!user_id ! || !titleCall || !description_call) {
			return;
		}
*/		

		let json = {
			administrator_id : administrator_cif,
			title : title_cif,
		}

		// LLAMAR AL METODO QUE LLEGA POR PROPS CREATENEWENTERPRISE

		this.props.createItinerary.call(null, json)

		ReactDom.findDOMNode(this.refs.title_cif).value = '';


		return;
	}

	render(){
		
		return <form id="createItineraryForm" ref = "createItineraryForm" onSubmit={this.handleCreateItinerarySubmit.bind(this)}>
			<span className="icon-cancel" onClick={this.closeForm.bind(this)}>X</span>

			<h1 className="formTitle">Crea un Nuevo Itinerario</h1>

			<input className="formInput" id="administrator_cif" ref="administrator_cif" type="hidden" value={this.props.user._id}/>
			<input className="formInput" id="title_cif" ref="title_cif" type="text" placeholder="Escribe un título"/>
			
			<input type="submit" value="Crear" id="btnCreateItinerary"/>

		</form>

	}
}