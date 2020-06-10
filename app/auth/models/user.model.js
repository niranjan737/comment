const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    role: {
        type: String, 
        default: 'user' 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('user', UserSchema);