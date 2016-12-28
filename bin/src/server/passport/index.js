'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userprofiles = require('src/server/models/userprofiles');

var _userprofiles2 = _interopRequireDefault(_userprofiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (passport) {

	passport.serializeUser(function (user, done) {
		return done(null, user);
	});
	passport.deserializeUser(function (user, done) {
		//obtengo el usuario de la base de datos con el id
		done(null, user);
	});

	/*
 *	logica passport twitter
 */
	/*	
 	passport.use(new TwitterStrategy({
 		consumerKey: process.env.TWITTER_CONSUMER_KEY,
 		consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
 		callbackURL: process.env.TWITTER_CALLBACK_URI || 'http://localhost:3000/auth/twitter/callback'
 	}, (token, tokenSecret, profile, done)=> {
 		//logica si el usuario es nuevo o no, si se le va a registrar, etc.
 	//pasamos el metodo done y el usuario ya esta autenticado.
 /*
 		Userprofiles.findOne({ username: profile.id }, function (err, user) {
 			if(err){
 				return done(err);
 			}
 			if(user){
 				return done(null, user)
 			}else{
 				let user = new Userprofiles()
 
 				user.provider = profile.provider;
 				user.photo = profile.photos[0].value;
 				user.name = profile.displayName;
 				user.username = profile.id;
 
 				user.save(function(err){
 					if(err)
 						throw err;
 	      			return done(null, user);
 				})
 			}
 	    });
   /**************
 			populate({
 				path : 'workplaces',
 				populate : { path : 'enterprise' }
 			}).
 ********************
 */
	//ESTE QUERY ES APLICANDO POPULATE
	/*
 		Userprofiles.findOne({ username: profile.id }, function (err, user) {
 			if(err){
 				return done(err);
 			}
 			if(user){
 				return done(null, user)
 			}else{
 				let user = new Userprofiles()
 
 				user.provider = profile.provider;
 				user.photo = profile.photos[0].value;
 				user.name = profile.displayName;
 				user.username = profile.id;
 
 				user.save(function(err){
 					if(err)
 						throw err;
 	      			return done(null, user);
 				})
 			}
 	    });	     
 
 	}))
 */

	/*
 *	logica passport facebook
 */
	passport.use(new FacebookStrategy({
		clientID: process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_SECRET,
		callbackURL: process.env.FACEBOOK_CALLBACK_URI || 'http://localhost:3000/auth/facebook/callback',
		profileFields: ['id', 'first_name', 'emails', 'last_name', 'link', 'locale', 'location', 'picture.type(large)']
	}, function (token, refreshToken, profile, done) {
		//logica si el usuario es nuevo o no, si se le va a registrar, etc.
		//pasamos el metodo done y el usuario ya esta autenticado.
		/*		Userprofiles.findOne({ username: profile.id }, function (err, user) {
  			if(err){
  				return done(err);
  			}
  			if(user){
  				console.log(user.name)
  				return done(null, user)
  			}else{
  				let user = new Userprofiles()
  
  				user.provider = profile.provider;
  				user.photo = profile.photos[0].value;
  				user.lastname = profile.name.familyName;
  				user.name = profile.name.givenName;
  				user.username = profile.id;
  
  				user.save(function(err){
  					if(err)
  						throw err;
  	      			return done(null, user);
  				})
  			}
  	    });
  */
		// QUERY APLICANDO POPULATE

		_userprofiles2.default.findOne({ username: profile.id }, function (err, user) {
			if (err) {
				return done(err);
			}
			if (user) {

				return done(null, user);
			} else {
				(function () {
					var user = new _userprofiles2.default();

					user.provider = profile.provider;
					user.photo = profile.photos[0].value;
					user.lastname = profile.name.familyName;
					user.name = profile.name.givenName;
					user.username = profile.id;
					user.link = profile.profileUrl;
					user.location = profile._json.location.name;

					user.save(function (err) {
						if (err) throw err;
						return done(null, user);
					});
				})();
			}
		});
	}));
};