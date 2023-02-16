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

    static updateBoardInfo(boardInfo) {
        return new Promise((resolve, reject) => {
            const query = `update board set boardTitle=?, boardContents=?, boardImg=?, boardUser=? where boardNum = ?;`;
        db.query(
            query,
            [boardInfo[0], boardInfo[1], boardInfo[2], boardInfo[3], boardInfo[4]],
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

    static getBoardDetailInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "select * from board where boardNum = ?;";
        db.query(query, [id], (err, data) => {
            if (err) reject(`${err}`);
            resolve(data[0]);
        });
        });
    }
}

module.exports = BoardStorage;