const { Model, DataTypes } = Require ('sequalize');
const sequalize = require('../config/connections');

class Category extends Model {}

Category.init(
    {
        id: {
            tyoe: DataTypes.INTEGER,
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
        sequalize,
        timestamp: false,
        freezetableName: true,
        modelName: 'category'
    }
);

moodule.expoorts = Category