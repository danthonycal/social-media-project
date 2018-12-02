const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const CommentId = mongoose.Schema.Types.ObjectId;

const User = require('./User');
const Post = require('./Post');

const CommentSchema = new Schema({
  authorId    : { type: Schema.ObjectId, ref: User },
  authorName  : { type: String, default: '' },
  postId      : { type: Schema.ObjectId, ref: Post },
  postOwner   : { type: String, default: '' },
  content     : { type: String, default: '' },
  timestamp   : { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', CommentSchema);
