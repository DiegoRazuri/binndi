'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EnterpriseAplicationSchema = new _mongoose2.default.Schema({
	companyName: { type: String, required: true },
	legalId: { type: Number },
	phone: { type: Number },
	email: { type: String },
	web: { type: String },
	address: { type: String },
	createdAt: { type: Date, default: Date.now }

});

EnterpriseAplicationSchema.index({
	companyName: 'text'
});

exports.default = _mongoose2.default.model('EnterpriseAplication', EnterpriseAplicationSchema);