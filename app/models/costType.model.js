module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      costTypeName: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const CostType = mongoose.model("costType", schema);
  return CostType;
};
