# Netflix Clone

Website xem phim với giao diện, chức năng được bắt chước từ Netflix. Mẫu được lấy [từ](https://github.com/mtohernandez/netflix-clone)

---

## Danh sách thành viên nhóm

- Hồ Văn Minh 124000114
* Dương Thái Nguyên 124001039
+ Trần Thiên Long 124000579

---


## Chức năng web

- Tìm kiếm, xem thông tin phim
- Xem trailer phim
- Đề xuất phim theo danh mục

---


## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Core Framework | NextJS | 15 |
| UI Library | React | 19 |
| Styling | Tailwind CSS | 4 |
| Data Fetching | TanStack Query | 5 |
| State Management | Redux Toolkit | 2 |
| Routing | React Router | 7 |
| Authentication | Firebase Auth | 11 |
| Animations | Framer Motion | 11 |
| Trailers | react-player | 2 |
| HTTP Client | Axios | 1.7 |
| Movie Data | TMDB API | v3 |

---

## Cách chạy web trên localhost

### Yêu cầu
- git (có thể bỏ qua bằng cách tải file zip nhưng không khuyến khịch)
- Node.js 18+
- npm (có thể dùng package manager khác của Node tùy ý)
- [TMDB API key](https://www.themoviedb.org/settings/api) (miễn phí)

### Cài đặt

```Lệnh bash
git clone https://github.com/NguyenTalk/Front-End_Dynamic.git
cd Front-End_Dynamic
npm install
```

### Biến môi trường 

Tạo một file `.env` ngay trong thư mục gốc:

```env
NEXT_PUBLIC_TMDB_API_KEY=966741e6a93b974626716efc718d939e
NEXT_PUBLIC_TMDB_IMAGE_BASE=https://image.tmdb.org/t/p
```
### Chạy web

```bash
npm run dev
```

