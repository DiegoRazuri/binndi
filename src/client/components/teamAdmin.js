/*
*	module dependencies
*/
import React from 'react';
import RegisterTstVideoForm from './registerTstVideoForm'

export default class TeamAdmin extends React.Component{

	constructor (props){
		super(props);
		this.state={

		}

		this.registerVideo = this.registerVideo.bind(this);
        
	}

	registerVideo(json){

        $.post('/api/pregunta', json, function(res){
        	console.log(res)
            
        })
	}

// SI EL USUARIO NO ESTA AUTORIZADO ENTONCES MOSTRAR ERROR

	render(){
		return <RegisterTstVideoForm 
			registerVideo = {this.registerVideo}/>

	}
}