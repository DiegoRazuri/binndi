


/*
* Modul dependencies
*/

import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import LandingStage from './components/landingStage'
import Explore from './components/exploreSection'
import Userprofile from './components/userprofile'
import ExploreScene from './components/exploreScene'
import BinndiPoints from './components/binndiPoints'
import EnterpriseRegisterInfo from './components/enterpriseRegisterInfo'
import VideoScene from './components/videoScene'



import App from './components/app'

import TeamAdmin from './components/teamAdmin'


//
function handleUpdate() {
  let {
    action
  } = this.state.location;

  if (action === 'PUSH') {
    window.scrollTo(0, 0);
  }
}
/*
//example:  solo se mantiene el scroll position si el usuario regresa con el back del browser
<Route path="/" component = {LandingStage} onChange={(prevState, nextState) => {
      if (nextState.location.action !== "POP") {
        window.scrollTo(0, 0);
      }
    }}/>

*/

// LA RUTA QUE DICE EXPLORE DEBE CAMBIAR A EXPLORESCENE Y PASAR EL PARAMETRO CON EL ID DE LA ACTIVIDAD
const routes = (<Router history={browserHistory} onUpdate={handleUpdate}>

                   
                <Route path="/" component = {App} >
                    <IndexRoute component={LandingStage}/>
                    <Route path="userprofile" component = {Userprofile} />
                    <Route path="explore-scene/:service_id" component = {ExploreScene} />
                    <Route path="binndis" component = {BinndiPoints} />
                    <Route path="enterprise-registration" component = {EnterpriseRegisterInfo} />
                    <Route path="video-scene" component = {VideoScene} />
                    <Route path="binndi-team" component = {TeamAdmin} />

                </Route>

             
            </Router>);

ReactDom.render(routes, document.getElementById('appContainer'));









window.onload = function(){

 


}







var btnMovilMenu = document.querySelector('#btn-movil-menu');
var movilMenu = document.querySelector('#movil-menu');
var btnClosePopupMovilMenu = document.querySelector('#btn-close-movil-menu')


btnMovilMenu.addEventListener('click', function(e){
    e.preventDefault()

    fadeIn(movilMenu,1, true, 0)
    //fadeIn(backgroundMovilMenu,1)
    var screenHeight = screen.height + "px"
    //$(".btn-entered-hidden").css("display", "none");
    $(".btn-header-hidden").animate({
        opacity : 0
    }, "fast");
    
    $(".header").animate({
        height: screenHeight
    }, "slow");
    $("#navigation").animate({
        backgroundColor: '#0097d3'
    }, "slow");
    $("#movil-menu").animate({
        position: "fixed",
        top: -10
    }, "slow");
    
})

btnClosePopupMovilMenu.addEventListener('click', function(e){
    e.preventDefault()

    fadeOut(movilMenu)
    $(".header").animate({
        height: "50px"
    }, "slow");
    $(".btn-header-hidden").animate({
        opacity : 1
    }, "fast");
    $("#navigation").animate({
        backgroundColor: 'transparent'
    }, "slow");

    //fadeOut(backgroundMovilMenu)
})


function fadeOut(element) {
    var op = 1;  // opacidad inicial
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 8);
    var doc = document.querySelector('body');

    doc.style.height = "auto";
}

function fadeIn(element, finalOpacity, center, pixels) {
    if(center == true){

    

        if(window.innerWidth <= 770 ){
            var aditionalPixels = -10;
        }else{
            var aditionalPixels = pixels;
        }

        var height = window.pageYOffset + aditionalPixels  + "px"
        element.style.top = height
    }
    var op = 0.1;  // opacidad inicial
    element.style.display = 'block';
    
 //   element.style.marginTop = "400px"
    var timer = setInterval(function () {
        if (op >= finalOpacity){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
        element.style.display = 'block'
    }, 8);
    var container = document.querySelector("container");
    //container.style.overflow = "hidden";
}

function slideDown(element){
    var hg = document.getElementById('header').offsetHeight;
    var finalHeight = screen.height;
  

    var timer = setInterval(function(){
        if(hg >= finalHeight){
            clearInterval(timer)
        }
        
        element.style.height = hg + "px";
        hg += hg * 2;
        

    }, 1);
}

function slideUp(element, finalHeight){
    var hg = document.getElementById('header').offsetHeight;
    var fh = finalHeight; //60px

    var timer = setInterval(function(){
        if(hg <= finalHeight){
            clearInterval(timer)
        }
        element.style.height = hg +50 + "px";
        hg -= hg;
        
    }, 1);
}

// ANIMACIÓN DEL SCROLL


