const { validationResult } = require('express-validator')


exports.getPosts = (req, res, next) => {

    res.status(200).json({
        posts: [{ _id: '1', title: 'First post', content: 'this is the first post', imageUrl: 'images/img1.png', creator: { name: 'ali' }, createdAt: new Date() }]
    })




}





exports.createPost = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ message: 'Validation failed, entered data incorrect.', errors: errors.array() })
    }

    const { title, content } = req.body;

    //create post in db...






    res.status(201).json({ message: 'Post created Successfully!', post: { _id: new Date().toISOString(), title: title, content: content, creator: { name: 'ali' }, createdAt: new Date() } })

    next()

}