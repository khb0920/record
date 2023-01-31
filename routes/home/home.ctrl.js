const User = require("../../models/User");

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
};

const process = {
    login : async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
        
    },

    register : async (req, res) => {
        const image = "/image/" + req.file.filename;
        const userInfo = [req.body.id ,req.body.psword, req.body.name, req.body.age, req.body.position, image];
        const user = new User(userInfo);
        const response = await user.register();
        return res.json(response);
    }
}

module.exports = {
    output,
    process
 };