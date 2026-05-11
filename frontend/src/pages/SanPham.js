import { useEffect, useState } from "react";
import api from "../api/api";
import ThemSanPham from "../components/ThemSanPham";

function SanPham() {

    const [danhsach, setDanhsach] = useState([]);
    const [soluongMua, setSoluongMua] = useState({});
    const [timkiem, setTimKiem] = useState("");

    const [trangHienTai, setTrangHientai] = useState(1);

    const soLuongMoiTrang = 6;

    // lấy sản phẩm
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
            alert("Lỗi lấy sản phẩm");

        }

    };

    useEffect(() => {

        laySanPham();

    }, []);

    // xoá sản phẩm
    const xoaSanpham = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/api/sanpham/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Xóa thành công");

            laySanPham();

        } catch (err) {

            console.log(err);
            alert("Lỗi xóa");

        }

    };

    // sửa sản phẩm
    const suaSanPham = async (sp) => {

        const tenMoi = prompt("Tên mới", sp.ten);
        const motaMoi = prompt("Mô tả mới", sp.mota);
        const giaMoi = prompt("Giá mới", sp.gia);
        const soluongMoi = prompt("Số lượng mới", sp.soluong);
        const hinhanhMoi = prompt("Hình ảnh mới", sp.hinhanh);

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
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Cập nhật thành công");

            laySanPham();

        } catch (error) {

            console.log(error);
            alert("Lỗi cập nhật");

        }

    };

    // đặt đơn
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

            alert("Đặt đơn thành công");

            laySanPham();

        } catch (err) {

            console.log(err);
            alert("Lỗi đặt đơn");

        }

    };

    // phân trang
    const viTriCuoi = trangHienTai * soLuongMoiTrang;

    const viTriDau = viTriCuoi - soLuongMoiTrang;

    const sanPhamHienThi = danhsach
        .filter((sp) => {

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

            {/* HEADER */}

            <div
                className="p-4 mb-4"
                style={{
                    background: "#ffffff",
                    borderRadius: 24,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)"
                }}
            >

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                    <div>

                        <h2 className="fw-bold mb-1">
                            Quản lý sản phẩm
                        </h2>

                        <p className="text-muted mb-0">
                            Inventory Management Dashboard
                        </p>

                    </div>

                    <div style={{ width: 300 }}>

                        <input
                            className="form-control"
                            placeholder="🔍 Tìm kiếm sản phẩm..."
                            onChange={(e) => setTimKiem(e.target.value)}
                        />

                    </div>

                </div>

            </div>

            {/* FORM THÊM */}

            <ThemSanPham />

            {/* DANH SÁCH */}

            <div className="row">

                {
                    sanPhamHienThi.map((sp) => (

                        <div
                            className="col-md-6 col-lg-4 mb-4"
                            key={sp.id}
                        >

                            <div
                                className="card border-0 h-100"
                                style={{
                                    borderRadius: 24,
                                    overflow: "hidden",
                                    boxShadow: "0 6px 24px rgba(0,0,0,0.08)"
                                }}
                            >



                                <div
                                    style={{
                                        height: 260,
                                        background: "#f8f9fa",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 20
                                    }}
                                >

                                    <img 
                                        src={sp.hinhanh}
                                        alt=""
                                        className="product-image"
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                            objectFit: "contain",
                                            transition: "0.3s"
                                        }}
                                    />

                                </div>

                                {/* CONTENT */}

                                <div className="card-body d-flex flex-column">

                                    <div className="d-flex justify-content-between align-items-start mb-2">

                                        <h4 className="fw-bold">
                                            {sp.ten}
                                        </h4>

                                        <span className="badge bg-dark">
                                            Kho: {sp.soluong}
                                        </span>

                                    </div>

                                    <p
                                        className="text-muted"
                                        style={{
                                            minHeight: 60
                                        }}
                                    >
                                        {sp.mota}
                                    </p>

                                    <h3 className="text-primary fw-bold mb-3">
                                        {Number(sp.gia).toLocaleString()}đ
                                    </h3>

                                    <input
                                        type="number"
                                        className="form-control mb-3"
                                        placeholder="Số lượng mua"
                                        onChange={(e) =>
                                            setSoluongMua({
                                                ...soluongMua,
                                                [sp.id]: e.target.value
                                            })
                                        }
                                    />

                                    <div className="d-grid gap-2 mt-auto">

                                        <button
                                            className="btn btn-success"
                                            onClick={() => datDon(sp)}
                                        >
                                            🛒 Đặt đơn
                                        </button>

                                        <div className="d-flex gap-2">

                                            <button
                                                className="btn btn-warning w-100"
                                                onClick={() => suaSanPham(sp)}
                                            >
                                                ✏️ Sửa
                                            </button>

                                            <button
                                                className="btn btn-danger w-100"
                                                onClick={() => xoaSanpham(sp.id)}
                                            >
                                                🗑 Xóa
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))
                }

            </div>

            {/* PHÂN TRANG */}

            <div className="d-flex justify-content-center gap-3 mt-4">

                <button
                    className="btn btn-dark px-4"
                    onClick={() =>
                        setTrangHientai(trangHienTai - 1)
                    }
                    disabled={trangHienTai === 1}
                >
                    ← Prev
                </button>

                <button
                    className="btn btn-dark px-4"
                    onClick={() =>
                        setTrangHientai(trangHienTai + 1)
                    }
                >
                    Next →
                </button>

            </div>

        </div>

    );
}

export default SanPham;