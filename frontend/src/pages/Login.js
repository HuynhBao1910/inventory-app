import { useState } from "react";
import api from "../api/api";

function Login() {

    const [email, setEmail] = useState("");
    const [matkhau, setMatkhau] = useState("");

    const dangNhap = async () => {

        try {

            // console.log("Full URL:", api.defaults.baseURL + "/api/auth/dangnhap");


            const res = await api.post("/auth/dangnhap", {
                email,
                matkhau
            });

            // neu co token dang nhap thanh cong
            if (res.data.token) {

                localStorage.setItem("token", res.data.token);

                alert("Đăng nhập thành công");

                window.location.reload();

            } else {

                // hien loi tu backend
                alert("Server trả về nhưng không có token: " + JSON.stringify(res.data));

            }

        } catch (err) {

            console.log(err);
            console.log(err.response);
        
            alert(
                JSON.stringify(err.response?.data) ||
                err.message
            );
        
        }

    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "70vh" }}
        >

            <div
                className="card p-4 shadow"
                style={{
                    width: 400,
                    borderRadius: 20
                }}
            >

                <h2 className="mb-4 text-center fw-bold">
                    Đăng nhập
                </h2>

                <input
                    className="form-control mb-3"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mb-4"
                    placeholder="Mật khẩu"
                    onChange={(e) => setMatkhau(e.target.value)}
                />

                <button
                    className="btn btn-dark w-100"
                    onClick={dangNhap}
                >
                    Đăng nhập
                </button>

            </div>

        </div>
    );
}

export default Login;