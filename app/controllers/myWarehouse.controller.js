const db = require("../models");
const { formatResponse } = require("../utils/formatResponse");
const MyWarehouse = db.mywarehouse;
const ProductSold = db.productSold;

exports.create = async (req, res) => {
  try {
    const { body: { warehouseId, productId, warehouseProductName, color, sellPrice, inputDate, price, quantity, total } = {} } = req;
    const myWarehouse = new MyWarehouse({
      warehouseId,
      productId,
      warehouseProductName,
      color,
      sellPrice,
      inputDate,
      price,
      quantity,
      remainingQuantity: quantity,
      total: (quantity * price)
    });
    const data = await myWarehouse.save(myWarehouse)
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
  const { query: { productTypeId, isSelecteInput } = {} } = req;
  try {
    var myWarehouses = [];
    var newMyWarehouses = [];
    const condition = productTypeId ? { productId: productTypeId } : {};
    myWarehouses = await MyWarehouse.find(condition).populate('productId').populate('warehouseId').exec()
    const productSoldList = await ProductSold.find();
    for (let index = 0; index < myWarehouses.length; index++) {
      const element = myWarehouses[index];
      element.remainingQuantity = getRemainingQuantity(element?._id, element?.quantity, productSoldList);
      newMyWarehouses.push(element);
    }
    if (isSelecteInput) {
      newMyWarehouses = newMyWarehouses.filter(item => item?.remainingQuantity > 0);
    }
    const response = formatResponse(newMyWarehouses);
    res.status(200).send(response)
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message
    });
  }
};

const getRemainingQuantity = (id, totalQuantity, productSoldList) => {
  const arrayById = productSoldList.filter(item => item.productWarehouseId.toString() === id.toString());
  const productSoldQUantity = arrayById.map(item => item.quantity).reduce((a, b) => a + b, 0);
  return (totalQuantity - productSoldQUantity);
}

exports.findOne = async (req, res) => {
  const { params: { id } = {} } = req;
  try {
    const myWarehouse = await MyWarehouse.findById(id).populate('productId').populate('warehouseId').exec()
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
  const { params: { id } = {} } = req;
  try {
    const myWarehouse = await MyWarehouse.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
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
    const myWarehouse = await MyWarehouse.findByIdAndRemove(id, { useFindAndModify: false })
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


