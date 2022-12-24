module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      productWarehouseId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'mywarehouse'
      },
      customer: String,
      customerPhone: String,
      sellPrice: Number,
      inputDate: Date,
      quantity: Number,
      total: Number
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const productSold = mongoose.model("productSold", schema);
  return productSold;
};
