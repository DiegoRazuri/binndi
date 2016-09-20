import mongoose from 'mongoose'
import Userprofiles from 'src/server/models/userprofiles'
import Services from 'src/server/models/services'

let EnterpriseprofileSchema = new mongoose.Schema({
	companyName: { type: String, required: true},
	legalId: { type: Number },
	phone: { type: Number},
	account_manager : { type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles' },
	web: { type: String },
	email: { type: String },
	descriptor: { type: String },
	location_url: {type: String},
	services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Services' }],
	createdAt: {type: Date, default: Date.now}

})

EnterpriseprofileSchema.index({
	companyName:'text'
});

export default mongoose.model('Enterpriseprofiles', EnterpriseprofileSchema)