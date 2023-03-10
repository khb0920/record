const express = require('express');
const ctrl = require("./home.ctrl");
const multer = require('multer');
const {isLoggedIn} = require('./middlewares');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});
const upload = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'hbhb-bucket',
        key: function (req, file, cb) {
            cb(null, `${Date.now()}${path.basename(file.originalname)}`);
        }
    }
    ),
});

const router = express.Router();

router.get("/", ctrl.output.home);
router.get("/header", ctrl.output.header);
router.get("/footer", ctrl.output.footer);
router.get("/adminPage", isLoggedIn, ctrl.output.useradmin);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/mypage", isLoggedIn, ctrl.output.mypage);
router.get("/recordPage", ctrl.output.recordPage);
router.get("/update", isLoggedIn, ctrl.output.update);
router.get("/matching", ctrl.output.matching);
router.get("/board", ctrl.output.board);
router.get("/board/detailpage/:id", isLoggedIn, ctrl.output.boardDetail);
router.get("/writing", isLoggedIn, ctrl.output.writing);
router.get("/updateContentspage/:id", isLoggedIn, ctrl.output.updateContentspage);


router.get("/user", ctrl.ps.user);
router.get("/user/me",isLoggedIn, ctrl.ps.userme);
router.get("/record",ctrl.ps.record);
router.get("/record/detail/:id", ctrl.ps.recordDetail);
router.get("/record/me", isLoggedIn, ctrl.ps.myrecord);
router.get("/record/goal", ctrl.ps.recordGoal);
router.get("/record/assist", ctrl.ps.recordAssist);
router.get("/record/mvp", ctrl.ps.recordMvp);
router.get("/record/save", ctrl.ps.recordSave);
router.get("/match", ctrl.ps.match);
router.get("/match/last", ctrl.ps.lastmatch);
router.get("/match/week", ctrl.ps.weekMatch);
router.get("/match/month/:id", ctrl.ps.monthMatch);
router.get("/matchMvp", ctrl.ps.matchMvp);
router.get("/board/index", isLoggedIn, ctrl.ps.board);
router.get("/board/detail/:id", isLoggedIn, ctrl.ps.boardDetail);



router.post("/login", ctrl.ps.login);
router.post("/register", upload.single("img"), ctrl.ps.register);
router.post("/logout", isLoggedIn, ctrl.ps.logout);
router.post("/board/writing", upload.single("img"), isLoggedIn, ctrl.ps.writing);
router.post("/board/updateContents", upload.single("img"), isLoggedIn, ctrl.ps.updateBoard);
router.post("/board/comment", isLoggedIn, ctrl.ps.writeComment);
router.post("/match/register", isLoggedIn, ctrl.ps.registerMatch);
router.post("/match/result", isLoggedIn, ctrl.ps.resultMatch);
router.post("/match/record", isLoggedIn, ctrl.ps.recordMatch);
router.post("/user/delete", isLoggedIn, ctrl.ps.deleteUser);

router.put("/update/img", upload.single("img"), isLoggedIn, ctrl.ps.updateImg);



module.exports = router;