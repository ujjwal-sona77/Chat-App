const express = require("express")
const router = express.Router();
const userModel = require("../models/user.model");
const { SignUp, SignIn } = require("../controllers/Auth");

router.post("/v1/auth/signup" , SignUp);
router.post("/v1/auth/signin" , SignIn);

module.exports = router;
