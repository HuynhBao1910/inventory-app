require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const dashboardRoute = require("./routes/dashboard");

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/sanpham", require("./routes/sanpham"));
app.use("/api/donhang", require("./routes/donhang"));
app.use("/api/dashboard", dashboardRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server đang chạy cổng ${PORT}`);
});