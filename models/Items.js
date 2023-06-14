module.exports = (sequelize, DataTypes) => {
    const Items = sequelize.define('items', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        cost: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        filelink: {
            type: DataTypes.STRING,
            defaultValue: "abc"
        },
        assured: {
            type: DataTypes.ENUM,
            values: ['0', '1'],
            defaultValue: '0'
        }
    })
    return Items;
}
