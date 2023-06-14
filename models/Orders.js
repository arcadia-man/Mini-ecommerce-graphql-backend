module.exports = (sequelize, DataTypes, model1, model2) => {
    const order = sequelize.define('orders', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customerid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: model1,
                key: 'id'
            }
        },
        orderitem: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: model2,
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        order_at: {
            type: DataTypes.DATE,
        },
        barcode:{
            type : DataTypes.STRING,
            allowNull : false
        },
        status: {
            type: DataTypes.ENUM,
            values: ['1','2','3','4','5','6','7'] 
        },
        expected_date : {
            type :DataTypes.DATE,
        }
    },
        {
            timestamps: false
        })
    return order;
}

/*
1. Order Placed
2. Order is fullfilled
3. Order's invoice is generated
4. Order is reached to caratlane facility
5. Order is Out for delivery
6. Order is Deliverd
7. Order is canceled
 */