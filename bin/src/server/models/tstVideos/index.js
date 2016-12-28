'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TstVideosSchema = new _mongoose2.default.Schema({
	url: { type: String },
	title: { type: String },
	tags: [{ type: String }],
	stereo: { type: String },
	route_vrView: { type: String }
});

exports.default = _mongoose2.default.model('TstVideos', TstVideosSchema);