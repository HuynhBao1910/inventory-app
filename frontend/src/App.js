import Login from "./pages/Login";
import SanPham from "./pages/SanPham";
import DonHang from "./pages/DonHang";
import Dashboard from "./pages/Dashboard";

function App() {

  const token = localStorage.getItem("token");

  return (
    <div className="container py-5" style={{maxWidth:1300}}>

      <div className="d-flex justify-content-between align-items-center mb-4">

      <div className="text-center mb-5">

  <h1 className="fw-bold" style={{fontSize: 56}}>Inventory Management</h1>
  <p className="text-muted" style={{fontSize: 20}}>Quản lý sản phẩm và đơn hàng</p>

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
              <i className="bi bi-box-arrow-right me-2"></i>
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
          : <Login />
      }

    </div>
  );
}

export default App;