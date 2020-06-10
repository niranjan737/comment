const { body, validationResult } = require('express-validator')
const loginValidationRules = () => {
  return [
    body('username').isEmail(),
    body('password').isLength({ min: 5 }),
  ]
}
const registerValidationRules = () => {
    return [
      body('first_name').isLength({ min: 1 }),
      body('email').isEmail(),
      body('password').isLength({ min: 5 }),
    ]
  }
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
}

module.exports = {
  loginValidationRules,
  registerValidationRules,
  validate,
}