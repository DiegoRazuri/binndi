
/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom'
import CreateEnterpriseForm from './createEnterpriseForm'
import LogginPopup from './logginPopup'


export default class btnCreateEnterpriseProfile extends React.Component{
	constructor (props){
		super(props);
		this.state={

		}

		//this.addContact = this.addContact.bind(this);
				
	}

	mountingEnterpriseForm(ev){
		if(!this.props.user){
			document.getElementById('wrapperPopups').style.display = 'block';
			ReactDom.render(
				< LogginPopup />,
				document.getElementById('wrapperPopups')
			);
		}else{
			
			document.getElementById('wrapperForms').style.display = 'block';
			ReactDom.render(
				< CreateEnterpriseForm createEnterprise ={this.props.createEnterprise} user={this.props.user}/>,
				document.getElementById('wrapperForms')
			);			
		}


	}


	render(){
		
		
		return <div>
			<button onClick={this.mountingEnterpriseForm.bind(this)}>Registra tu Empresa</button>

		</div>

	}
}