# Home Dashboard — Design Spec

**Date:** 2026-06-04
**Status:** Approved

---

## Overview

Personal home dashboard dengan aesthetic anime/karakter. Menggabungkan character showcase (mascot dengan nama, deskripsi, quote) dan widget praktis (jam, cuaca, kalender, quick links). Di-serve sebagai static site di VPS pribadi dengan domain sendiri.

---

## Stack

- **Framework:** React + Vite + TypeScript
- **Styling:** Tailwind CSS
- **Web server:** Nginx (serve static `/dist`)
- **Weather API:** OpenWeatherMap (free tier)
- **Deployment:** `npm run build` → rsync/SCP ke VPS → Nginx serve

---

## Struktur Proyek

```
home-dashboard/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── CharacterPanel.tsx
│   │   ├── ClockWidget.tsx
│   │   ├── WeatherWidget.tsx
│   │   ├── CalendarWidget.tsx
│   │   └── QuickLinks.tsx
│   ├── config.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── character.png
└── dist/
```

---

## Layout

Single-page layout dengan navbar di atas dan konten utama di bawah.

```
┌─────────────────────────────────────────────────────┐
│  [Logo]   Home  Links  About              [jam live] │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ╔══════════════════╗        ┌──────────────────┐   │
│  ║  Character Info  ║        │  🌤 Cuaca + Kota │   │
│  ║  ─────────────── ║        └──────────────────┘   │
│  ║  Nama Karakter   ║                                │
│  ║  Deskripsi/quote ║        ┌──────────────────┐   │
│  ║  [Read More]     ║        └──────────────────┘   │
│  ╚══════════════════╝         📅 Kalender            │
│                                                      │
│  [Karakter PNG — posisi kanan tengah, overlap]       │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │  ⚡ Quick Links: GitHub | Notion | YouTube  │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

---

## Komponen

### `config.ts`
File konfigurasi pusat. Semua konten diubah di sini tanpa menyentuh komponen.

```ts
export const config = {
  character: {
    name: "Nama Karakter",
    subtitle: "subtitle / kategori",
    description: "Deskripsi singkat karakter...",
    imagePath: "/character.png",
  },
  weather: {
    city: "Jakarta",
    apiKey: import.meta.env.VITE_WEATHER_API_KEY,
  },
  quickLinks: [
    { label: "GitHub", url: "https://github.com" },
    { label: "Notion", url: "https://notion.so" },
  ],
}
```

### `Navbar`
- Logo kiri, nav links tengah, jam live kanan
- Sticky, background blur semi-transparan

### `CharacterPanel`
- Nama besar (serif font), subtitle, deskripsi
- Tombol "Read More" → modal dengan info lebih lengkap
- Data dari `config.ts`

### `ClockWidget`
- Jam real-time dengan `setInterval` tiap detik
- Format: HH:MM:SS, tampilkan tanggal di bawahnya

### `WeatherWidget`
- Fetch ke OpenWeatherMap saat mount, refresh tiap 10 menit
- Tampilkan: ikon cuaca, suhu, kota
- Error state: "Cuaca tidak tersedia"

### `CalendarWidget`
- Kalender bulanan sederhana dengan native JS `Date`
- Highlight tanggal hari ini
- Navigasi bulan prev/next

### `QuickLinks`
- Daftar link dari `config.ts`
- Tampilan card/chip horizontal

---

## Visual Style

- **Background:** lavender gradient soft (`#e8e0f0` → `#f5f0ff`)
- **Dekorasi:** lingkaran-lingkaran blur dengan CSS (`border-radius: 50%`, opacity rendah)
- **Karakter:** PNG dengan background transparan, `drop-shadow`
- **Font:** serif besar untuk nama karakter, sans-serif untuk body
- **Warna aksen:** ungu muda (`#9b7ec8`) dan pink muda (`#e8a0bf`)
- **Cards/widget:** putih semi-transparan dengan `backdrop-blur`, border-radius besar

---

## Data Flow

- `config.ts` → dibaca semua komponen saat load (static)
- `WeatherWidget` → fetch OpenWeatherMap API, refresh tiap 10 menit
- `ClockWidget` → `setInterval` tiap detik
- `CalendarWidget` → native `Date`, no API
- `CharacterPanel` → semua dari `config.ts`

---

## Error Handling

- Weather fetch gagal → tampil pesan "Cuaca tidak tersedia", widget tetap render
- Gambar karakter gagal load → fallback placeholder SVG/div
- Semua widget independen — error di satu widget tidak crash yang lain

---

## Deployment

1. Set environment variable: `VITE_WEATHER_API_KEY` di `.env.local`
2. `npm run build` → output ke `/dist`
3. Upload `/dist` ke VPS: `rsync -avz dist/ user@vps:/var/www/home-dashboard/`
4. Nginx config:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/home-dashboard;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
5. SSL via Certbot (Let's Encrypt)

---

## Out of Scope (untuk sekarang)

- Auth / login
- Backend / database
- Animasi kompleks
- Mobile-first (prioritas desktop dulu, responsive menyusul)
