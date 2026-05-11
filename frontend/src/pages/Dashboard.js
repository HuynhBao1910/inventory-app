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
            alert("Lỗi Dashboard");

        }

    };

    useEffect(() => {

        layDashboard();

    }, []);

    return (

        <div className="mb-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold mb-1">
                        Dashboard
                    </h2>

                    <p className="text-muted mb-0">
                        Tổng quan hệ thống quản lý kho
                    </p>

                </div>

            </div>

            <div className="row g-4">

                <div className="col-md-4">

                    <div
                        className="card border-0 shadow-lg h-100"
                        style={{
                            borderRadius: 24
                        }}
                    >

                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <p className="text-muted mb-2">
                                        Tổng sản phẩm
                                    </p>

                                    <h1 className="fw-bold mb-0">
                                        {dulieu.tongSanPham || 0}
                                    </h1>

                                </div>

                                <div
                                    className="bg-primary bg-opacity-10 d-flex justify-content-center align-items-center"
                                    style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 20
                                    }}
                                >
                                    📦
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div
                        className="card border-0 shadow-lg h-100"
                        style={{
                            borderRadius: 24
                        }}
                    >

                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <p className="text-muted mb-2">
                                        Tổng đơn hàng
                                    </p>

                                    <h1 className="fw-bold mb-0">
                                        {dulieu.tongDonHang || 0}
                                    </h1>

                                </div>

                                <div
                                    className="bg-success bg-opacity-10 d-flex justify-content-center align-items-center"
                                    style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 20
                                    }}
                                >
                                    🛒
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div
                        className="card border-0 shadow-lg h-100"
                        style={{
                            borderRadius: 24
                        }}
                    >

                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <p className="text-muted mb-2">
                                        Doanh thu
                                    </p>

                                    <h2 className="fw-bold text-success mb-0">

                                        {dulieu.doanhthu
                                            ? Number(dulieu.doanhthu).toLocaleString()
                                            : 0}đ

                                    </h2>

                                </div>

                                <div
                                    className="bg-warning bg-opacity-10 d-flex justify-content-center align-items-center"
                                    style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 20
                                    }}
                                >
                                    💰
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;