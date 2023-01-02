const db = require("../models");
const { formatResponse } = require("../utils/formatResponse");
const ProductsSold = db.productsSold;

exports.create = async (req, res) => {
  try {
    const { body: { productWarehouseId, customer, customerPhone, sellPrice, inputDate, quantity, total, colorId } = {} } = req;
    const productSold = new ProductsSold({
      productWarehouseId,
      customer,
      customerPhone,
      sellPrice,
      inputDate,
      quantity,
      total,
      colorId
    });
    const data = await productSold.save(productSold)
    res.status(200).send(data)
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const productSold = await ProductsSold.find().populate(
      {
        path: 'productWarehouseId',
        populate: { path: 'product' }
      }
    ).exec();
    const response = formatResponse(productSold)
    res.status(200).send(response)
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message
    });
  }
};

exports.findOne = async (req, res) => {
  const { params: { id } = {} } = req;
  try {
    const productSold = await ProductsSold.findById(id).populate(
      {
        path: 'productWarehouseId',
        populate: { path: 'product' }
      }
    ).exec()
    if (!productSold) {
      res.status(404).send({ message: "Not found warehouse with id " + id });
    } else {
      const response = formatResponse(productSold)
      res.status(200).send(response)
    }
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message
    });
  }
};

exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const { params: { id } = {} } = req;
  try {
    const productSold = await ProductsSold.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
    if (!productSold) {
      res.status(404).send({ message: `Cannot update warehouse with id=${id}. Maybe warehouse was not found! `});
    } else {
      const response = formatResponse(productSold)
      res.status(200).send(response)
    }
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message
    });
  }
};

exports.delete = async (req, res) => {
  const { params: { id } = {} } = req;

  try {
    const productSold = await ProductsSold.findByIdAndRemove(id, { useFindAndModify: false })
    if (!productSold) {
      res.status(404).send({ message: `Cannot delete warehouse with id=${id}. Maybe warehouse was not found! `});
    } else {
      const response = formatResponse(productSold)
      res.status(200).send(response)
    }
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message
    });
  }
};


