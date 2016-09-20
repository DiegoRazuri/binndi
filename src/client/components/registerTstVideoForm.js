/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';

export default class RegisterTstVideoForm extends React.Component{
	
	constructor (props){
		super(props);
		this.state={
			stereo : "",
			route_vrView: "localhost:3000/vrview/index.html"

		}
		this.handleClickStereoOption = this.handleClickStereoOption.bind(this);
		this.handleClickRouteVrviewOption = this.handleClickRouteVrviewOption.bind(this);
		
	}

	closeForm(ev){
		document.getElementById('wrapperForms').style.display = 'none';
		ReactDom.unmountComponentAtNode(document.getElementById('wrapperForms'));
	}

	handleClickStereoOption (event){
		this.setState({ stereo : event.target.value})
	}
	handleClickRouteVrviewOption (event){
		this.setState({ route_vrView : event.target.value})
	}


	handleRegisterTstVideoSubmit(e){
		e.preventDefault();
		let url_rtvf = ReactDom.findDOMNode(this.refs.url_rtvf).value.trim()
		let title_rtvf = ReactDom.findDOMNode(this.refs.title_rtvf).value.trim()
		let tags_rtvf = ReactDom.findDOMNode(this.refs.tags_rtvf).value.trim()



		// LLAMAR AL METODO QUE LLEGA POR PROPS registerVideo
		let json
		json = "esta es mi respuesta"
/*
		if(this.state.stereo != ""){
			if(this.state.route_vrView != ""){

				json = {
					url : url_rtvf,
					title: title_rtvf,
					tags: tags_rtvf,
					stereo: this.state.stereo,
					route_vrView: this.state.route_vrView
				}

			}else{
				console.log("debe indicar en que ruta se encuentra el componente de vrview")
			}
		}else{
			console.log("debe seleccionar una opcion de stereo")
		
		}
*/

		this.props.registerVideo.call(null, json)

		ReactDom.findDOMNode(this.refs.tags_rtvf).value = '';
		ReactDom.findDOMNode(this.refs.title_rtvf).value = '';
		ReactDom.findDOMNode(this.refs.url_rtvf).value = '';


		return;
	}

	render(){
		
		return <form id="registerVideoForm" ref = "registerVideoForm" onSubmit={this.handleRegisterTstVideoSubmit.bind(this)}>
			<span className="icon-cancel" onClick={this.closeForm.bind(this)}>X</span>

			<h1 className="formTitle">Registro de videos</h1>

			<input className="formInput" id="url_rtvf" ref="url_rtvf" type="text" placeholder="url"/>
			<input className="formInput" id="title_rtvf" ref="title_rtvf" type="text" placeholder="titulo"/>
			<input className="formInput" id="tags_rtvf" ref="tags_rtvf" type="text" placeholder="tags"/>
			
			<radiogroup>
				<label> stereo true</label>

                <input type="radio" value={"true"} onChange={this.handleClickStereoOption} />
                <label> stereo false</label>
                <input type="radio" value={"false"} onChange={this.handleClickStereoOption} />
               
            </radiogroup>

            <radiogroup>
				<label> la ruta de vr view se esta registrando desde el state en: localhost:3000/vrview/index.html</label>

                <input type="radio" checked="checked" value={"localhost:3000/vrview/index.html"} onChange={this.handleClickRouteVrviewOption} />
               
            </radiogroup>

			<input type="submit" value="Registrar" id="btnRegisterVideo"/>

		</form>

	}
}
