module.exports = app => {
    const productSoldController = require("../controllers/productSold.controller");

    var router = require("express").Router();

    router.post("/", productSoldController.create);

    router.get("/", productSoldController.findAll);

    router.get("/:id", productSoldController.findOne);

    router.put("/:id", productSoldController.update);

    router.delete("/:id", productSoldController.delete);

    app.use("/api/productSold", router);
  };
