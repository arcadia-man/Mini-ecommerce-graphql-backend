const Profile = require("../Helper/Proflie")
module.exports = (sequelize, DataTypes) => {
    const Persons = sequelize.define('vendors', Profile(DataTypes))
    return Persons;
}

