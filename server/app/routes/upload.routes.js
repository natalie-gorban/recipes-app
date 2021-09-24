const { authJwt, upload } = require("../middleware");
const { cdn_url } = require("../config/aws.config");

// const upload = require("../middleware/upload");
const controller = require("../controllers/file.controller");

module.exports = (app) => {
  app.post("/api/upload", [authJwt.verifyToken, upload], controller.upload);
  app.get("/api/file_url/:name", controller.getFileUrl);
  app.get("/api/file/:name", controller.download);
  app.get("/api/cdn", (req, res) => {
    res.send(cdn_url);
  });
};
