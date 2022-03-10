require('dotenv').config();
const path = require('path')
const express = require('express');

const mongoose = require('mongoose')

const cors = require('cors')
const router = require('./router/feed');

const multer = require('multer')


const app = express();




const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
})



const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}



app.use(cors());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(express.json());



app.use(express.urlencoded({ extended: true }))



app.use('/feed', router)




















//Error handeling...middleware...

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message })
})













const PORT = process.env.PORT || 3000;


//database connection....

mongoose.connect(process.env.URI).then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port: ${PORT}😄`);
    })
}).catch((err) => console.log(err))







