# Inventory Management System

Hệ thống quản lý sản phẩm và đơn hàng.

**1.Công nghệ sử dụng**

### Frontend
- ReactJS
- Bootstrap 5
- Axios

### Backend
- NodeJS
- ExpressJS
- MySQL
- JWT Authentication

**2. Cách chạy project local**

## 1. Clone project

bash
git clone https://github.com/HuynhBao1910/inventory-app


## 2. Frontend

bash
cd frontend
npm install
npm start


Frontend chạy tại:

text ==>
http://localhost:3000



## 3. Backend

bash
cd backend
npm install
npm run dev


Backend chạy tại:   http://localhost:5000



**3. Environment Variables**

Tạo file `.env`

## Backend

```env
MYSQLHOST=monorail.proxy.rlwy.net
MYSQLPORT=18318
MYSQLUSER=root
MYSQLPASSWORD=tacLPmtarrnLFRKHUjTmithEGsQcFTyx
MYSQLDATABASE=railway

JWT_SECRET=123456
```

## Frontend

```env
REACT_APP_API_URL= https://inventory-app-huynhbao1910s-projects.vercel.app/api
```

---

**4. Tài khoản test**

Email:
```text
admin@gmail.com
```

Password:
```text
123456
```


**5. Deploy**

## Frontend
- Vercel

## Backend
- Render / Railway


**6.  Chức năng**

- Đăng ký / đăng nhập JWT
- CRUD sản phẩm
- Đặt đơn hàng
- Dashboard thống kê
- Quản lý tồn kho
- Responsive UI
