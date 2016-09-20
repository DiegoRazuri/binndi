/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';

export default class CreateServiceForm extends React.Component{
	
	closeForm(ev){
		document.getElementById('wrapperForms').style.display = 'none';
		ReactDom.unmountComponentAtNode(document.getElementById('wrapperForms'));
	}


	handleCreateServiceSubmit(e){
		e.preventDefault();
		var accountManager_cef = ReactDom.findDOMNode(this.refs.accountManager_cef).value.trim()
		var companyName_cef = ReactDom.findDOMNode(this.refs.companyName_cef).value.trim()
		let descriptor_cef = ReactDom.findDOMNode(this.refs.descriptor_cef).value.trim()
		let email_cef = ReactDom.findDOMNode(this.refs.email_cef).value.trim()
		let legalId_cef = ReactDom.findDOMNode(this.refs.legalId_cef).value.trim()
		let phone_cef = ReactDom.findDOMNode(this.refs.phone_cef).value.trim()
		let img_cef = ReactDom.findDOMNode(this.refs.img_cef)
		let web_cef = ReactDom.findDOMNode(this.refs.web_cef).value.trim()
		let location_url_cef = ReactDom.findDOMNode(this.refs.location_url_cef).value.trim()
		


		var formdata = new FormData();

		formdata.append('Content-Type', 'multipart/formdata');
		formdata.append( "user_id", accountManager_cef);
		formdata.append( "companyName", companyName_cef);
		formdata.append( "descriptor", descriptor_cef);
		formdata.append( "email", email_cef);
		formdata.append( "legalId", legalId_cef);
		formdata.append( "phone", phone_cef);
		formdata.append( "web", web_cef);
		formdata.append( "location_url", location_url_cef);
		formdata.append( "upl", img_cef.files[0], img_cef.files[0].name);



/*

		if(!user_id ! || !titleCall || !description_call) {
			return;
		}
*/		

		let json = {
			user_id : accountManager_cef,
			companyName : companyName_cef,
			descriptor : descriptor_cef,
			email: email_cef,
			phone : phone_cef,
			legalId: legalId_cef,
			web : web_cef,
			location_url : location_url_cef
		}

		// LLAMAR AL METODO QUE LLEGA POR PROPS CREATENEWENTERPRISE

		this.props.createEnterprise.call(null, formdata)

		ReactDom.findDOMNode(this.refs.companyName_cef).value = '';
		ReactDom.findDOMNode(this.refs.descriptor_cef).value = '';
		ReactDom.findDOMNode(this.refs.email_cef).value = '';
		ReactDom.findDOMNode(this.refs.web_cef).value = '';
		ReactDom.findDOMNode(this.refs.legalId_cef).value = '';
		ReactDom.findDOMNode(this.refs.phone_cef).value = '';
		ReactDom.findDOMNode(this.refs.location_url_cef).value = '';


		return;
	}

	render(){
		
		return <form id="createEnterpriseForm" ref = "createEnterpriseForm" onSubmit={this.handleCreateServiceSubmit.bind(this)}>
			<span className="icon-cancel" onClick={this.closeForm.bind(this)}>X</span>

			<h1 className="formTitle">Crea un nuevo servicio</h1>

			<input className="formInput" id="companyName_cef" ref="companyName_cef" type="text" placeholder="Nombre Comercial"/>
			<input className="formInput" id="descriptor_cef" ref="descriptor_cef" type="text" placeholder="descriptor"/>
			<input className="formInput" id="legalId_cef" ref="legalId_cef" type="text" placeholder="RUC"/>
			<input className="formInput" id="phone_cef" ref="phone_cef" type="text" placeholder="telefono"/>
			<input className="formInput" id="email_cef" ref="email_cef" type="email" placeholder="email"/>
			<input className="formInput" id="web_cef" ref="web_cef" type="url" placeholder="web"/>
			<input className="formInput" id="location_url_cef" ref="location_url_cef" type="url" placeholder="location"/>
			
			<input type="hidden" id="accountManager_cef" ref="accountManager_cef" value={this.props.user._id}/>

			<input type="submit" value="Crear" id="btnCreateEnterprise"/>

			<label>Imágen de Perfil</label>
			<div className="inputFile">
				<span className="ico icon-upload"></span>
				<span>Adjuntar imagen</span>
				
				<input className="formInputImg" type="file" id="ImageBrowseEnterpriseProfile" ref="img_cef" name="upl"/>
			</div>

		</form>

	}
}