module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      productName: String,
      productType: {
        type: mongoose.Schema.Types.ObjectId, ref: 'productType'
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("product", schema);
  return Product;
};
