const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: {
        type: 'string',
        unique: true,
    },
    description: String,
    image: String,
}, {
    timestamps: true,
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;