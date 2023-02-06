const db = require("../config/db");


class UserStorage {
    constructor(body) {
        this.body = body;
    }
    static getUserInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM user WHERE userId = ?;";
        db.query(query, [id], (err, data) => {
            if (err) reject(`${err}`);
            resolve(data[0]);
        });
        });
    }
    
    static async save(userInfo){
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO user(userId, userPw, userName, userAge, userPos, userImg) VALUES(?, ?, ?, ?, ?, ?);";
        db.query(
            query,
            [userInfo[0], userInfo[1], userInfo[2], userInfo[3], userInfo[4], userInfo[5]],
            (err) => {
            if (err) reject(`${err}`);  
            resolve({ success: true });
        });
        });
        
    }

    static getAllUserInfo() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM user ORDER BY userNum DESC;";
        db.query(query, (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    }
}


module.exports = UserStorage;