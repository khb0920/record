const db = require("../config/db");

class BoardStorage {
    static saveBoardInfo(boardInfo) {
        return new Promise((resolve, reject) => {
            const query = "insert into board(boardTitle, boardContents, boardImg, boardUser) values(?, ?, ?, ?);";
        db.query(
            query,
            [boardInfo[0], boardInfo[1], boardInfo[2], boardInfo[3]],
            (err) => {
            if (err) reject(`${err}`);
            resolve({success: true});
        });
        });
    }

    static getBoardInfo() {
        return new Promise((resolve, reject) => {
            const query = "select * from board;";
        db.query(query, (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    }
}

module.exports = BoardStorage;