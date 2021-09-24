module.exports = (app) => {
  require("./auth.routes")(app);
  require("./user.routes")(app);
  require("./upload.routes")(app);
  require("./recipe.routes")(app);
  require("./test.routes")(app);
};
