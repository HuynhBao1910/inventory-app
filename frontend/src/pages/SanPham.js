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

//trang
    const viTriCuoi = trangHienTai * soLuongMoiTrang;
    const viTriDau = viTriCuoi - soLuongMoiTrang;
    const sanPhamHienThi = danhsach.filter((sp) => sp.ten.toLowerCase().includes(
        timkiem.toLowerCase()
    ))
        .slice(viTriDau, viTriCuoi);

    return (
        <div>
            <ThemSanPham />
            <input className="form-control mb-3" placeholder="Tìm sản phẩm" onChange={(e)=> setTimKiem(e.target.value)}  />
            <h2>Danh sách sản phẩm</h2>

            {
    sanPhamHienThi.map((sp) => (

        <div
    key={sp.id}
    className="card border-0 shadow-sm mb-4"
    style={{
        borderRadius: 20,
        overflow: "hidden"
    }}
>

    <div className="row g-0">

        <div className="col-md-4">

            <img
                src={sp.hinhanh}
                alt=""
                style={{
                    width: "50%",
                    height: "50%",
                    objectFit: "cover",
                    minHeight: 250,
                    borderRadius: 12,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
            />

        </div>

        <div className="col-md-9">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-start">

                    <div>

                        <h3 className="fw-bold">
                            {sp.ten}
                        </h3>

                        <p className="text-muted">
                            {sp.mota}
                        </p>

                    </div>

                    <span className="badge bg-dark fs-6">
                        Kho: {sp.soluong}
                    </span>

                </div>

                <h4 className="text-primary fw-bold mb-4">
                    {Number(sp.gia).toLocaleString()}đ
                </h4>

                <input
                    type="number"
                    className="form-control mb-4 shadow-sm"
                    placeholder="Số lượng mua"
                    onChange={(e) =>
                        setSoluongMua({
                            ...soluongMua,
                            [sp.id]: e.target.value
                        })
                    }
                />

                <div className="d-flex gap-2">

                    <button
                        className="btn btn-danger"
                        onClick={() => xoaSanpham(sp.id)}
                    >
                        <i className="bi bi-trash me-2"></i>
                        Xóa
                    </button>

                    <button
                        className="btn btn-warning"
                        onClick={() => suaSanPham(sp)}
                    >
                        <i className="bi bi-pencil me-2"></i>
                        Sửa
                    </button>

                    <button
                        className="btn btn-success"
                        onClick={() => datDon(sp)}
                    >
                        <i className="bi bi-cart-plus me-2"></i>
                        Đặt đơn
                    </button>

                </div>

            </div>

        </div>

    </div>

</div>

    ))
            }
            <div className="d-flex gap-2 mb-4">

    <button
        className="btn btn-dark px-4"
        onClick={() =>
            setTrangHientai(trangHienTai - 1)
        }
        disabled={trangHienTai === 1}
    >
        Prev
    </button>

    <button
        className="btn btn-dark px-4"
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