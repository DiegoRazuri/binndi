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

var EnterpriseprofileSchema = new _mongoose2.default.Schema({
	companyName: { type: String, required: true },
	tradename: { type: String },
	profile_image: { type: String },
	legalId: { type: Number },
	phone: { type: Number },
	email: { type: String },
	web: { type: String },
	address: { type: String },
	location_url: { type: String },
	descriptor: { type: String },
	services: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Services' }],
	createdAt: { type: Date, default: Date.now },
	account_manager: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Userprofiles' }

});

EnterpriseprofileSchema.index({
	companyName: 'text'
});

exports.default = _mongoose2.default.model('Enterpriseprofiles', EnterpriseprofileSchema);