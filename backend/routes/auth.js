const router = require("express").Router();
const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// đăng ký
router.post("/dangky", async (req, res) => {
    const { ten, email, matkhau } = req.body;
    try {
        const mahoa = await bcrypt.hash(matkhau, 10);

        db.query(sql, [ten, email, mahoa], (err, result) => {
            if (err) {
                console.error("LỖI DB CHI TIẾT:", err.sqlMessage);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json("Email này đã được đăng ký");
                }
                return res.status(500).json("Lỗi DB: " + err.sqlMessage);
            }
            res.status(201).json("Đăng ký thành công");
        });
    } catch (err) {
        console.error("Lỗi Bcrypt:", err);
        res.status(500).json("Lỗi xử lý hệ thống");
    }
});

//dang nhap
router.post("/dangnhap", (req, res) => {
    const { email, matkhau } = req.body;
    console.log("Bắt đầu kiểm tra đăng nhập");

    db.query(
        "SELECT * FROM nguoidung WHERE email = ?",
        [email],
        async (err, result) => {
            if (err) {
                console.error("Lỗi truy vấn DB:", err);
                return res.status(500).json("Lỗi server");
            }

            if (result.length === 0) {
                return res.status(404).json("Không tìm thấy tài khoản");
            }

            const user = result[0];

            // LOG ĐỂ SOI 
            console.log("Mật khẩu DB :", user.matkhau);
            console.log("Độ dài chuỗi Hash:", user.matkhau ? user.matkhau.length : 0);

            // Kiểm tra nếu chuỗi Hash bị cắt 
            if (!user.matkhau || user.matkhau.length < 60) {
                return res.status(500).json("Dữ liệu mật khẩu trong DB bị lỗi . Hãy xóa  và đăng ký lại");
            }

            try {
                const dung = await bcrypt.compare(matkhau, user.matkhau);
                console.log("Kết quả so sánh:", dung);

                if (!dung) return res.status(401).json("Sai mật khẩu");

                if (!process.env.JWT_SECRET) {
                    console.error("LỖI: JWT_SECRET trống");
                    return res.status(500).json("Lỗi cấu hình server");
                }

                const token = jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" }
                );

                return res.json({ message: "Đăng nhập thành công", token });

            } catch (error) {
                console.error("Lỗi so sánh mật khẩu:", error);
                return res.status(500).json("Lỗi xác thực");
            }
        }
    );
});
module.exports = router;