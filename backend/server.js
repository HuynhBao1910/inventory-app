require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const dashboardRoute = require("./routes/dashboard");

//middlware
app.use(cors());
app.use(express.json());

app.use("/api/sanpham", require("./routes/sanpham"));

app.use("/api/donhang", require("./routes/donhang"));

app.use("/api/dashboard", dashboardRoute);

//routes
app.use("/api/auth", require("./routes/auth"));

app.listen(5000, () => {
    console.log("SV đang chạy cổng 5000");
});