import { useEffect, useState } from "react";
import api from "../api/api";

function Dashboard() {
    const [dulieu, setDulieu] = useState({});
    const layDashboard = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await api.get("/api/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDulieu(res.data);
        } catch (error) {
            console.log(error);
            alert("Lỗi Dashbỏad");
        }
    };
    useEffect(() => {
        layDashboard();
    }, []);

    return (
        <div className="mb-4">
            <h2>Dashboard</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card p-3 h-100">
                        <h4>Tổng sản phẩm</h4>
                        <h2>{dulieu.tongSanPham}</h2>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3 h-100">
                        <h4>Tổng đơn hàng</h4>
                        <h2>{dulieu.tongDonHang}</h2>
                    </div>

                </div>
                <div className="col-md-4">
                    <div className="card p-3 h-100">
                        <h4>Doanh thu</h4>
                        <h2 className="text-primary fw-bold mb-4">
    {dulieu.doanhthu ? Number(dulieu.doanhthu).toLocaleString() : 0}đ
</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard