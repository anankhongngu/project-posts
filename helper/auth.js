const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require("config");

const jwtSignature = config.get('jwtSignature');
const auth = (role) => async(req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = await jwt.verify(token, jwtSignature);
        const allowRoles = role || ["admin" || "user"];

        const foundedUser = await User.findOne({
            _id: decoded._id,
            tokens: token, //token ben model user = tokeb cua header sau khi tach bearer
            role: { $in: allowRoles }
        });
        if (!foundedUser) {
            return res.status(401)
                .send({ message: "You are not authorized!!" });
        }
        req.user = foundedUser;
        req.token = token;

        next();
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: err });
    }
}
module.exports = {
    auth
}