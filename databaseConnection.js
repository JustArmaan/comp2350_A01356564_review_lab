const mysql = require('mysql2/promise');

const is_qoddi = process.env.IS_QODDI || false;

const dbConfigQoddi = {
	host: "sql.freedb.tech",
	user: "freedb_ 2350_main",
	password: "K?B$j2%Pc!e28bU",
	database: "freedb_comp2350-week2-A01356564",
	multipleStatements: false,
	namedPlaceholders: true
};

const dbConfigLocal = {
	host: "sql.freedb.tech",
	user: "freedb_ 2350_main",
	password: "K?B$j2%Pc!e28bU",
	database: "freedb_comp2350-week2-A01356564",
	multipleStatements: false,
	namedPlaceholders: true
};

if (is_qoddi) {
	var database = mysql.createPool(dbConfigQoddi);
}
else {
	var database = mysql.createPool(dbConfigLocal);
}

module.exports = database;