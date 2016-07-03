import http from 'http'
import mongoose from 'mongoose'
import express from 'express'
import expressSession from 'express-session'
import path from 'path'
import api from 'src/server/api'

//configuracion de autenticacion con passport
const passport = require('passport');
				 require('src/server/passport')(passport);

//configuracion de server
const app = express()
const server = http.createServer(app)

//conexion a base de datos
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/binndi', function(err, res){
	if(err) throw err;
	console.log("conectado con exito a la base de datos");
})

//endpoints

app.use('/api', api)

//sesiones de express
app.use(expressSession({
	secret: 'binndicambiarclave',
	resave : false,
	saveUninitialized: false
}))

//configuracion de archivos estaticos
app.use(express.static('public'))

//configuracion de passport
app.use(passport.initialize())
app.use(passport.session())


app.get('/auth/twitter', passport.authenticate('twitter'))
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
	successRedirect : '/',
	failureRedirect : '/'
}));

app.get('/auth/facebook', passport.authenticate('facebook'))
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect : '/',
	failureRedirect : '/'
}));



app.get('/logout', (req, res) =>{
	req.logout()
	res.redirect('/')
})

//configuracion de ruteo
app.get('*', function (req, res){
	res.sendFile(path.join(__dirname, '../../public', 'index.html'))
})

//levantamiento de servidor
server.listen(process.env.PORT || 3000, () => console.log("servidor iniciado"))

//PORT=3000 FACEBOOK_APP_ID=715593598509472 FACEBOOK_APP_SECRET=4b82d62979632cb84e84aca91a1693a8  TWITTER_CONSUMER_KEY=4EUcaY9Er9G0ACtZ9DwjAjvOS TWITTER_CONSUMER_SECRET=3gHfGvQXFCOONrFLdBInVY2Jd98flwEdXimwLVJxEJSR1HySGG npm run start

