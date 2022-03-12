const { getPosts, createPost, getPost, editPost, deletePost } = require('../controllers/feed');
const { body } = require('express-validator')
const isAuth = require('../middleware/is-auth')
const router = require('express').Router();

//Get..feed/posts...

router.get('/posts', isAuth, getPosts);



//Post.../feed/post....

router.post('/post', isAuth, [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })

], createPost)



//get single post....

router.get('/post/:postId', isAuth, getPost)


//edit post....

router.put('/post/:postId', isAuth, [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })
], editPost);







//delete post.....


router.delete('/post/:postId', isAuth, deletePost)





module.exports = router;