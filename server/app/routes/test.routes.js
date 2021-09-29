const { authJwt } = require("../middleware");

module.exports = (app) => {

  app.get("/healthz", (req, res) => {
    console.log("/healthz get request");
    res.send({ express: "Backend is online" });
  });

  app.post("/api/test", (req, res) => { // just test without check for jwt (userId should be always undefined)
    console.log("test body", req.body);
    console.log("test userId", req.userId);
    res.send({
      message: "OK",
      recipeId: 0,
    });
  });

  app.post("/api/test/jwt", [authJwt.verifyToken], (req, res) => { // just test with JWT token (userId will be checked and userId will be returned)
    console.log("test body", req.body, req.params);
    console.log("test userId", req.userId);
    res.send({
      message: "OK",
      recipeId: 0,
    });
  });
};
