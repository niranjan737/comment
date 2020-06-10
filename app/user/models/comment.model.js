const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
     body: String,
     orderId: String,
	 user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true
});
module.exports = mongoose.model('comment', CommentSchema);