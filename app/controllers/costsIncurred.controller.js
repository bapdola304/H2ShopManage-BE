const db = require("../models");
const { formatResponse } = require("../utils/formatResponse");
const CostsIncurred = db.costsIncurred;

exports.create = async (req, res) => {
  try {
    const { body: { costIncurredName, inputDate, price, quantity, total, costTypeId } = {} } = req;
    const costsIncurred = new CostsIncurred({
      costIncurredName,
      inputDate,
      price,
      quantity,
      total,
      costType: costTypeId
    });
    const data = await costsIncurred.save(costsIncurred)
    res.status(200).send(data)
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the costsIncurred."
    });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  try {
    const costsIncurred = await CostsIncurred.find().populate('costType').exec();
    const response = formatResponse(costsIncurred);
    res.status(200).send(response);
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while find the costsIncurred."
    });
  }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  const { params: { id } = {} } = req;
  try {
    const costsIncurred = await CostsIncurred.findById(id)
    if (!costsIncurred) {
      res.status(404).send({ message: "Not found costsIncurred with id " + id });
    } else {
      const response = formatResponse(costsIncurred)
      res.status(200).send(response)
    }
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while find the costsIncurred."
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
  const { params: { id } = {}, body = {} } = req;
  const { costTypeId } = body;
  const bodyData = {
    ...body,
    costType: costTypeId
  }
  try {
    const costsIncurred = await CostsIncurred.findByIdAndUpdate(id, bodyData, { useFindAndModify: true })
    if (!costsIncurred) {
      res.status(404).send({ message: `Cannot update costsIncurred with id=${id}. Maybe costsIncurred was not found! `});
    } else {
      const response = formatResponse(costsIncurred)
      res.status(200).send(response)
    }
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while updating the costsIncurred."
    });
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  const { params: { id } = {} } = req;

  try {
    const costsIncurred = await CostsIncurred.findByIdAndRemove(id, { useFindAndModify: false })
    if (!costsIncurred) {
      res.status(404).send({ message: `Cannot delete costsIncurred with id=${id}. Maybe costsIncurred was not found! `});
    } else {
      const response = formatResponse(costsIncurred)
      res.status(200).send(response)
    }
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while deleting the costsIncurred."
    });
  }
};


