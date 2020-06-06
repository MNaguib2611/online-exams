const express = require('express')
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const app = express()

// middleware that logs requests method and the url requested.
app.use((req, res, next) => {
    console.log(`\n\n${new Date().toISOString()}`);
    console.log(`new request, its method: ${req.method}`);
    console.log(`the url requested: ${req.url}\n`);
    next();
})

app.get('/', (req, res) => res.send('Hello World!'))



// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
mongoose.connect(`mongodb://${process.env.DEVELOPMENT_SERVER}:${process.env.DATA_BASE_PORT}/OnlineExamsPlatform`, { useNewUrlParser: true, useUnifiedTopology: true  }, (err)=>{
    if( err){
        console.log(err);
    } else {
        console.log(`connected to mongoose on port ${process.env.DATA_BASE_PORT}`);
    }
;})
app.listen(process.env.SERVER_PORT, () => console.log(`Example app listening at http://localhost:${process.env.SERVER_PORT}`))