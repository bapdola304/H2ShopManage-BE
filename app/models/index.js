const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.productType = require("./productType.model.js")(mongoose);
db.warehouses = require("./warehouse.model")(mongoose);
db.costType = require("./costType.model")(mongoose);
db.costsIncurred = require("./costsIncurred.model")(mongoose);
db.productInWarehouse = require("./productInWarehouse.model")(mongoose);
db.productsSold = require("./productsSold.model")(mongoose);

module.exports = db;
