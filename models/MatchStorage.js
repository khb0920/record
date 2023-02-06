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
}

module.exports = MatchStorage;