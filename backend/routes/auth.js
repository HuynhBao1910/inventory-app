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
        res.status(500).json(err);
    }
});

//dang nhap
router.post("/dangnhap", (req, res) => {
    const { email, matkhau } = req.body;
    console.log("Đang kiểm tra đăng nhập cho:", email);

    db.query(
        "SELECT * FROM nguoidung WHERE email = ?",
        [email],
        async (err, result) => {
            if (err) {
                console.error("Lỗi truy vấn DB:", err);
                return res.status(500).json("Lỗi server");
            }
            if (result.length === 0)
                return res.status(404).json("Không tìm thấy tài khoản");

            const user = result[0];
            console.log("Mật khẩu người dùng nhập:", matkhau);
            console.log("Mật khẩu lấy từ DB:", user.matkhau);
            
            const dung = await bcrypt.compare(matkhau, user.matkhau);
            console.log("Kết quả so sánh:", dung);
            
            if (!dung) return res.status(401).json("Sai mật khẩu");

            // kiểm tra xem secret có tồn tại k
            if (!process.env.JWT_SECRET) {
                console.error("LỖI: JWT_SECRET chưa được cấu hình trong Variables!");
                return res.status(500).json("Lỗi cấu hình server");
            }

            try {
                const token = jwt.sign(
                    { id: user.id }, 
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" } // token có hạn 1 ngày
                );

                console.log("Tạo token thành công cho:", email);
                
                return res.json({
                    message: "Đăng nhập thành công",
                    token: token // gửi token về cho vercel
                });
            } catch (jwtErr) {
                console.error("Lỗi khi tạo Token:", jwtErr);
                return res.status(500).json("Không thể tạo mã xác thực");
            }
        }
    );
});

module.exports = router;