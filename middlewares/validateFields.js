const { response } = require("express");
const { validationResult } = require("express-validator");

const validateField = (req, res = response, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors,

      ErrMsg: "Validation error",
    });
  }

  // Si no hay errores, continuamos con la siguiente función middleware
  next();
};

module.exports = {
  validateField,
};
