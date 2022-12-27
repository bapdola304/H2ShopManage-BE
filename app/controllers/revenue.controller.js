const db = require("../models");
const { formatResponse } = require("../utils/formatResponse");
const CostsIncurred = db.costsIncurred;
const MyWarehouse = db.mywarehouse;

// exports.create = async (req, res) => {
//   try {
//     const { body: { costName, inputDate, price, quantity, total } = {} } = req;
//     const costsIncurred = new CostsIncurred({
//       costName,
//       inputDate,
//       price,
//       quantity,
//       total
//     });
//     const data = await costsIncurred.save(costsIncurred)
//     res.status(200).send(data)
//   } catch (err) {
//     console.log({ err })
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while creating the costsIncurred."
//     });
//   }
// };

exports.findAll = async (req, res) => {
  try {

    const myWarehousData = await MyWarehouse.find({}, 'price');
    const productSoldData = await MyWarehouse.find({}, 'sellPrice');
    const totalAmountImportedProducts = getTotalAmountImportedProducts(myWarehousData);
    const totalAmountImportedProductsSold = getTotalAmountImportedProducts(productSoldData);
    // const response = formatResponse(costsIncurred)
    // res.status(200).send(response)
  } catch (err) {
    console.log({ err })
    res.status(500).send({
      message:
        err.message || "Some error occurred while find the costsIncurred."
    });
  }
};

const getTotalAmountImportedProducts = (data) => {
  const total = data.map(item => item.price).reduce((a, b) => a + b, 0);
  return total;
}

// // Find a single Tutorial with an id
// exports.findOne = async (req, res) => {
//   const { params: { id } = {} } = req;
//   try {
//     const costsIncurred = await CostsIncurred.findById(id)
//     if (!costsIncurred) {
//       res.status(404).send({ message: "Not found costsIncurred with id " + id });
//     } else {
//       const response = formatResponse(costsIncurred)
//       res.status(200).send(response)
//     }
//   } catch (err) {
//     console.log({ err })
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while find the costsIncurred."
//     });
//   }
// };

// // Update a Tutorial by the id in the request
// exports.update = async (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!"
//     });
//   }
//   const { params: { id } = {} } = req;
//   try {
//     const costsIncurred = await CostsIncurred.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
//     if (!costsIncurred) {
//       res.status(404).send({ message: `Cannot update costsIncurred with id=${id}. Maybe costsIncurred was not found! `});
//     } else {
//       const response = formatResponse(costsIncurred)
//       res.status(200).send(response)
//     }
//   } catch (err) {
//     console.log({ err })
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while updating the costsIncurred."
//     });
//   }
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = async (req, res) => {
//   const { params: { id } = {} } = req;

//   try {
//     const costsIncurred = await CostsIncurred.findByIdAndRemove(id, { useFindAndModify: false })
//     if (!costsIncurred) {
//       res.status(404).send({ message: `Cannot delete costsIncurred with id=${id}. Maybe costsIncurred was not found! `});
//     } else {
//       const response = formatResponse(costsIncurred)
//       res.status(200).send(response)
//     }
//   } catch (err) {
//     console.log({ err })
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while deleting the costsIncurred."
//     });
//   }
// };

