/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom'
import Itineraries from './itineraries'
import Wishlist from './wishlist'
import UserInfo from './userInfo'



export default class Userprofile extends React.Component{
	
	constructor (props){
		super(props);
		this.state={
			viewStage : 3

		}

		this.switchToWishlist = this.switchToWishlist.bind(this);
		this.switchToItinerary = this.switchToItinerary.bind(this);
		this.switchToProfile = this.switchToProfile.bind(this);

	
	
	}

	switchToWishlist(e){
		e.preventDefault();
		this.setState({
			viewStage : 3
		})
	}
	switchToItinerary(e){
		e.preventDefault();
		this.setState({
			viewStage : 2
		})
	}
	switchToProfile(e){
		e.preventDefault();
		this.setState({
			viewStage : 1

		})
	}
	showingPopupMessageUser(){
		this.props.showPopupMessageUser();

	}

	componentDidMount(){
		this.props.showPopupMessageUser();
	}




	
	render(){

		let viewStage
		let userInfo;


		if(screen.width > 768){


			userInfo = <UserInfo
							user = {this.props.user}
							months = {this.props.months}/>;
		}

		switch(this.state.viewStage){

			case 1: viewStage = <UserInfo
									user={this.props.user}
									months={this.props.months}/>
					break;
			case 2: viewStage = <Itineraries/>
					break;
			case 3: viewStage = <Wishlist
									user={this.props.user}
									removeFromWishlist = {this.props.removeFromWishlist}/>
		}

		let btnUserprofileStateProfile, btnUserprofileStateItineraries, btnUserprofileStateWishlist

		if(this.state.viewStage == 1){
			btnUserprofileStateProfile = "userprofile-nav-btn element-hidden userprofile-btn-profile userprofile-btn-profile-active"
		}else{
			btnUserprofileStateProfile = "userprofile-nav-btn element-hidden userprofile-btn-profile"
		}

		if(this.state.viewStage == 2){
			btnUserprofileStateItineraries = "userprofile-nav-btn userprofile-btn-plans userprofile-btn-plans-active"
		}else{
			btnUserprofileStateItineraries = "userprofile-nav-btn userprofile-btn-plans"
		}

		if(this.state.viewStage == 3){
			btnUserprofileStateWishlist = "userprofile-nav-btn userprofile-btn-wishlist userprofile-btn-wishlist-active"
		}else{
			btnUserprofileStateWishlist = "userprofile-nav-btn userprofile-btn-wishlist"
		}



		return <div className="section-userprofile">
					<div className="userprofile-wrapper-body">
						<div className="userprofile-header">
							<div className="userprofile-wrapper-banner"></div>
							<div className="userprofiles-wrapper-margin-photo">
								<figure className="userprofile-wrapper-photo">
									<img src={this.props.user.photo}/>
								</figure>
							</div>
							<div className="userprofile-header-color-filter"></div>
						</div>
						<div className="userprofile-wrapper-nav">
							<a href="#" className={btnUserprofileStateProfile} onClick={this.switchToProfile.bind(this)}>
								<div className="btn-division-line">
									<span className="icon-head btn-ico"></span>
									<p className="text-tiny-normal-grey-m">Mi Perfil</p>
								</div>
							</a>
							<a href="#" className={btnUserprofileStateItineraries} onClick={this.switchToItinerary.bind(this)}>
								<div className="btn-division-line">
									<span className="icon-bookmark btn-ico"></span>
									<p className="text-tiny-normal-grey-m">Mis Planes</p>
								</div>
							</a>	
							
							<a href="#" className={btnUserprofileStateWishlist} onClick={this.switchToWishlist.bind(this)}>
								<div>
									<span className="icon-heart-outline btn-ico"></span>
									<p className="text-tiny-normal-grey-m">Mi Wishlist</p>
								</div>
							</a>	
							
						</div>
						{userInfo}
						{viewStage}
						
					</div>

					
				</div>

	}
}
