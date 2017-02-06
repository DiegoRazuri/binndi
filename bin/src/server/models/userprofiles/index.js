'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _enterpriseprofiles = require('src/server/models/enterpriseprofiles');

var _enterpriseprofiles2 = _interopRequireDefault(_enterpriseprofiles);

var _itineraries = require('src/server/models/itineraries');

var _itineraries2 = _interopRequireDefault(_itineraries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserprofileSchema = new _mongoose2.default.Schema({
	username: { type: String, required: true },
	name: { type: String },
	lastname: { type: String, default: ' ' },
	binndis: { type: Number, default: 100 },
	photo: { type: String },
	link: { type: String },
	location: { type: String },
	description: { type: String },
	email: { type: String },
	enterprise: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Enterpriseprofiles' }],
	phone_number: { type: Number },
	provider: { type: String },
	contacts: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Userprofiles' }],
	itineraries: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Itineraries' }],
	wishlist: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Services' }],
	userState: { type: Number, default: 0 },
	createdAt: { type: Date, default: Date.now }

});

UserprofileSchema.index({
	username: 'text',
	name: 'text',
	lastname: 'text',
	position: 'text'
});

exports.default = _mongoose2.default.model('Userprofiles', UserprofileSchema);