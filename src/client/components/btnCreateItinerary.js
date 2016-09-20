/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom'
import CreateItineraryForm from './createItineraryForm'

export default class BtnCreateItinerary extends React.Component{
	constructor (props){
		super(props);
		this.state={

		}
	}

	mountingItineraryFormPopup(ev){

		document.getElementById('wrapperPopups').style.display = 'block';
		ReactDom.render(
			< CreateItineraryForm user={this.props.user} createItinerary={this.props.createItinerary}/>,
			document.getElementById('wrapperPopups')
		);
	}

	
	render(){
		

		return <button onClick={this.mountingItineraryFormPopup.bind(this)}>Crea un Itinerario</button>

	}
}
