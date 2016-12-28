/*
*	module dependencies
*/
import React from 'react';
import ActivityThumbnail from './activityThumbnail'

import uid from 'uid'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class exploreSection extends React.Component{

	constructor (props){
		super(props);
		this.state={
			showFilters : false,
			filterSelected: "",
			btnFilterState : false

		}

		
	
	}


	showingSearchBox(){
		console.log("click")



		this.props.showSearchbox();
		
	}

	

	sortingServices(direction){
		console.log("ejecuta sortingServices")
		this.props.sortServices(direction);
	}

	showingFilters(filterOption){
		
		/*
		if(this.state.showFilters == false){
			this.setState({
				showFilters : true,
				filterSelected:filterOption
			})
		}else{
			this.setState({showFilters : false})
		}
*/
		if(this.state.showFilters == true && this.state.filterSelected ==filterOption){

			this.setState({showFilters : false})
		
		}else{
			
			this.setState({
				showFilters : true,
				filterSelected:filterOption
			})
		}

		
	}


	componentDidMount(){
		this.props.loadAllServices();
/*

		$("#btnSearch").click(function(){

			$(this).animate({
				width:"200px"
			}, function(){
				$(this).find("input").animate({
					opacity: 1
				});
			});
		});

	
*/
		

			
	}



	searchingText(event){
		


		if(event.charCode == 13){
			

			this.props.searchText(event.target.value)
		}
	}

	switchingCategory(category){

		// tengo que ver como recuperar el valor del dataset porq esta linea esta generando el error
		if(this.props.categorySelected.toString() != ""){
			// hay seleccion
			if(this.props.destinationSelected.toString() != ""){
				// hay destino
				
				let inf = this.props.categorySwitch(category, 0)
				console.log(this.props.destinationSelected)
				this.props.filterDestination(this.props.destinationSelected, 2, inf);
				
				console.log("category sobre universo")

				
				console.log("dest sobre service")
				
			}else{
				this.props.categorySwitch(category, 0);
				console.log("category sobre universo")
			}
			
			
		}else{
			// no hay seleccion
			this.props.categorySwitch(category, 1);
			console.log("category sobre service")
		}
		
	}

	filteringDestination(destination){
		console.log(destination)
		let dest = destination
		//this.props.filterDestination(dest);

		if(this.props.destinationSelected.toString() != ""){
			// hay seleccion
			if(this.props.categorySelected.toString() != ""){
				// hay destino
				let inf = this.props.categorySwitch(this.props.categorySelected, 0);
				this.props.filterDestination(dest, 2, inf);
			}else{
				this.props.filterDestination(dest, 0);
			}
			
			
		}else{
			// no hay seleccion
			this.props.filterDestination(dest, 1);
		}
	}



	render(){

		let searchBox 

		if(this.props.searchboxState == true){
			searchBox = "movil-element-hidden btnSearchActive"
		}else{
			searchBox = "movil-element-hidden"
		}

		let destinations_list =[];

		let btnFilterState
		

		
		this.props.destinations.map((destination, index)=>{

			if(this.props.destinationSelected != "" && this.props.destinationSelected == index+1){
				btnFilterState = "btn-filter btnFilterActive";
			}else{
				btnFilterState = "btn-filter";
			}
		
			let key_id = uid()
			destinations_list.push(<li key={key_id} className={btnFilterState}>
										<a href="#" onClick={this.filteringDestination.bind(this, index+1)}>
											<p>{destination}</p>
											
										</a>
									</li>
			);

		});

		let categories_list =[];

		let btnCategoryState

		this.props.categories.map((category, index)=>{

		

			if(this.props.categorySelected !="" && this.props.categorySelected == index+1){

				btnCategoryState = "btnCategorySelected";
			}else{
				btnCategoryState =""
			}
			let key_id = uid()
			let src_str = "style/img/ico-categorias-"+ category.toLowerCase() + ".png"
			categories_list.push(<li key={key_id} className={btnCategoryState}>
									<a href="#" onClick={this.switchingCategory.bind(this, index+1)}>
										<div>
											<img src={src_str}/>	
										</div>
										
										<p className="text-medium-normal-grey-o">{category}</p>
										<span className="icon-chevron-thin-right text-small-normal-grey-o"></span>
									</a>
								</li>
			);
		});
		


		let filters;
		if(this.state.showFilters == true){

			switch(this.state.filterSelected){
				case 1: filters =  <div className="wrapper-filter-b">
							<ul>
								{ destinations_list }
							</ul>
						</div>
					break;
				case 4 : filters = <div className="wrapper-filter-b">
							<ul>
								<li className="btn-filter">
									<a href="#" onClick={this.sortingServices.bind(this, 1)}>
										<p>Menor precio</p>
										
									</a>
								</li>
								<li className="btn-filter">
									<a href="#" onClick={this.sortingServices.bind(this, 2)}>
										<p>Mayor precio</p>
										
									</a>
								</li>
								<li className="btn-filter">
									<a href="#">
										<p>Más vendidos</p>
										
									</a>
								</li>
								<li className="btn-filter">
									<a href="#" onClick={this.sortingServices.bind(this, 3)}>
										<p>Más populares</p>
										
									</a>
								</li>
							</ul>
						</div>
					break;
			}
			
		}



		return <div className="section-explore">
					<div className="wrapper-filter-a">
						<ul>
							<li >
								<a href="#" onClick={this.showingFilters.bind(this, 1)}>
									<span className="icon-map-marker text-small-normal-grey-o" ></span>
									<p className="text-small-normal-grey-o">Destino</p>
								</a>
							</li>
							<li className="element-hidden">
								<a href="">
									<span className="icon-eye text-small-normal-grey-o"></span>
									<p className="text-small-normal-grey-o">Categorias</p>
								</a>
							</li>
							
							<li id="btnSearch" className={searchBox}>
								<a href="#" onClick={this.showingSearchBox.bind(this)}> 
									<span className="icon-search text-small-normal-grey-o"></span>
									<input id="txtSearchBox" className="txtSearchBox" placeholder="buscar" type="text" onKeyPress={this.searchingText.bind(this)}/>
									<p id="textBtnSearch" className="text-small-normal-grey-o">Buscar</p>

								</a>
							</li>
							
							

							<li>
								<a href="#" onClick={this.showingFilters.bind(this, 4)}>
									<span className="icon-equalizer text-small-normal-grey-o"></span>
									<p className="text-small-normal-grey-o">Filtros</p>

								</a>
							</li>
						</ul>
					</div>
					<ReactCSSTransitionGroup
						transitionName="filters"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}>
						{filters}
					</ReactCSSTransitionGroup>
					
					<div className="substage-explore">
						<div className="wrapper-categories-btn">
							
							<ul>
								{categories_list}
							</ul>
						</div>
						<div className="wrapper-thumbnails">
							{
								


								this.props.services.map((service)=>{
									
									return <ActivityThumbnail
											key = {service._id}
											service = {service}
											togglePopupAddToPlan = {this.props.togglePopupAddToPlan}
											fadeIn = {this.props.fadeIn}
											addToWishlist= {this.props.addToWishlist}
											userWishlist = {this.props.userWishlist}
											removeFromWishlist = {this.props.removeFromWishlist}/>
								})
							}
						</div>
					</div>
				</div>

	}
}
/*
return <ActivityThumbnail
			enterpriseSwitch ={this.props.enterpriseSwitch}
			key = {enterprise._id}
			enterpriseInfo = {enterprise} />
*/

/*
<li>
									<a href="#">
										<div>
											<img src="style/img/ico-categorias-destacado.png"/>	
										</div>
										
										<p className="text-medium-normal-grey-o">Destacado</p>
										<span className="icon-chevron-thin-right text-small-normal-grey-o"></span>
									</a>
								</li>
								<li>
									<a href="#" data-category={1} onClick={this.switchingCategory.bind(this, 0)}>
										<div>
											<img src="style/img/ico-categorias-aventura.png"/>	
										</div>
										
										<p className="text-medium-normal-grey-o">Aventura</p>
										<span className="icon-chevron-thin-right text-small-normal-grey-o"></span>
									</a>
								</li>
								<li>
									<a href="#" data-category={2} onClick={this.switchingCategory.bind(this, 1)}>
										<div>
											<img src="style/img/ico-categorias-gastronomia.png"/>	
										</div>
										
										<p className="text-medium-normal-grey-o">Comida</p>
										<span className="icon-chevron-thin-right text-small-normal-grey-o"></span>
									</a>
								</li>
								<li>
									<a href="#" data-category={3} onClick={this.switchingCategory.bind(this, 2)}>
										<div>
											<img src="style/img/ico-categorias-cultura.png"/>
										</div>
										
										<p className="text-medium-normal-grey-o">Cultura</p>
										<span className="icon-chevron-thin-right text-small-normal-grey-o"></span>
									</a>
								</li>
								<li>
									<a href="#" data-category={4} onClick={this.switchingCategory.bind(this, 3)}>
										<div>
											<img src="style/img/ico-categorias-arte.png"/>	
										</div>
										
										<p className="text-medium-normal-grey-o">Arte</p>
										<span className="icon-chevron-thin-right text-small-normal-grey-o"></span>
									</a>
								</li>
								<li>
									<a href="#" data-category={5} onClick={this.switchingCategory.bind(this, 4)}>
										<div>
											<img src="style/img/ico-categorias-eventos.png"/>
										</div>
										
										<p className="text-medium-normal-grey-o">Eventos</p>
										<span className="icon-chevron-thin-right text-small-normal-grey-o"></span>
									</a>
								</li>
								<li>
									<a href="#" data-category={6} onClick={this.switchingCategory.bind(this, 5)}>
										<div>
											<img src="style/img/ico-categorias-fiesta.png"/>
										</div>
										
										<p className="text-medium-normal-grey-o">Fiesta</p>
										<span className="icon-chevron-thin-right text-small-normal-grey-o"></span>
									</a>
								</li>
								<li>
									<a href="#" data-category={7} onClick={this.switchingCategory.bind(this, 6)}>
										<div>
											<img src="style/img/ico-categorias-naturaleza.png"/>	
										</div>
										
										<p className="text-medium-normal-grey-o">Naturaleza</p>
										<span className="icon-chevron-thin-right text-small-normal-grey-o"></span>
									</a>
								</li>
								<li>
									<a href="#" data-category={8} onClick={this.switchingCategory.bind(this, 7)}>
										<div>
											<img src="style/img/ico-categorias-deporte.png"/>
										</div>
										
										<p className="text-medium-normal-grey-o">Deporte</p>
										<span className="icon-chevron-thin-right text-small-normal-grey-o"></span>
									</a>
								</li>
								<li>
									<a href="#" data-category={9} onClick={this.switchingCategory.bind(this, 8)}>
										<div>
											<img src="style/img/ico-categorias-hospedaje.png"/>	
										</div>
										<p className="text-medium-normal-grey-o">Hospedaje</p>
										<span className="icon-chevron-thin-right text-small-normal-grey-o"></span>
									</a>
								</li>
								<li>
									<a href="#" data-category={10} onClick={this.switchingCategory.bind(this, 9)}>
										<div>
											<img src="style/img/ico-categorias-compras.png"/>	
										</div>
										<p className="text-medium-normal-grey-o">Compras</p>
										<span className="icon-chevron-thin-right text-small-normal-grey-o"></span>
									</a>
								</li>
*/