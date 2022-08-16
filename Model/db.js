const Sequelize = require('sequelize');
const {DataTypes} = Sequelize;

const sequelize = new Sequelize('student_table','root','password',{
        host : 'localhost',
        port :  3306,
        dialect : 'mysql'
});


const login_page = sequelize.define('registeruser',{
    user_id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        
    },
    
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },

    password : {
        type : DataTypes.STRING,
        allowNull : false,
    },

    email : {
        type : DataTypes.STRING,
        allowNull : false
    },

    username : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            len : [4,20]
        },
        unique : true
    }
},
{
    freezeTableName  : true
})

    login_page.sync().then(()=>{
        console.log('model created');
        // console.log('sw',sequelize)
    }).catch((err)=>{
        console.log('error',err)
    })
    //     console.log('sw',sequelize)
    // module.exports=sequelize;
    module.exports=sequelize;