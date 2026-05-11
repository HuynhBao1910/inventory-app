import { useEffect, useState } from "react";
import api from "../api/api";
import ThemSanPham from "../components/ThemSanPham";

function SanPham() {

    const [danhsach, setDanhsach] = useState([]);

    const [soluongMua, setSoluongMua] = useState({});

    const [timkiem, setTimKiem] = useState("");

    const [trangHienTai, setTrangHientai] = useState(1);
    const soLuongMoiTrang = 5;

    // lay san pham
    const laySanPham = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/api/sanpham", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setDanhsach(res.data);

        } catch (err) {

            console.log(err);

            alert("Loi lay san pham");

        }

    };

    // chay khi load trang
    useEffect(() => {

        laySanPham();

    }, []);

    //xoa
    const xoaSanpham = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await api.delete(`/api/sanpham/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Xoa thanh cong");
            laySanPham();
        } catch (err) {
            console.log(err);
            alert("Loi xoa");
        }
    };

    //sua 
    const suaSanPham = async (sp) => {
        const tenMoi = prompt("Tến mới", sp.ten);
        const motaMoi = prompt("Mô tả mới", sp.mota);
        const giaMoi = prompt("Giá mới", sp.gia);
        const soluongMoi = prompt("Số lượng mới", sp.soluong);
        const hinhanhMoi = prompt("Hình ảnh mới", sp.hinhanh);

        try {
            const token = localStorage.getItem("token");

            await api.put(
                `/api/sanpham/${sp.id}`,
                {
                    ten: tenMoi,
                    mota: motaMoi,
                    gia: giaMoi,
                    soluong: soluongMoi,
                    hinhanh: hinhanhMoi
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            alert("Cập nhật thành công");
            laySanPham();
        } catch (error) {
            console.log(error);
            alert("Lỗi cập nhật");
        }
    };

    //order
    const datDon = async (sp) => {

        try {

            const token = localStorage.getItem("token");

            const soluong = soluongMua[sp.id] || 1;

            await api.post(
                "/api/donhang",
                {
                    danhsach: [
                        {
                            sanpham_id: sp.id,
                            soluong: Number(soluong)
                        }
                    ]
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(" Đặt đơn thành công");
            laySanPham();

        } catch (err) {

            console.log(err);
            alert(" Lỗi đặt đơn");

        }
    };

    // trang
    const viTriCuoi = trangHienTai * soLuongMoiTrang;
    const viTriDau = viTriCuoi - soLuongMoiTrang;

    const sanPhamHienThi = danhsach.filter((sp) => {

        const tenSanpham = sp.ten
            ? sp.ten.toLowerCase()
            : "";

        return tenSanpham.includes(
            (timkiem || "").toLowerCase()
        );

    })
        .slice(viTriDau, viTriCuoi);

    return (
        <div>
            <ThemSanPham />
            <div className="mb-4">

                <input
                    className="form-control shadow-sm border-0"
                    placeholder="🔍 Tìm sản phẩm..."
                    style={{
                        height: 55,
                        borderRadius: 16
                    }}
                    onChange={(e) => setTimKiem(e.target.value)}
                />

            </div>
            <h2>Danh sách sản phẩm</h2>

            {
                sanPhamHienThi.map((sp) => (

                    <div
    key={sp.id}
    className="card border-0 shadow-lg mb-4"
    style={{
        borderRadius: 24,
        overflow: "hidden"
    }}
>

    <div className="row g-0 align-items-center">

        <div className="col-md-3 text-center p-3">

            <img
                src={sp.hinhanh}
                alt=""
                style={{
                    width: 180,
                    height: 180,
                    objectFit: "cover",
                    borderRadius: 20
                }}
            />

        </div>

        <div className="col-md-9">

            <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-start flex-wrap">

                    <div>

                        <h3 className="fw-bold mb-2">
                            {sp.ten}
                        </h3>

                        <p
                            className="text-muted"
                            style={{
                                maxWidth: 500
                            }}
                        >
                            {sp.mota}
                        </p>

                    </div>

                    <span
                        className="badge bg-dark"
                        style={{
                            padding: "10px 16px",
                            borderRadius: 12,
                            fontSize: 14
                        }}
                    >
                        Kho: {sp.soluong}
                    </span>

                </div>

                <h2 className="text-primary fw-bold mt-3 mb-4">

                    {Number(sp.gia).toLocaleString()}đ

                </h2>

                <div className="row align-items-center">

                    <div className="col-md-3">

                        <input
                            type="number"
                            className="form-control shadow-sm"
                            placeholder="Số lượng"
                            style={{
                                height: 50,
                                borderRadius: 14
                            }}
                            onChange={(e) =>
                                setSoluongMua({
                                    ...soluongMua,
                                    [sp.id]: e.target.value
                                })
                            }
                        />

                    </div>

                    <div className="col-md-9">

                        <div className="d-flex gap-2 flex-wrap">

                            <button
                                className="btn btn-danger px-4"
                                style={{
                                    borderRadius: 14
                                }}
                                onClick={() => xoaSanpham(sp.id)}
                            >
                                🗑 Xóa
                            </button>

                            <button
                                className="btn btn-warning px-4"
                                style={{
                                    borderRadius: 14
                                }}
                                onClick={() => suaSanPham(sp)}
                            >
                                ✏️ Sửa
                            </button>

                            <button
                                className="btn btn-success px-4"
                                style={{
                                    borderRadius: 14
                                }}
                                onClick={() => datDon(sp)}
                            >
                                🛒 Đặt đơn
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>

                ))
            }
            <div className="d-flex justify-content-center gap-3 my-5">

                <button
                    className="btn btn-dark px-4 py-2"
                    style={{
                        borderRadius: 14
                    }}
                    onClick={() =>
                        setTrangHientai(trangHienTai - 1)
                    }
                    disabled={trangHienTai === 1}
                >
                    Prev
                </button>

                <button
                    className="btn btn-dark px-4 py-2"
                    style={{
                        borderRadius: 14
                    }}
                    onClick={() =>
                        setTrangHientai(trangHienTai + 1)
                    }
                >
                    Next
                </button>

            </div>
        </div>
    );
}

export default SanPham;