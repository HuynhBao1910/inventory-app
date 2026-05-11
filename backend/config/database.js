const mysql = require("mysql2");

const ketnoi = mysql.createConnection({
    host: process.env.MYSQLHOST,
    port: Number(process.env.MYSQLPORT),
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
    // ssl: {
    //     rejectUnauthorized: false
    // },
    // connectTimeout: 10000
});

ketnoi.connect((err) => {
    if (err) {
        console.log("Lỗi kết nối DB");
        console.log(err);
    } else {
        console.log("Kết nối thành công");
    }
});

module.exports = ketnoi;