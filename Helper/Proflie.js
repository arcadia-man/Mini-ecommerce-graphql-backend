module.exports = (DataTypes) => {
    return {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        pincode: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        town: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        contact: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }
}