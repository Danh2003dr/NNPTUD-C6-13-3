# Hướng dẫn test API bằng Postman

## Yêu cầu
- Ứng dụng chạy tại: `http://localhost:3000` (hoặc PORT trong `bin/www`)
- Base URL API: `http://localhost:3000/api/v1/auth`

---

## 1. Chức năng Login

**Chụp ảnh màn hình khi gửi request và nhận response thành công.**

- **Method:** `POST`
- **URL:** `http://localhost:3000/api/v1/auth/login`
- **Headers:**  
  `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "username": "ten_dang_nhap",
  "password": "mat_khau"
}
```
- **Kết quả thành công:** Response trả về một chuỗi JWT (token). Copy token này để dùng cho `/me` và `/changepassword`.

**Lưu ảnh:** Đặt tên `login.png` và lưu vào thư mục `screenshots/`.

---

## 2. Chức năng /me (lấy thông tin user đang đăng nhập)

**Chụp ảnh màn hình khi gửi request với token và nhận response thành công.**

- **Method:** `GET`
- **URL:** `http://localhost:3000/api/v1/auth/me`
- **Headers:**  
  `Authorization: Bearer <token>`  
  (thay `<token>` bằng token nhận được từ bước Login)
- **Body:** Không cần.

**Kết quả thành công:** Response trả về object thông tin user (username, email, role, ...).

**Lưu ảnh:** Đặt tên `me.png` và lưu vào thư mục `screenshots/`.

---

## 3. (Tham khảo) Đổi mật khẩu – changepassword

- **Method:** `POST`
- **URL:** `http://localhost:3000/api/v1/auth/changepassword`
- **Headers:**  
  `Content-Type: application/json`  
  `Authorization: Bearer <token>`
- **Body (raw JSON):**
```json
{
  "oldPassword": "mat_khau_cu",
  "newPassword": "MatKhauMoi@123"
}
```
- **Yêu cầu newPassword:** Ít nhất 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt.

---

## Nộp bài
- **2 file mã hóa:** `keys/private.pem`, `keys/public.pem` (JWT RS256).
- **Hình ảnh:** `screenshots/login.png`, `screenshots/me.png` (chụp màn hình Postman khi gọi Login và /me).
