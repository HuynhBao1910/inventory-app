import { useState } from "react";
import api from "../api/api";

function ThemSanPham() {

    const [ten, setTen] = useState("");
    const [mota, setMota] = useState("");
    const [gia, setGia] = useState("");
    const [soluong, setSoluong] = useState("");
    const [hinhanh, setHinhanh] = useState("");

    const themSanPham = async () => {
        try {

            const token = localStorage.getItem("token");

            await api.post(
                "/api/sanpham",
                {
                    ten,
                    mota,
                    gia,
                    soluong,
                    hinhanh
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Thêm thành công");
            window.location.reload();

        } catch (err) {
            console.log(err);
            alert(" Lỗi thêm sản phẩm");

        }

    };

    return (
        <div
            style={{
                border: "1px solid gray",
                padding: 20,
                marginBottom: 30
            }}
        >

            <h2>Thêm sản phẩm</h2>

            <input className="form-control"
                placeholder="Tên sản phẩm" onChange={(e) => setTen(e.target.value)}
            />

            <br /><br />

            <input className="form-control"
                placeholder="Mô tả" onChange={(e) => setMota(e.target.value)}
            />

            <br /><br />

            <input className="form-control"
                placeholder="Giá" onChange={(e) => setGia(e.target.value)}
            />

            <br /><br />

            <input className="form-control"
                placeholder="Số lượng" onChange={(e) => setSoluong(e.target.value)}
            />

            <br /><br />

            <input className="form-control"
                placeholder="Link hình ảnh" onChange={(e) => setHinhanh(e.target.value)}
            />

            <br /><br />

            <button className="btn btn-primary" onClick={themSanPham}>
                Thêm sản phẩm
            </button>

        </div>
    );
}

export default ThemSanPham;