/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom'
import CreateItineraryForm from './createItineraryForm'


export default class ItineraryRow extends React.Component{
	constructor (props){
		super(props);
		this.state={

		}
	}



	addService(ev){
		console.log("click en el itinerario se ejecuta addService")
		let json = {
			itinerary_id : this.props.itinerary._id,
			service : this.props.service
		}


		this.props.addServiceToItinerary.call(null, json)

	}

	
	render(){
		

		return <li onClick={this.addService.bind(this)}>{this.props.itinerary.title}</li>

	}
}
