import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SanPham from "./pages/SanPham";
import DonHang from "./pages/DonHang";
import Dashboard from "./pages/Dashboard";

function App() {

  const token = localStorage.getItem("token");

  const [dangKy, setDangKy] = useState(false);

  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "#f4f7fb",
        minHeight: "100vh"
      }}
    >

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div className="text-center mb-5">

          <h1 className="fw-bold" style={{ fontSize: 56 }}>
            Inventory Management
          </h1>

          <p className="text-muted" style={{ fontSize: 20 }}>
            Quản lý sản phẩm và đơn hàng
          </p>

        </div>

        {
          token && (
            <button
              className="btn btn-dark"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Đăng xuất
            </button>
          )
        }

      </div>

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
            dangKy
              ? <Register setDangKy={setDangKy} />
              : <Login setDangKy={setDangKy} />
          )
      }

    </div>
  );
}

export default App;