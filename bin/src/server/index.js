'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _api = require('src/server/api');

var _api2 = _interopRequireDefault(_api);

var _expressHistoryApiFallback = require('express-history-api-fallback');

var _expressHistoryApiFallback2 = _interopRequireDefault(_expressHistoryApiFallback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//configuracion de autenticacion con passport
var passport = require('passport');
require('src/server/passport')(passport);

//configuracion de server
var app = (0, _express2.default)();
var server = _http2.default.createServer(app);

//conexion a base de datos
_mongoose2.default.connect(process.env.MONGODB_URI || 'mongodb://localhost/binndi', function (err, res) {
	if (err) throw err;
	console.log("conectado con éxito a la base de datos");
});

//Configuracion para obtener datos mediante post con body-parser
//antes de configurar los archivos estaticos se indica los parsers
app.use((0, _cookieParser2.default)());

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
//sesiones de express

var sessionKey = process.env.SESSION_KEY;
app.use((0, _expressSession2.default)({
	secret: sessionKey,
	resave: false,
	saveUninitialized: false
}));

//configuracion de archivos estaticos
app.use(_express2.default.static('public'));

//configuracion de passport
app.use(passport.initialize());
app.use(passport.session());

var root = __dirname + 'public';
app.use((0, _expressHistoryApiFallback2.default)('index.html', { root: root }));

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'user_location'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	//	successRedirect : '/',
	failureRedirect: '/'
}), function (req, res) {
	if (req.user.isNew) {
		console.log("es nuevo");
		return res.redirect('/otro');
	} else {

		res.redirect('/userprofile');
	}
});

app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

//app.use('/api', api)

app.get('*', function (req, res) {
	res.sendFile(_path2.default.join(__dirname, '../../public', 'index.html'));
});

/*
app.get('*', function(req, res) {
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else {
      res.status(404).send('Not found :(')
    }
  })
})
*/
//endpoints

//configuracion de ruteo

//app.use(fallback(path.join(__dirname, '../../public', 'index.html')))

//levantamiento de servidor
server.listen(process.env.PORT || 3000, function () {
	return console.log("servidor iniciado");
});