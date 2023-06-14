const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.customer = require("./Customer")(sequelize, DataTypes);
db.vendor = require("./Vendors")(sequelize, DataTypes);
db.item = require("./Items")(sequelize, DataTypes);
db.facility = require("./Facility")(sequelize, DataTypes);

db.vendorItem = require("./vendorItem")(sequelize, DataTypes, db.vendor, db.item);
db.order = require("./Orders")(sequelize, DataTypes, db.customer, db.item);
db.invoice = require("./Invoice")(sequelize, DataTypes, db.order, db.facility);
db.orderfullfillment = require("./orderfullfillment")(sequelize, DataTypes, db.order, db.facility);
db.vendor.hasMany(db.vendorItem, { foreignKey: "vendor_to_ventoritem", })
db.vendorItem.belongsTo(db.vendor, { foreignKey: "vendor_to_ventoritem" })
db.sequelize.sync({ force: false }).then(() => {
    console.log("Yes-sync")
});

module.exports = db;