const express = require('express');
const ctrl = require("./home.ctrl");
const multer = require('multer');
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
router.get("/mypage", isLoggedIn, ctrl.output.mypage);
router.get("/recordPage", isLoggedIn, ctrl.output.recordPage);
router.get("/update", isLoggedIn, ctrl.output.update);
router.get("/matching", isLoggedIn, ctrl.output.matching);
router.get("/board", isLoggedIn, ctrl.output.board);
router.get("/writing", isLoggedIn, ctrl.output.writing);
router.get("/board/detail/:id", isLoggedIn, ctrl.output.boardDetail);

router.get("/user", ctrl.ps.user);
router.get("/user/me",isLoggedIn, ctrl.ps.userme);
router.get("/record", isLoggedIn, ctrl.ps.record);
router.get("/record/detail/:id", isLoggedIn, ctrl.ps.recordDetail);
router.get("/record/me", isLoggedIn, ctrl.ps.myrecord);
router.get("/record/goal", ctrl.ps.recordGoal);
router.get("/record/assist", ctrl.ps.recordAssist);
router.get("/record/mvp", ctrl.ps.recordMvp);
router.get("/record/save", ctrl.ps.recordSave);
router.get("/match", ctrl.ps.match);
router.get("/match/last", ctrl.ps.lastmatch);
router.get("/match/week", ctrl.ps.weekMatch);
router.get("/match/month/:id", ctrl.ps.monthMatch);
router.get("/board/index", isLoggedIn, ctrl.ps.board);



router.post("/login", ctrl.ps.login);
router.post("/register", upload.single("img"), ctrl.ps.register);
router.post("/logout", isLoggedIn, ctrl.ps.logout);
router.post("/board/writing", upload.single("img"), isLoggedIn, ctrl.ps.writing);

router.put("/update/img", upload.single("img"), isLoggedIn, ctrl.ps.updateImg);


module.exports = router;