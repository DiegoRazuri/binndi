/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';

import uid from 'uid'

export default class CreateEnterpriseForm extends React.Component{

	constructor (props){
		super(props);
		this.state={
			category : "",
			includes: [],
			tags: []

		}

		this.handleChange = this.handleChange.bind(this);
	
	}
	
	closeForm(ev){
		document.getElementById('wrapperForms').style.display = 'none';
		ReactDom.unmountComponentAtNode(document.getElementById('wrapperForms'));
	}

	handleChange(ev){

		console.log(ev.target.value);
		this.setState({category: ev.target.value});
	}

	handleLists(list_op){

		let workingState;
		let val

		//settings function

		if(list_op == 1){
			workingState = this.state.includes;
			val = ReactDom.findDOMNode(this.refs.includes_csf).value.trim()
		}else{
			workingState = this.state.tags
			val = ReactDom.findDOMNode(this.refs.tags_csf).value.trim()
		}


		if(val != ""){
			workingState.push(val)
			let newStateInfo = workingState

			if(list_op == 1){
				this.setState({includes: newStateInfo});

				ReactDom.findDOMNode(this.refs.includes_csf).value = '';
			}else{
				this.setState({tags: newStateInfo});

				ReactDom.findDOMNode(this.refs.tags_csf).value = '';
			}		
			
		}
		workingState = "";
		val="";

	}

	handleDeleteLists(index_i, list_op){

		let workingState;

		//settings function

		if(list_op == 1){
			workingState = this.state.includes;
		}else{
			workingState = this.state.tags
		}
		
		workingState.map((i, index)=>{
			
			if(index_i == index){

				let newStateInfo;

				if(index == 0){
					workingState.shift()
					newStateInfo = workingState;
					
				}
				else{

					workingState.splice(index, index);
					newStateInfo = workingState;
					
				}


				if(list_op ==1){
					this.setState({includes: newStateInfo});
				}
				else{
					this.setState({tags: newStateInfo});
				}

			}
		});
	}


	handleCreateEnterpriseSubmit(e){
		e.preventDefault();
		var accountManager_cef = ReactDom.findDOMNode(this.refs.accountManager_cef).value.trim()
		
		var companyName_cef = ReactDom.findDOMNode(this.refs.companyName_cef).value.trim()
		var tradeName_cef = ReactDom.findDOMNode(this.refs.tradeName_cef).value.trim()
		let img_cef = ReactDom.findDOMNode(this.refs.img_cef)
		let legalId_cef = ReactDom.findDOMNode(this.refs.legalId_cef).value.trim()
		let phone_cef = ReactDom.findDOMNode(this.refs.phone_cef).value.trim()
		let email_cef = ReactDom.findDOMNode(this.refs.email_cef).value.trim()
		let web_cef = ReactDom.findDOMNode(this.refs.web_cef).value.trim()
		let address_cef = ReactDom.findDOMNode(this.refs.address_cef).value.trim()
		let location_url_cef = ReactDom.findDOMNode(this.refs.location_url_cef).value.trim()
		let descriptor_cef = ReactDom.findDOMNode(this.refs.descriptor_cef).value.trim()

		let title_csf = ReactDom.findDOMNode(this.refs.title_csf).value.trim()
		let city_csf = ReactDom.findDOMNode(this.refs.city_csf).value.trim()
		let country_csf = ReactDom.findDOMNode(this.refs.country_csf).value.trim()
		let description_csf = ReactDom.findDOMNode(this.refs.description_csf).value.trim()
		let includes_csf = this.state.includes;
		let terms_cond_csf = ReactDom.findDOMNode(this.refs.terms_cond_csf).value.trim()
		let service_location_url_csf = ReactDom.findDOMNode(this.refs.service_location_url_csf).value.trim()
		let price_csf = ReactDom.findDOMNode(this.refs.price_csf).value.trim()
		let tags_csf = this.state.tags;
		let img_services_csf = ReactDom.findDOMNode(this.refs.img_services_csf)
		let video_url_csf = ReactDom.findDOMNode(this.refs.video_url_csf).value.trim()
		let category_csf = this.state.category

		console.log("estas son las imagenes")
	
		console.log(img_services_csf.files)
		console.log(img_services_csf.files[0])



		var formdata = new FormData();
		

		formdata.append('Content-Type', 'multipart/formdata');
		formdata.append( "user_id", accountManager_cef);
		formdata.append( "companyName", companyName_cef);
		formdata.append( "tradeName", tradeName_cef);
		formdata.append( "profile_image", img_cef.files[0], img_cef.files[0].name);
		formdata.append( "legalId", legalId_cef);
		formdata.append( "phone", phone_cef);
		formdata.append( "email", email_cef);
		formdata.append( "web", web_cef);
		formdata.append( "address", address_cef);
		formdata.append( "location_url", location_url_cef);
		formdata.append( "descriptor", descriptor_cef);
		

		formdata.append( "title", title_csf);
		formdata.append( "city", city_csf);
		formdata.append( "country", country_csf);
		formdata.append( "description", description_csf);
		//formdata.append( "includes", includes_csf);
		formdata.append( "terms_cond", terms_cond_csf);
		formdata.append( "service_location_url", service_location_url_csf);
		formdata.append( "price", price_csf);
		//formdata.append( "tags", tags_csf);


		//formdata.append( "images", img_services_csf.files[0], img_services_csf.files[0].name);
		formdata.append( "video_url", video_url_csf);
		formdata.append( "category", category_csf);

		for ( let i = 0; i < img_services_csf.files.length; i++){
			let name = uid(10) + img_services_csf.files[i].name 
			formdata.append('images', img_services_csf.files[i], name)
		}

		for( let i = 0; i < includes_csf.length; i++){
			formdata.append('includes', includes_csf[i]);
		}
		for( let i = 0; i < tags_csf.length; i++){
			formdata.append('tags', tags_csf[i]);
		}

		// LLAMAR AL METODO QUE LLEGA POR PROPS CREATENEWENTERPRISE
		
		this.props.createEnterprise.call(null, formdata)



		ReactDom.findDOMNode(this.refs.companyName_cef).value = '';
		ReactDom.findDOMNode(this.refs.tradeName_cef).value = '';
		ReactDom.findDOMNode(this.refs.legalId_cef).value = '';
		ReactDom.findDOMNode(this.refs.phone_cef).value = '';
		ReactDom.findDOMNode(this.refs.email_cef).value = '';
		ReactDom.findDOMNode(this.refs.web_cef).value = '';
		ReactDom.findDOMNode(this.refs.location_url_cef).value = '';
		ReactDom.findDOMNode(this.refs.descriptor_cef).value = '';

		ReactDom.findDOMNode(this.refs.title_csf).value = '';
		ReactDom.findDOMNode(this.refs.city_csf).value = '';
		ReactDom.findDOMNode(this.refs.country_csf).value = '';
		ReactDom.findDOMNode(this.refs.description_csf).value = '';
		
		ReactDom.findDOMNode(this.refs.terms_cond_csf).value = '';
		ReactDom.findDOMNode(this.refs.service_location_url_csf).value = '';
		ReactDom.findDOMNode(this.refs.price_csf).value = '';
		ReactDom.findDOMNode(this.refs.tags_csf).value = '';
		ReactDom.findDOMNode(this.refs.video_url_csf).value = '';


		return;
	}

	render(){

		let include_list = []
		let tags_list =[]

		if(this.state.includes.length > 0){
			this.state.includes.map((i, index)=>{
				let key_include_id = uid();
				include_list.push( <li key = {key_include_id}><p>{i}</p><span onClick={this.handleDeleteLists.bind(this,index, 1)}>x</span></li> );
			})

		}
		if(this.state.tags.length > 0){
			this.state.tags.map((i, index)=>{
				let key_tags_id = uid();
				tags_list.push( <li key = {key_tags_id}><p>{i}</p><span onClick={this.handleDeleteLists.bind(this,index, 2)}>x</span></li> );
			})

		}

		
		
		return <form id="createEnterpriseForm" ref = "createEnterpriseForm" onSubmit={this.handleCreateEnterpriseSubmit.bind(this)}>
			<span className="icon-cancel" onClick={this.closeForm.bind(this)}>X</span>

			<h1 className="formTitle">Crea el perfil de tu empresa</h1>

			<input className="formInput" id="companyName_cef" ref="companyName_cef" type="text" placeholder="Razón Social"/>
			<input className="formInput" id="tradeName_cef" ref="tradeName_cef" type="text" placeholder="Nombre Comercial"/>
			<input className="formInput" id="legalId_cef" ref="legalId_cef" type="text" placeholder="RUC"/>
			<input className="formInput" id="phone_cef" ref="phone_cef" type="text" placeholder="telefono"/>
			<input className="formInput" id="email_cef" ref="email_cef" type="email" placeholder="email"/>
			<input className="formInput" id="web_cef" ref="web_cef" type="url" placeholder="web"/>
			<input className="formInput" id="address_cef" ref="address_cef" type="text" placeholder="dirección"/>
			<input className="formInput" id="location_url_cef" ref="location_url_cef" type="url" placeholder="url google maps"/>
			<input className="formInput" id="descriptor_cef" ref="descriptor_cef" type="text" placeholder="descriptor"/>
			
			
			<input type="hidden" id="accountManager_cef" ref="accountManager_cef" value="57a28e24547e1f94060e00b8"/>

			

			<label>Imágen de Perfil</label>
			<div className="inputFile">
				<span className="ico icon-upload"></span>
				<span>Adjuntar imagen</span>
				
				<input className="formInputImg" type="file" id="ImageBrowseEnterpriseProfile" ref="img_cef" name="profile_image"/>
			</div>

			<h1>Crea un servicio para ofrecer</h1>

			<input className="formInput" id="title_csf" ref="title_csf" type="text" placeholder="Titulo"/>
			<input className="formInput" id="city_csf" ref="city_csf" type="text" placeholder="Ciudad"/>
			<input className="formInput" id="country_csf" ref="country_csf" type="text" placeholder="País"/>
			<input className="formInput" id="description_csf" ref="description_csf" type="text" placeholder="Descripcion"/>

			<ul>
				{ 	
					include_list
				
				}
			</ul>
			<input className="formInput" id="includes_csf" ref="includes_csf" type="text" placeholder="Incluye"/>
			<div onClick={this.handleLists.bind(this, 1)}>+</div>
			<input className="formInput" id="terms_cond_csf" ref="terms_cond_csf" type="text" placeholder="terminos y condiciones"/>
			<input className="formInput" id="service_location_url_csf" ref="service_location_url_csf" type="text" placeholder="url google maps del servicio"/>
			<input className="formInput" id="price_csf" ref="price_csf" type="text" placeholder="Precio"/>
			

			<ul>
				{ 	
					tags_list
				
				}
			</ul>
			<input className="formInput" id="tags_csf" ref="tags_csf" type="text" placeholder="Tags"/>
			<div onClick={this.handleLists.bind(this, 2)}>+</div>
			
			<select value={this.state.category} onChange={this.handleChange}>
				<option value="1">Aventura</option>
				<option value="2">Comida</option>
				<option value="3">Cultura</option>
				<option value="4">Arte</option>
				<option value="5">Eventos</option>
				<option value="6">Fiesta</option>
				<option value="7">Naturaleza</option>
				<option value="8">Deporte</option>
				<option value="9">Hospedaje</option>
				<option value="10">Compras</option>
			</select>
			
			<label>Imágen de Perfil</label>
			<div className="inputFile">
				<span className="ico icon-upload"></span>
				<span>Adjuntar imagen</span>
				
				<input className="formInputImg" multiple type="file" id="ImageBrowseServices" ref="img_services_csf" name="images"/>
			</div>
			
			<input className="formInput" id="video_url_csf" ref="video_url_csf" type="text" placeholder="url del video"/>
			


			<input type="submit" value="Crear" id="btnCreateEnterprise"/>

		</form>

	}
}