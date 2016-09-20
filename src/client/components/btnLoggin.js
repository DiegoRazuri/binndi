/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom'
import LogginPopup from './logginPopup'

export default class btnLoggin extends React.Component{
	constructor (props){
		super(props);
		this.state={

		}
	}

	mountingLogginPopup(ev){

		document.getElementById('wrapperPopups').style.display = 'block';
		ReactDom.render(
			< LogginPopup />,
			document.getElementById('wrapperPopups')
		);
	}

	
	render(){
		

		return <button onClick={this.mountingLogginPopup.bind(this)}>Ingresa</button>

	}
}
