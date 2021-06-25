const Sequelize = require("sequelize")
const connection = require("../database/connection")


const Register = connection.define("register", {

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Register.sync({force: false}).then(() => console.log("Table register created successfully"))

module.exports = Register