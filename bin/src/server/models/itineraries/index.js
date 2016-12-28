'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userprofiles = require('src/server/models/userprofiles');

var _userprofiles2 = _interopRequireDefault(_userprofiles);

var _services = require('src/server/models/services');

var _services2 = _interopRequireDefault(_services);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ItinerarySchema = new _mongoose2.default.Schema({
	administrator: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Userprofiles' },
	participants: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Userprofiles' }],
	services: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Services' }],
	// opciones de state seran 0 ó 1 donde 0 sera guardado y 1 sera comprado	
	state: Number,
	title: String,
	createdAt: { type: Date, default: Date.now }
});

exports.default = _mongoose2.default.model('Itineraries', ItinerarySchema);