/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom'

export default class imageService extends React.Component{
	


	

	
	render(){
		// editar esta linea cuando se implemente aws S3, hay q quitarle el / y q pase directo el cors
		let url = "/" + this.props.img;

		return <figure>
					<img src={url}/>
				</figure>

	}
}
