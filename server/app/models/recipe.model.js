module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("recipes", {
    recipeTitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    ingredients: {
      type: Sequelize.STRING,
    },
    method: {
      type: Sequelize.STRING,
    },
    prepTime: {
      type: Sequelize.STRING,
    },
    cookTime: {
      type: Sequelize.STRING,
    },
    imageName: {
      type: Sequelize.STRING,
    },
    privateRecipe: {
      type: Sequelize.BOOLEAN,
    },
    userId: {
      type: Sequelize.STRING,
    },
  });

  return Recipe;
};
