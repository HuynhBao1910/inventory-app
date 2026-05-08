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
                if (err) return res.json("Email đã tồn tại hoặc lỗi DB");
                res.json("Đăng ký thành công");
            }
        );
    } catch (err) {
        res.status(500).json("Lỗi server");
    }
});


// đăng nhập
router.post("/dangnhap", (req, res) => {
    const { email, matkhau } = req.body;

    db.query(
        "SELECT * FROM nguoidung WHERE email = ?",
        [email],
        async (err, result) => {
            if (err) return res.json("Lỗi server");
            if (result.length === 0)
                return res.json("Không tìm thấy tài khoản");

            const user = result[0];

            const dung = await bcrypt.compare(matkhau, user.matkhau);
            if (!dung) return res.json("Sai mật khẩu");
            const token = jwt.sign({ id: user.id }, "123456");
            res.json({
                message: "Đăng nhập thành công",
                token
            });
        }
    );
});

module.exports = router;