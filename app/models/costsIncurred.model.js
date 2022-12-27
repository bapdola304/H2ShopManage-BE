module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      costIncurredName: String,
      inputDate: Date,
      price: Number,
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

  const CostsIncurred = mongoose.model("costsIncurred", schema);
  return CostsIncurred;
};
