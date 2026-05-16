require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const dashboardRoute = require("./routes/dashboard");

app.use(cors({
    origin: "https://inventory-app-huynhbao1910s-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/sanpham", require("./routes/sanpham"));
app.use("/api/donhang", require("./routes/donhang"));
app.use("/api/dashboard", dashboardRoute);
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server đang chạy cổng ${PORT}`);
});