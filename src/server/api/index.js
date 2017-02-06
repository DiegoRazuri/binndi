
import bodyParser from 'body-parser'
import express from 'express'
import multer from 'multer'
import Enterpriseprofiles from 'src/server/models/enterpriseprofiles'
import Userprofiles from 'src/server/models/userprofiles'
import TstVideos from 'src/server/models/tstVideos'
import Services from 'src/server/models/services'
import Itineraries from 'src/server/models/itineraries'
import EnterpriseAplications from 'src/server/models/enterpriseAplications'



//configuracion para el router
const router = express.Router();
//configuracion para el bodyparser
const jsonParser = bodyParser.json()

//SE CAMBIO A TRUE PERO YA FUNCIONABA EN FALSE
const urlencodedParser = bodyParser.urlencoded({ extended: true })


//Variables setting

let categories_list = ["Aventura", "Comida", "Cultura", "Arte", "Eventos", "Fiesta", "Naturaleza", "Deporte", "Hospedaje", "Compras"];
let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
// ENDPOINTS //

router.get('/usersession', function ( req, res ){

	//console.log(req.session.passport.user)


	if(!req.user){
		res.json({user:false})
	}else{
		//console.log("usuario conectado")
		//console.log(req.user)
/*
		res.json(req.user)
		console.log(req.user)
*/
		Userprofiles
			.findOne({_id: req.user})
			.populate('wishlist')
			.exec((err, result)=>{
				if(err) {
				
					return handleError(err);
				
				}else{



					Services.aggregate([{$project: {city : 1}}, {$unwind:"$city"},{$group:{ _id: "$city"  }} ], (err, destinations)=>{
						if(err){
							return handleError(err);
						}else{

							
							let response = {
								user : result,
								destinations : destinations,
								months: months,
								categories_list: categories_list

							};
							
							res.json(response);
							
						}
					})
					
				}
			})


/*
		Userprofiles.populate(req.user, {"path": "wishlist"}, function (err, user){

			if(err){
				throw err;
			}else{
				
				console.log(user)
				res.json(user);
				
			}	

	
			
		});

/*
		Userprofiles.populate(req.user, {"path": "itineraries"}, function (err, user){

			if(err){
				throw err;
			}else{

				Userprofiles.populate(user, {"path": "enterprise"}, function(err, user_w_enterprise){
					if(err){
						throw err;

					}else{
						let options = {
							path: "itineraries.services",
							model: "Services"
						}
						Userprofiles.populate(user, options, function(err, result){
							if(err){
								throw err;
							}else{
								console.log(result)
								res.json(result);
							}
						});
					}

				});

				
			}	

	
			
		});
		*/

	}

});

// ENDPOINT CREAR NUEVA EMPRESA
// no se esta grabando en la base la url donde se ubica la imagen de la empresa

// esta funcion sirve para darle nombre y destino a las imagenes que llegan si no se determina el destino
//para guardarlo en memorio ejecutar este metodo el lugar de lo de abajo var storage = multer.memoryStorage()
let storage = multer.diskStorage({
	destination: function (req, file, cb) {
				    cb(null, 'public/enterpriseprofiles/')
				
				},
	filename: function(req, file, cb){
				cb(null, file.originalname)

 		 		}
	});
var upload = multer({ storage: storage})

router.post('/new_enterprise', jsonParser, multer({ storage: storage}).fields([{name:'profile_image', maxCount: 1}, {name: 'images', maxCount: 4}]), function (req, res){
	if(!req.body) return res.sendStatus(400)

		let e = req.body;
		console.log(e)
		console.log(req.files)

		////////*********////////
		//ESTA VARIABLE DEBE CAMBIAR CUANTO SE HAGA LA IMPLEMENTACIN DE S3 PARA Q LA INFO SE GUARDE CON LA RUTA CORRECTA
		////////*******////////

		let provitionalPathLocalhost = "enterpriseprofiles/"; 

		let enterprise = new Enterpriseprofiles();

		enterprise.account_manager = e.user_id
		enterprise.companyName = e.companyName
		enterprise.tradeName = e.tradeName
		//codigo hardcodeado se debe cambiar cuando se implemente s3
		enterprise.profile_image = provitionalPathLocalhost + req.files.profile_image[0].originalname
		enterprise.legalId = e.legalId
		enterprise.phone = e.phone
		enterprise.email = e.email
		enterprise.web = e.web
		enterprise.address = e.address
		enterprise.location_url = e.location_url
		enterprise.descriptor = e.descriptor

		
		let services = new Services();



		services.title = e.title;
		services.city = e.city;
		services.country = e.country;
		services.description = e.description;
		services.terms_cond = e.terms_cond;
		services.location_url = e.location_url;
		services.price = e.price;
		services.video_url = e.video_url;
		//services.images = "enterpriseprofiles/images.jpg"
		//services.tags.push(e.tags);
		//services.includes.push(e.includes);
		services.category = e.category

		for(let i=0; i< e.tags.length; i++){
			services.tags.push(e.tags[i]);
		}
		for(let i=0; i< e.includes.length; i++){
			services.includes.push(e.includes[i]);
		}

		for(let i = 0; i < req.files.images.length; i++){
			services.images.push( provitionalPathLocalhost + req.files.images[i].originalname )
		}
		
		enterprise.services.push(services._id);


		services.enterpriseprofile = enterprise._id;
		
/*
		let images = e.images;
		console.log(images)

		images.map((image, index)=>{
			enterprise.services.images.push(image[index].name);
		});
*/
		//console.log(enterprise)


		enterprise.save(function(err){
			if(err){
				res.sendStatus(500).json(err)
			}
			
			services.save(function(err){
				if(err){
					res.sendStatus(500).json(err)
				}
				res.json(enterprise);

			});


			

		});




});

// ENDPOINT APLICAR EMPRESA

router.post('/enterprise_aplication', jsonParser, function (req, res){
	if(!req.body) return res.sendStatus(400)

		let e = req.body;
		console.log(e)

		let aplication = new EnterpriseAplications();

		aplication.companyName = e.companyName;
		aplication.legalId = e.legalId;
		aplication.phone = e.phone;
		aplication.email = e.email;
		aplication.web = e.web;
		aplication.address = e.address;

		aplication.save(function(err){
			if(err){
				res.sendStatus(500).json(err)
			}

			let aplicationState = {
				aplicationState : 1
			}
			
			
			res.json(aplicationState);
	

		});



});


// ENDPOINT CREAR SERVICIO
//no se esta grabando la url de la imagen que se envia, pero si se esta guardando el archivo en el disco

router.post('/new_service', jsonParser, multer({ dest: 'public/enterpriseprofiles/services/'}).single('upl'), function (req, res){
	if(!req.body) return res.sendStatus(400)

		let e = req.body;
		console.log(e)

		Enterpriseprofiles.findOne({_id: e.enterprise_id}, function(err, enterprise){
			if(err){
					res.send("hubo un error buscando la empresa")
				}
				if(enterprise){

					let tags = e.tags

					enterprise.services.push({
						title: e.title,
						terms_cond: e.terms_cond,
						location_url: e.location_url,
						description: e.description,
						price : e.price,
						tags: [],
						tst_videos: e.tst_videos_id

					});

					tags.map((tag) =>{
						enterprise.tags.push(tag);
					});

					enterprise.save()
					console.log(enterprise)
					res.json(enterprise)
				}

		});
});

// ENDPOINT AGREGAR A WISHLIST
//no se esta grabando la url de la imagen que se envia, pero si se esta guardando el archivo en el disco

router.post('/add_to_wishlist', jsonParser, function (req, res){
	if(!req.body) return res.sendStatus(400)

		let e = req.body;
		console.log(e)

		Userprofiles.findOne({_id: req.user._id}, function(err, user){
			if(err){
					res.send("hubo un error encontrando al usuario")
				}
				if(user){

					

					user.wishlist.push(e.activity_id);

					

					user.save()

					Services.findOne({'_id':e.activity_id}, function(err, service){
						if(err){
							res.send("hubo un error encontrando el servicio")
						}
							if(service){
								
								service.favs.push(user._id);

								service.save(function(err){
									if(err){
										res.sendStatus(500).json(err)

									}


									res.json(service)
								});

							}
					});
					
				}

		});
});

// ENDPOINT REGISTRAR VIDEO

router.post('/register_video', jsonParser, function (req, res){
	if(!req.body) return res.sendStatus(400)

		let e = req.body;
		console.log(e)

		let video = new TstVideos();

		video.url = e.url
		video.title = e.title
		video.stereo = e.stereo
		video.route_vrView = e.route_vrView
		video.tags.push(e.tags);
		
		console.log(video)
		video.save(function(err){
			if(err){
				res.sendStatus(500).json(err)

			}


			res.json(video)


		})

});

// ENDPOINT REMOVE FROM WISHLIST

router.post('/remove_from_wishlist', jsonParser, function (req, res){
	if(!req.body) return res.sendStatus(400)


		Userprofiles.findOne({_id : req.user._id}, function(err, user){

			if(err){
				return handleError(err);

			}else{
				user.wishlist.map((service, index)=>{
					if(service._id == req.activity_id){
						user.wishlist.splice(index, 1);

					}
				})
				
				user.save()
				res.json(user)
				
				

			
			}
		});


});

// ENDOPOINT OBTENER TOTAL DE SERVICIOS

router.get('/all_services', function ( req, res ){
	
	Services
		.find({})
		.populate('enterpriseprofile')
		.exec(function (err, result) {

			if (err) return handleError(err);

			res.json(result)

		});
//	db.enterpriseprofiles.aggregate([{$project : {services:1}},{$unwind:"$services"}])
// CUANDO SE TENGA DIFERENTES SERVICIOS ASOCIOADOS A UN MISMO VIDEO SE DEBERA HACER UN $GROUP
// REVISAR EL QUERY DE ENTERPRISEPROFILES DE BENGALAJ

/*
	Enterpriseprofiles.aggregate([
		{$project : {services:1}},
		{$unwind:"$services"}

	]).exec(function(err, services){
		if(err){
			return res.sendStatus(500).json(err)
		}

		Enterpriseprofiles.populate( services, {"path": "services"}, function(err, services_processed){
			if(err){
				throw err;
			}else{
				let options = {
					path : 'services.tst_videos',
					model : 'Services'
				}

				Enterpriseprofiles.populate(services_processed, options, function(err, result){
					if(err){
						throw err;
					}else{
						console.log(result);
						res.json(result);
					}
				});
			}
			
		});

		
	});
*/

/*	
	populate(services, {"path": "services"}).
	exec(function(err, services_processed){
		if(err){
			throw err;
		}else{
			Enterpriseprofiles.populate(services_processed, {"path":"tst_videos"}, function(err, result){
				if(err){
					throw err;
				}else{
					console.log(result)
					res.json(result);
				}
			});
		}
	});

*/
/*
exec(function(err, services){
		if(err){
			return res.sendStatus(500).json(err)
		}

		Enterpriseprofiles.populate( services, {"path": "services"}, function(err, result){
			if(err) throw err;
			console.log(result);
			res.json(result);
		});

		
	});
*/

/*
		Userprofiles.populate(req.user, {"path": "contacts"}, function (err, user){
	
			res.json(user);
		});
*/
	

});

// ENDPOINT CREAR ITINERARIO

router.post('/create_itinerary', jsonParser, function (req, res){
	if(!req.body) return res.sendStatus(400)

		let e = req.body;
		console.log(e)

		let itinerary = new Itineraries();

		itinerary.administrator = e.administrator_id
		itinerary.title = e.title
		// aca debo recibir un array con los participants iterar y hacerles 
		// un push sin contar al administrator
		//itinerary.participants.push(e.administrator_id);
		
		console.log(itinerary)
		itinerary.save(function(err){
			if(err){
				res.sendStatus(500).json(err)

			}

			Userprofiles.findOne({_id: req.user._id}, function(err, user){
				if(err) throw err;
				user.itineraries.push(itinerary._id)

				user.save(function(err){
					if(err){
						res.sendStatus(500).json(err)

					}

					res.json(itinerary)

				});
			});


		})

});

router.post('/add_service_to_itinerary', jsonParser, function (req, res){
	if(!req.body) return res.sendStatus(400)

		let e = req.body;
		console.log(e)

		Itineraries.findOne({_id: e.itinerary_id}, function(err, itinerary){
			if(err) throw err;
			itinerary.services.push(e.service._id)

			itinerary.save(function(err){
				if(err){
					res.sendStatus(500).json(err)

				}

				res.send(e.service)

			});

			
		});

});
router.post('/pregunta', function(req, res){
	if(!req.body) return res.sendStatus(400)

		let e = req.body.pack;
		console.log(e)
		res.send(e)
});


router.get('/unique_services/:service_id', function ( req, res ){
	
		
	let e = req.params.service_id;


	Services
		.findOne({_id:e})
		.populate('enterpriseprofile')
		.exec(function (err, result) {

			if (err) return handleError(err);

			res.json(result)

		});


});

router.post('/send_user_email', jsonParser, function (req, res){
	if(!req.body) return res.sendStatus(400)

	let e = req.body;
	console.log(e)

	Userprofiles
		.findOne({_id: req.user})
		.exec((err, user)=>{
			if(err) throw err;

			user.email = e.userEmail;
			user.userState = 1;
			
			user.save(function(err){
				if(err){
					res.sendStatus(500).json(err);
				}
				let aplicationState = {
					aplicationState : 1
				}
				
				
				res.json(aplicationState);
			});



		});

});



export default router