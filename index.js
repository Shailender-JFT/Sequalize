const Sequelize = require('sequelize');

const {Op} = Sequelize;

const bcrypt = require('bcrypt');

const zlib = require('zlib');

const sequelize = new Sequelize('mydb_use','root','password',{
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});


// sequelize.authenticate().then(()=>{
//     console.log("Connection Sucessfull");
// }).catch((err) =>{
//     console.log("error while connection",err);
// })

// console.log("another task")


const user = sequelize.define('user',{

    user_id : {
        type : Sequelize.DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement  : true 
    },

    username : {
        type : Sequelize.DataTypes.STRING,
        allowNull : false,
        validate : {
            len : [4,6]
        },
        get(){
            const rawValue = this.getDataValue('username');
            return rawValue.toUpperCase();
        }
    },

    password : {
        type : Sequelize.DataTypes.STRING,
        set(value){
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(value,salt)
            this.setDataValue('password',hash)
        }
    },

    age : {
        type : Sequelize.DataTypes.INTEGER,
        defaultValue : 21
    },

    coding : {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue : true
    },

    description : {
        type : Sequelize.DataTypes.STRING,
        set(value){
            const compressed = zlib.deflateSync(value).toString('base64');
            this.setDataValue('description', compressed);
        },
        get(){
            const value = this.getDataValue('description');
            const uncompressed = zlib.inflateSync(Buffer.from(value,'base64'));
            return uncompressed.toString();
        }
    },

    about_user :{
        type : Sequelize.DataTypes.VIRTUAL,
        get(){
            return `${this.username} ${this.description}`
        }
    }
    
},{
    freezeTableName : true
})

user.sync({alter : true}).then(()=>{
    console.log("Table sync succefully");

    //######################create and save dat using build() and save()################################

    // const users = user.build({username : 'shailender', password : 123, age : '25', coding:true})
    // // console.log(users.username);
    // return users.save();


    //----------- create and save data using create() --------------

    // return user.create({
    //     username : "Tanny",
    //     password : "123454321",
    //     age : 22,
    //     coding : false,
    //     description : 'hello this is new data'
    // });


    //===============storing multiple data using bulkCreate()===================

//     return user.bulkCreate([{
//         username : 'jame',
//         age : 26,
//     },
//     {
//         username : 'rohit',about_user
//         password : 123456,
//         coding : falseys
//     }
// ],{
//     validate : true 
// })

    //----------use to select all data in table--------------
    // return user.findAll(); 


    //-----------------use to select only column in table--------------

    // return user.findAll({attributes : ['username', 'password']})

    //-----------using allias in findAll()------------------

    // return user.findAll({attributes : [['username' ,'myName'], ['password', 'pwd']]})


    //----------using squelize.fn()-------------

    // return user.findAll({attributes : [[sequelize.fn('AVG',sequelize.col('age')),'howOld']]})


    //------------using exclude keyword to not return what data we want---------------------

    // return user.findAll({attributes : {exclude : ['password']}})

    //-----------------using where clause ----------------------

    // return user.findAll({attributes : ['username'], where : {age :'21'}})

    // return user.findAll({where : {age :'21' , username: 'rohit'}, raw : true});

    //--------using limit----------
    // return user.findAll({limit :2})


    //--------using order------------

    // return user.findAll({order : [['age','DESC']]})

    // return user.findAll({order : [['age','ASC']]})

    //-----------------USING GROUPS------------------

    //     return user.findAll({attributes : ['username', [sequelize.fn('SUM',sequelize.col('age')), 'sum_age']],
    //     group : 'username'
    // })


    //-------------------using operators--------------

        // return user.findAll({where : {
        //     [Op.or] :{username :'mohan', age : 25}
        // }})

        // return user.findAll({where : {
        //     age : {
        //         [Op.gt] : 25
        //     }
        // }})

    //------------------where function-----------------

        // return user.findAll({where :
        //         sequelize.where(sequelize.fn('char_length',sequelize.col('username')),5)
        //     })

    //------------------using update function-----------------

        // return user.update({username : 'shailender'},{
        //     where : {age: 25}
        // })

        // return user.update({username : 'Dhoni'},{
        //     where : {age : {
        //         [Op.gt] : 25
        //     }}
        // })

    //--------------------using destory() for delete rows in table-------------

        // return user.destroy({where : {username : 'sohit'}})

    //--------------------utility method-------------------------------

        // return user.max('age');


    //-------------------findByPk() and findOne()--------------------

        // return user.findByPk(4);

        return user.findOne({where : {username : 'Tanny'}});

        // return user.findOne({where : {
        //     age : {
        //         [Op.or] : {
        //             [Op.lt]: 45
        //         }
        //     }
        // }})

    //--------------------findOrCreate()----------------------------

        // return user.findOrCreate({where : {username : 'Dhoni'}})

    //--------------------findAndCountAll()-------------------------

        // return user.findAndCountAll({where : {username : 'Dhoni'}});

}).then((data)=>{
    // data.username = 'mohan';
    // data.age = 45;
    // return data.save({field : ['age']});
    // data.decrement({age : 2});
    // data.increment({age : 2});
    // data.forEach((element) =>{
    //     console.log("elements",element.toJSON());
    // });
    // const {count,rows} = data;
    // console.log('count',count);
    // console.log('rows',rows);
    // console.log(data.username)
    // console.log(data.password)
    // console.log(data.description);
    console.log(data.about_user);
})
// .then((data)=>{
//     console.log("data updated",data.toJSON());
// })
.catch((err)=>{
    console.log("Error While created succefully",err);

})
//    console.log(sequelize.models.user);