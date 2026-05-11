const router = require("express").Router();
const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// đăng ký
router.post("/dangky", async (req, res) => {
    const { ten, email, matkhau } = req.body;
    try {
        const mahoa = await bcrypt.hash(matkhau, 10);
        db.query(
            "INSERT INTO nguoidung (ten, email, matkhau) VALUES (?,?,?)",
            [ten, email, mahoa],
            (err, result) => {
                if (err) {
                    console.error("Lỗi INSERT:", err.sqlMessage);
                    return res.status(400).json({
                        message: "Lỗi đăng ký",
                        error_detail: err.sqlMessage 
                    });
                }

              return res.status(201).json({
                    message: "Đăng ký thành công",
                    id: result.insertId 
                });
            }
        );
    } catch (err) {
        res.status(500).json({ message: "Lỗi hệ thống", error: err.message });
    }
});

//dang nhap
router.post("/dangnhap", (req, res) => {
    const { email, matkhau } = req.body;
    db.query("SELECT * FROM nguoidung WHERE email = ?", [email], async (err, result) => {
        if (err) return res.status(500).json("Lỗi kết nối DB");
        if (result.length === 0) return res.status(404).json("Không tìm thấy user");

        const user = result[0];
        
        // Kiểm tra độ dài hash để báo lỗi sớm
        if (user.matkhau.length < 20) {
            return res.status(500).json("Dữ liệu DB bị lỗi, hãy xóa user này đăng ký lại");
        }

        const dung = await bcrypt.compare(matkhau, user.matkhau);
        if (!dung) return res.status(401).json("Sai mật khẩu");

        if (!process.env.JWT_SECRET) return res.status(500).json("Thiếu JWT_SECRET trên server");

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ message: "Thành công", token });
    });
});
module.exports = router;