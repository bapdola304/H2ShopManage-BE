module.exports = app => {
    const myWarehouseController = require("../controllers/myWarehouse.controller");

    var router = require("express").Router();

    // Create a new Warehouse
    router.post("/", myWarehouseController.create);

    // Retrieve all Warehouses
    router.get("/", myWarehouseController.findAll);

    // Retrieve a single Warehouse with id
    router.get("/:id", myWarehouseController.findOne);

    // Update a Warehouse with id
    router.put("/:id", myWarehouseController.update);

    // Delete a Warehouse with id
    router.delete("/:id", myWarehouseController.delete);

    app.use("/api/myWarehouse", router);
  };
