module.exports = (sequelize, DataTypes, model1, model2) => {
    const facility = sequelize.define('facility', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        address: {
            type: DataTypes.STRING,
            default: "abcd"
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false,
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                isContact(value) {
                    console.log(value)
                    if (value.length !== 10) {
                        throw new Error('Size must 10!')
                    }
                    for (const i of value) {
                        if (!(i <= '9' && i >= '0')) {
                            throw new Error("It must number!")
                        }
                    }
                }
            }
        }
    },
        {
            timestamps: false
        }
    )
    return facility;
}