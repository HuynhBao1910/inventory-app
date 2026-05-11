const router = require("express").Router();
const db = require("../config/database");
const xacthuc = require("../middleware/xacthuc");

// tao don
router.post("/", xacthuc, async (req, res) => {

    console.log(req.body);

    const { danhsach } = req.body;

    if (!danhsach || danhsach.length === 0) {
        return res.json("Khong co san pham");
    }

    let tong = 0;

    db.query(
        "INSERT INTO donhang (user_id, tongtien) VALUES (?, ?)",
        [req.user.id, 0],
        (err, result) => {

            if (err) {
                console.log("Loi tao don:", err);
                return res.status(500).json(err);
            }

            const donhang_id = result.insertId;

            let daXuLy = 0;

            danhsach.forEach((item) => {

                db.query(
                    "SELECT * FROM sanpham WHERE id = ?",
                    [item.sanpham_id],
                    (err, spResult) => {

                        if (err) {
                            console.log(err);
                            return;
                        }

                        if (spResult.length === 0) {
                            console.log("Khong tim thay san pham");
                            return;
                        }

                        const sp = spResult[0];

                        if (sp.soluong < item.soluong) {
                            return res.json("San pham khong du ton kho");
                        }

                        tong += sp.gia * item.soluong;

                        // tru kho
                        db.query(
                            "UPDATE sanpham SET soluong = soluong - ? WHERE id = ?",
                            [item.soluong, item.sanpham_id],
                            (err) => {
                                if (err) {
                                    console.log("Loi tru kho:", err);
                                }
                            }
                        );

                        // them chi tiet
                        db.query(
                            "INSERT INTO chitiet_donhang (donhang_id, sanpham_id, soluong) VALUES (?, ?, ?)",
                            [donhang_id, item.sanpham_id, item.soluong],
                            (err) => {

                                if (err) {
                                    console.log("Loi them chi tiet:", err);
                                }

                                daXuLy++;

                                if (daXuLy === danhsach.length) {

                                    db.query(
                                        "UPDATE donhang SET tongtien = ? WHERE id = ?",
                                        [tong, donhang_id],
                                        (err) => {

                                            if (err) {
                                                console.log("Loi update tong:", err);
                                                return res.status(500).json(err);
                                            }

                                            res.json({
                                                message: "Tao don thanh cong",
                                                tong
                                            });

                                        }
                                    );

                                }

                            }
                        );

                    }
                );

            });

        }
    );

});

// lay don hang
router.get("/", xacthuc, (req, res) => {

    db.query(
        "SELECT * FROM donhang WHERE user_id = ?",
        [req.user.id],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.json("Loi lay don hang");
            }

            res.json(result);

        }
    );

});

// cap nhat trang thai
router.put("/:id", xacthuc, (req, res) => {

    const { trangthai } = req.body;

    db.query(
        "UPDATE donhang SET trangthai = ? WHERE id = ?",
        [trangthai, req.params.id],
        (err) => {

            if (err) {
                console.log(err);
                return res.json("Loi cap nhat");
            }

            res.json("Cap nhat thanh cong");

        }
    );

});

module.exports = router;

