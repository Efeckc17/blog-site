const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const { getUserProfile, updateProfile } = require("../controllers/userController")
router.get("/:username", getUserProfile)
router.put("/update", authMiddleware, updateProfile)
module.exports = router
