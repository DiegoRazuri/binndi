/*
*	module dependencies
*/
import React from 'react';
import BtnAddToPlan from './btnAddToPlan'
import BtnAddToWishlist from './btnAddToWishlist'

import { Link } from 'react-router'

export default class ActivityThumbnail extends React.Component{

	
	
	render(){

		let favs_count = this.props.service.favs.length;
		let price = this.props.service.price + ".00"

		let descriptor = "";

		if(this.props.service.description.length > 225){

			let cant = this.props.service.description.length - 225

			for(let i = cant; i>0; i--){
				descriptor = this.props.service.description.slice(0, cant);
				if( descriptor.slice(-1) != " "){
					cant--;

				}else{
					descriptor += "..." 
					break;
				}
			}
			
			
		}
	
		

		return <div className="thumbnail">
					<figure className="thumb-image"><img src={this.props.service.images[0]}/></figure>
					<div className="mask">
						<div className="transparent-mask-content">
							<div className="wrapper-price">
								<h7 className="price text-giant-bold-white-m">s/. {price}</h7>
								<p className="text-small-lighter-white-o">por persona</p>
							</div>
							<div className="background-ico-play"></div>
							<span className="transparent-mask-play-ico icon-media-play ico-play"></span>
							<h3 className="text-big-bold-white-m">{this.props.service.title}</h3>
							<h4 className="text-big-normal-white-m">{this.props.service.city}</h4>	
						</div>
						<div className="blur-mask-content">
							<div className="blur"></div>
							<div className="wrapper-blur-mask-btn">
								<Link to={'/explore-scene/' + this.props.service._id} className="transparent-btn">
									<span className="icon-video-camera"></span>
									<p className="text-medium-bold-white-m">Ver video</p>
								</Link>
								
								
								<BtnAddToPlan
									togglePopupAddToPlan = {this.props.togglePopupAddToPlan}
									fadeIn = {this.props.fadeIn}/>
							</div>
							<h1 className="text-big-bold-white-m thumb-text thumb-service-title">{this.props.service.title}</h1>
							<h1 className="text-big-lighter-white-o thumb-text">{this.props.service.city}</h1>
							<h1 className="text-big-lighter-white-o thumb-text">{this.props.service.country}</h1>
							<p className="text-medium-lighter-white-o thumb-text thumb-description">Descripción: {descriptor} </p>
							<p className="text-big-bold-white-m thumb-text">S/. {price}</p>
							<p className="text-small-normal-white-o thumb-text">Por persona</p>
							<ul className="wrapper-social-interaction-data">
								<li>
									<BtnAddToWishlist
										addToWishlist = {this.props.addToWishlist}
										userWishlist = {this.props.userWishlist}
										serviceId = {this.props.service._id}
										removeFromWishlist= {this.props.removeFromWishlist}/>

									<p className="text-medium-bold-white-m">{favs_count}</p>
								</li>
								<li className="comments-info">
									<a href="#">
										<span className="icon-speech-bubble text-medium-bold-white-m icos"></span>
									</a>
									<p className="text-medium-bold-white-m">25</p>
								</li>
								<li className="floating-wrapper-data">
									<a href="#">
										<span className="icon-tag text-medium-bold-white-m icos"></span>
									</a>
									<p className="text-medium-bold-white-m">{this.props.service.purchases}</p>
									<p className="text-medium-bold-white-m">compras</p>
								</li>
								
							</ul>
						</div>
						
					</div>
				</div>

	}
}


/*
import React from 'react';
import BtnAddToPlan from './btnAddToPlan'
import BtnAddToWishlist from './btnAddToWishlist'

import { Link } from 'react-router'

//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class ActivityThumbnail extends React.Component{

	constructor (props){
		super(props);
		this.state={
			hover : false

		}
	
	}

	switchMask(){
		console.log("haciendo cambio")
		
		if(this.state.hover == false){
			this.setState({
				hover: true
			})
		}else{
			this.setState({
				hover: false
			})
		}


	}

	
	
	render(){

		let mask;

		if(this.state.hover == false){
			mask = <div className="transparent-mask-content">
						<div className="wrapper-price">
							<h7 className="price text-giant-bold-white-m">s/. {this.props.service.price}</h7>
							<p className="text-small-lighter-white-o">por persona</p>
						</div>
						<div className="background-ico-play"></div>
						<span className="transparent-mask-play-ico icon-media-play ico-play"></span>
						<h3 className="text-big-bold-white-m">{this.props.service.title}</h3>
						<h4 className="text-big-normal-white-m">{this.props.service.city}</h4>	
					</div>
		}else{
			mask = <div className="blur-mask-content">
						<div className="blur"></div>
						<div className="wrapper-blur-mask-btn">
							<Link to={'/explore-scene/' + this.props.service._id} className="transparent-btn">
								<span className="icon-video-camera"></span>
								<p className="text-medium-bold-white-m">Ver video</p>
							</Link>
							
							
							<BtnAddToPlan
								togglePopupAddToPlan = {this.props.togglePopupAddToPlan}
								fadeIn = {this.props.fadeIn}/>
						</div>
						<h1 className="text-big-bold-white-m thumb-text">{this.props.service.title}</h1>
						<h1 className="text-big-normal-white-m thumb-text">{this.props.service.city}</h1>
						<h1 className="text-big-normal-white-m thumb-text">{this.props.service.country}</h1>
						<p className="text-medium-lighter-white-o thumb-text thumb-description">Descripción: {this.props.service.description} </p>
						<p className="text-big-bold-white-m thumb-text">S/. {this.props.service.price}</p>
						<p className="text-small-normal-white-o thumb-text">Por persona</p>
						<ul className="wrapper-social-interaction-data">
							<li>
								<BtnAddToWishlist
									addToWishlist = {this.props.addToWishlist}
									userWishlist = {this.props.userWishlist}
									serviceId = {this.props.service._id}/>

								<p className="text-tiny-normal-grey-m">{favs_count}</p>
							</li>
							<li className="comments-info">
								<a href="#">
									<span className="icon-speech-bubble text-tiny-normal-grey-m icos"></span>
								</a>
								<p className="text-tiny-normal-grey-m">25</p>
							</li>
							<li className="floating-wrapper-data">
								<a href="#">
									<span className="icon-tag text-tiny-normal-grey-m icos"></span>
								</a>
								<p className="text-tiny-normal-grey-m">{this.props.service.purchases}</p>
								<p className="text-tiny-normal-grey-m">compras</p>
							</li>
							
						</ul>
					</div>
		}

		let favs_count = this.props.service.favs.length;
	
		

		return <div className="thumbnail">
					<figure className="thumb-image"><img src="Binndi_Workforus1.jpg"/></figure>
					<div className="mask" onMouseOver={this.switchMask.bind(this)} onMouseOut={this.switchMask.bind(this)}>
						
						{mask}
						
					</div>
				</div>

	}
}

*/