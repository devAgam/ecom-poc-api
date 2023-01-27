const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.dialect,
    port: 5432,
    logging: false,
    maxConcurrentQueries: 100,
    logging: false,
    pool: { maxConnections: 5, maxIdleTime: 30 },
    language: "en",
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./models/product.model.js")(sequelize, Sequelize);
db.orders = require("./models/order.model.js")(sequelize, Sequelize);

// create OrderProductMap table

db.orderProductMap = require("./models/order-product-map.model.js")(
  sequelize,
  Sequelize
);

// order has many orderProductMap (1 to many)
db.orders.hasMany(db.orderProductMap, {
  as: "orderProductMap",
});

module.exports = db;
