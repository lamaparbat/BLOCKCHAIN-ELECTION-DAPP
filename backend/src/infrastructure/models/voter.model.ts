import mongoose, { Schema } from 'mongoose';


const voterSchema = new Schema({
  fullName: { type: String, default: null, require: true },
  citizenshipNumber: { type: Number, default: null, require: true },
  province: { type: String, default: null, require: true },
  district: { type: String, default: null, require: true },
  municipality: { type: Number, default: null, require: true },
  ward: { type: String, default: null, require: true },
  email: { type: String, default: null, require: true },
  profile: { type: Buffer, default: {}, require: true },
  createdAt: { type: Date, default: Date.now, require: true },
});

const voterModel = mongoose.model("voter", voterSchema);

module.exports = voterModel;
