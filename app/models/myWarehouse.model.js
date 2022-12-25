module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      warehouseId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'warehouse'
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'product'
      },
      warehouseProductName: String,
      color: String,
      sellPrice: Number,
      inputDate: Date,
      price: Number,
      quantity: Number,
      remainingQuantity: Number,
      total: Number
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const MyWarehouse = mongoose.model("mywarehouse", schema);
  return MyWarehouse;
};
