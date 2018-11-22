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

	if (!user.isModified('password')) {
		console.log("bago mag save")
		return next()
	};

	next();
  	// const salt = bcrypt.genSaltSync(10);
  	// const hash = bcrypt.hashSync(user.password,salt);
	// console.log("why")
	// bcrypt.genSalt(SALT_WORK_FACTOR, function (err,salt) {
	//   if (err) return next(err);

	//   bcrypt.hash(user.password, salt, function (err, hash) {
	//     if (err) return next(err);

	//     user.password = hash;
	//     console.log(user.password)
	//     next();
	//   });
	// });
});

UserSchema.methods.comparePassword = function(candidatePassword, hash, cb) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('User', UserSchema);