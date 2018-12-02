'use strict';
const Comment = require('mongoose').model('Comment');
const Post    = require('mongoose').model('Post');
const User    = require('mongoose').model('User');
var ObjectId  = require('mongodb').ObjectID;

exports.get_comments = (req, res) => {
    const _id = new ObjectId(req.params._id);
    Comment.find({ "postId": _id }, (err, comments) => {
        if (err) {
            res.status(500);
        } else {
            res.status(200).send(comments);
        }
    });
}

exports.add_comment = (req, res) => {
    const newComment = new Comment(req.body);
    const postId        = req.body.postId
    newComment.save((err, comment) => {
        if (err) { res.status(500); }
        else {
            Post.updateOne({ "_id": postId }, { $push : { comments: comment._id }}, (err) => {
                if (err) {
                    res.send(false);
                } else {
                    res.send(true);
                }
            })
            res.json(comment);
        }
    })
}

exports.delete_comment = (req, res) => {
    const _id = new ObjectId(req.params._id);
    Comment.deleteOne({ "_id": _id }, (err) => {
        if (err) {
            res.send(false);
        } else {
            res.send(true);
        }
    });
}