/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom'
import UserAdminPanel from './userAdminPanel'
import BtnLoggin from './btnLoggin'
import BtnCreateEnterpriseProfile from './btnCreateEnterpriseProfile'
import PopupLogin from './logginPopup'
//import LandingSection from './landingSection'
import UserAvatar from './userAvatar'
import ExploreSection from './exploreSection'
import PopupAddToPlan from './popupAddToPlan'
import MessageUserPopup from './messageUserPopup'
import MessageEnterprisesPopup from './messageEnterprisesPopup'




import { Link } from 'react-router'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


export default class Layout extends React.Component{
	constructor (props){
		super(props);
		this.state={
			user : false,
			enterprise_selected : null,
			services: [],
			all_services: [],
			show_popup_add_to_plan : false,
			service_info : {},
			destinations: [],
			categorySelected: "",
			destinationSelected: "",
			categories: [],
			searchboxState: false,
			showPopupLogin : false,
			showMessageUser : false,
			showMessageEnterprises : false,
	//		showLanding :true,
			months: []
		}

		//this.addContact = this.addContact.bind(this);
		//this.createEnterprise = this.createEnterprise.bind(this);
		this.createItinerary = this.createItinerary.bind(this);
		this.enterpriseSwitch = this.enterpriseSwitch.bind(this);
		this.addServiceToItinerary = this.addServiceToItinerary.bind(this);
		this.loadAllServices = this.loadAllServices.bind(this);
		this.togglePopupAddToPlan = this.togglePopupAddToPlan.bind(this);
		this.fadeIn = this.fadeIn.bind(this);
		this.fadeOut = this.fadeOut.bind(this);
		this.addToWishlist = this.addToWishlist.bind(this);
		this.loadServiceInfo = this.loadServiceInfo.bind(this);
		this.categorySwitch = this.categorySwitch.bind(this);
		this.filterDestination = this.filterDestination.bind(this);
		this.sortServices = this.sortServices.bind(this);
		this.searchText = this.searchText.bind(this);
		this.showSearchbox = this.showSearchbox.bind(this);
		this.removeFromWishlist = this.removeFromWishlist.bind(this);
		this.showPopupLogin = this.showPopupLogin.bind(this);
		this.showPopupMessageUser = this.showPopupMessageUser.bind(this);
		this.showPopupMessageEnterprises = this.showPopupMessageEnterprises.bind(this);
		this.enterpriseAplication = this.enterpriseAplication.bind(this);
		

//		this.showLanding = this.showLanding.bind(this);
	
	}

	enterpriseAplication(json){

		
        $.post('/api/enterprise_aplication', json, (res)=>{
			console.log(res)
			if(res.aplicationState == 1){
				this.showPopupMessageEnterprises();
			}
			// no se esta actualizando el valor de los likes del servicio, pero si se esta enviando la información
        	
		})


	}

	showPopupLogin(){
		if(this.state.showPopupLogin == false){

			this.setState({showPopupLogin : true})
		
		}else{
			this.setState({showPopupLogin: false})
		}
	}
	showPopupMessageUser(){
		if(this.state.showMessageUser == false){

			this.setState({showMessageUser : true})
		
		}else{
			this.setState({showMessageUser: false})
		}
	}
	showPopupMessageEnterprises(){
		if(this.state.showMessageEnterprises == false){

			this.setState({showMessageEnterprises : true})
		
		}else{
			this.setState({showMessageEnterprises: false})
		}
	}

	loadServiceInfo(service_id){

		$.ajax({
			type:'GET',
            url: '/api/unique_services/' + service_id, 
            processData: false,
 			contentType: false,
            cache:false,
            success: (res)=>{
            	
            	this.setState({
            		service_info : res,
            		
            	})
               
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });

	}

	showSearchbox(){
		if(this.state.searchboxState == false){
			this.setState({
				searchboxState : true
			})
		}else{
			this.setState({searchboxState : false})
		}
	}



	isItLoggin(){
		$.ajax({
			type:'GET',
            url: '/api/usersession', 
            processData: false,  
 			contentType: false,  
            cache:false,
            success: (res)=>{
            	if(res.user != false){
            		console.log(res)
					// HAY QUE EDITAR EN EL SERVER PARA OBTENER USER + ITINERARIES + SERVICES
            		this.state.user = res.user;
            		let newUserInfo =  this.state.user;


            		res.destinations.map((destination)=>{
            			this.state.destinations.push(destination._id);
            		})

	            	let newDestinationInfo = this.state.destinations

	            	this.setState({
	            		user : newUserInfo,
	            		destinations : newDestinationInfo,
	            		categories : res.categories_list,
	            		months: res.months

	            		
	            	})

            	}
               
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
	}

	loadAllServices(){
		$.ajax({
			type:'GET',
            url: '/api/all_services', 
            processData: false,
 			contentType: false,
            cache:false,
            success: (res)=>{
            		
	            	this.setState({
	            		all_services: res,
	            		services: res
	            	})
            	
               
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
	}

	reloadAllServices(){
		this.setState({
			services: this.state.all_services,
			categorySelected: "",
			destinationSelected: "",
			searchboxState: false

		});
		let ele = document.querySelector('#txtSearchBox');
		ele.value = "";

	}

	searchText(text){
		let newInfo = [];

		
		
		console.log(text)

		this.state.all_services.map((service)=>{

		
			let str = service.title;

			if(service.city == text || str.search(text) != -1){
				console.log(service.city)
				console.log(text)
				newInfo.push(service);

			}
		});
		this.state.services = []
		//this.state.services = newServicesInfo;
		this.setState({
			services : newInfo
		})
	}

	sortServices(direction){
		console.log("ejecuta sortServices")
		let myArr = this.state.services;
		console.log("myArr")
		console.log(myArr)

		function swap(myArr, indexOne, indexTwo){
			var tmpVal = myArr[indexOne];
			myArr[indexOne] = myArr[indexTwo];
			myArr[indexTwo] = tmpVal;
			return myArr;
		}

		function bubbleSortAscen(myArr){
			var size = myArr.length;

			for( var pass = 1; pass < size; pass++ ){ // outer loop
				for( var left = 0; left < (size - pass); left++){ // inner loop
					var right = left + 1;
		
					if( myArr[left].price > myArr[right].price ){
						swap(myArr, left, right);
					}
				}
			}

			return myArr;
			
			
		}
		function bubbleSortDescen(myArr){
			var size = myArr.length;

			for( var pass = 1; pass < size; pass++ ){ // outer loop
				for( var left = 0; left < (size - pass); left++){ // inner loop
					var right = left + 1;
		
					if( myArr[left].price < myArr[right].price ){
						swap(myArr, left, right);
					}
				}
			}

			return myArr;
			
			
		}
		function bubbleSortPopularDescen(myArr){
			var size = myArr.length;

			for( var pass = 1; pass < size; pass++ ){ // outer loop
				for( var left = 0; left < (size - pass); left++){ // inner loop
					var right = left + 1;
		
					if( myArr[left].favs.length < myArr[right].favs.length ){
						swap(myArr, left, right);
					}
				}
			}

			return myArr;
			
			
		}

		var newServicesInfo;
		
		if(direction == 1){
			newServicesInfo = bubbleSortAscen(myArr);
		}else if(direction == 2){
			newServicesInfo = bubbleSortDescen(myArr);
		}else{
			newServicesInfo = bubbleSortPopularDescen(myArr);
		}
		


		this.setState({
			services : newServicesInfo
		})
	}

	categorySwitch(category, dataSelector){

		let dataSource;
		if(dataSelector == 1){
			dataSource = this.state.services
		}else{
			dataSource = this.state.all_services
		}
		
		let newServicesInfo = [];

		dataSource.map((service)=>{
			if(service.category == category ){
				newServicesInfo.push(service);
			}

		})

		this.state.services = [];

		this.setState({
			services: newServicesInfo,
			categorySelected: category
		});

		return newServicesInfo;

		
	}

	filterDestination(destination, dataSelector, inf){

		let dataSource;
		if(dataSelector == 1){
			dataSource = this.state.services
		}else if(dataSelector == 2){
			dataSource = inf
		}

		else{
			dataSource = this.state.all_services
		}

		let newServicesInfo =[];
		
		dataSource.map((service)=>{
			if(service.city == this.state.destinations[destination-1] ){
				newServicesInfo.push(service);
				
			}

		})

		this.state.services = [];

		this.setState({
			services: newServicesInfo,
			destinationSelected: destination

		});

	}

	enterpriseSwitch(enterpriseinfo){

		this.state.enterprise_selected = enterpriseinfo.enterprise;
		let newEnterpriseInfo = this.state.enterprise_selected;
		this.setState({
			enterprise_selected : newEnterpriseInfo
		})

		
	}

	addServiceToItinerary(json){
		$.post('/api/add_service_to_itinerary', json, (res)=>{
            console.log(res)

            this.state.user.itineraries.map((itinerary)=>{
            	if(itinerary._id == json.itinerary_id){
            		itinerary.services.push(res)
            	}
            })

        	let newUserInfo = this.state.user;
        	this.setState({user: newUserInfo})
        	//despues de recibir la info cerrar el itinerarylist 
        })
	}

	createItinerary(json){
		$.post('/api/create_itinerary', json, (res)=>{
            console.log(res)

            this.state.user.itineraries.push(res)
        	let newUserInfo = this.state.user;
        	this.setState({user: newUserInfo})
        	//despues de recibir la info cerrar el form 
        })
	}

	

	addContact(view_user_id){
		//este metodo debe cambiarse cuando implemente socket.io
		//primero se debe hacer una solicitud para agregar al contacto 
		//y con la confirmacion guardarlo
		console.log("agregando contacto, el contacto por agregar es este")
		console.log(view_user_id)

		let json = {}

		json.user_id = this.state.user._id;
		json.view_user_id = view_user_id;

		console.log(json)
		
		$.post('/api/agregar_contacto', json, function(res){
			console.log(res)
		})

	}
	addToWishlist(activity_id){
		//este metodo debe cambiarse cuando implemente socket.io
		//primero se debe hacer una solicitud para agregar al contacto 
		//y con la confirmacion guardarlo
		console.log("agregando a wishlist")
		console.log(activity_id)


		let json = { activity_id : activity_id}
		console.log(json)
		
		$.post('/api/add_to_wishlist', json, (res)=>{
			console.log(res)
			this.state.user.wishlist.push(res)
        	let newUserInfo = this.state.user;

        	this.state.services.map((service, index)=>{
        		if(service._id == res._id){
        			this.state.services[index] = res;
        		}
        	});
        	let newServicesInfo = this.state.services;

        	this.setState({
        		user: newUserInfo,
        		services : newServicesInfo        		
        	});
		})

	}
	removeFromWishlist(activity_id){
	
		console.log("quitando de wishlist")
		console.log(activity_id)


		let json = { activity_id : activity_id}
		
		
		$.post('/api/remove_from_wishlist', json, (res)=>{
			console.log(res)
		
			// no se esta actualizando el valor de los likes del servicio, pero si se esta enviando la información
        	this.setState({
        		user: res
        	});
		})

	}
	togglePopupAddToPlan(e){
		e.preventDefault();
		if(this.state.show_popup_add_to_plan == false){
			this.setState({ show_popup_add_to_plan: true })
		}else{
			this.setState({ show_popup_add_to_plan: false })
		}
		
	}

	fadeIn(element, finalOpacity, center, pixels) {
	    var aditionalPixels;
	    var height;
	    if(center == true){

	        console.log(window.innerWidth)

	        if(window.innerWidth <= 770 ){
	            aditionalPixels = -10;
	        }else{
	            aditionalPixels = pixels;
	        }

	        height = window.pageYOffset + aditionalPixels  + "px"
	        element.style.top = height
	    }
	    var op = 0.1;  // opacidad inicial
	    element.style.display = 'block';
	    
	 //   element.style.marginTop = "400px"
	    var timer = setInterval(function () {
	        if (op >= finalOpacity){
	            clearInterval(timer);
	        }
	        element.style.opacity = op;
	        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
	        op += op * 0.1;
	        element.style.display = 'block'
	    }, 8);
	    var container = document.querySelector("container");
	    //container.style.overflow = "hidden";
	}
	fadeOut(element) {
	    var op = 1;  // opacidad inicial
	    var timer = setInterval(function () {
	        if (op <= 0.1){
	            clearInterval(timer);
	            element.style.display = 'none';
	        }
	        element.style.opacity = op;
	        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
	        op -= op * 0.1;
	    }, 8);
	    var doc = document.querySelector('body');

	    doc.style.height = "auto";
	}


	componentWillMount(){
		this.isItLoggin();
		
	}
	render(){
		
		var userPanel;
		var popup_add_to_plan;
//		var landingStage;

		let popupLogin;
		let popupMessageUser;
		let popupMessageEnterprises;

		if(this.state.showPopupLogin != false){

			popupLogin = <PopupLogin
							showPopupLogin = {this.showPopupLogin}/>
		
		}

		if(this.state.showMessageUser != false){

			popupMessageUser = <MessageUserPopup
							showPopupMessageUser = {this.showPopupMessageUser}/>
		
		}
		if(this.state.showMessageEnterprises != false){

			popupMessageEnterprises = <MessageEnterprisesPopup
							showPopupMessageEnterprises = {this.showPopupMessageEnterprises}/>
		
		}

		
		

		if(this.state.user != false){
			userPanel = <UserAvatar 
				user = {this.state.user}/>

				if(this.state.show_popup_add_to_plan == true){
					popup_add_to_plan = <PopupAddToPlan
										togglePopupAddToPlan = {this.togglePopupAddToPlan}
										fadeOut = {this.fadeOut}/>
				}

		}else{
		
			userPanel = <ul className="nav-right">
							<li className="btn-hidden">
								<a className="btn-small-curve scrolleable" href="#banner-sequence-1">
									<p>Más información</p>
									<span className="icon-chevron-small-down"></span>
								</a>
							</li>
							<li className="btn-header-hidden btn-header-right" onClick={this.showPopupLogin.bind(this)}>
								<div id="btn-popup-login" className="btn-entered btn-small-curve">
									<p>Ingresa</p>
									<span className="icon-chevron-small-right"></span>
								</div>
							</li>
						</ul>
		}
/*
		if(this.state.user != true && this.state.showLanding != false){

			landingStage = <LandingSection
				showPopupLogin = {this.showPopupLogin}
				showLanding = {this.showLanding}/>
			
		}
*/
		return <div className="container">
					
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
									<Link to={"/explore"} onClick={this.reloadAllServices.bind(this)}>
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
								<Link to={"/"}><img src="https://s3-sa-east-1.amazonaws.com/binndi/landing/Binndi_Logo_header.png" alt="Binndi"/></Link>
							</figure>

							
							{userPanel}
							
							
						</nav>
					</header>
					<div className="app-stage">
						{
            				this.props.children && React.cloneElement(this.props.children, {
								services : this.state.services,
								loadAllServices : this.loadAllServices,
								togglePopupAddToPlan : this.togglePopupAddToPlan,
								fadeIn : this.fadeIn,
								addToWishlist : this.addToWishlist,
								userWishlist : this.state.user.wishlist,
								user : this.state.user,
								service_info : this.state.service_info,
								loadServiceInfo : this.loadServiceInfo,
								service_info_e : this.state.service_info.enterpriseprofile,
								categorySwitch : this.categorySwitch,
								filterDestination : this.filterDestination,
								sortServices : this.sortServices,
								destinations : this.state.destinations,
								searchText : this.searchText,
								categorySelected : this.state.categorySelected,
								destinationSelected : this.state.destinationSelected,
								categories : this.state.categories,
								showSearchbox : this.showSearchbox,
								searchboxState : this.state.searchboxState,
								months : this.state.months,
								showPopupMessageUser: this.showPopupMessageUser,
								showPopupMessageEnterprises: this.showPopupMessageEnterprises,
								enterpriseAplication: this.enterpriseAplication,
								removeFromWishlist: this.removeFromWishlist

								
							})


							
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
									<li><a href="#">Puntos Binndi</a></li>
								</ul>
							</li>
							<li>
								<h5>INFO</h5>
								<div className="footer-btn-underline"></div>
								<ul>
									<li><a href="#">¿Cómo funciona?</a></li>
									<li><a href="#">¿Eres una empresa?</a></li>
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
									<a href="#"><img src="https://s3-sa-east-1.amazonaws.com/binndi/landing/andes-logo.png"/></a>
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

					<ReactCSSTransitionGroup
						transitionName="popupLogin"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}>
						{ popupMessageUser }
					</ReactCSSTransitionGroup>
					<ReactCSSTransitionGroup
						transitionName="popupLogin"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}>
						{ popupMessageEnterprises }
					</ReactCSSTransitionGroup>

				</div>
		

	}
}