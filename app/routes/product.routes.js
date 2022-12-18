module.exports = app => {
  const productController = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Create a new Product
  router.post("/", productController.create);

  // Retrieve all Products
  router.get("/", productController.findAll);

  // Retrieve a single Product with id
  router.get("/:id", productController.findOne);

  // Update a Product with id
  router.put("/:id", productController.update);

  // Delete a Product with id
  router.delete("/:id", productController.delete);

  app.use("/api/product", router);
};
