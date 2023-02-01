const User = require("../../models/User");
const jwt = require('jsonwebtoken');
const UserStorage = require("../../models/UserStorage");


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
    test : async(req, res) => {
        res.render("usertest.html");
    },
};

const ps = {
    login : async (req, res) => {
        const user = new User(req.body);
        const userData = await user.login();
        //console.log(req.body.id);
        if(userData.success===true){
            const TokenSuccess = jwt.sign({
                id : req.body.id,
            }, process.env.ACCESS_SECRET, {
                expiresIn : '30m'
            })
            res.cookie("accessToken", TokenSuccess, {
                secure : false,
                httpOnly : true,
            })
            
            // res.cookie(user, TokenSuccess);
            // res.json(TokenSuccess);
            //console.log(userData);
            return res.json({ response : userData, token :TokenSuccess});
        }else{
            return res.json({ response : userData});
            //console.log(userData);
        }
    },

    register : async (req, res) => {
        const image = "/image/" + req.file.filename;
        const userInfo = [req.body.id ,req.body.psword, req.body.name, req.body.age, req.body.position, image];
        const user = new User(userInfo);
        const response = await user.register();
        return res.json(response);
    },

    user : async (req, res) => {
        const userData = await UserStorage.getUserInfo(req.decoded.id);
        return res.json(userData);
    }

}

module.exports = {
    output,
    ps
 };