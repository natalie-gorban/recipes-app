module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("recipes", {
    recipeTitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ingredients: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    method: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    prepTime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cookTime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imageName: {
      type: Sequelize.STRING,
    },
    privateRecipe: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Recipe;
};
