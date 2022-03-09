const { getPosts, createPost } = require('../controllers/feed');

const router = require('express').Router();

//Get..feed/posts...

router.get('/posts', getPosts);



//Post.../feed/post....

router.post('/post', createPost)









module.exports = router;