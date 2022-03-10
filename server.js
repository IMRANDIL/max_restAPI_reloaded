require('dotenv').config();
const path = require('path')
const express = require('express');

const mongoose = require('mongoose')

const cors = require('cors')
const router = require('./router/feed')


const app = express();


app.use(cors());

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







