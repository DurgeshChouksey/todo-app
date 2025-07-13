const express = require("express");
const router = express.Router();
const {signupRoute, loginRoute, tokenRefreshRoute} = require("../controllers/userControllers")

router.post("/signup", signupRoute);
router.post("/login", loginRoute);
router.post("/refresh", tokenRefreshRoute)

module.exports = router;
