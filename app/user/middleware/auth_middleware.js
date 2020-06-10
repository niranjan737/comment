let jwt = require('jsonwebtoken');
const config = require('../../../config/config.js');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; 
   if (typeof token != 'undefined') {
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
  }

  if (token) {
    jwt.verify(token, config.secret_key, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}