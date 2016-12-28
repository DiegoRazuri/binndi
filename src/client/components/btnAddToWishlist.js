/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom'

export default class BtnAddToPlan extends React.Component{
	

	addingToWishlist(e){
		e.preventDefault();
		

		if(this.props.userWishlist.length >0){
			for( let i= 0; i < this.props.userWishlist.length; i++){
				if(this.props.userWishlist[i]._id == this.props.serviceId){
					console.log("quitando del state el servicio")
					console.log(this.props.userWishlist[i]._id)

					this.props.removeFromWishlist(this.props.serviceId);
					
				}else{
					this.props.addToWishlist(this.props.serviceId);
					

				}
			}
		}else{
			this.props.addToWishlist(this.props.serviceId);
		}
		
		


	}

	
	render(){
		let iconHeart = <span className="icon-heart-outline text-big-bold-white-m icos"></span>


		if(this.props.userWishlist){
			this.props.userWishlist.map((activity)=>{
		
				if(this.props.serviceId == activity._id){
					
					iconHeart = <span className="icon-heart text-big-bold-white-m icos ico-heart-active"></span>
					
				}

			});
		}
		


		return <a href="#" onClick={this.addingToWishlist.bind(this)}>
					{ iconHeart }
					
				</a>

	}
}
