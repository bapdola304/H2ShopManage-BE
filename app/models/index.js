const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.products = require("./product.model.js")(mongoose);
db.warehouses = require("./warehouse.model")(mongoose);
db.mywarehouse = require("./myWarehouse.model")(mongoose);
db.productSold = require("./productSold.model")(mongoose);
db.costType = require("./costType.model")(mongoose);
db.costsIncurred = require("./costsIncurred.model")(mongoose);

module.exports = db;
