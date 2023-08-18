const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/auth_middleware");

// conroller functions here
const {
  add_property,
  get_properties,
  get_property,
  getMyProperties,
} = require("../controllers/properties_controller");

// router authorization middleware
router.use(requireAuth);

// routes here...

router.post("/property/new-property", add_property);
router.get("/property/get-properties", get_properties);
router.get("/property/get-property/:id", get_property);
router.get("/property/get-my-properties", getMyProperties);

// exporting routes to the server js
module.exports = router;
