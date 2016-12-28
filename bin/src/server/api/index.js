'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _enterpriseprofiles = require('src/server/models/enterpriseprofiles');

var _enterpriseprofiles2 = _interopRequireDefault(_enterpriseprofiles);

var _userprofiles = require('src/server/models/userprofiles');

var _userprofiles2 = _interopRequireDefault(_userprofiles);

var _tstVideos = require('src/server/models/tstVideos');

var _tstVideos2 = _interopRequireDefault(_tstVideos);

var _services = require('src/server/models/services');

var _services2 = _interopRequireDefault(_services);

var _itineraries = require('src/server/models/itineraries');

var _itineraries2 = _interopRequireDefault(_itineraries);

var _enterpriseAplications = require('src/server/models/enterpriseAplications');

var _enterpriseAplications2 = _interopRequireDefault(_enterpriseAplications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//configuracion para el router
var router = _express2.default.Router();
//configuracion para el bodyparser
var jsonParser = _bodyParser2.default.json();

//SE CAMBIO A TRUE PERO YA FUNCIONABA EN FALSE
var urlencodedParser = _bodyParser2.default.urlencoded({ extended: true });

//Variables setting

var categories_list = ["Aventura", "Comida", "Cultura", "Arte", "Eventos", "Fiesta", "Naturaleza", "Deporte", "Hospedaje", "Compras"];
var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
// ENDPOINTS //

router.get('/usersession', function (req, res) {
	if (!req.user) {
		res.json({ user: false });
	} else {
		console.log("usuario conectado");

		/*
  		res.json(req.user)
  		console.log(req.user)
  */
		_userprofiles2.default.findOne({ _id: req.user }).populate('wishlist').exec(function (err, result) {
			if (err) {

				return handleError(err);
			} else {

				_services2.default.aggregate([{ $project: { city: 1 } }, { $unwind: "$city" }, { $group: { _id: "$city" } }], function (err, destinations) {
					if (err) {
						return handleError(err);
					} else {

						var response = {
							user: result,
							destinations: destinations,
							months: months,
							categories_list: categories_list

						};

						res.json(response);
					}
				});
			}
		});

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
var storage = _multer2.default.diskStorage({
	destination: function destination(req, file, cb) {
		cb(null, 'public/enterpriseprofiles/');
	},
	filename: function filename(req, file, cb) {
		cb(null, file.originalname);
	}
});
var upload = (0, _multer2.default)({ storage: storage });

router.post('/new_enterprise', jsonParser, (0, _multer2.default)({ storage: storage }).fields([{ name: 'profile_image', maxCount: 1 }, { name: 'images', maxCount: 4 }]), function (req, res) {
	if (!req.body) return res.sendStatus(400);

	var e = req.body;
	console.log(e);
	console.log(req.files);

	////////*********////////
	//ESTA VARIABLE DEBE CAMBIAR CUANTO SE HAGA LA IMPLEMENTACIN DE S3 PARA Q LA INFO SE GUARDE CON LA RUTA CORRECTA
	////////*******////////

	var provitionalPathLocalhost = "enterpriseprofiles/";

	var enterprise = new _enterpriseprofiles2.default();

	enterprise.account_manager = e.user_id;
	enterprise.companyName = e.companyName;
	enterprise.tradeName = e.tradeName;
	//codigo hardcodeado se debe cambiar cuando se implemente s3
	enterprise.profile_image = provitionalPathLocalhost + req.files.profile_image[0].originalname;
	enterprise.legalId = e.legalId;
	enterprise.phone = e.phone;
	enterprise.email = e.email;
	enterprise.web = e.web;
	enterprise.address = e.address;
	enterprise.location_url = e.location_url;
	enterprise.descriptor = e.descriptor;

	var services = new _services2.default();

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
	services.category = e.category;

	for (var i = 0; i < e.tags.length; i++) {
		services.tags.push(e.tags[i]);
	}
	for (var _i = 0; _i < e.includes.length; _i++) {
		services.includes.push(e.includes[_i]);
	}

	for (var _i2 = 0; _i2 < req.files.images.length; _i2++) {
		services.images.push(provitionalPathLocalhost + req.files.images[_i2].originalname);
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

	enterprise.save(function (err) {
		if (err) {
			res.sendStatus(500).json(err);
		}

		services.save(function (err) {
			if (err) {
				res.sendStatus(500).json(err);
			}
			res.json(enterprise);
		});
	});
});

// ENDPOINT APLICAR EMPRESA

router.post('/enterprise_aplication', jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400);

	var e = req.body;
	console.log(e);

	var aplication = new _enterpriseAplications2.default();

	aplication.companyName = e.companyName;
	aplication.legalId = e.legalId;
	aplication.phone = e.phone;
	aplication.email = e.email;
	aplication.web = e.web;
	aplication.address = e.address;

	aplication.save(function (err) {
		if (err) {
			res.sendStatus(500).json(err);
		}

		var aplicationState = {
			aplicationState: 1
		};

		res.json(aplicationState);
	});
});

// ENDPOINT CREAR SERVICIO
//no se esta grabando la url de la imagen que se envia, pero si se esta guardando el archivo en el disco

router.post('/new_service', jsonParser, (0, _multer2.default)({ dest: 'public/enterpriseprofiles/services/' }).single('upl'), function (req, res) {
	if (!req.body) return res.sendStatus(400);

	var e = req.body;
	console.log(e);

	_enterpriseprofiles2.default.findOne({ _id: e.enterprise_id }, function (err, enterprise) {
		if (err) {
			res.send("hubo un error buscando la empresa");
		}
		if (enterprise) {

			var tags = e.tags;

			enterprise.services.push({
				title: e.title,
				terms_cond: e.terms_cond,
				location_url: e.location_url,
				description: e.description,
				price: e.price,
				tags: [],
				tst_videos: e.tst_videos_id

			});

			tags.map(function (tag) {
				enterprise.tags.push(tag);
			});

			enterprise.save();
			console.log(enterprise);
			res.json(enterprise);
		}
	});
});

// ENDPOINT AGREGAR A WISHLIST
//no se esta grabando la url de la imagen que se envia, pero si se esta guardando el archivo en el disco

router.post('/add_to_wishlist', jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400);

	var e = req.body;
	console.log(e);

	_userprofiles2.default.findOne({ _id: req.user._id }, function (err, user) {
		if (err) {
			res.send("hubo un error encontrando al usuario");
		}
		if (user) {

			user.wishlist.push(e.activity_id);

			user.save();

			_services2.default.findOne({ '_id': e.activity_id }, function (err, service) {
				if (err) {
					res.send("hubo un error encontrando el servicio");
				}
				if (service) {

					service.favs.push(user._id);

					service.save(function (err) {
						if (err) {
							res.sendStatus(500).json(err);
						}

						res.json(service);
					});
				}
			});
		}
	});
});

// ENDPOINT REGISTRAR VIDEO

router.post('/register_video', jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400);

	var e = req.body;
	console.log(e);

	var video = new _tstVideos2.default();

	video.url = e.url;
	video.title = e.title;
	video.stereo = e.stereo;
	video.route_vrView = e.route_vrView;
	video.tags.push(e.tags);

	console.log(video);
	video.save(function (err) {
		if (err) {
			res.sendStatus(500).json(err);
		}

		res.json(video);
	});
});

// ENDPOINT REMOVE FROM WISHLIST

router.post('/remove_from_wishlist', jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400);

	_userprofiles2.default.findOne({ _id: req.user._id }, function (err, user) {

		if (err) {
			return handleError(err);
		} else {
			user.wishlist.map(function (service, index) {
				if (service._id == req.activity_id) {
					user.wishlist.splice(index, 1);
				}
			});

			user.save();
			res.json(user);
		}
	});
});

// ENDOPOINT OBTENER TOTAL DE SERVICIOS

router.get('/all_services', function (req, res) {

	_services2.default.find({}).populate('enterpriseprofile').exec(function (err, result) {

		if (err) return handleError(err);

		res.json(result);
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

router.post('/create_itinerary', jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400);

	var e = req.body;
	console.log(e);

	var itinerary = new _itineraries2.default();

	itinerary.administrator = e.administrator_id;
	itinerary.title = e.title;
	// aca debo recibir un array con los participants iterar y hacerles
	// un push sin contar al administrator
	//itinerary.participants.push(e.administrator_id);

	console.log(itinerary);
	itinerary.save(function (err) {
		if (err) {
			res.sendStatus(500).json(err);
		}

		_userprofiles2.default.findOne({ _id: req.user._id }, function (err, user) {
			if (err) throw err;
			user.itineraries.push(itinerary._id);

			user.save(function (err) {
				if (err) {
					res.sendStatus(500).json(err);
				}

				res.json(itinerary);
			});
		});
	});
});

router.post('/add_service_to_itinerary', jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400);

	var e = req.body;
	console.log(e);

	_itineraries2.default.findOne({ _id: e.itinerary_id }, function (err, itinerary) {
		if (err) throw err;
		itinerary.services.push(e.service._id);

		itinerary.save(function (err) {
			if (err) {
				res.sendStatus(500).json(err);
			}

			res.send(e.service);
		});
	});
});
router.post('/pregunta', function (req, res) {
	if (!req.body) return res.sendStatus(400);

	var e = req.body.pack;
	console.log(e);
	res.send(e);
});

router.get('/unique_services/:service_id', function (req, res) {

	var e = req.params.service_id;

	_services2.default.findOne({ _id: e }).populate('enterpriseprofile').exec(function (err, result) {

		if (err) return handleError(err);

		res.json(result);
	});
});

exports.default = router;