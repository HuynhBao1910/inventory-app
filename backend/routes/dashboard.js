const router = require("express").Router();
const db = require("../config/database");
const xacthuc = require("../middleware/xacthuc");

//dashboard
router.get("/", xacthuc, (req, res) => {
    //tong san pham
    db.query(
        "SELECT COUNT(*) AS tongSanPham FROM sanpham WHERE user_id = ?",
        [req.user.id],
        (err, sanpham) => {
            db.query(
                "SELECT COUNT(*) AS tongDonHang FROM donhang WHERE user_id =?",
                [req.user.id],
                (err, donhang) => {
                    db.query(
                        "SELECT SUM(tongtien) AS doanhthu FROM donhang WHERE user_id=?",
                        [req.user.id],
                        (err, doanhthu) => {
                            res.json({
                                tongSanPham: sanpham[0].tongSanPham,
                                tongDonHang: donhang[0].tongDonHang,
                                doanhthu: doanhthu[0].doanhthu || 0
                            });
                        }
                    );
                }
            );
        }
    );
});
module.exports = router;