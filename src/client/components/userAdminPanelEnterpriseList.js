/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';
import UserAdminPanelEnterpriseRow from './userAdminPanelEnterpriseRow';

export default class UserAdminPanelEnterpriseList extends React.Component{


/*
*
+
+
+	 EN LAS PROPS SE DEBERIA ENVIAR EL ID Y EL NOMBRE DE LA EMPRESA PERO SOLO SE ESTA
ALMACENANDO EN EL STATE EL ID DENTRO DEL ARRARY USER.ENTERPRISE
ENTONCES DESDE EL SERVIDOR DEBERIA ENVIARSE EN EL ENDPOINT USERSESSIO, LAS EMPRESAS
EN POPULATE
+
+
+


*/

	render(){

		return <div className="admEnterpriseList">
				<span className="triangle"></span>
				<ul>
					{
						

						this.props.user.enterprise.map((enterprise)=>{
							
							return <UserAdminPanelEnterpriseRow
								enterpriseSwitch ={this.props.enterpriseSwitch}
								key = {enterprise._id}
								enterprise_id = {enterprise._id} 
								companyName = {enterprise.companyName}/>
						})
						
					}
					<li><a href="/logout"> cerrar sesión </a></li>
				</ul>
			</div>

	}
}