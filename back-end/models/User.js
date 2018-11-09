const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email         : { type: String, default: '' },
  name          : { type: String, default: '' },
  username      : { type: String, default: '' },
  password      : { type: String, default: '' },
  birthday      : { type: String, default: '' },
  about         : { type: String, default: '' },
  friends       : [{ type: Schema.ObjectId,  ref: this }],
});

module.exports = mongoose.model('User', UserSchema);