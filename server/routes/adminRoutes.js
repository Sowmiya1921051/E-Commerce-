const express = require("express");
const router = express.Router();
const { signupAdmin, getAllAdmins } = require("../controllers/adminController");

router.post("/signup", signupAdmin);
router.get("/admins", getAllAdmins);

module.exports = router;