const db = require("../models");
const { formatResponse } = require("../utils/formatResponse");
const Product = db.product;

exports.create = async (req, res) => {
  try {
    const { body: { productName, productTypeId } = {} } = req;
    const product = new Product({
      productName,
      productType: productTypeId
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

exports.findAll = async (req, res) => {
  const { query: { productTypeId } = {} } = req;
  var condition = {}
  if (productTypeId) {
    condition.productType = productTypeId;
  }
  try {
    const produdcts = await Product.find(condition).populate('productType').exec();
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

exports.findOne = async (req, res) => {
  const { params: { id } = {} } = req;
  try {
    const produdct = await Product.findById(id)
    if (!produdct) {
      res.status(404).send({ message: "Not found Product with id " + id });
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

exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const { params: { id } = {}, body: { productName, productTypeId } = {} } = req;
  const body = {
    productName,
    productType: productTypeId
  }
  try {
    const produdct = await Product.findByIdAndUpdate(id, body, { useFindAndModify: true })
    if (!produdct) {
      res.status(404).send({ message: `Cannot update Product with id=${id}. Maybe Product was not found! `});
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

exports.delete = async (req, res) => {
  const { params: { id } = {} } = req;
  try {
    const produdct = await Product.findByIdAndRemove(id, { useFindAndModify: false })
    if (!produdct) {
      res.status(404).send({ message: `Cannot delete Product with id=${id}. Maybe Product was not found! `});
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


