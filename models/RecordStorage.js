const db = require("../config/db");

class RecordStorage {
    static getRecord() {
        return new Promise((resolve, reject) => {
            const query = "select * from record;"
        db.query(query, (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    
    }

    static recordDetail(id) {
        return new Promise((resolve, reject) => {
            const query = `select * from record order by ${id} DESC;`
        db.query(query, (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    }

    static getMyRecord(id) {
        return new Promise((resolve, reject) => {
            const query = "select * from record where userId = ?"
        db.query(query, [id], (err, data) => {
            if (err) reject(`${err}`);
            resolve(data[0]);
        });
        });
    
    }

    static getGoalInfo() {
        return new Promise((resolve, reject) => {
            const query = "SELECT user.userName, user.userImg, record.userGoal FROM user, record where user.userNum = record.userId Order by record.userGoal DESC;";
        db.query(query, (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    }

    static getAssistInfo() {
        return new Promise((resolve, reject) => {
            const query = "SELECT user.userName, user.userImg, record.userAssist FROM user, record where user.userNum = record.userId Order by record.userAssist DESC ;";
        db.query(query, (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    }

    static getMvpInfo() {
        return new Promise((resolve, reject) => {
            const query = "SELECT user.userName, userImg, userMvp FROM user, record where user.userNum = record.userId Order by record.userMvp DESC ;";
        db.query(query, (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    }

    static getSaveInfo() {
        return new Promise((resolve, reject) => {
            const query = "SELECT user.userName, userImg, userSave FROM user, record where user.userNum = record.userId Order by record.userSave DESC ;";
        db.query(query, (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    }
    static saveRecordInfo(recordInfo) {
        return new Promise((resolve, reject) => {
                const query ="UPDATE record SET userGoal = userGoal + ?, userAssist = userAssist + ?, userMvp = userMvp + ?, userSave = userSave + ?, userPartici = userPartici + ? WHERE userName = ?;";
            db.query(query,
                [recordInfo.goal, recordInfo.assist, recordInfo.mvp, recordInfo.save, recordInfo.partici, recordInfo.username],
                (err, data) => {
            if (err) reject(`${err}`);
            resolve({success: true});
        });
        });
    }
}



module.exports = RecordStorage; 