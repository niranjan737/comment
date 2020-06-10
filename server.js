var express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

// create express app
var app = express();

app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//DB Configuration
const dbConfig = require('./config/database.config.js');

require('./app/auth/routes/auth.routes.js')(app);
require('./app/user/routes/comment.routes.js')(app);

app.get('/', function (req, res) {
   res.send({message: "successfully! Running"});
});

//The 404 Route 
app.get('*', function(req, res){
   res.send('Page Not Found', 404);
});

// listen for requests
var server = app.listen(3030, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Orders app listening at http://%s:%s", host, port)
})


