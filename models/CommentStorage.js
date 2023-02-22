const db = require("../config/db");

class CommentStorage {
    static saveCommentInfo(commentInfo) {
        return new Promise((resolve, reject) => {
            const query = "insert into comment(commentDetail, userId, boardNum) values(?, ?, ?);";
        db.query(
            query,
            [commentInfo[0], commentInfo[1], commentInfo[2]],
            (err) => {
            if (err) reject(`${err}`);
            resolve({success: true});
        });
        });
    }

    static getCommentInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "select * from comment where boardNum = ?;";
        db.query(
            query,
            [id],
            (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    }
}

module.exports = CommentStorage;