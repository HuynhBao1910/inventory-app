import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import SanPham from "./pages/SanPham";
import DonHang from "./pages/DonHang";
import Dashboard from "./pages/Dashboard";

function App() {

    const token = localStorage.getItem("token");

    // login | register
    const [trang, setTrang] = useState("login");

    return (

        <div
            className="container-fluid py-4"
            style={{
                background: "#f4f7fb",
                minHeight: "100vh"
            }}
        >

            {/* HEADER */}

            {
                token && (

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>

                            <h1
                                className="fw-bold mb-1"
                                style={{
                                    fontSize: 48
                                }}
                            >
                                📦 Inventory Management
                            </h1>

                            <p
                                className="text-muted"
                                style={{
                                    fontSize: 18
                                }}
                            >
                                Quản lý sản phẩm và đơn hàng
                            </p>

                        </div>

                        <button
                            className="btn btn-dark px-4 py-2"
                            style={{
                                borderRadius: 14
                            }}
                            onClick={() => {

                                localStorage.removeItem("token");

                                window.location.reload();

                            }}
                        >
                            🚪 Đăng xuất
                        </button>

                    </div>

                )
            }

            {/* CONTENT */}

            {
                token

                    ? (

                        <>
                            <Dashboard />
                            <SanPham />
                            <DonHang />
                        </>

                    )

                    : (

                        trang === "login"

                            ? <Login setTrang={setTrang} />

                            : <Register setTrang={setTrang} />

                    )
            }

        </div>

    );
}

export default App;