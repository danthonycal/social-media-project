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

    // User.findByIdAndUpdate(
    //     info._id,
    //     {$push : {"posts": newPost}},
    //     {safe : true, new: true},
    //     function(err) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             res.send("Successfully added.");
    //         }
    //     }
    // )
}

// edit post on own wall
exports.edit_post_own_wall = (req, res) => {

}

// delete post on own wall
exports.delete_post = (req, res) => {
    console.log(req.params._id);
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


