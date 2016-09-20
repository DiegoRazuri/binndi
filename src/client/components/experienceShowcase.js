/*
*	module dependencies
*/
import React from 'react';
import BtnAddToItineraries from './btnAddToItineraries'

export default class experienceShowcase extends React.Component{


/*	
	excuteSwitch(){
		this.props.enterpriseSwitch.call(null, this.props.enterprise_id)
	}
*/		
	

	render(){

		let src_tmp = "//" + this.props.service.tst_videos.route_vrView + "?" + "video=//" + this.props.service.tst_videos.url + "&" + "is_stereo=" + this.props.service.tst_videos.stereo

		return <div>
			<iframe 
				width="30%"
				height="300px"
				allowfullscreen
				frameborder="0"
				src={src_tmp}>
			</iframe>	
			<BtnAddToItineraries 
				user = {this.props.user} 
				createItinerary={this.props.createItinerary}
				service = {this.props.service}
				addServiceToItinerary = {this.props.addServiceToItinerary}/>		
		</div>

	}
}