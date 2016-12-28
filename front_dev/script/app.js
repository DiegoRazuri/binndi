
window.onload = function(){

    console.log("cargo")

	$('.scrolleable').on('click',function (e){

        e.preventDefault();
        var strAncla = $(this).attr('href');
        var presize = $(strAncla).offset().top
        var size = presize;

        $('body, html').stop(true, true).animate({
            scrollTop: size
        }, 1000);
    });

    var t=setInterval(function(){avanzar2();},3500);

}


var btnPopupLogin = document.querySelector('#btn-popup-login');
var popupShadow = document.querySelector('#popup-shadow');
var popupLogin = document.querySelector('.popup-login')
var btnClosePopup = document.querySelector('.btn-close-popup')

btnPopupLogin.addEventListener('click', function (e){
	e.preventDefault();
	console.log("mostrar")

	fadeIn(popupLogin, 1, true, 150)
	fadeIn(popupShadow, 1)


});
/*

btnClosePopup.addEventListener('click', function(e){
	e.preventDefault()
	console.log("ejecutando");
	fadeOut(popupLogin)
	fadeOut(popupShadow)
})
*/

var btnMovilMenu = document.querySelector('#btn-movil-menu');
var movilMenu = document.querySelector('#movil-menu');
var btnClosePopupMovilMenu = document.querySelector('#btn-close-movil-menu')


btnMovilMenu.addEventListener('click', function(e){
	e.preventDefault()
	console.log("ejecutando ani")

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
    console.log(window.pageYOffset);
    console.log("hey");
	
})

btnClosePopupMovilMenu.addEventListener('click', function(e){
	e.preventDefault()
	console.log("ejecutando");
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
    var container = document.querySelector("container");
    //container.style.overflow = "hidden";
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

// ANIMACIÓN DEL SCROLL
function scroller (){
    
}
/*

$(document).ready(function(){

    var bannersHeight =  document.getElementById("banner-sequence-1").offsetHeight;


    var el = document.getElementById("extraBanners")

    PointNormalScroll = el.offsetTop - screen.height;

    var lastScrollTop = 0;

    var contScrollDistance = bannersHeight;
    
    $(window).scroll(function(event){

        var initPosition = $(document).scrollTop()


        if( initPosition < PointNormalScroll ){
            

            var st = $(this).scrollTop();
            
            if (st > lastScrollTop){
                console.log("abajo")
                $("html, body").animate({ scrollTop: contScrollDistance }, 2000, function(){
                    contScrollDistance = contScrollDistance + bannersHeight;
                    console.log(contScrollDistance)
                });
            } else {
                // upscroll code
                console.log("arriba")

                //$("html, body").animate({ scrollTop: -bannersHeight }, 2000);
            }
            
        
        }else{
            console.log("ya no scrollea auto")
        }
        lastScrollTop = st;
    });

/*

    var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
       // downscroll code
   } else {
      // upscroll code
   }
   lastScrollTop = st;
});
    

    

});
*/



function stopinterval(tPromo){
    clearInterval(tPromo);
}



function avanzar2()
{
    var size = $('#wrapper-slider').find('.slide').size();
        $('#wrapper-slider').find('.slide').each(
            function(index,value){
                if($(value).hasClass('slide_visible'))
                {
                    var id_visible = $(value).attr("id");
                    id_slide = id_visible.substr(-1);

                    console.log(id_slide);
                    $(".pagination").each( function (){
                        $(this).removeClass("activeBanner");

                    });

                    $("#slide" + id_slide + "pag").addClass("activeBanner");
                
                    $(value).hide("slide", { direction: "down" }, 1000);
                    setTimeout(function(){ $(value).removeClass('slide_visible'); }, 2000);
                    //$(value).removeClass('slide_visible');
                    
                    if(index+1<size)
                    {
                        $($('#wrapper-slider').find('.slide').get(index+1)).show("slide", { direction: "up" }, 1000);
                        setTimeout(function(){ $($('#wrapper-slider').find('.slide').get(index+1)).addClass('slide_visible'); }, 2000);
                        
                    }
                    else
                    {
                        $($('#wrapper-slider').find('.slide').get(0)).show("slide", { direction: "up" }, 1000);
                        $($('#wrapper-slider').find('.slide').get(0)).addClass('slide_visible');    
                        return false;
                    }
                }
        });
}
    