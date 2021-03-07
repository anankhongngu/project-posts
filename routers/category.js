const express = require("express");
const Category = require("./../models/category");

const router = express.Router();

router.post("/category", async(req, res) => {
    const { name, postID } = req.body;

    try {
        const foundCategory = await Category.findOne({ name });
        if (foundCategory) {
            return res
                .status(400)
                .send({ message: "Category already existed!!" });
        }
        const newCategory = new Category({
            name,
            post: postID
        });

        const result = await newCategory.save();
        res.send(result);
    } catch (err) {
        res.status(500).send({ message: err });
    }
})
router.get("/category", async(req, res) => {
    try {
        const result = await Category.find();
        return res.status(200).send({ message: result });
    } catch (err) {
        res.status(500).send({ message: err });
    }
})
router.delete("/category", async(req, res) => {
    const { _id } = req.body;
    try {
        const foundCategory = await Category.findById({ _id });
        if (!foundCategory) {
            return res
                .status(404)
                .send({ message: "Category doesn't existed!!" });
        }
        await Category.deleteOne({ _id });
        res.status(200)
            .send({ message: "Delete successfully" });
    } catch (err) {
        res.status(500).send({ message: err });
    }
})

router.post("/update-category", async(req, res) => {
    const { _id, name, postID } = req.body;
    try {
        const foundCategory = await Category.findById({ _id });
        if (!foundCategory) {
            return res
                .status(404)
                .send({ message: "Category doesn't existed!!" });
        }
        await Category.updateOne({ _id }, { name: name, postID: postID })
        res.status(200)
            .send({ message: "Update successfully" });
    } catch (err) {
        res.status(500).send({ message: err });
    }
})

module.exports = router;