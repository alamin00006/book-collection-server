const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
router.route("/").get(userController.allUser);

router.route("/signup").post(userController.createUser);

router.route("/login").post(userController.createLogin);

router.route("/me").get(verifyToken, userController.getMe);


module.exports = router;
