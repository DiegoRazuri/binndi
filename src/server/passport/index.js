import mongoose from 'mongoose'
import Userprofiles from 'src/server/models/userprofiles'
const TwitterStrategy = require('passport-twitter').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;



module.exports = function (passport){

	passport.serializeUser((user, done) => done(null, user))
	passport.deserializeUser((user, done)=> {
	//obtengo el usuario de la base de datos con el id
		done(null, user)
	})


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
		profileFields: ['id', 'first_name', 'photos', 'email', 'last_name']
	}, (token, refreshToken, profile, done)=> {
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

		Userprofiles.findOne({ username: profile.id }, function (err, user) {
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
	}))


}