const {
  createUser,
  loginUser,
  renewToken,
} = require("../controllers/authControllers");
const { check } = require("express-validator");
const { Router } = require("express");
const { validateField } = require("../middlewares/validateFields");
const { validateJwt } = require("../middlewares/validateJwt");
const router = Router();

router.post(
  "/register",
  [
    // Fields validation
    //  name validation
    check("name", "Name is required").not().isEmpty(),
    validateField,
    check("name", "Name must be at least 3 characters").isLength({ min: 3 }),
    validateField,
    // email validation
    check("email", "Email is required").not().isEmpty(),
    validateField,
    check("email", "Email is not valid").isEmail(),
    validateField,
    // password validation
    check("password", "Password is required").not().isEmpty(),
    validateField,
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    validateField,
  ],
  createUser
);

router.post(
  "/login",
  [
    // Fields validation

    // email validation
    check("email", "Email is required").not().isEmpty(),
    validateField,
    // password validation
    check("password", "Password is required").not().isEmpty(),
    validateField,
  ],
  loginUser
);
router.get("/renew", validateJwt, renewToken);

module.exports = router;
