'use strict';
const User = require('mongoose').model('User');
var ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcryptjs');

// signup
exports.addUser = (req, res) => {
  const newUser = new User(req.body);

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(user => console.log(err))
    });
  });

  console.log("save")
}


// login
exports.login = (req, res) => {
  const email = req.body.email.trim()
  const password = req.body.password

  User.findOne({ email }, (err, user) => {
    if ( !user || err ) {
      console.log('user does not exist')
      return res.redirect('/login')
    }


    user.comparePassword(password, (err, isMatch) => {

      if (err) throw err;
      // res.json(user);

      console.log("pasok")

      // create token
      // const tokenPayload = {
      //   _id: user._id
      // }

      // const token = jwt.sign(tokenPayload, 'Secret')

      // res.cookie('token', token)

      return res.redirect('/home')
    })

  })

}

// search 
exports.findAll = (req, res) => {
  User.find({}, (err, users) => {
    if (!err) {
      console.log("hello");
      res.send(users);
    } else {
      console.log(err);
      res.send(err);
    }
  });
}

exports.findById = (req, res) => {
  const userId = req.params._id;
  console.log(userId);
  User.findOne( { "_id": userId }, (err, user) => {
    if(err) {
      console.log(err);
    } else {
      console.log(user);
      res.send(user)
    }
  })
}
exports.findByUsername = (req, res) => {
  const username = req.params.username;

  User.findOne({ username }, (err, user) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
      console.log(user);
      res.send(user);
    }
  });
}

// add friend

// unfriend

// edit profile

// approve friend request

// reject friend request
