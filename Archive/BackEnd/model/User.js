const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userFirstName: {
        type: String,
        required: true
    },
    userLastName: {
        type: String,
        required: true
    },
    userAddress: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userContactNumber: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userRefreshToken: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required:true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required:true,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema);