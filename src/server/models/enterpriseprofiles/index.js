import mongoose from 'mongoose'
import Userprofiles from 'src/server/models/userprofiles'
import Services from 'src/server/models/services'



let EnterpriseprofileSchema = new mongoose.Schema({
	companyName: { type: String, required: true},
	tradename: { type: String },
	profile_image: { type: String },
	legalId: { type: Number },
	phone: { type: Number},
	email: { type: String },
	web: { type: String },
	address: { type: String },
	location_url: { type: String },
	descriptor: { type: String },
	services : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Services' }],
	createdAt: {type: Date, default: Date.now},
	account_manager : { type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles' }

})

EnterpriseprofileSchema.index({
	companyName:'text'
});

export default mongoose.model('Enterpriseprofiles', EnterpriseprofileSchema)