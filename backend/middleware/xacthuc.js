const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) 
        return res.status(401).json("Chưa đăng nhập");

    const token = authHeader.split(" ")[1]; 

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    } catch (err) {
        res.status(403).json("Token không hợp lệ");
    }
};