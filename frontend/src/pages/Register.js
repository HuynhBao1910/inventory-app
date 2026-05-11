import { useState } from "react";
import api from "../api/api";

function Register({ setDangKy }) {

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

            setDangKy(false);

        } catch (err) {

            console.log(err);
            alert("Lỗi đăng ký");

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
                    Đăng ký
                </h2>

                <input
                    className="form-control mb-3"
                    placeholder="Tên"
                    onChange={(e) => setTen(e.target.value)}
                />

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
                    className="btn btn-dark w-100 mb-3"
                    onClick={dangKy}
                >
                    Đăng ký
                </button>

                <button
                    className="btn btn-outline-dark w-100"
                    onClick={() => setDangKy(false)}
                >
                    Quay lại đăng nhập
                </button>

            </div>

        </div>
    );
}

export default Register;