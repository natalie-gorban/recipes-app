module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("recipes", {
    recipeTitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tags: {
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
    userId: { // we do not use foreign keys due to Planetscale issues with foreign keys (because Planetscale use serverless MySQL - Vitess)
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
