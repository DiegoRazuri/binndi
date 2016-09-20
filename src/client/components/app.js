/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom'
import UserAdminPanel from './userAdminPanel'
import BtnLoggin from './btnLoggin'
import BtnCreateEnterpriseProfile from './btnCreateEnterpriseProfile'


import { Link } from 'react-router'


export default class Layout extends React.Component{
	constructor (props){
		super(props);
		this.state={
			user : false,
			enterprise_selected : null

		}

		//this.addContact = this.addContact.bind(this);
		this.createEnterprise = this.createEnterprise.bind(this);
		this.createItinerary = this.createItinerary.bind(this);
		this.enterpriseSwitch = this.enterpriseSwitch.bind(this);
		this.addServiceToItinerary = this.addServiceToItinerary.bind(this);
	
		
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

	createEnterprise(formdata){

		$.ajax({
            type:'POST',
            url: '/api/new_enterprise', 
            processData: false,  // tell jQuery not to process the data
 			contentType: false,   // tell jQuery not to set contentType
            cache:false,
            data:formdata,
            success:(data)=>{
            	console.log(data)
            	console.log(this)
            	this.state.user.enterprise.push(data)
            	let newUserInfo = this.state.user;

            	this.setState({
            		user : newUserInfo
            	});
/*				
                let newWorkplaceId = data[1].workplaces.pop()
                let newKeyId = newWorkplaceId._id
                let newEnterpriseId = data[0]._id
                let newCompany = data[0].companyName
*/
//                this.props.addUserWorkplace.call(null, data[1])
            	//let newInfo_workplace = this.state.user
                /*
                this.state.admEnterpriseList.push({
                	enterpriseName : newCompany,
                	enterpriseId : newEnterpriseId,
                	key_id : newKeyId
                });
*/
//                let newInfo = this.state.admEnterpriseList
                //this.setState({user: newInfo_workplace})
                
                ReactDom.unmountComponentAtNode(document.getElementById('wrapperForms'));
                document.getElementById('wrapperForms').style.display = 'none';
                //updateState(d);
                //en el segundo elemento de la respuesta me llega la info del usuario                
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
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


	componentDidMount(){
		this.isItLoggin();
		
	}
	render(){
		
		var logginPanel;
		
		if(this.state.user != false){
			logginPanel = <UserAdminPanel 
				user = {this.state.user}
				enterpriseSwitch = {this.enterpriseSwitch}/>
		}else{
		
			logginPanel = <BtnLoggin/>
		}

		return <div>
			<header>
				<nav>
					<figure className="headerLogo">
						<h1><Link to={"/"}>BINNDI</Link></h1>
					</figure>

					<ul>
						<li><Link to={"/registerService"}>Registra tu Servicio</Link></li>
						<li><Link to={"/explore"}>Explora</Link></li>
						<li><Link to={"/plans"}>Planifica</Link></li>
					</ul>
					{logginPanel}
					{this.props.children && React.cloneElement(this.props.children, {
              			user: this.state.user,
              			createEnterprise: this.createEnterprise,
              			createItinerary : this.createItinerary,
              			addServiceToItinerary : this.addServiceToItinerary
            		})}
            		<button><Link to={"/info-enterprise-register"}>Ofrece tus Servicios</Link></button>
					
				</nav>
			</header>
			<div id="wrapperForms"></div>
			<div id="wrapperPopups"></div>
		</div>

	}
}