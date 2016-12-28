/*
*	module dependencies
*/
import React from 'react';
import CreateEnterpriseForm from './createEnterpriseForm'


export default class TeamAdmin extends React.Component{

	constructor (props){
		super(props);
		this.state={

		}

		this.createEnterprise = this.createEnterprise.bind(this);
        
	}

	
	createEnterprise(formdata){

		$.ajax({
            type:'POST',
            url: '/api/new_enterprise', 
            processData: false,  // tell jQuery not to process the data
 			contentType: false,   // tell jQuery not to set contentType
            cache:false,
            data:formdata,
            success: (res)=>{
            	console.log(res)
             
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        })


	}


// SI EL USUARIO NO ESTA AUTORIZADO ENTONCES MOSTRAR ERROR

	render(){
		return <CreateEnterpriseForm 
			createEnterprise = {this.createEnterprise}/>

	}
}