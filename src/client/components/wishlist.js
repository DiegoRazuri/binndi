/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom'

import ActivityThumbnail from './activityThumbnail'

export default class Wishlist extends React.Component{
	

	

	
	render(){

		let thumbail=[];
		
		if(this.props.user != false){
			if(this.props.user.wishlist.length > 0 ){

				this.props.user.wishlist.map((service)=>{
								
					thumbail.push(

						<ActivityThumbnail
						key = {service._id}
						service = {service}
						togglePopupAddToPlan = {this.props.togglePopupAddToPlan}
						fadeIn = {this.props.fadeIn}
						addToWishlist= {this.props.addToWishlist}
						userWishlist = {this.props.user.wishlist}
						removeFromWishlist = {this.props.removeFromWishlist}/>

						);
				})
				
				
				
			}
		}

			

		return <div className="userprofile-wrapper-wishlist">
					<div className="wrapper-ad"><h4>En esta sección guardas todas las aventuras y experiencias que deseas realizar en el futuro.</h4></div>

					<div className="wrapper-thumbnails">
						{
							
							
							
							thumbail
							
							
							
						}

						
					</div>
				</div>


	}
}
