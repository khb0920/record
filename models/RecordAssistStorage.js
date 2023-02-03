const db = require("../config/db");

class RecordAssistStorage {
    static getRecordAssistInfo() {
        return new Promise((resolve, reject) => {
            const query = "SELECT userName, userImg, userAssist FROM user, record where user.userNum = record.userId Order by record.userAssist DESC ;";
        db.query(query, (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    }
}

module.exports = RecordAssistStorage;