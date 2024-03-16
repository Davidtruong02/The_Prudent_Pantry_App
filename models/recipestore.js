// models/Recipe.js

const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection')

class RecipeStore extends Model {}

RecipeStore.init(
  {
    id: {
      type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true  
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    recipeImage: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url: {
      type: DataTypes.TEXT,
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
  },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipestore',
    }
);

module.exports = RecipeStore;