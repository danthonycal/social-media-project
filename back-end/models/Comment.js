const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const CommentId = mongoose.Schema.Types.ObjectId;

const User = require('./User');

const CommentSchema = new Schema({
  author      : { type: Schema.ObjectId, ref: User, default: '' },
  content     : { type: String, default: '' },
  timestamp   : { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', CommentSchema);
