const { getPosts, createPost, getPost, editPost, deletePost } = require('../controllers/feed');
const { body } = require('express-validator')

const router = require('express').Router();

//Get..feed/posts...

router.get('/posts', getPosts);



//Post.../feed/post....

router.post('/post', [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })

], createPost)



//get single post....

router.get('/post/:postId', getPost)


//edit post....

router.put('/post/:postId', [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })
], editPost);







//delete post.....


router.delete('/post/:postId', deletePost)





module.exports = router;