const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventsControllers");
const { Router } = require("express");
const { validateJwt } = require("../middlewares/validateJwt");
const { validateField } = require("../middlewares/validateFields");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");

const router = Router();
router.use(validateJwt);

router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    validateField,
    check("note", "Notes are required").not().isEmpty(),
    validateField,
    check("start", "Start date is required").custom(isDate),
    validateField,
    check("end", "End date is required").custom(isDate),
    validateField,
  ],
  createEvent
);

router.get("/", getEvents);

router.put(
  "/:id",

  updateEvent
);

router.delete(
  "/:id",

  deleteEvent
);

module.exports = router;
