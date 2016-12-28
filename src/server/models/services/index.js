import mongoose from 'mongoose'
import Enterpriseprofiles from 'src/server/models/enterpriseprofiles'
import Userprofiles from 'src/server/models/userprofiles'


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
	category: { type: Number},
	images: [{ type: String}],
	video_url : { type: String},
	favs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles' }],
	enterpriseprofile : { type: mongoose.Schema.Types.ObjectId, ref: 'Enterpriseprofiles' }
	
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
	title:'text',
	city: 'text',
	country:'text',
	tags: 'text'
});

export default mongoose.model('Services', ServicesSchema)