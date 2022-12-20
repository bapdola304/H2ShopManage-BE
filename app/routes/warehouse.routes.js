module.exports = app => {
    const warehouseController = require("../controllers/warehouse.controller");

    var router = require("express").Router();

    // Create a new Warehouse
    router.post("/", warehouseController.create);

    // Retrieve all Warehouses
    router.get("/", warehouseController.findAll);

    // Retrieve a single Warehouse with id
    router.get("/:id", warehouseController.findOne);

    // Update a Warehouse with id
    router.put("/:id", warehouseController.update);

    // Delete a Warehouse with id
    router.delete("/:id", warehouseController.delete);

    app.use("/api/warehouse", router);
  };
