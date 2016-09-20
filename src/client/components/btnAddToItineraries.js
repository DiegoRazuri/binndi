/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';
import ItineraryList from './itinerariesList'

export default class BtnAddToItineraries extends React.Component{
	constructor (props){
		super(props);
		this.state={
			viewItineraryList : false

		}
		this.changeItineraryListView = this.changeItineraryListView.bind(this);
	
	}
	


	changeItineraryListView(ev){

		if(this.state.viewItineraryList != true){
		//	this.state.viewEnterpriseList = true;
			this.setState({
				viewItineraryList :true
			})
		}else{
			this.setState({viewItineraryList : false});
		}
	}

	
	render(){
		let itineraryList;

		if(this.state.viewItineraryList == true){
			itineraryList = <ItineraryList 
								user={this.props.user}
								createItinerary={this.props.createItinerary}
								service = {this.props.service}
								addServiceToItinerary = {this.props.addServiceToItinerary}/>
		}

		

		return <div> 
			<button onClick={this.changeItineraryListView.bind(this)}>Agregar a Itinerario</button>
			{itineraryList}
		</div>
	}
}
