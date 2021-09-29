const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./app/models");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

 // initialization of DB models
if (process.env.FORCE_RESYNC === "true") {
  console.log(
    `start force to resync DB due FORCE_RESYNC=[${process.env.FORCE_RESYNC}]`
  );
  db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and Resync Db is done");
  });
} else {
  console.log("start sync db");
  db.sequelize.sync().then(() => {
    console.log("Resync Db is done");
  });
}

// // for dev drop and resync
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

require("./app/routes")(app);
