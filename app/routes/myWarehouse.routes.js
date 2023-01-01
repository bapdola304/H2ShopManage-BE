module.exports = app => {
  const myWarehouseController = require("../controllers/myWarehouse.controller");

  var router = require("express").Router();

  // // Create a new Warehouse
  // router.post("/", myWarehouseController.create);
  // Create a new Warehouse
  router.post("/", myWarehouseController.createProduct);

  // Retrieve all Warehouses
  router.get("/", myWarehouseController.findAllProduct);

  // Retrieve a single Warehouse with id
  router.get("/:id", myWarehouseController.findOne);

  // Update a Warehouse with id
  router.put("/:id", myWarehouseController.update);

  // Delete a Warehouse with id
  router.delete("/:id", myWarehouseController.delete);

  app.use("/api/myWarehouse", router);
};
