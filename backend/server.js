require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const dashboardRoute = require("./routes/dashboard");

// middleware
// const cors = require('cors');
app.use(cors({
    origin: 'https://inventory-app-huynhbao1910s-projects.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// routes
app.use("/api/sanpham", require("./routes/sanpham"));
app.use("/api/donhang", require("./routes/donhang"));
app.use("/api/dashboard", dashboardRoute);

const PORT = process.env.PORT || 5000;
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server đang chạy ở cổng ${PORT}`);
});