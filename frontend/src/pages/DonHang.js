import { useEffect, useState } from "react";
import api from "../api/api";

function DonHang() {
    const [danhsach, setDanhsach] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const layDonHang = async () => {
            try {
                const res = await api.get("/api/donhang", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setDanhsach(res.data);

            } catch (err) {
                console.log(err);
                alert("Lỗi lấy đơn hàng");
            }
        };

        layDonHang();

    }, [token]);

    const capNhatTrangThai = async (id, trangthai) => {
        try {
            await api.put(
                `/donhang/${id}`,
                { trangthai },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Cập nhật thành công");
            window.location.reload();

        } catch (err) {
            console.log(err);
            alert("Lỗi cập nhật");
        }
    };

    const getBadge = (trangthai) => {

        if (trangthai === "completed")
            return "badge bg-success fs-6";

        if (trangthai === "cancelled")
            return "badge bg-danger fs-6";

        return "badge bg-warning text-dark fs-6";
    };

    return (
        <div className="container py-3">

            <h2 className="mb-4 fw-bold">
                Danh sách đơn hàng
            </h2>

            <div className="row g-3">

                {danhsach.map((dh) => (

                    <div className="col-12" key={dh.id}>

                        <div className="card shadow-sm border-0 rounded-4 p-3">

                            <div className="d-flex justify-content-between align-items-center flex-wrap">

                                <div>

                                    <h5 className="fw-bold mb-1">
                                        Đơn hàng #{dh.id}
                                    </h5>

                                    <p className="text-muted mb-1">
                                        Tổng tiền
                                    </p>

                                    <h4 className="text-primary fw-bold mb-0">
                                        {Number(dh.tongtien).toLocaleString()}đ
                                    </h4>

                                </div>

                                <div className="text-end">

                                    <span className={getBadge(dh.trangthai)}>
                                        {dh.trangthai}
                                    </span>

                                    <div className="mt-2 d-flex gap-2 justify-content-end">

                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() =>
                                                capNhatTrangThai(dh.id, "completed")
                                            }
                                            disabled={dh.trangthai === "completed"}
                                        >
                                            Hoàn thành
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                capNhatTrangThai(dh.id, "cancelled")
                                            }
                                            disabled={dh.trangthai === "cancelled"}
                                        >
                                            Huỷ
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default DonHang;