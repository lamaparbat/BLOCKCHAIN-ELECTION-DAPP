import mongoose, { Schema } from 'mongoose';

const electionSchema = new Schema({
 title: { type: String, default: null, require: true },
 description: { type: String, default: null, require: true },
 startDate: { type: Date, default: null, require: true },
 endDate: { type: Date, default: null, require: true },
 createdAt: { type: Date, default: Date.now, require: true },
});

const electionModel = mongoose.model("election", electionSchema);

module.exports = electionModel;
