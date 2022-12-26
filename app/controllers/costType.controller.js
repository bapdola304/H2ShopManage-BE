const db = require("../models");
const { formatResponse } = require("../utils/formatResponse");
const CostType = db.costType;

exports.create = async (req, res) => {
  try {
    const { body: { costTypeName } = {} } = req;
    const costType = new CostType({
      costTypeName,
    });
    const data = await costType.save(costType)
    res.status(200).send(data)
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the costType."
    });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  try {
    const costType = await CostType.find()
    const response = formatResponse(costType)
    res.status(200).send(response)
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while find the costType."
    });
  }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  const { params: { id } = {} } = req;
  try {
    const costType = await CostType.findById(id)
    if (!costType) {
      res.status(404).send({ message: "Not found costType with id " + id });
    } else {
      const response = formatResponse(costType)
      res.status(200).send(response)
    }
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while find the costType."
    });
  }
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const { params: { id } = {} } = req;
  try {
    const costType = await CostType.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
    if (!costType) {
      res.status(404).send({ message: `Cannot update costType with id=${id}. Maybe costType was not found! `});
    } else {
      const response = formatResponse(costType)
      res.status(200).send(response)
    }
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while updating the costType."
    });
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  const { params: { id } = {} } = req;

  try {
    const costType = await CostType.findByIdAndRemove(id, { useFindAndModify: false })
    if (!costType) {
      res.status(404).send({ message: `Cannot delete costType with id=${id}. Maybe costType was not found! `});
    } else {
      const response = formatResponse(costType)
      res.status(200).send(response)
    }
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while deleting the costType."
    });
  }
};


