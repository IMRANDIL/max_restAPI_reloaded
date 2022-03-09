const { getPosts, createPost } = require('../controllers/feed');
const { body } = require('express-validator')

const router = require('express').Router();

//Get..feed/posts...

router.get('/posts', getPosts);



//Post.../feed/post....

router.post('/post', [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })

], createPost)









module.exports = router;