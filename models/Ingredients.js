// models/Ingredients.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Ingredients extends Model {}

Ingredients.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true  
    },
    quantity: {
      type: DataTypes.DECIMAL(10.2),
      allowNull: true,
      defaultValue: 1
    },
    measure: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true, 
      references: {
        model: 'user',
        key: 'id'
      }
    },
    recipe_Id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'recipe',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ingredients',
  }
);

module.exports = Ingredients;