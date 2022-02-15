const express = require("express");

const router = express.Router();

const userCtrl = require("../controllers/user");
const passwordValid = require("../middleware/validpassword");
const emailValid = require("../middleware/validemail");

router.post("/signup", emailValid, passwordValid, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
