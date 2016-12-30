/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom'

export default class UserInfo extends React.Component{
	

	

	
	render(){
		
		let fech;
		let yNum;
		let mNum ;
		let month;


		if(this.props.user != false){
			fech = this.props.user.createdAt;
			yNum = fech.slice(0, 4)
			mNum = fech.slice(5, 7)
			month = this.props.months[mNum-1];
		}


		return <div className="userprofile-wrapper-profileinfo">
					<h1 className="text-small-bold-grey-m">{this.props.user.name} {this.props.user.lastname}</h1>
					<h4 className="text-big-normal-grey-o ">Nivel de usuario</h4>
					<span className="icon-trophy text-small-normal-grey-m"></span>
					<a className="wrapper-ico" href={this.props.user.link} target="_blank">
						<span className="icon-facebook userprofile-fb-ico"></span>
					</a>
					
					<h5 className="text-medium-normal-grey-o">Puntos Binndis</h5>
					<div className="profileinfo-divisor"></div>
					<img src="https://s3-sa-east-1.amazonaws.com/binndi/landing/binndi-billetes.png"/>
					<h2 className="text-smaller-normal-grey-m">{this.props.user.binndis} Binndis</h2>
					<h5 className="text-medium-normal-grey-o">Retos cumplidos</h5>
					<div className="profileinfo-divisor"></div>
					<div className="userprofile-wrapper-challenge-ico">
						<img src=""/>
						<img src=""/>
						<img src=""/>
						<img src=""/>
					</div>
					<h6 className="text-medium-normal-grey-o">{this.props.user.description}</h6>
					<p>de {this.props.user.location}</p>
					<p>Miembro desde {month} {yNum}</p>
					<a href="/logout" className="text-medium-normal-grey-o btn-logout">Cerrar sesión</a>
				</div>


	}
}