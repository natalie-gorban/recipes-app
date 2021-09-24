const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.URI, {
  dialect: config.dialect,
  ssl: config.ssl,
  dialectOptions: config.dialectOptions,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.recipe = require("../models/recipe.model.js")(sequelize, Sequelize);

//// planetscale DBs based on Vitess (Serverless DB MySQL), it does not allow to use foreign key constraints, so we have to use not coupled IDs inside recipe schema
// db.user.hasMany(db.recipe, {as: 'Recipes'})
// db.image.belongsTo(db.recipe)

module.exports = db;
