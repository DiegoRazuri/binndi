/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom'

import LandingSection from './landingSection'
import UserAvatar from './userAvatar'
import PopupLogin from './logginPopup'


import { Link } from 'react-router'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


export default class LandingStage extends React.Component{

	constructor (props){
		super(props);
		this.state={
			user : false,
			showPopupLogin : false

		}
		this.showPopupLogin = this.showPopupLogin.bind(this);

	
	
	
	}

	showPopupLogin(){
		if(this.state.showPopupLogin == false){

			this.setState({showPopupLogin : true})
		
		}else{
			this.setState({showPopupLogin: false})
		}
	}
	

	isItLoggin(){
		$.ajax({
			type:'GET',
            url: '/api/usersession', 
            processData: false,  // tell jQuery not to process the data
 			contentType: false,   // tell jQuery not to set contentType
            cache:false,
            success: (res)=>{
            	if(res.user != false){
            		console.log(res)
// HAY QUE EDITAR EN EL SERVER PARA OBTENER USER + ITINERARIES + SERVICES
            		this.state.user = res;
            		let newUserInfo =  this.state.user;
	            	

	            	this.setState({
	            		user : newUserInfo
	            		
	            	})

	            	
            	}
               
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
	}


	componentDidMount(){
		this.isItLoggin();
		
	}

	render(){

		let appStage;
		var popup_add_to_plan;
		let userPanel;
		let popupLogin;
		let landingSection;

		if(this.state.showPopupLogin != false){

			popupLogin = <PopupLogin
							showPopupLogin = {this.showPopupLogin}/>
		
		}

		landingSection = <LandingSection
							showPopupLogin = {this.showPopupLogin}/>

		if(this.state.user != false){
			userPanel = <UserAvatar 
				user = {this.state.user}/>

				

		}else{
		
			userPanel = <ul className="nav-right">
							<li className="btn-hidden">
								<a className="btn-small-curve scrolleable" href="#banner-sequence-1">
									<p>Más información</p>
									<span className="icon-chevron-small-down"></span>
								</a>
							</li>
							<li className="btn-header-hidden btn-header-right" onClick={this.showPopupLogin.bind(this)}>
								<a id="btn-popup-login" className="btn-entered btn-small-curve" href="#">
									<p>Ingresa</p>
									<span className="icon-chevron-small-right"></span>
								</a>
							</li>
						</ul>

		}

		

		return <div id="container" className="container">
					
					<header className="header">
						<nav id="navigation" className="nav">
							<div id="movil-menu" className="movil-menu">
								<div className="movil-menu-header">

									<span className="btn-close-movil-menu icon-cross" id="btn-close-movil-menu"></span>
										
								</div>
								<ul className="movil-menu-options movil-nav-options">
									<li>
										<a href="#">
											<span className="icon-eye"></span>
										<p>Explora</p>	
										</a>
									</li>
									<li>
										<a href="#">
											<span className="icon-write"></span>
											<p>Planifica</p>	
										</a>
									</li>
									<li>
										<a href="#">
											<span className="icon-support"></span>
											<p>Ayuda</p>	
										</a>
									</li>
								</ul>
								<ul className="movil-menu-options">
									<li>
										<a href="#">¿Como funciona?</a>
									</li>
									<li>
										<a href="#">Mis Binndis</a>
									</li>
									<li>
										<a href="#">Para negocios</a>
									</li>
								</ul>
							</div>
							<ul className="nav-left">
								<span id="btn-movil-menu" className="icon-th-menu ico-menu-movil"></span>
								<li className="btn-desktop first-btn-nav">
									<a href="#">
										<span className="icon-write"></span>
										<p>Planifica</p>	
									</a>
								</li>

								<li className="btn-desktop">
									<Link to={"/explore"}>
										<span className="icon-eye"></span>
										<p>Explora</p>	
									</Link>
									
								</li>
								
								<li className="btn-desktop">
									<a href="#">
										<span className="icon-support"></span>
										<p>Ayuda</p>	
									</a>
								</li>
							</ul>
							<figure className="logo-binndi-header">
								<Link to={"/"}><img src="style/img/Binndi_Logo_header.png" alt="Binndi"/></Link>
							</figure>

							
							{userPanel}
							
							
						</nav>
					</header>
					<div className="app-stage">
						{
							landingSection
						}
					</div>
					
					<div className="footer">
						<span className="background-footer"></span>
						<ul>
							<li>
								<h5>BINNDI</h5>
								<div className="footer-btn-underline"></div>
								<ul>
									<li><a href="#">Planifica</a></li>
									<li><a href="#">Explora</a></li>
									<li><a href="#">Blog</a></li>
									<li><Link to={"/binndis"} href="#">Puntos Binndi</Link></li>
								</ul>
							</li>
							<li>
								<h5>INFO</h5>
								<div className="footer-btn-underline"></div>
								<ul>
									<li><a href="#">¿Cómo funciona?</a></li>
									<li><Link to={"/enterprise-registration"}>¿Eres una empresa?</Link></li>
									<li><a href="#">El equipo</a></li>
									<li><a href="#">Ayuda</a></li>
								</ul>
							</li>
							<li>
								<h5>TIENDA</h5>
								<div className="footer-btn-underline"></div>
								<ul>
									<li><a href="#">Métodos de pago</a></li>
									<li><a href="#">Soporte ventas</a></li>
								</ul>
							</li>
							<li>
								<h5>LEGAL</h5>
								<div className="footer-btn-underline"></div>
								<ul>
									<li><a href="#">Políticas de privacidad</a></li>
									<li><a href="#">Términos & condiciones</a></li>
									<li><a href="#">Seguridad</a></li>
								</ul>
							</li>
							<li className="footer-grid-logos">
								<h5>RECONOCIDOS POR</h5>
								<div className="footer-btn-underline"></div>
								<figure>
									<a href="http://www.andesaccelerator.com/"><img src="style/img/andes-logo.png"/></a>
								</figure>
							</li>
							<li className="footer-grid-newsletter">
								<h5>SUSCRIBETE AL NEWSLETTER</h5>
								<div className="footer-btn-underline"></div>
								<div>comp</div>
							</li>

						</ul>
						<span className="background-footer background-footer-right"></span>
					</div>
					
					{ popup_add_to_plan }
					
					<ReactCSSTransitionGroup
						transitionName="popupLogin"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}>
						{ popupLogin }
					</ReactCSSTransitionGroup>

					
					
				</div>

	}
}
