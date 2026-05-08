const router = require("express").Router();
const db = require("../config/database");
const xacthuc = require("../middleware/xacthuc");
const { route } = require("./auth");

//them san pham
router.post("/", xacthuc, (req, res) => {
    const { ten, mota, gia, soluong, hinhanh } = req.body;

    db.query (
        "INSERT INTO sanpham (ten,mota, gia, soluong,hinhanh, user_id) VALUES(?,?,?,?,?,?)",
            [ten, mota, gia, soluong, hinhanh, req.user.id],
            (err, result) => {
                if (err) return res.json("Loi them san pham");
                res.json("Them thanh cong");
            }
    )
});

//lay danh sachs

router.get("/", xacthuc, (req, res) => {
    db.query(
        "SELECT * FROM sanpham WHERE user_id =?",
        [req.user.id],
        (err, result) => {
            res.json(result);
        }
    );
});

//sua sanpham
router.put("/:id", xacthuc, (req, res) => {
    const { ten, mota, gia, soluong, hinhanh } = req.body;

    db.query(
        "UPDATE sanpham SET ten=?, mota=?, gia=?, soluong=?, hinhanh=? WHERE id=? AND user_id=?",
        [ten, mota, gia, soluong, hinhanh, req.params.id, req.user.id],
        (err, result) => {
            res.json(" Cap nhat thanh cong");
        }
    );
}
);

//xoa sanpham
router.delete("/:id", xacthuc, (req, res) => {
    db.query(
        "DELETE FROM sanpham WHERE id=? AND user_id=?",
        [req.params.id, req.user.id],
        (err, result) => {
            res.json(" Xoa thanh cong");
        }
    );
});

module.exports = router;
