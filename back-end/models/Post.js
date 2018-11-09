const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const PostId = mongoose.Schema.Types.ObjectId;

const User = require('./User');
const Comment = require('./Comment');

const PostSchema = new Schema({
  author      : { type: Schema.ObjectId, ref: User },
  content     : { type: String, default: '' },
  timestamp   : { type: Date, default: Date.now },
  comments    : [{ type: Schema.ObjectId, ref: Comment }],
});

module.exports = mongoose.model('Post', PostSchema);
