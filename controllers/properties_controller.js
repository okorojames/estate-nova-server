const mongoose = require("mongoose");
const PropertySchema = require("../models/properties_model");

// adding new property
const add_property = async (req, res) => {
  const { name, price, desc, img } = req.body;
  const user_id = req.user._id;
  if (!name || !price || !desc || !img) {
    return res.status(400).json({ msg: "please fill in all details!" });
  }
  try {
    const property = new PropertySchema({
      name,
      price,
      img,
      desc,
      user_id,
    });
    await property.save();
    return res.status(201).json(property);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err });
  }
};

// getting all properties
const get_properties = async (req, res) => {
  try {
    const properties = await PropertySchema.find().sort({
      createdAt: -1,
    });
    return res.status(200).json(properties);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err });
  }
};

// getting personally added properties
const getMyProperties = async (req, res) => {
  const user_id = req.user._id;
  try {
    const properties = await PropertySchema.find({ user_id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(properties);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
};

// getting a single property
const get_property = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await PropertySchema.findById(id);
    if ((await PropertySchema.findById(id)) === null) {
      return res.status(400).json({ msg: "enter a valid property id" });
    } else if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "this id is not a valid id" });
    } else {
      return res.status(200).json(property);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err });
  }
};

// exporting functions to routes
module.exports = {
  add_property,
  get_properties,
  get_property,
  getMyProperties,
};
