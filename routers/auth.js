const express = require("express");
const User = require("./../models/user");
const { auth } = require("../helper/auth")
const router = express.Router();
//import package cau hinh
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const config = require("config");


router.post('/signup', async(req, res) => {
    const { username, password, phone, email } = req.body;

    try {
        const foundedUser = await User.findOne().or([{ username }, { email }]);
        if (foundedUser) {
            return res.status(400)
                .send({ message: "User already exists" });
        }
        const newUser = await User({
            username,
            password,
            email,
            phone,
            role: "admin"
        });
        let result = await newUser.save();
        result = result.toObject();
        delete result.password;

        // sendmail


        //end send mail
        res.send(result);

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
    }
});


router.post('/signin', async(req, res) => {
    const { username, password } = req.body;
    try {

        //check username
        const foundedUser = await User.findOne({ username });
        if (!foundedUser) {
            return res.status(401)
                .send({ message: 'Tai khoan or Mat khau khong dung' });
        }

        //check password
        const isMatch = await bcrypt.compare(password, foundedUser.password);
        if (!isMatch) {
            return res.status(401)
                .send({ message: 'Tai khoan or Mat khau khong dung' })
        }

        //generate token
        const token = await jwt.sign({
            _id: foundedUser._id
        }, "projectpost");

        //save token vao user login
        foundedUser.tokens.push(token);
        await foundedUser.save();

        //send token về cho frontebd
        //send result
        res.send(token);

    } catch (err) {

    }
})

router.get('/me', auth(), async(req, res) => {
    const result = req.user.toJSON();
    // console.log(result);
    res.send(result);
})

router.post("/logout", auth(), async(req, res) => {
    const index = req.user.tokens.findIndex((token) => token === req.token);
    req.user.tokens.splice(index, 1);
    await req.user.save();
    res.send({ message: "Logout successfully" });
})

router.post("/logoutAll", auth(), async(req, res) => {
    const newTokens = req.user.tokens.filter((token) => token === req.token);
    req.user.tokens = newTokens;
    res.send();
})

module.exports = router;