import mongoose from 'mongoose'
import Userprofiles from 'src/server/models/userprofiles'
import Services from 'src/server/models/services'

let ItinerarySchema = new mongoose.Schema({
	administrator : {type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles'},
	participants : [{type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles'}],
	services : [{type: mongoose.Schema.Types.ObjectId, ref: 'Services'}],
// opciones de state seran 0 ó 1 donde 0 sera guardado y 1 sera comprado	
	state : Number,
	title : String,
	createdAt: {type: Date, default: Date.now}
})

export default mongoose.model('Itineraries', ItinerarySchema)