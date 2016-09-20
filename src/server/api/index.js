
import bodyParser from 'body-parser'
import express from 'express'
import multer from 'multer'
import Enterpriseprofiles from 'src/server/models/enterpriseprofiles'
import Userprofiles from 'src/server/models/userprofiles'
import TstVideos from 'src/server/models/tstVideos'
import Services from 'src/server/models/services'
import Itineraries from 'src/server/models/itineraries'

//configuracion para el router
const router = express.Router();
//configuracion para el bodyparser
const jsonParser = bodyParser.json()

// ENDPOINTS //

router.get('/usersession', function ( req, res ){
	if(!req.user){
		res.json({user:false})
	}else{
		console.log("usuario conectado")

/*
		res.json(req.user)
		console.log(req.user)
*/
/*
		Userprofiles.populate(req.user, {"path": "itineraries"}, function (err, user){

			if(err){
				throw err;
			}else{
				
				console.log(user)
				res.json(user);
				
			}	

	
			
		});
*/

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

	}

});

// ENDPOINT CREAR NUEVA EMPRESA
// no se esta grabando en la base la url donde se ubica la imagen de la empresa

router.post('/new_enterprise', jsonParser, multer({ dest: 'public/enterpriseprofiles/display_picture/'}).single('upl'), function (req, res){
	if(!req.body) return res.sendStatus(400)

		let e = req.body;
		console.log(e)

		let enterprise = new Enterpriseprofiles();

		enterprise.companyName = e.companyName
		enterprise.phone = e.phone
		enterprise.legalId = e.legalId
		enterprise.email = e.email
		enterprise.web = e.web
		//deberia obtener el dato de req.user._id
		enterprise.account_manager = e.user_id
		enterprise.location_url = e.location_url

		let service = new Services();

		service.title = e.title,
		service.terms_cond = e.terms_cond,
		service.description = e.description,
		service.price = e.price,
		service.tst_videos = e.id_tst_video

		console.log(service)

		enterprise.services.push(service._id)

		console.log(enterprise)
		enterprise.save(function(err){
			if(err){
				res.sendStatus(500).json(err)
			}
			console.log("este es la info de req.user")
			console.log(req.user)
			// se deberia consultar el userprofile con el req.user._id
			Userprofiles.findOne({_id: req.user._id}, function(err, user){

				if(err){
					res.send("hubo un error buscando al usuario")
				}
				if(user){
					user.enterprise = enterprise
				}
				user.save()

				service.save(function(err){
				if(err){
					res.sendStatus(500).json(err)
				}
				console.log("se grabo el servicio"),
				console.log(service)

				console.log(enterprise)
				res.json(enterprise)
			})


			});


		})

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

// ENDOPOINT OBTENER TOTAL DE SERVICIOS

router.get('/all_services', function ( req, res ){
	
//	db.enterpriseprofiles.aggregate([{$project : {services:1}},{$unwind:"$services"}])
// CUANDO SE TENGA DIFERENTES SERVICIOS ASOCIOADOS A UN MISMO VIDEO SE DEBERA HACER UN $GROUP
// REVISAR EL QUERY DE ENTERPRISEPROFILES DE BENGALAJ

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


export default router