const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: 'string',
        default: null,
    },
    password: {
        type: 'string',
        default: null,
    },
    email: {
        type: 'string',
        unique: true,
    },
    phone: String,
    role: String,
    tokens: {
        type: [String],
        default: [],
    },
    avatar: String
}, {
    timestamps: true
})

//cau hinh methods
userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    delete user.tokens;
    return user;
}

//hash password
userSchema.pre("save", async function(next) {
    //hash password
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;