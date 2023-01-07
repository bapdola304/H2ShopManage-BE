const db = require("../models");
const { formatResponse } = require("../utils/formatResponse");

const ProductInWarehouse = db.productInWarehouse;
const ProductsSold = db.productsSold;

exports.findOne = async (req, res) => {
  const { params: { id } = {} } = req;
  try {
    const myWarehouse = await ProductInWarehouse.findById(id).populate('product').populate('warehouse').populate('productType').exec()
    if (!myWarehouse) {
      res.status(404).send({ message: "Not found warehouse with id " + id });
    } else {
      const response = formatResponse(myWarehouse)
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
  const { params: { id } = {}, body = {} } = req;
  const { warehouseId, productTypeId, productId, inputDate } = body;
  const bodyData = {
    ...body,
    inputDate: new Date(`${inputDate}T00:00:00Z`),
    warehouse: warehouseId,
    productType: productTypeId,
    product: productId,
  }
  try {
    const myWarehouse = await ProductInWarehouse.findByIdAndUpdate(id, bodyData, { useFindAndModify: true })
    if (!myWarehouse) {
      res.status(404).send({ message: `Cannot update warehouse with id=${id}. Maybe warehouse was not found! ` });
    } else {
      const response = formatResponse(myWarehouse)
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
    const myWarehouse = await ProductInWarehouse.findByIdAndRemove(id, { useFindAndModify: false })
    if (!myWarehouse) {
      res.status(404).send({ message: `Cannot delete warehouse with id=${id}. Maybe warehouse was not found! ` });
    } else {
      const response = formatResponse(myWarehouse)
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

exports.createProduct = async (req, res) => {
  try {
    const { body: { warehouseId, productTypeId, productId, sellPrice, inputDate, price, colorAndQuantityData, total } = {} } = req;
    const productInWarehouse = new ProductInWarehouse({
      warehouse: warehouseId,
      productType: productTypeId,
      product: productId,
      sellPrice,
      inputDate: new Date(`${inputDate}T00:00:00Z`),
      price,
      total,
      colorAndQuantityData
    });
    const data = await productInWarehouse.save(productInWarehouse)
    res.status(200).send(data)
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message
    });
  }
};

exports.findAllProduct = async (req, res) => {
  const { query: { productTypeId, isSelecteInput, warehouseId, inputDate, isImportProduct } = {} } = req;
  try {
    var condition = {};
    if (productTypeId) {
      condition.productType = productTypeId
    }
    if (warehouseId) {
      condition.warehouse = warehouseId
    }
    if (inputDate) {
      condition.inputDate = { $gte: new Date(`${inputDate}T00:00:00Z`), $lte: new Date(`${inputDate}T23:59:00Z`) }
    }
    var myWarehouses = await ProductInWarehouse.find(condition).populate('product').populate('warehouse').populate('productType').exec();
    if (!isImportProduct) {
      const productSoldList = await ProductsSold.find().populate('productWarehouseId').exec();
      myWarehouses = myWarehouses.map(item => {
        item.colorAndQuantityData = getQuantityAndColorDataInWarehouse(item, productSoldList);
        return item;
      });
    }
    const response = formatResponse(myWarehouses);
    res.status(200).send(response)
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message
    });
  }
};

const getQuantityAndColorDataInWarehouse = (item, productSoldList) => {
  var colors = item?.colorAndQuantityData;
  const newProductSold = productSoldList?.filter(p => p.productWarehouseId?._id == item.id)
  const newColors = colors.map(item2 => {
    const totalQuantity = newProductSold.filter(item3 => item3.colorId == item2._id).map(item4 => item4.quantity).reduce((a, b) => a + b, 0);
    item2.quantity = (item2.quantity - totalQuantity);
    return item2
  });
  return newColors;
}

