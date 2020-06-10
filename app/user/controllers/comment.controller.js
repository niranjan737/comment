const Comment = require('../models/comment.model.js');
const User = require('../../auth/models/user.model');

// Create and Save a new Comment
exports.create = (req, res) => {

    const comment = new Comment({
        body: req.body.body, 
        orderId: req.body.orderId,
		user:req.decoded.user_id
    });
   
    comment.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while adding the Comment."
        });
    });
};


// Retrieve all Comments.
exports.findAll = (req, res) => {

    if(!req.query.orderId) {
        response = {"error" : true,"message" : "OrderId is Required"};
        return res.status(500).send(response)
    }

    var query = { orderId: req.query.orderId };
    Comment.find(query)
    .populate({
        path: 'user',
        model: User,
        select: { 'first_name': 1,'last_name': 1,'_id':1},
        as:'user_info'
      }).sort({createdAt: -1})
    .then(comments_data => {
    
	    res.status(200).send(comments_data);
		
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Comments."
        });
    });
};



