const router = require("express").Router();
const db = require("../config/database");
const xacthuc = require("../middleware/xacthuc");




// tao don
router.post("/", xacthuc, (req, res) => {

    const { danhsach } = req.body;

    let tong = 0;

    db.query(
        "INSERT INTO donhang (user_id, tongtien) VALUES (?,0)",
        [req.user.id],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.json("Loi tao don");
            }

            const donhang_id = result.insertId;

            let dem = 0;

            danhsach.forEach((item) => {

                db.query(
                    "SELECT * FROM sanpham WHERE id = ?",
                    [item.sanpham_id],
                    (err, sp) => {

                        if (err || sp.length === 0) {
                            return;
                        }

                        if (sp[0].soluong < item.soluong) {
                            return res.json("San pham khong du ton kho");
                        }

                        tong += sp[0].gia * item.soluong;

                        // tru kho
                        db.query(
                            "UPDATE sanpham SET soluong = soluong - ? WHERE id = ?",
                            [item.soluong, item.sanpham_id]
                        );

                        // them chi tiet don
                        db.query(
                            "INSERT INTO chitiet_donhang (donhang_id, sanpham_id, soluong) VALUES (?,?,?)",
                            [donhang_id, item.sanpham_id, item.soluong]
                        );

                        dem++;

                        // neu xu ly xong het
                        if (dem === danhsach.length) {

                            db.query(
                                "UPDATE donhang SET tongtien = ? WHERE id = ?",
                                [tong, donhang_id],
                                (err) => {

                                    if (err) {
                                        console.log(err);
                                        return res.json("Loi update tong");
                                    }

                                    res.json("Tao don thanh cong");

                                }
                            );

                        }

                    }
                );

            });

        }
    );

});

//trang thai donhang
router.put("/:id", xacthuc, (req, res) => {
    const { trangthai } = req.body;

    //trang thai hop le
    const hopLe = [
        "pending",
        "completed",
        "cancelled"
    ];

    if (!hopLe.includes(trangthai)) {
        return res.json("trang thai khong hop le");
    }
    db.query(
        "UPDATE donhang SET trangthai = ? WHERE id = ?",
        [trangthai, req.params.id],
        (err, result) => {
            if (err) {
                return res.json("Loi cap nhat");
            }
            res.json("Cap nhat thanh cong")
        }
    );
});

//lay don hang
router.get("/", xacthuc, (req, res) => {

    db.query(
        "SELECT * FROM donhang WHERE user_id = ?",
        [req.user.id],
        (err, result) => {

            if (err) {
                return res.json("Loi lay don hang");
            }

            res.json(result);

        }
    );

});
    
    

module.exports = router;