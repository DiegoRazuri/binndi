import mongoose from 'mongoose'

let UserprofileSchema = new mongoose.Schema({
	username: { type: String, required: true},
	name: { type: String },
	lastname: { type: String, default: ' ' },
	photo: { type: String },
	email: { type: String },
	phone_number: {type: Number},
	provider: { type: String },
	contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles' }],
	createdAt: {type: Date, default: Date.now}

})

UserprofileSchema.index({
	username:'text',
	name: 'text',
	lastname:'text',
	position: 'text'
});

export default mongoose.model('Userprofiles', UserprofileSchema)