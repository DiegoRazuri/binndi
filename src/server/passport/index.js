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


	passport.use(new FacebookStrategy({
		clientID: process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_SECRET,
		callbackURL: process.env.FACEBOOK_CALLBACK_URI || 'http://localhost:3000/auth/facebook/callback',
		profileFields: ['id', 'first_name', 'email', 'last_name', 'link', 'locale', 'location', 'picture.type(large)']
	}, (token, refreshToken, profile, done)=> {

		// QUERY APLICANDO POPULATE

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
				user.lastname = profile.name.familyName;
				user.name = profile.name.givenName;
				user.username = profile.id;
				user.link = profile.profileUrl;
				//user.location = profile._json.location.name;

		

				user.save(function(err){
					if(err)
						throw err;
	      			return done(null, user);
				})
			}
	    });	 
	}))


}