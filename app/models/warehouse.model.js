module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      warehouseName: String,
      address: String,
      contactName: String,
      contactPhone: Number
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Warehouse = mongoose.model("warehouse", schema);
  return Warehouse;
};
