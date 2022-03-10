const { validationResult } = require('express-validator')
const fs = require('fs');
const path = require('path')

const Post = require('../models/post')


exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            message: 'fetched post successfully.',
            posts: posts
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;

        }

        next(error)
    }





}





exports.createPost = async (req, res, next) => {

    try {


        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = new Error('Validation failed, entered data incorrect.');
            error.statusCode = 422;
            throw error;

        }

        if (!req.file) {
            const error = new Error('No image porvided.');
            error.statusCode = 422;
            throw error;
        }


        const imageUrl = req.file.path;

        const { title, content } = req.body;

        //create post in db...


        const post = new Post({
            title: title, content: content, imageUrl: imageUrl, creator: { name: 'ali' },
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







//getting single post....

exports.getPost = async (req, res, next) => {
    try {






        const { postId } = req.params;
        const post = await Post.findById(postId);

        if (!post) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ message: 'post fetched.', post: post })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;

        }

        next(error)
    }
}



//editing post...

exports.editPost = async (req, res, next) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = new Error('Validation failed, entered data incorrect.');
            error.statusCode = 422;
            throw error;

        }


        const { postId } = req.params;

        const { title, content } = req.body;

        let imageUrl = req.body.image;

        if (req.file) {
            imageUrl = req.file.path;
        }


        if (!imageUrl) {
            const error = new Error('No file Picked');
            error.statusCode = 422;
            throw error
        }



        const post = await Post.findById(postId);

        if (!post) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }



        if (imageUrl !== post.imageUrl) {
            clearImage(post.imageUrl)
        }


        post.title = title;
        post.content = content;
        post.imageUrl = imageUrl

        const newPost = await post.save()

        res.status(200).json({ message: 'post updated', post: newPost })




    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;

        }

        next(error)
    }
}



//delete post....


exports.deletePost = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);

        //check logged in user....when we will authenticate the user......so using...findById..else we should use findById and remove method....

        if (!post) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }



        clearImage(post.imageUrl)

        const deletedpost = await Post.findByIdAndRemove(postId);

        console.log(deletedpost);
        res.status(200).json({ message: 'deleted post' })


    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;

        }

        next(error)
    }
}












const clearImage = (filePath) => {
    filePath = path.join(__dirname, '..', filePath);

    fs.unlink(filePath, err => console.log(err))
}