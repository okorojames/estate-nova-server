const mongoose = require("mongoose");
const PropertySchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    img: {
      type: [String],
      required: [true, "images of properties required"],
    },
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    desc: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Property", PropertySchema);
