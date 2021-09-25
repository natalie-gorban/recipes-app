const db = require("../models");
const Recipe = db.recipe;

exports.addRecipe = (req, res) => {
  // Save Recipe to Database
  let message = "Message not initialized";
  let fields = {
    ...req.body,
    userId: req.userId, // Provided by middleware/authJwt added from routes/recipe.routes
  };
  if (req.body.recipeId) {
    fields.id = req.body.recipeId;
  }
  console.log("controller addRecipe fields", fields);

  Recipe.upsert(fields, {
    returning: true,
  })
    .then((recipe, isNewRecord) => {
      let dirtyWorkaroundRecipeId = recipe[0].dataValues.id; // due to known bug in sequelize, there is no possibility to get recipe.id after upsert
      if (isNewRecord) {
        message = `Existing recipe with id [${dirtyWorkaroundRecipeId}] has been edited successfully!`;
      } else {
        message = `New recipe with id [${dirtyWorkaroundRecipeId}] has been added successfully!`;
      }
      console.log("controller addRecipe message", message);
      res.send({
        message,
        recipeId: dirtyWorkaroundRecipeId,
      });
    })
    .catch((err) => {
      message = err.message;
      console.log("controller addRecipe message", message);
      res.status(500).send({
        message,
      });
    });
};

exports.deleteRecipe = (req, res) => {
  let message = "Message not initialized";
  Recipe.findOne({
    where: {
      id: req.body.recipeId,
    },
  })
    .then((recipe) => {
      if (recipe.userId === req.body.userId) {
        Recipe.destroy({
          where: {
            id: recipe.id,
          },
        }).then(() => {
          message = `Recipe with id [${recipe.id}] has been deleted successfully!`;
          console.log("deleteRecipe message", message);
          res.send({
            message,
          });
        });
      } else {
        message = `Recipe with id [${recipe.id}] was created by user [${recipe.id}], but was requested to be deleted by user [${req.body.userId}]`;
        console.log("deleteRecipe message", message);
        res.status(500).send({
          message,
        });
      }
    })
    .catch((err) => {
      message = err.message;
      console.log("deleteRecipe message", message);
      res.status(500).send({
        message,
      });
    });
};

exports.getRecipe = (req, res) => {
  let message = "Message not initialized";
  Recipe.findOne({
    where: {
      id: req.body.recipeId,
    },
  })
    .then((recipe) => {
      message = `Recipe with id [${recipe.id}] was created by user [${recipe.id}], but was requested to be deleted by user [${req.body.userId}]`;
      console.log("deleteRecipe message", message);
    })
    .catch((err) => {
      message = err.message;
      console.log("deleteRecipe message", message);
      res.status(500).send({
        message,
      });
    });
};
