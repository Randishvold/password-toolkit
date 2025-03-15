# Password Toolkit
> https://randishvold.github.io/password-toolkit/

Password Toolkit adalah aplikasi web interaktif yang menyediakan seperangkat alat untuk manajemen dan keamanan kata sandi. Aplikasi ini dirancang dengan fokus pada keamanan, performa, dan kegunaan, menawarkan tiga fitur utama dalam antarmuka yang intuitif.

## 🚀 Fitur Utama

### 1. Password Strength Checker
- Analisis kekuatan kata sandi real-time menggunakan zxcvbn
- Kalkulasi perkiraan waktu crack yang akurat
- Umpan balik terperinci untuk peningkatan keamanan
- Visualisasi meter kekuatan kata sandi yang responsif
- Deteksi pola dan kata sandi yang umum

### 2. Password Generator
- Generate kata sandi acak yang aman menggunakan crypto.getRandomValues()
- Kustomisasi panjang (8-30 karakter)
- Opsi karakter yang fleksibel:
  - Huruf besar (A-Z)
  - Huruf kecil (a-z)
  - Angka (0-9)
  - Simbol (!@#$%^&*)
- Pencegahan penggunaan ulang kata sandi
- Fitur salin ke clipboard dengan auto-clear

### 3. Sundanese Passphrase Generator
- Generate passphrase menggunakan kata-kata bahasa Sunda
- Kustomisasi jumlah kata (3-7 kata)
- Opsi pemisah kata yang fleksibel
- Fitur tambahan:
  - Penambahan angka acak
  - Kapitalisasi selektif
- Database 100+ kata bahasa Sunda
- Kalkulasi entropy untuk keamanan

## 💻 Teknologi & Keamanan

### Core Technologies
- HTML5
- Vanilla JavaScript (ES6+)
- Tailwind CSS
- Web Crypto API
- zxcvbn Password Strength Estimation

### Security Features
- Cryptographically secure random generation
- Password history prevention
- Automatic sensitive data clearing
- Input validation dan sanitization
- Memory management yang aman

### Performance Optimizations
- Debouncing untuk input events
- Throttling untuk operasi berat
- Efficient DOM manipulation
- Event delegation
- Minimal dependencies

## 🛠️ Penggunaan

1. Buka [Password Toolkit](https://randishvold.github.io/password-toolkit/) di browser
2. Pilih tab sesuai kebutuhan:
   - **Strength Checker**: Analisis kekuatan kata sandi
   - **Password Generator**: Buat kata sandi acak yang aman
   - **Sundanese Passphrase**: Buat passphrase bahasa Sunda
3. Sesuaikan pengaturan sesuai preferensi
4. Generate atau analisis kata sandi
5. Gunakan tombol salin untuk menyalin hasil (hasil akan terhapus otomatis setelah 30 detik)

## 🔒 Tips Keamanan

### Password yang Kuat
- Minimum 12 karakter
- Kombinasi huruf, angka, dan simbol
- Hindari informasi personal
- Hindari pola keyboard dan urutan umum

### Passphrase yang Efektif
- Gunakan minimal 4 kata
- Aktifkan opsi angka dan kapitalisasi
- Pilih pemisah yang unik
- Verifikasi entropy minimal 60 bits

### Praktik Terbaik
- Gunakan password manager
- Aktifkan 2FA bila memungkinkan
- Jangan gunakan kata sandi yang sama
- Ganti kata sandi secara berkala

## 🌙 Fitur Tambahan

- Antarmuka responsif
- Dark/Light mode otomatis
- Validasi input real-time
- Umpan balik visual yang jelas
- Auto-clear clipboard
- Penghitungan entropy

## 🔄 Updates & Maintenance

- **v1.1.0** - Peningkatan Keamanan & Performa
  - Implementasi zxcvbn
  - Peningkatan error handling
  - Optimisasi performa
  - Memory management
  - Password history prevention

## 🙏 Kredit

- [zxcvbn](https://github.com/dropbox/zxcvbn) - Library password strength estimation oleh Dropbox
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS untuk styling
- Dikembangkan dengan bantuan [Poe App Creator](https://poe.com/App-Creator) & [GitHub Copilot](https://github.com/features/copilot)

> README.md ini digenerate menggunakan GitHub Copilot

## 📝 License

MIT License - Silakan gunakan dan modifikasi sesuai kebutuhan

---

> Repository ini adalah bagian dari proyek peningkatan keamanan kata sandi dan edukasi praktik keamanan yang baik.