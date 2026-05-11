import { useState } from "react";
import api from "../api/api";

function Login({ setTrang }) {

    const [email, setEmail] = useState("");
    const [matkhau, setMatkhau] = useState("");

    const dangNhap = async () => {

        try {

            const res = await api.post("/api/auth/dangnhap", {
                email,
                matkhau
            });

            if (res.data.token) {

                localStorage.setItem("token", res.data.token);

                alert("Đăng nhập thành công");

                window.location.reload();

            } else {

                alert(res.data);

            }

        } catch (err) {

            console.log(err);

            alert("Lỗi server");

        }

    };

    return (

        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg,#667eea,#764ba2)"
            }}
        >

            <div
                className="card border-0 shadow-lg p-4"
                style={{
                    width: 420,
                    borderRadius: 28,
                    backdropFilter: "blur(10px)"
                }}
            >

                <div className="text-center mb-4">

                    <div
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            background: "#111827",
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "0 auto 20px",
                            fontSize: 32
                        }}
                    >
                        📦
                    </div>

                    <h2 className="fw-bold">
                        Welcome Back
                    </h2>

                    <p className="text-muted">
                        Inventory Management System
                    </p>

                </div>

                <input
                    className="form-control form-control-lg mb-3"
                    placeholder="Email"
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    className="form-control form-control-lg mb-4"
                    placeholder="Mật khẩu"
                    onChange={(e) =>
                        setMatkhau(e.target.value)
                    }
                />

                <button
                    className="btn btn-dark btn-lg w-100 mb-3"
                    style={{
                        borderRadius: 14
                    }}
                    onClick={dangNhap}
                >
                    Đăng nhập
                </button>

                <div className="text-center">

                    <span className="text-muted">
                        Chưa có tài khoản?
                    </span>

                    <button
                        className="btn btn-link"
                        onClick={() => setTrang("register")}
                    >
                        Đăng ký
                    </button>

                </div>

            </div>

        </div>

    );
}

export default Login;