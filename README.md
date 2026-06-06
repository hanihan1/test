# EcoEats — Portal Merchant & Admin

Aplikasi web untuk merchant dan admin mengelola makanan surplus.

## Struktur File

```
ecoeats/
├── index.html          — Redirect ke login
├── login.html          — Halaman login (merchant & admin)
├── dashboard.html      — App shell: dashboard utama
├── profile.html        — App shell: profil usaha (deep-link)
│
├── css/
│   ├── base.css        — CSS reset, variabel desain, tipografi, animasi
│   ├── auth.css        — Halaman login / auth
│   ├── layout.css      — Shell: sidebar, topbar, area konten
│   └── components.css  — Komponen reusable: tombol, badge, kartu, tabel, form, dll.
│
└── js/
    ├── config.js         — State APP, definisi menu MENUS, label topbar TOPBAR, ikon SVG ICONS
    ├── app.js            — Shell inti: buildSidebar(), navigate(), render(), logout()
    ├── pages.merchant.js — Render fungsi halaman merchant
    └── pages.admin.js    — Render fungsi halaman admin
```

## Integrasi Backend

Setiap fungsi render memiliki komentar `// TODO:` yang menandai endpoint API yang perlu dihubungkan.

Referensi ERD:
- `users`                — Semua pengguna (merchant, admin, customer)
- `merchant_profiles`    — Profil detail merchant (linked ke users.id)
- `merchant_verifications` — Proses verifikasi merchant oleh admin
- `categories`           — Kategori makanan
- `food_listings`        — Listing makanan surplus per merchant
- `orders`               — Pesanan dari customer
- `order_items`          — Detail item per pesanan
- `payments`             — Pembayaran per pesanan

## Alur Autentikasi (sementara)

Login menyimpan `userRole` di `localStorage`. Saat backend tersambung, ganti dengan session/JWT.
`dashboard.html` dan `profile.html` memeriksa `localStorage.getItem('userRole')` dan
redirect ke `login.html` jika kosong.
