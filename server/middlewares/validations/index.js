import { body, validationResult } from "express-validator";

function userRegistrationValidations() {
  return [
    body("username", "Enter your full name").isString().notEmpty(),
    body("firstname", "Enter your full name").isString().notEmpty(),
    body("lastname", "Enter your full name").isString().notEmpty(),
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Password should be atleast 6 characters long")
      .notEmpty()
      .isLength({ min: 6 }),
    body("password", "Password should be atleast 6 characters long")
      .notEmpty()
      .isLength({ min: 6 }),
  ];
}
function userLoginValidations() {
  return [
    body("email", "Enter valid email").isEmail(),
    body("password", "Enter a password").notEmpty().isString(),
  ];
}
function coinValidations() {
  return [
    body("netCoins", "Enter a task").isNumeric().notEmpty(),
    body("grossCoins", "Enter a task").isNumeric().notEmpty(),
  ];
}
function errorMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
}

export {
  userRegistrationValidations,
  errorMiddleware,
  userLoginValidations,
  coinValidations,
};
