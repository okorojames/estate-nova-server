const mongoose = require("mongoose");
const PropertySchema = mongoose.Schema(
  {
    propertyName: {
      type: String,
    },
    propertyPrice: {
      type: Number,
    },
    propertyDesc: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("property", PropertySchema);
