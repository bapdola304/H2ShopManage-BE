const db = require("../models");
const { formatResponse } = require("../utils/formatResponse");
const Warehouse = db.warehouses;

exports.create = async (req, res) => {
  try {
    const { body: { warehouseName, address, contactName, contactPhone } = {} } = req;
    const warehouse = new Warehouse({
      warehouseName,
      address,
      contactName,
      contactPhone
    });
    const data = await warehouse.save(warehouse)
    res.status(200).send(data)
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the warehouse."
    });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  try {
    const warehouses = await Warehouse.find()
    const response = formatResponse(warehouses)
    res.status(200).send(response)
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while find the warehouse."
    });
  }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  const { params: { id } = {} } = req;
  try {
    const warehouse = await Warehouse.findById(id)
    if (!warehouse) {
      res.status(404).send({ message: "Not found warehouse with id " + id });
    } else {
      const response = formatResponse(warehouse)
      res.status(200).send(response)
    }
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while find the warehouse."
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
    const warehouse = await Warehouse.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
    if (!warehouse) {
      res.status(404).send({ message: `Cannot update warehouse with id=${id}. Maybe warehouse was not found! `});
    } else {
      const response = formatResponse(warehouse)
      res.status(200).send(response)
    }
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while updating the warehouse."
    });
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  const { params: { id } = {} } = req;

  try {
    const warehouse = await Warehouse.findByIdAndRemove(id, { useFindAndModify: false })
    if (!warehouse) {
      res.status(404).send({ message: `Cannot delete warehouse with id=${id}. Maybe warehouse was not found! `});
    } else {
      const response = formatResponse(warehouse)
      res.status(200).send(response)
    }
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while deleting the warehouse."
    });
  }
};


