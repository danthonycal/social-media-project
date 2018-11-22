const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;	

const UserSchema = new Schema({
  email         : { type: String, default: '' },
  name          : { type: String, default: '' },
  username      : { type: String, default: '' },
  password      : { type: String, default: '' },
  birthday      : { type: String, default: '' },
  about         : { type: String, default: '' },
  friends       : [{ type: Schema.ObjectId,  ref: this }],
});

UserSchema.pre('save', function (next) {

	console.log("pre")

	let user = this;
  	const salt = bcrypt.genSaltSync(10);
  	const hash = bcrypt.hashSync(this.password,salt);

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function (err,salt) {
	  if (err) return next(err);

	  bcrypt.hash(user.password, salt, function (err, hash) {
	    if (err) return next(err);

	    user.password = hash;
	    next();
	  });
	});
});

UserSchema.methods.comparePassword = function (password, cb) {
	return bcrypt.compare(password, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
}


module.exports = mongoose.model('User', UserSchema);