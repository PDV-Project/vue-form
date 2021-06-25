const {Sequelize} = require("sequelize")

const connection = new Sequelize("users", "root", "suaSenhaAqui", {

    host: "localhost",
    dialect: "mysql",
    dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true
    },
    timezone: '-3:00',  
})

module.exports = connection