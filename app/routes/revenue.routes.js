module.exports = app => {
    const revenueController = require("../controllers/revenue.controller");

    var router = require("express").Router();

    // router.post("/", costTypeController.create);

    router.get("/", revenueController.findAll);

    // router.get("/:id", costTypeController.findOne);

    // router.put("/:id", costTypeController.update);

    // router.delete("/:id", costTypeController.delete);

    app.use("/api/revenue", router);
  };
