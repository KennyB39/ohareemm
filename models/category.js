const { Model, DataTypes } = require ('sequelize');
const sequelize = require('../config/connections');

class Category extends Model {}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            AutoIncrement: true
        },
        categoryName: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamp: false,
        freezeTableName: true,
        modelName: 'category'
    }
);

module.exports = Category;