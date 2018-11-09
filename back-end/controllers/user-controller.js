'use strict';
const User = require('mongoose').model('User');
// signup
exports.addUser = (req, res) => {
  const newUser = new User(req.body);

  newUser.save((err, user) => {
    if (err) { res.send({}); }
    else {
      res.json(user);
    }
  });
}


// login
exports.login = (req, res) => {
  const email = req.body.email.trim()
  const password = re.body.password

  User.findOne({ email }, (err, user) => {
    if ( !user || err ) {
      console.log('user does not exist')
      return res.redirect('/login')
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err || !isMatch) {
        console.log('Wrong password')
        return res.redirect('/login')
      }

      // create token
      const tokenPayload = {
        _id: user._id
      }

      const token = jwt.sign(tokenPayload, 'Secret')

      res.cookie('token', token)

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
