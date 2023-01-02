module.exports = app => {
  const productController = require("../controllers/product.controller.js");

  var router = require("express").Router();

  router.post("/", productController.create);

  router.get("/", productController.findAll);

  router.get("/:id", productController.findOne);

  router.put("/:id", productController.update);

  router.delete("/:id", productController.delete);

  app.use("/api/product", router);
};
