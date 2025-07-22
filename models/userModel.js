const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    
    username: {
        type: String,
        required: [true, "Please add the user name"],
    },
    email: {
        type: String,
        required: [true, "Please add the email address"],
        unique: [true, "Email address is already registered"]
    },
    password: {
        type: String,
        required: [true, "Please add the user password"],
    },
    createdAt: { type: Date, 
        default: Date.now 
    },
    }, {
    timestamps: true,
});

module.exports = mongoose.model("Users", userSchema);
