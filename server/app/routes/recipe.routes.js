const { authJwt } = require("../middleware");
const { cdn_url } = require("../config/aws.config");

// const upload = require("../middleware/upload");
const controller = require("../controllers/recipe.controller");

module.exports = (app) => {
  app.post("/api/recipe/add", [authJwt.verifyToken], controller.addRecipe);

  app.post(
    "/api/recipe/delete",
    [authJwt.verifyToken],
    controller.deleteRecipe
  );

  app.post("/api/recipe/get", controller.getRecipe);

  app.get("/api/recipe/all", controller.getAllRecipes);
};
