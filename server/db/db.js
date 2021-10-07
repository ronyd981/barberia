const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "barber_admin"
});

try {
    if(db) console.log("Success")
} catch (error) {
    console.log(error)
}

module.exports = db;