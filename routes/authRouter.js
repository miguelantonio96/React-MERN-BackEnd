const { createUser, loginUser, renewToken } = require("../controllers/authControllers");
const { check } = require("express-validator");
const { Router } = require("express");
const { validateField } = require("../middlewares/validateFields");
const { validateJwt } = require("../middlewares/validateJwt");
const router = Router();

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
    validateField,
  ],
  createUser
);

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    validateField,
  ],
  loginUser
);
router.get("/renew", validateJwt ,  renewToken);

module.exports = router;
