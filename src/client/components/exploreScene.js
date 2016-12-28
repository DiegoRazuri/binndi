/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom'
import uid from 'uid'

import ImageService from './imageService'



export default class ExploreScene extends React.Component{

	constructor (props){
		super(props);
		this.state={

		}
	
	}

	addingToWishlist(e){
		e.preventDefault();

		if(this.props.userWishlist.length >0){
			for( let i= 0; i < this.props.userWishlist.length; i++){
				if(this.props.userWishlist[i]._id == this.props.params.service_id){
					console.log("quitando del state el servicio")
					console.log(this.props.userWishlist[i]._id)

					this.props.removeFromWishlist(this.props.params.service_id);
					
				}else{
					this.props.addToWishlist(this.props.params.service_id);
					

				}
			}
		}else{
			this.props.addToWishlist(this.props.params.service_id);
		}

		//this.props.addToWishlist(this.props.params.service_id);

	}
	

	componentWillMount(){


		this.props.loadServiceInfo(this.props.params.service_id);
		
	}

	componentDidMount(){
		
		var panorama, viewer;
		var binndi_scene = document.querySelector('#binndi_scene');

		panorama = new PANOLENS.VideoPanorama( '/res/pano.mp4' );
		viewer = new PANOLENS.Viewer({
			container: binndi_scene
		});

    	viewer.add( panorama );

    	this.setState({
    		panorama : panorama
    	})
	}

	componentWillUnmount(){
		
		this.state.panorama.pauseVideo();
	}


	
	render(){
		
		var objEnterpriseprofile = this.props.service_info.enterpriseprofile ? this.props.service_info.enterpriseprofile : 'Cargando...';
		var images = this.props.service_info.images ? this.props.service_info.images : [];
		var includes = this.props.service_info.includes ? this.props.service_info.includes : [];

		let image_list = [];
		

		images.map((img)=>{

			let key_id = uid()

			image_list.push( <ImageService
								key = {key_id}
								img = {img}/>
			);
		})

		let enterprise_profile_image;

		if(this.props.service_info.enterpriseprofile){
			enterprise_profile_image = "/" + objEnterpriseprofile.profile_image;
		}

		let activeBtn = <a className="transparent-btn" href="#">
							<span className="icon-heart-outline text-smaller-normal-grey-m icos"></span>
							<p className="text-small-normal-grey-o">Wishlist</p>
						</a>


		this.props.userWishlist.map((activity)=>{
		
			if(this.props.service_info._id == activity._id){
				
				activeBtn = <a className="transparent-btn active-button" href="#">
								<span className="icon-heart text-smaller-normal-grey-m icos ico-heart-active"></span>
								<p className="text-small-normal-grey-o">Wishlist</p>
							</a>
			}

		});
		console.log("info q paso a btnAddToWishlistBig")
		console.log(this.props.service_info._id)
		console.log(this.props.userWishlist)

		

		return <div className="section-explore-video-scene">
					<div id="binndi_scene" className="video-scene">
						
					</div>
					
					<div className="wrapper-explore-scene-blocks">
						<div className="wrapper-explore-scene-b-a">
							<div className="wrapper-planner-buttons">
								<div className="grid-planner-buttons">
									<div className="wrapper-like-button" onClick={this.addingToWishlist.bind(this)}>
										{activeBtn}
									</div>
									<div className="wrapper-add-button">
										<a className="transparent-btn" href="#">
											<span className="icon-write"></span>
											<p className="text-small-normal-grey-o">Agregar</p>
										</a>
									</div>
									<div>
										<a className="transparent-btn" href="#">
											<span className="icon-share2"></span>
											<p className="text-small-normal-grey-o">Compartir</p>
										</a>		
									</div>
									
									
									
								</div>
								<div className="wrapper-price">
									<p className="text-big-bold-grey-m price-number">S/. {this.props.service_info.price}</p>
									<p className="text-medium-normal-grey-o price-text">precio por persona</p>
									
								</div>
								
								
							</div>
							<div className="wrapper-explore-enterprise-info">
									
									<div className="header-explore-enterprise-info">
										<h1 className="text-smaller-normal-grey-m"> {objEnterpriseprofile.companyName}</h1>
										<div>
											<a href="#">
												<span className="icon-facebook"></span>	
											</a>
											<a href="#">
												<span className="icon-twitter"></span>
											</a>
											<a href="#">
												<span className="icon-instagram"></span>
											</a>
											
										</div>
									</div>
									

									<div className="body-explore-enterprise-info">
										<figure>
											<img src={ enterprise_profile_image }/>
										</figure>
										<div>
											<div>
												<span className="icon-suitcase text-halfmedium-normal-grey-o"></span>
												<p className="text-halfmedium-normal-grey-o company-name-field">{objEnterpriseprofile.companyName}</p>
											</div>
											<div>
												<span className="icon-phone text-halfmedium-normal-grey-o"></span>
												<p className="text-halfmedium-normal-grey-o">{objEnterpriseprofile.phone}</p>
											</div>
											<div>
												<span className="icon-envelope text-halfmedium-normal-grey-o"></span>
												<p className="text-halfmedium-normal-grey-o">{objEnterpriseprofile.email}</p>
											</div>
											<div>
												<span className="icon-social-dribbble text-halfmedium-normal-grey-o"></span>
												<p className="text-halfmedium-normal-grey-o">{objEnterpriseprofile.web}</p>
											</div>
											<div>
												<span className="icon-map-marker text-halfmedium-normal-grey-o"></span>
												<p className="text-halfmedium-normal-grey-o">{objEnterpriseprofile.address}</p>
											</div>
										</div>
									</div>				
								</div>
						</div>
						
						<div className="wrapper-explore-scene-b-b">
							
							<div className="wrapper-enterprise-images">

								{ image_list }
								
							</div>
							<div className="wrapper-explore-scene-description">
								<h2 className="text-small-bold-grey-m">{this.props.service_info.title}</h2>
								
								<h3 className="text-halfsmaller-normal-grey-m">{this.props.service_info.city}</h3>

								<h4 className="text-halfsmaller-normal-grey-m">{this.props.service_info.country}</h4>

								<p className="text-halfmedium-normal-grey-o">Descripción: {this.props.service_info.description}</p>
								<h4 className="text-halfsmaller-normal-grey-m text-special-resize">Incluye</h4>
								<ul>
									{
										includes.map((row)=>{
											let key_includes_id = uid()
											return <li key={key_includes_id} className="text-halfmedium-normal-grey-o">{row}</li>
										})
									}
									
								</ul>
								<h4 className="text-halfsmaller-normal-grey-m text-special-resize">Términos & Condiciones</h4>
								<p className="text-halfmedium-normal-grey-o">{this.props.service_info.terms_cond}</p>

							</div>
						</div>
						<div className="wrapper-explore-scene-b-c">
							<div className="division-explore-video-scene text-halfsmaller-normal-grey-m">Opiniones de esta experiencia</div>
							<div className="wrapper-user-comments">
								<div>
									<img src="#"/>
									<p className="text-small-normal-grey-o section-comment-user-name">Nombre Usuario</p>
									<p className="text-small-lighter-grey-o section-comment-user-comment">mensaje del usuario</p>
								</div>
							</div>
							<div className="division-explore-video-scene text-halfsmaller-normal-grey-m btn-more">ver más <span className="icon-chevron-small-down"></span></div>
						</div>
						
						<div className="wrapper-explore-scene-b-d">
						
							<div className="wrapper-map">
								<iframe width="100%" height = "170" frameBorder="0" scrolling="no" marginHeight="0" src={this.props.service_info.location_url}></iframe>
							</div>
							
						</div>
					</div>
					
				</div>

	}
}
