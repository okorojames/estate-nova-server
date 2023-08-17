const express = require("express");
const router = express.Router();

const {
  createAccountCont,
  loginUserCont,
} = require("../controllers/auth_controller");

router.post("/create-user", createAccountCont);
router.post("/login-user", loginUserCont);

module.exports = router;
