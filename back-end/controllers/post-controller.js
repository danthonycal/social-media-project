'use strict';
const Post = require('mongoose').model('Post');
const User = require('mongoose').model('User');
var ObjectId = require('mongodb').ObjectID;
// add post on own wall
exports.add_post_own_wall = (req, res) => {
    var postAuthor  = req.body.author;
    const newPost = new Post(req.body);
    // var query = { username : postAuthor}
    newPost.save((err, post) => {           //add post to the database
        if (err) { res.send(500); }
        else {
            res.json(post);
        }
    })
}

// edit post
exports.edit_post = (req, res) => {
    const _id     = new ObjectId(req.params._id);
    const newContent = req.body.params.newContent;
    Post.updateOne({ "_id": _id }, { $set : { content: newContent } }, (err) => {
        if (err) {
            res.send(false);
        } else {
            res.send(true);
        }
    })
}

// delete post
exports.delete_post = (req, res) => {
    const _id = new ObjectId(req.params._id);
    Post.deleteOne({ "_id": _id }, (err) => {
        if (err) {
            res.send(false);
        } else {
            res.send(true);
        }
    });
}

// get all posts
exports.get_all_posts = (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            console.log(err);
            res.send(500);
        } else {
            res.send(posts);
        }
    });
}


// add post on friend's wall

// edit post on friend's wall

// delete post on friend's wall


