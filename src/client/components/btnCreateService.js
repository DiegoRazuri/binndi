
/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom'
import CreateServiceForm from './createServiceForm'


export default class btnCreateEnterpriseProfile extends React.Component{
	constructor (props){
		super(props);
		this.state={

		}

		//this.addContact = this.addContact.bind(this);
				
	}

	mountingServiceForm(ev){

		document.getElementById('wrapperForms').style.display = 'block';
		ReactDom.render(
			< CreateServiceForm createService ={this.props.createService} user={this.props.user}/>,
			document.getElementById('wrapperForms')
		);
	}


	render(){
		
		
		return <div>
			<button onClick={this.mountingServiceForm.bind(this)}>Crear Servicio</button>

		</div>

	}
}