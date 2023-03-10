const User = require("../../models/User");
const jwt = require('jsonwebtoken');
const UserStorage = require("../../models/UserStorage");
const RecordStorage = require("../../models/RecordStorage");
const MatchStorage = require("../../models/MatchStorage");
const crypto = require('crypto');
const BoardStorage = require("../../models/BoardStorage");
const CommentStorage = require("../../models/CommentStorage");
const express = require('express');



const output = {
    home : (req, res) => {
        res.render("index.html");
    },
    header : (req, res) => {
        res.render("header.html");
    },
    footer : (req, res) => {
        res.render("footer.html");
    },
    login : (req, res) => {
        res.render("login.html");
    },

    useradmin : async (req, res) => {
        if(req.decoded.id === "khb0920"){
            res.render("adminPage.html");
        }else{
            res.send("<script>alert('접근권한이 없습니다.');location.href='/';</script>");
        }
    },
    
    register : (req, res) => {
        res.render("register.html");
    },
    mypage : async(req, res) => {
        res.render("mypage.html");
    },
    recordPage : async(req, res) => {
        res.render("recordPage.html");
    },
    update : async(req, res) => {
        res.render("update.html");
    },
    matching : async(req, res) => {
        res.render("matching.html");
    },
    board : async(req, res) => {
        res.render("board.html");
    },
    boardDetail : async(req, res) => {
        res.render("boardDetail.html");
    },
    writing : async(req, res) => {
        res.render("writing.html");
    },
    updateContentspage : async(req, res) => {
        res.render("updateContentspage.html");
    },
};

const ps = {
    login : async (req, res) => {
        
        const id = req.body.id;
        const hashpsword = crypto.createHash('sha512')
                .update(req.body.psword)
                .digest('base64');
        const user = new User({id, hashpsword});
        const userData = await user.login();
        
        if(userData.success===true){
            const accessToken = jwt.sign({
                id : req.body.id,
            }, process.env.ACCESS_SECRET, {
                expiresIn : '1m'
            })

            const refreshToken = jwt.sign({
                id : req.body.id,
            }, process.env.REFRESH_SECRET, {
                expiresIn : '24h'
            })

            res.cookie("accessToken", accessToken, {
                secure : false,
                httpOnly : true,
            })

            res.cookie("refreshToken", refreshToken, {
                secure : false,
                httpOnly : true,
            })
            
            return res.json({ response : userData, atoken :accessToken, rtoken : refreshToken});
        }else{
            return res.json({ response : userData});

        }
    },

    register : async (req, res) => {
        const image = req.file.key;
        const hashpsword = crypto.createHash('sha512')
                .update(req.body.psword)
                .digest('base64');
        const userInfo = [req.body.id ,hashpsword, req.body.name, req.body.age, req.body.position, image];
        const user = new User(userInfo);
        const response = await user.register();
        return res.json(response);
    },
    
    user : async (req, res) => {
        const userData = await UserStorage.getAllUserInfo();
        return res.json(userData);
    },

    userme : async (req, res) => {
        const userData = await UserStorage.getUserInfo(req.decoded.id);
        return res.json(userData);
    },

    deleteUser : async (req, res) => {
        const response = await UserStorage.deleteUserInfo(req.decoded.id);
        return res.json(response);
    },
    
    logout : async (req, res) => {
        const accessToken = req.cookies['accessToken'];
        if(accessToken){
            res.clearCookie("accessToken", {
                secure : false,
                httpOnly : true,
            });

            res.clearCookie("refreshToken", {
                secure : false,
                httpOnly : true,
            });
            return res.json({success : true, msg :"로그아웃 되었습니다."});
        }
    },
    
    record : async (req, res) => {
        const recordData = await RecordStorage.getRecord();
        return res.json(recordData);
    },

    recordDetail : async (req, res) => {
        
        const recordData = await RecordStorage.recordDetail(req.params.id);
        return res.json(recordData);
    },

    myrecord : async (req, res) => {
        const userData = await UserStorage.getUserInfo(req.decoded.id);
        const user = userData.userNum
     
        const recordData = await RecordStorage.getMyRecord(user);
        return res.json(recordData);
    },
    
    recordGoal : async (req, res) => {
        const goalData = await RecordStorage.getGoalInfo();
        return res.json(goalData);
    },

    recordAssist : async (req, res) => {
        const assistData = await RecordStorage.getAssistInfo();
        return res.json(assistData);
    },

    recordMvp : async (req, res) => {
        const mvpData = await RecordStorage.getMvpInfo();
        return res.json(mvpData);
    },

    recordSave : async (req, res) => {
        const saveData = await RecordStorage.getSaveInfo();
        return res.json(saveData);
    },

    match : async (req, res) => {
        const matchData = await MatchStorage.getMatchInfo();
        return res.json(matchData);
    },

    lastmatch : async (req, res) => {
        const matchData = await MatchStorage.getlastMatchInfo();
        let last = matchData[matchData.length - 1];
        return res.json(last);
    },

    weekMatch : async (req, res) => {
        const matchData = await MatchStorage.getweekMatchInfo();
        return res.json(matchData[0]);
    },

    monthMatch : async (req, res) => {
        const matchData = await MatchStorage.getmonthMatchInfo(req.params.id);
        return res.json(matchData);
    },

    matchMvp : async (req, res) => {
        const lastmatch = await MatchStorage.getlastMatchInfo();
        let last = lastmatch[lastmatch.length - 1];
        const matchMvp = await MatchStorage.getMatchMvpInfo(last.matchMvp);
        return res.json(matchMvp);
    },

    registerMatch : async (req, res) => {
        const response = await MatchStorage.saveMatchInfo(req.body);
        return res.json(response);
    },

    resultMatch : async (req, res) => {
        const response = await MatchStorage.saveResultInfo(req.body);
        return res.json(response);
    },

    recordMatch : async (req, res) => {
        const response = await RecordStorage.saveRecordInfo(req.body);
        return res.json(response);
    },

    updateImg : async (req, res) => {
        const image = req.file.key;
        const userId = req.decoded.id;
        const userInfo = [userId, image];
        const changed = await UserStorage.updateUser(userInfo);
        return res.json(changed);
    },

    board : async (req, res) => {
        const boardData = await BoardStorage.getBoardInfo();
       return res.json(boardData);
    },

    boardDetail : async (req, res) => {
        const userId = req.decoded.id;
        const boardId = req.params.id;
        const boardData = await BoardStorage.getBoardDetailInfo(boardId);
        const commentData = await CommentStorage.getCommentInfo(boardId);
        return res.json({boardData, userId, commentData});
    },

    writeComment : async (req, res) => {
        
        const commentData = [req.body.comment, req.decoded.id, req.body.boardNum];
        const response = await CommentStorage.saveCommentInfo(commentData);
        return res.json(response);
    },

    writing : async (req, res) => {
        if(typeof req.file=="undefined"){
            var image = null;
        }else{
            var image = req.file.key;
        }
        const userId = req.decoded.id;
        const boardInfo = [req.body.title, req.body.contents, image, userId];
        const response = await BoardStorage.saveBoardInfo(boardInfo);
        return res.json(response);
    },

    updateBoard : async (req, res) => {
        if(typeof req.file=="undefined"){
            var image = null;
        }else{
            var image = req.file.key;
        }
        console.log(req.file);
        const userId = req.decoded.id;
        const boardInfo = [req.body.title,req.body.contents, image, userId, req.body.Num];
        const response = await BoardStorage.updateBoardInfo(boardInfo);
        return res.json(response);
        
    },

}

module.exports = {
    output,
    ps
 };