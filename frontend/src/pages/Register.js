import { useState } from "react";
import api from "../api/api";

function Register({ setTrang }) {

    const [ten, setTen] = useState("");
    const [email, setEmail] = useState("");
    const [matkhau, setMatkhau] = useState("");

    const dangKy = async () => {

        try {

            const res = await api.post("/api/auth/dangky", {
                ten,
                email,
                matkhau
            });

            alert(res.data);

            setTrang("login");

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
                    "linear-gradient(135deg,#0f172a,#1e293b)"
            }}
        >

            <div
                className="card border-0 shadow-lg p-4"
                style={{
                    width: 420,
                    borderRadius: 28
                }}
            >

                <div className="text-center mb-4">

                    <div
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            background: "#2563eb",
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "0 auto 20px",
                            fontSize: 32
                        }}
                    >
                        🚀
                    </div>

                    <h2 className="fw-bold">
                        Create Account
                    </h2>

                    <p className="text-muted">
                        Start managing your inventory
                    </p>

                </div>

                <input
                    className="form-control form-control-lg mb-3"
                    placeholder="Tên"
                    onChange={(e) =>
                        setTen(e.target.value)
                    }
                />

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
                    className="btn btn-primary btn-lg w-100 mb-3"
                    style={{
                        borderRadius: 14
                    }}
                    onClick={dangKy}
                >
                    Đăng ký
                </button>

                <div className="text-center">

                    <span className="text-muted">
                        Đã có tài khoản?
                    </span>

                    <button
                        className="btn btn-link"
                        onClick={() => setTrang("login")}
                    >
                        Đăng nhập
                    </button>

                </div>

            </div>

        </div>

    );
}

export default Register;