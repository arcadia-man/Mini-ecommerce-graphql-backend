const { Sequelize } = require("sequelize");
require('dotenv').config()
console.log(process.env)
const sequelize = new Sequelize(process.env.DATABASE, process.env.NUSERNAME, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log
});
try {
    sequelize.authenticate();
    console.log("connected");
} catch (error) {
    console.log(error)
}
module.exports = sequelize;

