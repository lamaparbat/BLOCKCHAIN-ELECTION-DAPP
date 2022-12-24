import mongoose, { Schema } from 'mongoose';


const partySchema = new Schema({
 partyName: { type: String, default: null, require: true },
 totalMembers: { type: String, default: null, require: true },
 agenda: { type: String, default: null, require: true },
 logo: { type: String, default: null, require: true },
 createdAt: { type: Date, default: Date.now, require: true },
});

const partyModel = mongoose.model("party", partySchema);

module.exports = partyModel;
