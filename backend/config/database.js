const mysql = require("mysql2");

const ketnoi = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PROT
});

ketnoi.connect((err) => {
    if (err) console.log("Lỗi kết nói DB");
    else console.log("Kết nối thành công");
});
  //a
module.exports = ketnoi;