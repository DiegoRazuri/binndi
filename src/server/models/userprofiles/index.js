import mongoose from 'mongoose'
import Enterpriseprofiles from 'src/server/models/enterpriseprofiles'
import Itineraries from 'src/server/models/itineraries'


let UserprofileSchema = new mongoose.Schema({
	username: { type: String, required: true},
	name: { type: String },
	lastname: { type: String, default: ' ' },
	photo: { type: String },
	email: { type: String },
	enterprise: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enterpriseprofiles' }],
	phone_number: {type: Number},
	provider: { type: String },
	contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles' }],
	itineraries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Itineraries' }],
	createdAt: {type: Date, default: Date.now}

})

UserprofileSchema.index({
	username:'text',
	name: 'text',
	lastname:'text',
	position: 'text'
});

export default mongoose.model('Userprofiles', UserprofileSchema)