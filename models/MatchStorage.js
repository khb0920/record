const db = require("../config/db");

class MatchStorage {
    static getMatchInfo() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM `match` ;";
        db.query(query, (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    }

    static getweekMatchInfo() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM `match` where matchResult is NULL ;";
        db.query(query, (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    }

    static getlastMatchInfo() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM `match` where matchResult is NOT NULL ;";
        db.query(query, (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    }

    static getmonthMatchInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM `match` where matchMonth = ?;";
        db.query(query, [id], (err, data) => {
            if (err) reject(`${err}`);
            resolve(data);
        });
        });
    }

    static getMatchMvpInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM user where userName = ?;";
        db.query(query, [id], (err, data) => {
            if (err) reject(`${err}`);
            resolve(data[0]);
        });
        });
    }

    static saveMatchInfo(matchInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO `match`(matchYear, matchMonth, matchDay, matchPlace, matchVs) VALUES(?, ?, ?, ?, ?);";
        db.query(query, 
                [matchInfo.year, matchInfo.month, matchInfo.day, matchInfo.place, matchInfo.vs], 
                (err, data) => {
                if (err) reject(`${err}`);
                resolve({success: true});
        });
        });
    }

    static saveResultInfo(matchRecord) {
        return new Promise((resolve, reject) => {
            const query = "update `match` set matchScore=?, matchLoss=?, matchResult=? matchMvp=? where matchYear = ? and matchMonth = ? and matchDay = ?;";
        db.query(query, 
                [matchRecord.score, matchRecord.loss, matchRecord.result, matchRecord.rmvp, matchRecord.ryear, matchRecord.rmonth, matchRecord.rday], 
                (err, data) => {
                if (err) reject(`${err}`);
                resolve({success: true});
        });
        });
    }
}

module.exports = MatchStorage;