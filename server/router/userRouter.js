const express = require("express");
const userCtrl = require("../controller/userCtrl");


const router = express.Router();

// User routes
router.post("/register", userCtrl.registerUser);
router.post("/login", userCtrl.loginUser);
router.get("/refresh_token", userCtrl.refreshtoken);
router.get("/", userCtrl.getUsers);
router.get("/:id", userCtrl.getUserById);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);
router.post("/google", userCtrl.signInGoogle);
router.post("/logout", userCtrl.logoutUser);

module.exports = router;
