const CommentController = require('../controllers/comment-controller');
const PostController    = require('../controllers/post-controller');
const UserController    = require('../controllers/user-controller');
const router            = require('express').Router();


/* comment controllers */
router.get('/get-comments/:_id', CommentController.get_comments);
router.post('/add-comment', CommentController.add_comment);
router.delete('/delete-comment/:_id', CommentController.delete_comment);

/* post controllers */
router.get('/get-posts', PostController.get_all_posts);
router.post('/add-posts', PostController.add_post_own_wall);
router.post('/edit-post/:_id', PostController.edit_post);
router.delete('/delete-post/:_id', PostController.delete_post);

/* user controllers */
router.get('/get-user-by-id/:_id', UserController.findById);
router.post('/signup', UserController.addUser);
router.post('/login', UserController.login);
router.get('/find-all', UserController.findAll);
router.get('/find-by-username/:username', UserController.findByUsername);

module.exports = router;
