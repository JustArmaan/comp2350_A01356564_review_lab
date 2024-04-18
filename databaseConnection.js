const mysql = require('mysql2/promise');

const is_qoddi = process.env.IS_QODDI || false;

const dbConfigQoddi = {
	host: "sql.freedb.tech",
	user: "freedb_freedb_2350_main",
	password: "5$yTuEkpJg8Dx%@",
	database: "freedb_comp2350-week2-A01356564",
	multipleStatements: false,
	namedPlaceholders: true
};

const dbConfigLocal = {
	host: "sql.freedb.tech",
	user: "freedb_freedb_2350_main",
	password: "5$yTuEkpJg8Dx%@",
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