const express = require("express");
const router = express.Router();

// conroller functions here
const {
  add_property,
  get_properties,
  get_property,
} = require("../controllers/properties_controller");

// routes here...

router.post("/property/new-property", add_property);
router.get("/property/get-properties", get_properties);
router.get("/property/get-property/:id", get_property);

// exporting routes to the server js
module.exports = router;
