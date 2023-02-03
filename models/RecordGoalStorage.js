const db = require("../config/db");

class RecordGoalStorage {
    static getRecordGoalInfo() {
        return new Promise((resolve, reject) => {
            const query = "SELECT userName, userImg, userGoal FROM user, record where user.userNum = record.userId Order by record.userGoal DESC ;";
        db.query(query, (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    }
}

module.exports = RecordGoalStorage;