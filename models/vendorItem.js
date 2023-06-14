module.exports = (sequelize, DataTypes, vendor, item) => {
    const Items = sequelize.define('vendoritems', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        vendorid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        itemshave: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: item,
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        }
    },
        {
            timestamps: false
        })
    return Items;
}
