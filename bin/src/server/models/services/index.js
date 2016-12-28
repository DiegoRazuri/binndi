'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _enterpriseprofiles = require('src/server/models/enterpriseprofiles');

var _enterpriseprofiles2 = _interopRequireDefault(_enterpriseprofiles);

var _userprofiles = require('src/server/models/userprofiles');

var _userprofiles2 = _interopRequireDefault(_userprofiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServicesSchema = new _mongoose2.default.Schema({

	title: { type: String },
	city: { type: String },
	country: { type: String },
	description: { type: String },
	includes: [{ type: String }],
	terms_cond: { type: String },
	location_url: { type: String },
	price: { type: Number },
	tags: [{ type: String }],
	category: { type: Number },
	images: [{ type: String }],
	video_url: { type: String },
	favs: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Userprofiles' }],
	enterpriseprofile: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Enterpriseprofiles' }

});
/*
let ServicesSchema = new mongoose.Schema({
	
	title: { type: String},
	city: { type: String},
	country: { type: String},
	description: { type: String},
	includes: [{ type: String}],
	terms_cond: { type: String},
	location_url: { type: String},
	price: { type: Number},
	tags: [{ type: String}],
	images: [{ type: String}],
	video_url : { type: String},
	favs : { type: Number, default : 0},
	purchases : { type: Number, default : 0},
	category: { type: String}
	


})
*/

ServicesSchema.index({
	title: 'text',
	city: 'text',
	country: 'text',
	tags: 'text'
});

exports.default = _mongoose2.default.model('Services', ServicesSchema);