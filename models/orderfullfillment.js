module.exports = (sequelize, DataTypes, model1,  model3) => {
    const orderff = sequelize.define('orderfullfillments', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: model1,
                key: 'id'
            }
        },
        vendorid: {
            type: DataTypes.INTEGER,
        },
        quntityfullfillment: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        orderdate: {
            type: DataTypes.DATE,
        },
        fullfillmentdate: {
            type: DataTypes.DATE,
        },
        facilityaddress:{
            type: DataTypes.INTEGER,
            allowNull : false,
            references: {
                model : model3,
                key: 'id'
            }
        },
        status: {
            type: DataTypes.ENUM,
            values: ['1','2','3','4','5'] 
        },
    },

        {
            timestamps: false
        }
    )
    return orderff;
}

/*
1. Fullfilment request
2. Fullfilemrnt delivered
3. Fullfilement recived4
4. Fullfilement return
5. canceled
*/