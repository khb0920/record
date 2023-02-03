const User = require("../../models/User");
const jwt = require('jsonwebtoken');
const UserStorage = require("../../models/UserStorage");
const RecordGoalStorage = require("../../models/RecordGoalStorage");
const RecordAssistStorage = require("../../models/RecordAssistStorage");
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

    recordGoal : async (req, res) => {
        const recordGoalData = await RecordGoalStorage.getRecordGoalInfo();
        //console.log(recordData);
        return res.json(recordGoalData);
    },

    recordAssist : async (req, res) => {
        const recordAssistData = await RecordAssistStorage.getRecordAssistInfo();
        //console.log(recordAssistData);
        return res.json(recordAssistData);
    }

}

module.exports = {
    output,
    ps
 };