const User = require("../../models/User");
const jwt = require('jsonwebtoken');
const UserStorage = require("../../models/UserStorage");
const RecordStorage = require("../../models/RecordStorage");
const MatchStorage = require("../../models/MatchStorage");
const express = require('express');
const crypto = require('crypto');


const output = {
    home : (req, res) => {
        res.render("index.html");
    },

    login : (req, res) => {
        res.render("login.html");
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
    ranking : async(req, res) => {
        res.render("ranking.html");
    },
    matching : async(req, res) => {
        res.render("matching.html");
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
        const image = "/image/" + req.file.filename;
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
        // const recordData = await RecordStorage.getRecord();
        // return res.json(recordData);
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
        const matchCnt = matchData.length;
        return res.json({matchData, matchCnt});
    },

    lastmatch : async (req, res) => {
        const matchData = await MatchStorage.getlastMatchInfo();
        return res.json(matchData);
    },

    weekMatch : async (req, res) => {
        const matchData = await MatchStorage.getweekMatchInfo();
        return res.json(matchData[0]);
    },

    updateImg : async (req, res) => {
        const image = "/image/" + req.file.filename;
        const userId = req.decoded.id;
        const userInfo = [userId, image];
        // console.log(userInfo);
        const changed = await UserStorage.updateUser(userInfo);
        return res.json(changed);
        //console.log(changed);
    },

}

module.exports = {
    output,
    ps
 };