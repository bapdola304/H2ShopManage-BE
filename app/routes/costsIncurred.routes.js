module.exports = app => {
    const costsIncurredController = require("../controllers/costType.controller");

    var router = require("express").Router();

    router.post("/", costTypeController.create);

    router.get("/", costTypeController.findAll);

    router.get("/:id", costTypeController.findOne);

    router.put("/:id", costTypeController.update);

    router.delete("/:id", costTypeController.delete);

    app.use("/api/costType", router);
  };
