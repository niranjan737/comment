const { body, validationResult } = require('express-validator')

const CommentValidationRules = () => {
    return [
      body('body').isLength({ min: 1 }),
      body('orderId').isLength({ min: 1 }),
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
	validate,
    CommentValidationRules
}