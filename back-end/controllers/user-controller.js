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
      console.log('User does not exist!')
      return res.send("invalid")
    }

    user.comparePassword(password, user.password, function(err, isMatch) {

      if(isMatch) {
        console.log("Succesful login!")
        User.findOne( { "email": email }, (err, user) => {
          if(err) {
            console.log(err);
            return res.status(403).send("invalid")
          } else {
            console.log(user);
            return res.status(200).send(user)
          }
        })
      } else {
        console.log("Invalid username/password! Try again.")
        return res.send("invalid")
      }

    });

  })
}


// search 
exports.findAll = (req, res) => {
  User.find({}, (err, users) => {
    if (!err) {
      res.send(users);
    } else {
      console.log(err);
      res.send(err);
    }
  });
}

exports.findById = (req, res) => {
  const userId = req.params._id;
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

  User.findOne({ "username": username }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send({});
    } else {
      // console.log(user);
      res.status(200).send(user);
    }
  });
}

// add friend

// unfriend

// edit profile

exports.editProfile = (req, res) => {
  const _id = new ObjectId(req.params._id);
  const newUsername = req.body.params.newUsername;
  const newName = req.body.params.newName;
  const newBday = req.body.params.newBday;
  const newEmail = req.body.params.newEmail;
  console.log(req.body)
  User.updateOne({ "_id" : _id }, {$set : { username : newUsername, name : newName, birthday : newBday, email : newEmail } }, (err) => {
    if (err) {
      res.send(false);
    } else {
      res.send(true);
    }
  })
}

// approve friend request

// reject friend request
