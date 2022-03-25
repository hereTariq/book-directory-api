const router = require("express").Router();
// importing auth controller so that we can use signup and login controller/handler
const authController = require("../controllers/auth");

// POST /auth/signup
router.post("/signup", authController.signup);
// POST /auth/login
router.post("/login", authController.login);

module.exports = router;
