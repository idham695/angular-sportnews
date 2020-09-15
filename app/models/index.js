const dbConfig = require("../config/db.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.news = require("./News.js")(sequelize, Sequelize);
db.comments = require("./Comments.js")(sequelize, Sequelize);
db.categories = require("./Categories.js")(sequelize, Sequelize);

db.news.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.news, {
  foreignKey: "newsId",
  as: "news",
});

db.news.belongsTo(db.categories, {
  foreignKey: "categoryId",
  as: "categories",
});
db.categories.hasMany(db.news, { as: "news" });

module.exports = db;
