let db = require('../Model/db');
let alert = require('alert'); 
let islogged =false;
let registerData = db.models.registeruser
console.log('TEST', db.models.registeruser);
console.log('TEST2', registerData);

module.exports.login= function(req,res){
    res.render('login');
}

module.exports.register_user = function(req,res){
    ''
    console.log('body',req.body);
    let uname = req.body.uname;
    let username = req.body.username;
    let pass = req.body.pass;
    let email = req.body.email;
    
    // db.models.login
    registerData.create({
        name : uname,
        username : username,
        password : pass,
        email : email
    })

    console.log(username,pass)
    res.redirect('/');
}

module.exports.registeruser= function(req,res){
    res.render('register');
    // res.render('home');
}

module.exports.home_page=function(req,res){
    console.log('body',req.body);
    let username = req.body.username;
    let pass = req.body.pass;
    registerData.findAll({where : {username : username},raw : true}).then((data)=>{
        console.log('data',data)
        if(data.length == 0){
            alert("User does not exist");
            res.redirect('/')
            // res.send('User does not exist');
        }
        else if(data[0].password !== pass){
            alert("Wrong Password")
            res.redirect('/')
        }
        else{
            res.render('home')
        }
        // let username = data[0].dataValues.name;

        // for(let i=0 ; i<=data.length-1; i++){
        //     console.log(data[i].dataValues.password) 

        //     if(data[i].dataValues.password == pass){
        //         console.log(data[i].dataValues.password)
        //         islogged =true;
        //     // res.render('home')
        // } 
        // // else {
        //     // res.redirect('/')
        // // }
        // }
        // if(islogged == true){
        //     res.render('home')
        // }
        // else if(islogged == false){
        //     res.redirect('/')
        // }
        // let password = data[0].dataValues.password;
        // console.log("pass",password)
        // if(password == pass){
        //     res.render('home')
        // } else {
        //     res.redirect('/')
        // }
    });
    // res.render('home');
}