module.exports = app => {
    const costsIncurredController = require("../controllers/costsIncurred.controller");

    var router = require("express").Router();

    router.post("/", costsIncurredController.create);

    router.get("/", costsIncurredController.findAll);

    router.get("/:id", costsIncurredController.findOne);

    router.put("/:id", costsIncurredController.update);

    router.delete("/:id", costsIncurredController.delete);

    app.use("/api/costIncurred", router);
  };
