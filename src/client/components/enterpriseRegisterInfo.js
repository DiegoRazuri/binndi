/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';

export default class EnterpriseRegisterInfo extends React.Component{

	showingMessageEnterprises(){
		this.props.showPopupMessageEnterprises();
	}

	componentDidMount(){

		$('.scrolleable').on('click',function (e){

	        e.preventDefault();
	        var strAncla = $(this).attr('href');
	        var presize = $(strAncla).offset().top
	        var size = presize;

	        $('body, html').stop(true, true).animate({
	            scrollTop: size
	        }, 1000);
	    });
	
	}

	handleEnterpriseAplication(e){
		e.preventDefault();
		
		
		var companyName_eaf = ReactDom.findDOMNode(this.refs.companyName_eaf).value.trim()
		let legalId_eaf = ReactDom.findDOMNode(this.refs.legalId_eaf).value.trim()
		let phone_eaf = ReactDom.findDOMNode(this.refs.phone_eaf).value.trim()
		let email_eaf = ReactDom.findDOMNode(this.refs.email_eaf).value.trim()
		let web_eaf = ReactDom.findDOMNode(this.refs.web_eaf).value.trim()
		let address_eaf = ReactDom.findDOMNode(this.refs.address_eaf).value.trim()
		

		console.log("se tomo los datos correctamente")
		console.log(companyName_eaf)
	

		//var formdata = new FormData();
		

		//formdata.append('Content-Type', 'multipart/formdata');
		/*
		formdata.append( "companyName", companyName_eaf);
		formdata.append( "legalId", legalId_eaf);
		formdata.append( "phone", phone_eaf);
		formdata.append( "email", email_eaf);
		formdata.append( "web", web_eaf);
		formdata.append( "address", address_eaf);
*/
		let json = {
			companyName: companyName_eaf,
			legalId : legalId_eaf,
			phone : phone_eaf,
			email : email_eaf,
			web : web_eaf,
			address : address_eaf
		}

		// LLAMAR AL METODO QUE LLEGA POR PROPS CREATENEWENTERPRISE
		//this.props.enterpriseAplication.call(null, json)
		
		this.props.enterpriseAplication.call(null, json)

		
		

		ReactDom.findDOMNode(this.refs.companyName_eaf).value = '';
		ReactDom.findDOMNode(this.refs.legalId_eaf).value = '';
		ReactDom.findDOMNode(this.refs.phone_eaf).value = '';
		ReactDom.findDOMNode(this.refs.email_eaf).value = '';
		ReactDom.findDOMNode(this.refs.web_eaf).value = '';
		ReactDom.findDOMNode(this.refs.address_eaf).value = '';



		return;
	}


	
	render(){
		

		return <div className="section-binndi-enterprise">
					<div className="grid-a">
						<div className="wrapper-text-tech-benefit">
							
							<h1 className="text-big-normal-grey-o">Servicio de producción de videos 360º gratuito.</h1>
							<h2 className="subtitle headline-black">Los empresas que reúnan los requisitos pueden acceder gratuitamente a una producciòn profesional de videos 360º para mostrar una experiencia mas inmersiva de sus servicios a sus clientes. Ten en cuenta que no siempre podemos garantizar el servicio,  realiza una solicitud para ver disponibilidad.</h2>
							<a className="btn-big-curve scrolleable" href="#section-improve-sales">
								<p>Enviar solicitud</p>
							</a>
						</div>
						<figure>
							<img src="style/img/VRheadsets.jpg"/>
						</figure>
					</div>
					<div  id="section-improve-sales" className="grid-b">
						<div className="subgrid-a">
							<div className="wrapper-text-form">
								<div className="wrapper-header-info">
									<span className="icon-store ico"></span>
									<h1 className="text-big-normal-grey-o">Incrementa tus ventas ofreciendo tus servicios en nuestra plataforma.</h1>
								</div>
								
								<h2 className="subtitle headline-black">Binndi està diseñada especialmente para vender las mejores experiencias de cada ciudad. Si ofreces hospedaje, tours, actividades, paquetes o tienes un restaurant, bar entre otros este es tu lugar.</h2>
								<a className="btn-big-curve scrolleable" href="#section-enterprise-benefits">
									<p>Beneficios</p>
								</a>
							</div>
						</div>
						
						<div className="subgrid-b">
							<form className="form-enterprise" ref = "enterpriseAplicationForm">
								<h4>Aplica con tu empresa y vende con nosotros</h4>
								<div className="input-box">
									<input type="text" name="" ref="companyName_eaf"  placeholder="Razón social"/>
									<span className="icon-suitcase ico"></span>	
								</div>
								<div className="input-box">
									<input type="text" name="" ref="legalId_eaf"  placeholder="RUC"/>
									<span className="icon-suitcase ico"></span>	
								</div>
								<div className="input-box">
									<input type="text" name="" ref="phone_eaf"  placeholder="Teléfonos"/>
									<span className="icon-phone ico"></span>	
								</div>
								<div className="input-box">
									<input type="text" name="" ref="email_eaf"  placeholder="Correo electronico"/>
									<span className="icon-envelope ico"></span>	
								</div>
								<div className="input-box">
									<input type="text" name="" ref="web_eaf"  placeholder="Página web"/>
									<span className="icon-social-dribbble ico"></span>	
								</div>
								<div className="input-box">
									<input type="text" name="" ref="address_eaf"  placeholder="Dirección"/>
									<span className="icon-map-marker ico"></span>	
								</div>
								<button className="btn-big-curve btn" onClick={this.handleEnterpriseAplication.bind(this)}>Enviar solicitud</button>
								
							</form>
						</div>
						<div className="subgrid-c">
							<figure>
								<img src="style/img/Bnnd-empresas-vectores.png"/>
							</figure>
						</div>
					</div>
					<div id="section-enterprise-benefits" className="grid-c">
						<div className="wrapper-text-benefits">
							
							<h1 className="text-big-normal-grey-o headline-black">¿Cúales son los beneficios?</h1>
							<div className="benefit">
								<h4 className="text-medium-normal-grey-o">Incrementa tus ventas</h4>
								<figure><img src="style/img/NegociosBenefit1.png"/></figure>
								<p className="text-halfmedium-normal-grey-o">Vende a viajeros de todo el mundo, en cualquier momento del día desde cualquier dispositivo.</p>
							</div>
							<div className="benefit">
								<h4 className="text-medium-normal-grey-o">Simples procesos de pago</h4>
								<figure><img src="style/img/NegociosBenefit2.png"/></figure>
								<p className="text-halfmedium-normal-grey-o">Los viajeros pueden reservar tus servicios y pagarlos al instante con diferentes métodos de pago.</p>
							</div>
							<div className="benefit">
								<h4 className="text-medium-normal-grey-o">Crea un perfil de forma gratuita</h4>
								<figure><img src="style/img/NegociosBenefit3.png"/></figure>
								<p className="text-halfmedium-normal-grey-o"> Tu marca y servicios estarán publicados en nuestra plataforma, donde también serán promocionados.</p>
							</div>
							<div className="benefit">
								<h4 className="text-medium-normal-grey-o">Mejora tu reputación online</h4>
								<figure><img src="style/img/NegociosBenefit4.png"/></figure>
								<p className="text-halfmedium-normal-grey-o">Los clientes que viajan con tus servicios pueden calificarte y dejar un comentario sobre su experiencia.</p>
							</div>
							<div className="benefit">
								<h4 className="text-medium-normal-grey-o">Cuenta con un soporte comercial</h4>
								<figure><img src="style/img/NegociosBenefit5.png"/></figure>
								<p className="text-halfmedium-normal-grey-o">Estamos a tu disposición y a la de tus clientes para resolver cualquier duda.</p>
							</div>
						</div>
					</div>
				</div>

	}
}