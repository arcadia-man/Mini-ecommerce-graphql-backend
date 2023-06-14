module.exports = (sequelize, DataTypes, model1, model2) => {
    const order = sequelize.define('invoices', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: model1,
                key: 'id'
            }
        },
        facility: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: model2,
                key: 'id'
            }
        },
        costvalue : {
            type: DataTypes.DOUBLE,
            defaultValue : 100000000
        },
        status : {
            type : DataTypes.ENUM,
            allowNull : false,
            values :['paid' , 'dues'],
            defaultValue : 'dues'
        }
    },
        {
            timestamps: false
        })
    return order;
}
