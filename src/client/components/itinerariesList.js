/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom'
import BtnCreateItinerary from './btnCreateItinerary'
import ItineraryRow from './itineraryRow'

export default class ItinerariesList extends React.Component{
	constructor (props){
		super(props);
		this.state={

		}
	}

	
	render(){

		
		return <ul>
			{
				this.props.user.itineraries.map((itinerary)=>{
					
					return <ItineraryRow
						key = {itinerary._id}
						itinerary = {itinerary}
						service = {this.props.service}
						addServiceToItinerary ={this.props.addServiceToItinerary}/>
				})
				
			}
			<li><BtnCreateItinerary user={this.props.user} createItinerary ={this.props.createItinerary}/></li>
		</ul>

	}
}
