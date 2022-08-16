const express = require('express');
const app = express();
const path = require('path');
app.use(express.urlencoded({extended: false}))

app.set("view engine","ejs");
app.set("views",path.join(__dirname,'View'));

app.use('/',require('./Router/router'));

app.listen(9000,(err)=>{
    console.log(err);
    console.log('server started.........');
})