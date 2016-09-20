/*
*	module dependencies
*/
import React from 'react';

export default class userAdminPanelEnterpriseRow extends React.Component{

//ACA SE ESTA PASANDO A LA FUNCION EXUTESWITCH EL ID UNICAMENTE PERO SE LE PODRIA ENVIAR
// LA INFO COMPLETA DE LA EMPRESA PARA QUE EL STATE TENGA LA FOTO Y ASI SE PUEDA RENDERIZAR
	excuteSwitch(){
		this.props.enterpriseSwitch.call(null, this.props.enterprise_id)
	}
		

	render(){
		return <li className="options listUnderline" 
			onClick={this.excuteSwitch.bind(this)} 
			data-enterpriseId={this.props.enterprise_id} >
				{this.props.companyName}
		</li>

	}
}