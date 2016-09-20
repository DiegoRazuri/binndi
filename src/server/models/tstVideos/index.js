import mongoose from 'mongoose'

let TstVideosSchema = new mongoose.Schema({
	url: { type: String},
	title: { type: String},
	tags: [{ type: String}],
	stereo: { type: String},
	route_vrView: { type: String}
})

export default mongoose.model('TstVideos', TstVideosSchema)