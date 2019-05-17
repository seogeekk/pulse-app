const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    // isAdmin: Boolean,
    deleted: Boolean,
   	memberId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
