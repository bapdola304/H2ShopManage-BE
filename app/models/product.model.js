module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      image: String,
      productName: String,
      productColor: String,
      warrantyPeriod: Number,
      sellPrice: Number
    },
    { timestamps: true }
  );

  // schema.method("toJSON", function() {
  //   const { __v, _id, ...object } = this.toObject();
  //   object.id = _id;
  //   return object;
  // });

  const Product = mongoose.model("product", schema);
  return Product;
};
