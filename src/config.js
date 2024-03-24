const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            default: ''
        },
        password: {
            type: String,
            required: true,
            default: ''
        },
        phone: {
            type: Number,
            required: true,
            default: 0
        },
        address: {
            type: String,
            required: true,
            default: ''
        },
        zip: {
            type: Number,
            required: true,
            default: 0
        },
        city: {
            type: String,
            required: true,
            default: ''
        },
        state:{
            type: String,
            required: false,
            default: ''
        },
    },

    {
        timestamps: true
    }
    
);

const User = mongoose.model('User', registerSchema);

module.exports = User;