require('dotenv').config();
const express = require('express');



const cors = require('cors')
const router = require('./router/feed')


const app = express();


app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }))



app.use('/feed', router)







const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}😄`);
})