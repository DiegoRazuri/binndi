/*
*	module dependencies
*/
import React from 'react';

import { Link } from 'react-router'

export default class LandingSection extends React.Component{

	showingShowPopupLogin(){
		this.props.showPopupLogin();
	}


	componentDidMount(){

		stopinterval(t)

		var t, window_y, scroll_critical;
		var change= true;

		$(window).scroll(function(){
			window_y = $(window).scrollTop(); // VALOR QUE SE HA MOVIDO DEL SCROLL
			scroll_critical = parseInt($("#banner-first-fold").height()); // VALOR DE TU DIV
			console.log("scrolling")
			
			if (window_y > scroll_critical && change == true) { // SI EL SCROLL HA SUPERADO EL ALTO DE TU DIV
			   // ACA MUESTRAS EL OTRO DIV Y EL OCULTAS EL DIV QUE QUIERES
			   t=setInterval(function(){avanzar2();},8500);
			   console.log("active banner")
			   change = false;

			} else {
			   // ACA HACES TODO LO CONTRARIO
			}
		});

		$(".pagination").on("click", function(){
			stopinterval(t)

			let slide_selected = $(this).attr("id");
			console.log("slideselected")
			console.log(slide_selected)
			let bannerID = slide_selected.substr(-4,1);
			console.log("bannerid")
			console.log(bannerID)

			// desactivo los botones de paginacion
			$(".pagination").each( function (){
                $(this).removeClass("activeBanner");

            });
			//activo el boton de paginacion seleccionado
            $("#" + slide_selected).addClass("activeBanner");

			$('#wrapper-slider').find('.slide').each(

				function(index, value){
					if($(value).hasClass('slide_visible')){
						//let id_visible = $(value).attr("id");
						
	                    //desaparezco el slide que era visible
	                    $(value).hide("slide", { direction: "down" }, 4000);
	                    setTimeout(function(){ $(value).removeClass('slide_visible'); }, 4000);
	                    //aparezco el slide seleccionado
	                    
					}
				}
			);
			let idNum;

            console.log(bannerID)

            if(bannerID == 1){
            	idNum = 2;
            	console.log("se ejecuta el switch")
            	console.log(idNum)
            }else if(bannerID == 2){
            	idNum = 3;
            	console.log("se ejecuta el switch")
            	console.log(idNum)
            }else{
            	idNum = 1;
            	console.log("se ejecuta el switch")
            	console.log(idNum)
            }


            console.log(idNum);

            $($('#banner-sequence-' + idNum)).show("slide", { direction: "up" }, 4000);
            $($('#banner-sequence-' + idNum)).addClass('slide_visible');

		});

		

		function stopinterval(tBanner){
		    clearInterval(tBanner);
		}



		function avanzar2(){
		    var size = $('#wrapper-slider').find('.slide').size();
		    
	        $('#wrapper-slider').find('.slide').each(
	            function(index,value){

	                if($(value).hasClass('slide_visible'))
	                {
	                	
	                    let id_visible = $(value).attr("id");
	                    
	         

	                    let id_slide = id_visible.substr(-1);

	                    

	                    $(".pagination").each( function (){
	                        $(this).removeClass("activeBanner");

	                    });

	                    $("#slide" + id_slide + "pag").addClass("activeBanner");
	                
	                    $(value).hide("slide", { direction: "down" }, 4000);
	                    setTimeout(function(){ $(value).removeClass('slide_visible'); }, 4000);
	                    //$(value).removeClass('slide_visible');
	                    
	                    if(index+1<size)
	                    {
	                        $($('#wrapper-slider').find('.slide').get(index+1)).show("slide", { direction: "up" }, 4000);
	                        setTimeout(function(){ $($('#wrapper-slider').find('.slide').get(index+1)).addClass('slide_visible'); }, 4000);
	                        
	                    }
	                    else
	                    {
	                        $($('#wrapper-slider').find('.slide').get(0)).show("slide", { direction: "up" }, 4000);
	                        $($('#wrapper-slider').find('.slide').get(0)).addClass('slide_visible');    
	                        return false;
	                    }
	                }
	        });
		}

		
	}
	
	render(){

		return <div className="section-landing banner-background">
					<div id="banner-first-fold" className="banner1">
						<div className="wrapper-text-banners wrapper-text-banners-first">
							<h1 className="headline-black">Planifica con tus amigos todo tu viaje desde un solo lugar</h1>
							<h2 className="subtitle-selling-line subtitle-black">Reinventamos la forma de explorar el mundo.</h2>
							<div className="wrapper-btn-cta">
								<a className="btn-big-curve btn-register scrolleable" href="#" onClick={this.showingShowPopupLogin.bind(this)}>
									<p>Registrarme</p>
								</a>	
							</div>
										
						</div>
					</div>
					
					<div id="wrapper-slider" className="wrapper-slider">
						
						<div id="banner-sequence-1" className="banner-sequence slide slide_visible">
							<div className="wrapper-banner-content">
								<div className="element-banner-1 wrapper-text-features-banners">
									<h1 className="text-banner-white">Encuentra vuelos, hospedajes y actividades</h1>
									<h2 className="subtitle text-banner-white">Invita a tus amigos al plan y decidan juntos que experiencias formaran parte de la aventura.</h2>
									
								</div>
								<figure className="element-banner-1 img-banner-features-1 banner-image">
									<img src="https://s3-sa-east-1.amazonaws.com/binndi/landing/Binndi_planification2.png"/>
								</figure>
							</div>
							
						</div>
						<div id="banner-sequence-2" className="banner-sequence slide ">
							<div className="wrapper-banner-content">
								<div className="element-banner-2 wrapper-text-features-banners">
									<h1 className="text-banner-white">No sufras más<br/> coordinando pagos</h1>
									<h2 className="subtitle text-banner-white">Divide el pago entre tus compañeros de viaje y todos sabran cuando se hayan realizado las reservas.</h2>
									
								</div>
								<figure className="element-banner-2 img-banner-features-2 banner-image ">
									<img src="https://s3-sa-east-1.amazonaws.com/binndi/landing/Binndi_sharedpayment.png"/>
								</figure>
							</div>
							
						</div>
						<div id="banner-sequence-3" className="banner-sequence slide ">
							<div className="wrapper-banner-content">
								<div className="element-banner-3 wrapper-text-features-banners">
									<h1  className="text-banner-white">Olvidate de los guías y ubicate en tu destino.</h1>
									<h2 className="subtitle text-banner-white">Un mapa que te acompañará durante el viaje para guiarte del aeropuerto a tu hospedaje y a cada actividad que hayas planificado.</h2>
									
								</div>
								<figure className="element-banner3 img-banner-features-3 banner-image">
									<img src="https://s3-sa-east-1.amazonaws.com/binndi/landing/Binndi_Locations.png"/>
								</figure>
							</div>
							
						</div>
						<ul className="nav-sub-banner">
						
							<li id="slide3pag" className="pagination activeBanner">
								<span className="icon-users ico-subnav-banners"></span>
							</li>
							<li>
								<span className="icon-arrow-down-thick ico-arrow-subnav-banners"></span>
							</li>

							<li id="slide1pag" className="pagination">
								<span className="icon-cart ico-subnav-banners"></span>
							</li>
							<li>
								<span className="icon-arrow-down-thick ico-arrow-subnav-banners"></span>
							</li>
							<li id="slide2pag" className="pagination ">
								<span className="icon-map-marker ico-subnav-banners"></span>
							</li>
						</ul>
					</div>
					<div className="banner-binndi-tech banner-secundary">
						<div className="wrapper-text-banner-secundary-tech">
							<figure>
								<img src="https://s3-sa-east-1.amazonaws.com/binndi/landing/Binndi_VidIcons.png"/>
							</figure>
							<h3 className="headlines headline-black">Sumérgete en la experiencia antes de comprar</h3>
							<h4 className="subtitle headline-black">Aventuras y lugares increibles por descubrir en realidad virtual y videos 360º</h4>
							<div className="landing-wrapper-thumbnails">
								<div className="landing-thumbnail">
									<Link to={"/video-scene"}>
										<figure>
											<span className="landing-image-shadow"></span>
											<img src="https://s3-sa-east-1.amazonaws.com/binndi/landing/ciclismo-montana-1.png"/>
										</figure>
										<div className="wrapper-elements">
											<span className="circle-shadow"></span>
											<span className="icon-media-play ico"></span>
											<h2 className="text-big-normal-white-m">Ciclismo de Montaña</h2>
											<h3 className="text-big-normal-white-m">Lucumos</h3>
										</div>
									</Link>
								</div>
								<div className="landing-thumbnail">
									<Link to={"/video-scene"}>
										<figure>
											<span className="landing-image-shadow"></span>
											<img src="https://s3-sa-east-1.amazonaws.com/binndi/landing/ciclismo-montana-1.png"/>
										</figure>
										<div className="wrapper-elements">
											<span className="circle-shadow"></span>
											<span className="icon-media-play ico"></span>
											<h2 className="text-big-normal-white-m">Ciclismo de Montaña</h2>
											<h3 className="text-big-normal-white-m">Lucumos</h3>
										</div>
									</Link>
								</div>
								<div className="landing-thumbnail">
									<Link to={"/video-scene"}>
										<figure>
											<span className="landing-image-shadow"></span>
											<img src="https://s3-sa-east-1.amazonaws.com/binndi/landing/ciclismo-montana-1.png"/>
										</figure>
										<div className="wrapper-elements">
											<span className="circle-shadow"></span>
											<span className="icon-media-play ico"></span>
											<h2 className="text-big-normal-white-m">Ciclismo de Montaña</h2>
											<h3 className="text-big-normal-white-m">Lucumos</h3>
										</div>
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div id="extraBanners" className="otros">
						<div className="banner-binndi-points banner-secundary">
							<div className="wrapper-text-banner-secundary-binndi-points">
								<span className="ico-secundary-banners icon-trophy"></span>
								<h3 className="text-small-normal-grey-m headline-black">¿Quieres viajar gratis?</h3>
								<h3 className="text-small-normal-grey-m headline-black">Con binndi es posible</h3>
								<h4 className="text-big-normal-grey-o headline-black">Cumple los retos y gana cientos de binndis, los que podras utilizar para pagar tus proximas aventuras.</h4>	
								<Link to={"/binndis"} className="btn-big-curve">
									<p>Gana 100 binndis</p>
								</Link>
							</div>
							<figure>
								<img src="https://s3-sa-east-1.amazonaws.com/binndi/landing/Binndi_points.jpg"/>
							</figure>
						</div>
						<div className="banner-binndi-enterprise banner-secundary">
							<div className="wrapper-text-banner-secundary-enterprise">
								<span className="ico-secundary-banners icon-store"></span>
								<h3 className="text-small-normal-grey-m  headline-black">Más oportunidades para tu negocio</h3>
								
								<h4 className="text-big-normal-grey-o headline-black">Incrementa las ventas con una plataforma diseñada especialmente para vender las experiencias de cada ciudad.</h4>	
								<Link to={"/enterprise-registration"} className="btn-big-curve">
									<p>Soy un negocio</p>
								</Link>
							</div>
							<figure>
								<img src="https://s3-sa-east-1.amazonaws.com/binndi/landing/Binndi_business.jpg"/>
							</figure>
						</div>
						<div className="banner-binndi-app banner-secundary">
							<div className="wrapper-text-banner-secundary-app">
								
								<h3 className="text-small-normal-grey-m  headline-black">¡Muy pronto lanzaremos nuestra app!</h3>
								
								<h4 className="text-big-normal-grey-o headline-black">Dejanos tu correo y recibe la invitación para ser uno de los primeros en planificar tus viajes con amigos.</h4>	
								<a className="btn-big-curve" href="#" onClick={this.showingShowPopupLogin.bind(this)}>
									<p>Registrarme</p>
								</a>
								<figure className="img-appstore-logos">
									<img src="https://s3-sa-east-1.amazonaws.com/binndi/landing/Appstores-logos.png"/>
								</figure>
							</div>
							<div className="wrapper-img-banner-binndi-app">
								<figure className="img-cell">
									<img src="https://s3-sa-east-1.amazonaws.com/binndi/landing/Iphone-appstore.png"/>
								</figure>
							</div>
						</div>
					</div>
				</div>
	}
}