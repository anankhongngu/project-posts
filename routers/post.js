const express = require("express");
const Post = require("./../models/post");

const router = express.Router();

router.post("/post", async(req, res) => {
    const { name, description, image } = req.body;

    try {
        const foundedPost = await Post.findOne({ name });
        if (foundedPost) {
            return res.status(400)
                .send({ message: "Post already exists" });
        }
        const newPost = new Post({
            name,
            description,
            image,
        });
        const result = await newPost.save();
        res.send(result);
    } catch (err) {
        res.status(500).send({ message: err });
    }
})

router.get("/post", async(req, res) => {
    try {
        const foundedPost = await Post.find();
        return res.status(200)
            .send({ message: foundedPost });
    } catch (err) {
        res.status(500).send({ message: err });
    }
})

router.delete("/post", async(req, res) => {
    const { _id } = req.body;
    try {
        const foundedPost = await Post.findById({ _id });
        if (!foundedPost) {
            return res.status(404)
                .send({ message: "Post doesn't existed!!" });
        }
        await Post.deleteOne({ _id });
        res.status(200)
            .send({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err });
    }
})

router.post("/update-post", async(req, res) => {
    const { _id, name, description, image } = req.body;
    try {
        const foundedPost = await Post.findById({ _id });
        if (!foundedPost) {
            return res.status(404)
                .send({ message: "Post doesn't existed!!'" });
        }
        await Post.updateOne({ _id, name, description, image });
        res.status(200).send({ message: "Updated successfully" });
    } catch (err) {
        res.status(500).send({ message: err });
    }
})
module.exports = router;