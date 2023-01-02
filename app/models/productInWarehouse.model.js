
module.exports = mongoose => {

  const data = {
    color: String,
    quantity: Number
  }

  var schema = mongoose.Schema(
    {
      warehouse: {
        type: mongoose.Schema.Types.ObjectId, ref: 'warehouse'
      },
      productType: {
        type: mongoose.Schema.Types.ObjectId, ref: 'productType'
      },
      product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'product'
      },
      sellPrice: Number,
      inputDate: Date,
      price: Number,
      total: Number,
      colorAndQuantityData: [data]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const ProductInWarehouse = mongoose.model("productInWarehouse", schema);
  return ProductInWarehouse;
};
