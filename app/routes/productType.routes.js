module.exports = app => {
  const productTypeController = require("../controllers/productType.controller.js");

  var router = require("express").Router();

  router.post("/", productTypeController.create);

  router.get("/", productTypeController.findAll);

  router.get("/:id", productTypeController.findOne);

  router.put("/:id", productTypeController.update);

  router.delete("/:id", productTypeController.delete);

  app.use("/api/productType", router);
};
