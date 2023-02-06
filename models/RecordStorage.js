const db = require("../config/db");

class RecordStorage {
    // static getRecord() {
    //     return new Promise((resolve, reject) => {
    //         const query = "";
    //     db.query(query, (err, data) => {
    //         if (err) reject(`${err}`);
    //         resolve(data);
    //     });
    //     });
    // }

    static getGoalInfo() {
        return new Promise((resolve, reject) => {
            const query = "SELECT userName, userImg, userGoal FROM user, record where user.userNum = record.userId Order by record.userGoal DESC ;";
        db.query(query, (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    }

    static getAssistInfo() {
        return new Promise((resolve, reject) => {
            const query = "SELECT userName, userImg, userAssist FROM user, record where user.userNum = record.userId Order by record.userAssist DESC ;";
        db.query(query, (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    }

    static getMvpInfo() {
        return new Promise((resolve, reject) => {
            const query = "SELECT userName, userImg, userMvp FROM user, record where user.userNum = record.userId Order by record.userMvp DESC ;";
        db.query(query, (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    }

    static getSaveInfo() {
        return new Promise((resolve, reject) => {
            const query = "SELECT userName, userImg, userSave FROM user, record where user.userNum = record.userId Order by record.userSave DESC ;";
        db.query(query, (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    }
}



module.exports = RecordStorage; 