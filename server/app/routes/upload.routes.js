const { authJwt } = require("../middleware");
const controller = require("../controllers/file.controller");

module.exports = (app) => {

  app.post(
    "/api/upload",
    [authJwt.verifyToken],
    controller.upload
  );
  app.get("/api/file_url/:name", controller.getFileUrl);
  app.get("/api/file/:name", controller.download);

};
