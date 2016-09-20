/*
* Modul dependencies
*/

import React from 'react';
import ExperienceShowcase from './experienceShowcase'

export default class Explore extends React.Component{
	constructor (props){
		super(props);
		this.state={
			services:[]
		}
	}

	getAllServices(){
		$.ajax({
			type:'GET',
            url: '/api/all_services', 
            processData: false,  // tell jQuery not to process the data
 			contentType: false,   // tell jQuery not to set contentType
            cache:false,
            success: (res)=>{
            	console.log("estos son los services")
            	console.log(res)
            	res.map((service)=>{
            		this.state.services.push(service);
            	});
            	let newServicesInfo = this.state.services;

            	this.setState({services: newServicesInfo});
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
	}
	
	componentDidMount(){
		this.getAllServices();
		
	}

	render(){



		
		return <div>
			
			<h1>exploring</h1>
			
			{this.state.services.map((pack)=>{
				return <ExperienceShowcase 
						key = {pack._id}
						user= {this.props.user}
						createItinerary= {this.props.createItinerary}
						service = {pack.services}
						addServiceToItinerary = {this.props.addServiceToItinerary}/>
			})}
			

			<p>bla bla bla bla exploging...</p>
			<p>{this.props.user.name}</p>

			
		</div>

	}
}


/*

EJEMPLOS DE WIDGETS VR VIEW RENDERIZANDO IMAGEN Y VIDEO

<iframe width="100%" 
	height="300px" 
	allowfullscreen 
	frameborder="0" 
	src="//storage.googleapis.com/vrview/index.html?image=//storage.googleapis.com/vrview/examples/coral.jpg&is_stereo=true">
</iframe>
<iframe width="50%" 
	height="300px" 
	allowfullscreen 
	frameborder="0" 
	src="//localhost:3000/vrview/index.html?video=//localhost:3000/vrview/examples/video/congo_2048.mp4&is_stereo=true">
</iframe>
*/