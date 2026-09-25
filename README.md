# Pinterest API

Backend API mô phỏng các chức năng cơ bản của Pinterest, xây dựng bằng Node.js, Express, Prisma và MySQL.

## Chức năng

- Đăng ký tài khoản
- Đăng nhập và xác thực bằng JWT
- Xem thông tin người dùng
- Cập nhật thông tin người dùng
- Upload avatar
- Lấy danh sách hình ảnh
- Tìm kiếm hình ảnh
- Xem chi tiết hình ảnh
- Đăng hình ảnh
- Xóa hình ảnh
- Bình luận hình ảnh
- Lưu hình ảnh
- Kiểm tra hình ảnh đã lưu
- Xem danh sách hình ảnh đã lưu
- Xem hình ảnh do người dùng tạo

## Công nghệ sử dụng

- Node.js
- Express.js
- MySQL
- Prisma ORM
- JWT
- Multer
- Cloudinary

## Cài đặt

Clone project:

git clone https://github.com/aliphucpt/pinterest-api.git

Di chuyển vào thư mục:

cd pinterest-api

Cài đặt package:

npm install

## Cấu hình môi trường

Tạo file `.env` dựa trên file `.env.example`.

Điền thông tin MySQL, JWT và Cloudinary phù hợp với máy của bạn.

Lưu ý: file `.env` thật không được đưa lên GitHub vì chứa thông tin bảo mật.

## Database

Tạo database MySQL và import file:

pinterest_api.sql

Sau đó kiểm tra `DATABASE_URL` trong `.env` để đúng với MySQL trên máy.

Ví dụ MySQL chạy ở port 3306:

DATABASE_URL="mysql://root:password@localhost:3306/pinterest_api"

## Prisma

Generate Prisma Client:

npx prisma generate

## Chạy project

npm run dev

Server mặc định chạy tại:

http://localhost:3069

## Postman

Import file:

Pinterest API.postman_collection.json

vào Postman để kiểm tra các API.

Sau khi đăng nhập, sử dụng access token cho các API yêu cầu xác thực.
