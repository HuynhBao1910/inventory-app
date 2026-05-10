-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 09, 2026 lúc 08:43 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `quanly_kho`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitiet_donhang`
--

CREATE TABLE `chitiet_donhang` (
  `id` int(11) NOT NULL,
  `donhang_id` int(11) DEFAULT NULL,
  `sanpham_id` int(11) DEFAULT NULL,
  `soluong` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitiet_donhang`
--

INSERT INTO `chitiet_donhang` (`id`, `donhang_id`, `sanpham_id`, `soluong`) VALUES
(1, 3, 3, 2),
(2, 4, 4, 1),
(3, 4, 3, 2),
(4, 11, 3, 1),
(5, 12, 3, 1),
(6, 14, 3, 1),
(7, 15, 11, 1),
(8, 16, 10, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `donhang`
--

CREATE TABLE `donhang` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `tongtien` int(11) DEFAULT NULL,
  `trangthai` varchar(50) DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `donhang`
--

INSERT INTO `donhang` (`id`, `user_id`, `tongtien`, `trangthai`) VALUES
(1, 1, 0, 'cancelled'),
(2, 1, 0, 'completed'),
(3, 1, 60000000, 'pending'),
(4, 1, 120000000, 'completed'),
(5, 1, 0, 'cancelled'),
(6, 1, 0, 'cancelled'),
(7, 1, 0, 'cancelled'),
(8, 1, 0, 'pending'),
(9, 1, 0, 'pending'),
(10, 1, 0, 'pending'),
(11, 1, 35000000, 'completed'),
(12, 1, 35000000, 'completed'),
(13, 1, 0, 'cancelled'),
(14, 1, 35000000, 'pending'),
(15, 1, 37000000, 'pending'),
(16, 1, 23000000, 'completed');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoidung`
--

CREATE TABLE `nguoidung` (
  `id` int(11) NOT NULL,
  `ten` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `matkhau` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nguoidung`
--

INSERT INTO `nguoidung` (`id`, `ten`, `email`, `matkhau`) VALUES
(1, 'Bao', 'bao@gmail.com', '$2b$10$YiMScf3dNL6.aQkYoc.UXeN4kvihN3ScVOYWafSiI7nFbOvkn5NJG'),
(2, 'Bbb', 'bss221@gmail.com', '$2b$10$Qet5VkKVCoYNodObdWZ8Te5TT8yuY.3xOYD7vH1yAwMMU4BRHDKCa');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `id` int(11) NOT NULL,
  `ten` varchar(100) DEFAULT NULL,
  `mota` text DEFAULT NULL,
  `gia` int(11) DEFAULT NULL,
  `soluong` int(11) DEFAULT NULL,
  `hinhanh` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`id`, `ten`, `mota`, `gia`, `soluong`, `hinhanh`, `user_id`) VALUES
(3, 'IPHONE 15', 'Moiws', 35000000, 14, 'https://res.cloudinary.com/dv1uwjdpq/image/upload/q_auto/f_auto/v1778080622/iphone-15-pro-max-blue-thumbnew-600x600_uqs1tm.jpg', 1),
(4, 'Iphone 17', 'Máy mới', 60000000, 5, 'https://res.cloudinary.com/dv1uwjdpq/image/upload/v1778081115/600x600__iphone_17_pro_max_orange_thumb_didongmy_qytikm.jpg', 1),
(7, 'SamSung Galaxy S24 Ultra', 'Máy mới', 37000000, 4, 'https://res.cloudinary.com/dv1uwjdpq/image/upload/q_auto/f_auto/v1778222000/samsung-galaxy-s24-ultra-5g-200x200_wouqmh.webp', 1),
(9, 'IPHONE 14', '99% NEW', 250000000, 4, 'https://res.cloudinary.com/dv1uwjdpq/image/upload/q_auto/f_auto/v1778225190/14pro-tim-600x600-8_sr0eag.png', 1),
(10, 'SamSung Galaxy S25 Ultra', 'Máy mới full box', 23000000, 9, 'https://res.cloudinary.com/dv1uwjdpq/image/upload/q_auto/f_auto/v1778225348/images_ydarxd.jpg', 1),
(11, 'SamSung Galaxy S26 Ultra', 'FULL BOX NEW 100%', 37000000, 19, 'https://res.cloudinary.com/dv1uwjdpq/image/upload/q_auto/f_auto/v1778225504/samsung_galaxy_s26_ultra_tim_d3898ec641_hfdm9v.png', 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `chitiet_donhang`
--
ALTER TABLE `chitiet_donhang`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `donhang`
--
ALTER TABLE `donhang`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `chitiet_donhang`
--
ALTER TABLE `chitiet_donhang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `donhang`
--
ALTER TABLE `donhang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `nguoidung` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
