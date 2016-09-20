
window.onload = function(){

	//cargarEventos();

}


var btnPopupLogin = document.querySelector('#btn-popup-login');
var popupShadow = document.querySelector('#popup-shadow');
var popupLogin = document.querySelector('.popup-login')
var btnClosePopup = document.querySelector('.btn-close-popup')

btnPopupLogin.addEventListener('click', function (e){
	e.preventDefault();
	console.log("mostrar")

	fadeIn(popupLogin, 1, true, 150)
	fadeIn(popupShadow, 0.6)


});


btnClosePopup.addEventListener('click', function(e){
	e.preventDefault()
	console.log("ejecutando");
	fadeOut(popupLogin)
	fadeOut(popupShadow)
})

var btnMovilMenu = document.querySelector('#btn-movil-menu');
var movilMenu = document.querySelector('#movil-menu');
var backgroundMovilMenu = document.querySelector('#background-movil-menu');
var btnClosePopupMovilMenu = document.querySelector('#btn-close-movil-menu')


btnMovilMenu.addEventListener('click', function(e){
	e.preventDefault()
	console.log("ejecutando")

	fadeIn(movilMenu,1, true, 0)
    fadeIn(backgroundMovilMenu,1)
	
})

btnClosePopupMovilMenu.addEventListener('click', function(e){
	e.preventDefault()
	console.log("ejecutando");
	fadeOut(movilMenu)
    fadeOut(backgroundMovilMenu)
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
}

function fadeIn(element, finalOpacity, center, pixels) {
    if(center == true){

        console.log(window.innerWidth)

        if(window.innerWidth <= 770 ){
            aditionalPixels = -10;
        }else{
            aditionalPixels = pixels;
        }

        height = window.pageYOffset + aditionalPixels  + "px"
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
}

function slideDown(element){
	var hg = document.getElementById('header').offsetHeight;
	var finalHeight = screen.height;
	
	console.log(hg)

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

/*
**************//////	AUTOMATIC scroll 	////////***************/

var position = 0;
var bloques, otros;
var cantidad, sectorActual, iniciaAnimacion = false;

function cargarEventos(){
    bloques = document.getElementsByClassName("sectors");
    otros = document.getElementsByClassName("otros");
    cantidad = bloques.length;
    document.addEventListener("wheel",docScrollY,false);
    for(var i=0; i<cantidad;i++){
        bloques[i].addEventListener("wheel",direccion, true);
    }
}
function docScrollY(e) {
    var winY = scrollY;
    var ultimo = bloques[cantidad-1];
    var limite = ultimo.offsetTop+ultimo.clientHeight;
    if(e.deltaY>0){
        if(winY<limite){
            e.preventDefault();
        }
    }else {
        if(winY<limite-150){
            e.preventDefault();
            if(scrollY>bloques[cantidad-1].offsetTop){
                destino = bloques[cantidad-1].offsetTop;
                iniAnim(destino);
            }
        }
    }
}
function direccion(e) {
    var destino;
    if(iniciaAnimacion){return}
    if(e.deltaY>0){
        if(this.nextSibling){
            console.log("this.nextSibling : "+this.nextSibling );
            destino = this.nextSibling.offsetTop;
            iniAnim(destino);
        }
    }else {
        if(this.previousSibling){
            destino = this.previousSibling.offsetTop;
            //console.log("this.previousSibling : "+ this.previousSibling + "  destino:"+destino+
            //"   actual: "+scrollY );
            iniAnim(destino);
        }
    }
}
var idST,destY,origY;
function iniAnim(destino) {
    destY = destino;
    origY = scrollY;
    if(idST){clearInterval(idST);}
    iniciaAnimacion = true;
    if(origY==destino){
        iniciaAnimacion = false;
        clearInterval(idST);
    }else {
        idST = setInterval(slowMove, 25,origY, destY);
    }
}
function slowMove(o,d) {
    var nvaPos, ny=scrollY;
    if(origY<destY){
        if((destY-ny)<5){
            scrollTo(0,destY);
            clearInterval(idST);
            iniciaAnimacion = false;
        }else {
            nvaPos = ny+((destY-ny)/4);
            scrollTo(0,nvaPos);
        }
    }else if(origY>destY){
        if((ny-destY)<5){
            scrollTo(0,destY);
            clearInterval(idST);
            iniciaAnimacion = false;
        }else {
            nvaPos = ny-((ny-destY)/4);
            scrollTo(0,nvaPos);
        }
    }else {
        clearInterval(idST);
        iniciaAnimacion = false;
    }
}