import mongoose from 'mongoose'
import TstVideo from 'src/server/models/tstVideos'

let ServicesSchema = new mongoose.Schema({
	images: [{ type: String}],
	title: { type: String},
	terms_cond: { type: String},
	location_url: { type: String},
	description: { type: String},
	price: { type: Number},
	tags: [{ type: String}],
	tst_videos : { type: mongoose.Schema.Types.ObjectId, ref: 'TstVideos' },
	


})

export default mongoose.model('Services', ServicesSchema)