const router = require('express').Router();
const CommentController = require('../controllers/comment-controller');
const PostController = require('../controllers/post-controller');
const UserController = require('../controllers/user-controller');


/* comment controllers */

/* post controllers */
router.get('/get-posts', PostController.get_all_posts);
router.post('/add-posts', PostController.add_post_own_wall);
router.delete('/delete-post/:_id', PostController.delete_post);

/* user controllers */
router.get('/get-user-by-id/:_id', UserController.findById);
router.post('/signup', UserController.addUser);
router.post('/login', UserController.login);
router.get('/find-all', UserController.findAll);
router.get('/find-by-username/:username', UserController.findByUsername);

module.exports = router;
