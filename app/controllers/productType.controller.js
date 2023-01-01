const db = require("../models");
const { formatResponse } = require("../utils/formatResponse");
const ProductType = db.productType;

exports.create = async (req, res) => {
  try {
    const { body: { productName, warrantyPeriod } = {} } = req;
    const product = new ProductType({
      productName,
      warrantyPeriod
    });
    const data = await product.save(product)
    res.status(200).send(data)
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the product."
    });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  try {
    const produdcts = await ProductType.find()
    const response = formatResponse(produdcts)
    res.status(200).send(response)
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while find the product."
    });
  }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  const { params: { id } = {} } = req;
  try {
    const produdct = await ProductType.findById(id)
    if (!produdct) {
      res.status(404).send({ message: "Not found ProductType with id " + id });
    } else {
      const response = formatResponse(produdct)
      res.status(200).send(response)
    }
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while find the product."
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
    const produdct = await ProductType.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
    if (!produdct) {
      res.status(404).send({ message: `Cannot update ProductType with id=${id}. Maybe ProductType was not found! `});
    } else {
      const response = formatResponse(produdct)
      res.status(200).send(response)
    }
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while updating the product."
    });
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  const { params: { id } = {} } = req;

  try {
    const produdct = await ProductType.findByIdAndRemove(id, { useFindAndModify: false })
    if (!produdct) {
      res.status(404).send({ message: `Cannot delete ProductType with id=${id}. Maybe ProductType was not found! `});
    } else {
      const response = formatResponse(produdct)
      res.status(200).send(response)
    }
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while deleting the product."
    });
  }
};


