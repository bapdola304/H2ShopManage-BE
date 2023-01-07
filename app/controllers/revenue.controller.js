const db = require("../models");
const { formatResponse } = require("../utils/formatResponse");
const CostsIncurred = db.costsIncurred;
const ProductInWarehouse = db.productInWarehouse;
const ProductSold = db.productsSold;

exports.findAll = async (req, res) => {
  const { query: { fromDate, toDate } = {} } = req;
  try {
    const shippingId = '63b1834bcb682ebaec14047d';
    var productSoldCondition = {};
    if (fromDate && toDate) {
      productSoldCondition.inputDate = { $gte: new Date(`${fromDate}T00:00:00Z`), $lte: new Date(`${toDate}T23:59:00Z`) }
    }
    const productInWarehouseData = await ProductInWarehouse.find({}, 'total');
    const productSoldData = await ProductSold.find(productSoldCondition, 'total');
    const costsIncurredData = await CostsIncurred.find({}, 'total costType')
    const totalProfitData = await ProductSold.find(productSoldCondition, 'productWarehouseId sellPrice quantity').populate('productWarehouseId').exec();
    const totalAmountImportedProducts = getTotalAmount(productInWarehouseData, 'total');
    const totalAmountImportedProductsSold = getTotalAmount(productSoldData, 'total');
    const shippingFees = costsIncurredData.filter(item => item.costType === shippingId);
    const otherFees = costsIncurredData.filter(item => item.costType !== shippingId);
    const totalShippingFees = getTotalAmount(shippingFees, 'total');
    const totalOtherFees = getTotalAmount(otherFees, 'total');
    const totalProfit = getTotalProfit(totalProfitData);
    const response = formatResponse({totalAmountImportedProducts, totalAmountImportedProductsSold, totalShippingFees, totalOtherFees, totalProfit});
    res.status(200).send(response)
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while find the costsIncurred."
    });
  }
};

const getTotalAmount = (data, field) => {
  const total = data.map(item => item[field]).reduce((a, b) => a + b, 0);
  return total;
}

const getTotalProfit = (data) => {
  const total = data.map(item => ((item.sellPrice * item?.quantity) - (item?.productWarehouseId?.price * item?.quantity))).reduce((a, b) => a + b, 0);
  return total || 0;
}


