const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: 'string',
        unique: true,
    },
    post: {
        type: [
            { type: mongoose.Schema.Types.ObjectId }
        ],
        ref: "Post",
        default: [],
    },
}, {
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;