const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.get("/api/test/all", controller.publicContent);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userContent
  );
};
