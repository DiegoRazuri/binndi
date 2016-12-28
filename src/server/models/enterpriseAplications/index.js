import mongoose from 'mongoose'



let EnterpriseAplicationSchema = new mongoose.Schema({
	companyName: { type: String, required: true},
	legalId: { type: Number },
	phone: { type: Number},
	email: { type: String },
	web: { type: String },
	address: { type: String },
	createdAt: {type: Date, default: Date.now}

})

EnterpriseAplicationSchema.index({
	companyName:'text'
});

export default mongoose.model('EnterpriseAplication', EnterpriseAplicationSchema)