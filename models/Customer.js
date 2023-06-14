const Proflie = require("../Helper/Proflie");
module.exports = (sequelize, DataTypes) => {
    const Persons = sequelize.define('customers', Proflie(DataTypes))
    return Persons;
}