const router = require('express').Router();
const CommentController = require('../controllers/comment-controller');
const PostController = require('../controllers/post-controller');
const UserController = require('../controllers/user-controller');


/* comment controllers */

/* post controllers */

/* user controllers */
router.post('/signup', UserController.addUser);
router.get('/find-all', UserController.findAll);
router.get('/find-by-username/:username', UserController.findByUsername);

module.exports = router;
