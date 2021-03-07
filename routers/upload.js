const express = require("express");
const multer = require("multer");

const router = express.Router();

const uploadFile = multer({
    storage: multer.diskStorage({
        destination: "images",
        filename(req, file, done) {
            const nameImage = Date.now() + "-" + file.originalname;
            done(null, nameImage);
        },
    }),
});

router.post('/upload/file', uploadFile.single("data"), (req, res) => {
    console.log(req.file);
    res.send(req.file.path);
})


module.exports = router;