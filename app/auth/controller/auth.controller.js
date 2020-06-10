 let jwt = require('jsonwebtoken');
 const bcrypt = require('bcryptjs');

 let config = require('../../../config/config');
 const UserSchema = require('../models/user.model');

 exports.login = (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    UserSchema.findOne({email:username})
    .then(user_data => {

      if (user_data && bcrypt.compareSync(password, user_data.password)) {
         
        let token = jwt.sign({username: user_data.first_name,user_id: user_data._id, role:user_data.role},
          config.secret_key,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
       // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token,
          user_name:user_data.first_name,
          role:user_data.role  
        });
		
		
      }else{
          res.send(403).json({
            success: false,
            message: 'Incorrect username or password'
          });
      }

    }).catch(err => {
        
      res.sendStatus(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });

    });
  
  };

  exports.index = (req, res) => {
    res.json({
      success: true,
      message: 'Index page'
    });
  };


  exports.register = (req, res) => {

     const user = new UserSchema({
        first_name: req.body.first_name, 
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    });
    
    UserSchema.findOne({email:req.body.email})
    .then(user_data => {
         if(user_data) {
              res.status(400).send("Email id is Already registered");
         }else{
            user.save()
            .then(user => {
                res.send("Registered succesfully.")
            })
            .catch(err => {
                res.status(400).send("Unable to Register.")
            });
       }
    }).catch(err => {
         res.status(400).send("Unable to create user.")
    });

  };

  this.createResponse = (label, err, context) => {
    if (err) {
         return err;
    } else {

    }
    return (context);
  };




