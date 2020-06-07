const express = require('express')
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const sendMail=require('./email')  //use this function whenwver you want to send an email sendMail(email,data to be passed)
dotenv.config();

const app = express()


// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
mongoose.connect(`mongodb://${process.env.DEVELOPMENT_SERVER}:${process.env.DATA_BASE_PORT}/OnlineExamsPlatform`, { useNewUrlParser: true, useUnifiedTopology: true  }, (err)=>{
    if( err){
        console.log(err);
    } else {
        console.log('\x1b[32m%s\x1b[0m',`connected to mongoose on port ${process.env.DATA_BASE_PORT}`);
    }
    ;})



    // call the function at the route that is required
   // sendMail('m.naguib2611@gmail.com',99);
    

    
    // middleware that logs requests method and the url requested.
    app.use((req, res, next) => {
        console.log(`\n\n${new Date().toISOString()}`);
        console.log(`new request, its method: ${req.method}`);
        console.log(`the url requested: ${req.url}\n`);
        next();
    })
    
    app.get('/', (req, res) => res.send('Hello World!'))








app.listen(process.env.SERVER_PORT, () => console.log('\x1b[32m%s\x1b[0m',`Example app listening at http://localhost:${process.env.SERVER_PORT}`))