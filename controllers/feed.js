const { validationResult } = require('express-validator')


const Post = require('../models/post')


exports.getPosts = async (req, res, next) => {
    const post = await Post.find();
    res.status(200).json({
        posts: post
    })




}





exports.createPost = async (req, res, next) => {

    try {


        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = new Error('Validation failed, entered data incorrect.');
            error.statusCode = 422;
            throw error;

        }

        const { title, content } = req.body;

        //create post in db...


        const post = new Post({
            title: title, content: content, imageUrl: 'images/img1.png', creator: { name: 'ali' },
        });


        await post.save()



        res.status(201).json({ message: 'Post created Successfully!', post: post })









    } catch (error) {

        if (!error.statusCode) {
            error.statusCode = 500;

        }

        next(error)
    }




}