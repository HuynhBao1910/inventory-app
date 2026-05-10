const mysql = require("mysql2");

const ketnoi = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    },
    connectTimeout: 10000
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