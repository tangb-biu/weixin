'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  url: String,
  messageType: String,
  mediaId: String,
  createTime: { type: Date, default: Date.now },
  forUser: String,
});
