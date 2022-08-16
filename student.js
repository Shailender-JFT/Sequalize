const Sequelize = require('sequelize');
const {Op} = Sequelize;

const sequelize = new Sequelize('student_table','root','password',{
    host : 'localhost',
    port :  3306,
    dialect : 'mysql'
});


const student = sequelize.define('student',{

    student_id :{
        type : Sequelize.DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },

    student_name : {
        type : Sequelize.DataTypes.STRING,
        allowNull : false,
        validate :{
            len : [4,20]
        }
    },

    favorite_class : {
        type : Sequelize.DataTypes.STRING,
        defalutValue : 'Computer Science'
    },

    school_year : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull : false
    },

    school_subscribe : { 
        type : Sequelize.DataTypes.BOOLEAN,
        defalutValue : true
    }
},{
    freezeTableName  : true
})

student.sync().then((data)=>{
    console.log("connection done");

    // return 


}).catch((err)=>{
    console.log("err",err);
})

// student.bulkCreate([{
//     student_name : 'Shailender',
//     school_year : 2022,

// },
//    {
//     student_name : 'Uzer',
//     favorite_class : 'Sports',
//     school_year : 2022,
//     school_subscribe : false
//    } ,
//    {
//     student_name : 'Aman',
//     favorite_class : 'Computer Science',
//     school_year : 2022,
//     school_subscribe : true
//    } 
//    ,
//    {
//     student_name : 'Manoj',
//     favorite_class : 'Music',
//     school_year : 2022,
//     school_subscribe : true
//    } 
    
// ],
// {
//     validate : true
// }).then((data)=>{
//     data.forEach(element =>{
//         console.log(element.toJSON())
//     })
// }).catch((err)=>{
//     console.log("err",err);
// })

student.findAll({
//     attributes :['student_name'],
//     where  : {
//     [Op.or] : {favorite_class : 'Computer Science', school_subscribe : true}
// }

        attributes : [[sequelize.fn('COUNT', sequelize.col('school_year')), 'num_student'],
    ],
    group : ['school_year']
})

.then((data)=>{
    data.forEach(element =>{
                console.log(element.toJSON())
            })
}).catch((err)=>{
    console.log("err",err)
})