
const { check, validationResult } = require('express-validator');
const { loginValidationRules, registerValidationRules, validate } = require('../middleware/UserController.validate');


module.exports = (app) => {
    const auth = require('../../auth/controller/auth.controller');
    app.post('/api/login',loginValidationRules(), validate, auth.login);
    app.post('/api/register',registerValidationRules(),validate, auth.register);
}