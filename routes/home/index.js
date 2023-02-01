const express = require('express');
const ctrl = require("./home.ctrl");
const multer = require('multer');
const path = require('path');
const {isLoggedIn} = require('./middlewares');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./upload");
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + "_" + file.originalname);
        }
    }
    ),
});

const router = express.Router();

router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/usertest", isLoggedIn, ctrl.output.test);
router.get("/user", isLoggedIn, ctrl.ps.user);

router.post("/login", ctrl.ps.login);
router.post("/register", upload.single("img"), ctrl.ps.register);


module.exports = router;