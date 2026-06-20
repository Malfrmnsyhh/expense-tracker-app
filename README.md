# Tracker.io - Expense Tracker App

Selamat datang di repositori **Tracker.io**, sebuah aplikasi pencatat keuangan (*Expense Tracker*) berbasis web. Proyek ini dibangun sebagai submission akhir untuk kelas **Belajar Membuat Front-End Web untuk Pemula** di Dicoding.

Aplikasi ini memungkinkan pengguna untuk mencatat arus kas pemasukan dan pengeluaran, melihat ringkasan saldo, serta mengelola riwayat transaksi dengan antarmuka yang modern, dinamis, dan responsif.

---

## 🚀 Fitur dan Logika JavaScript yang Dibangun

Aplikasi ini sepenuhnya menggunakan Vanilla JavaScript (tanpa *framework*) untuk mengelola *state* dan manipulasi DOM. Berikut adalah logika dan fitur utama yang telah diimplementasikan dalam `main.js`:

1. **CRUD Transaksi (Create, Read, Update, Delete):**
   - **Create:** Menambahkan transaksi baru dan memvalidasi *input* pengguna (Keterangan wajib diisi, nominal uang minimal Rp 1). Transaksi baru dibuat dengan ID unik memanfaatkan representasi waktu `+new Date()`.
   - **Read:** Merender data daftar transaksi secara dinamis ke dalam dua kategori list yang berbeda (Arus Pemasukan dan Arus Pengeluaran).
   - **Update (Edit):** Membaca data transaksi tertentu dan mengembalikannya ke dalam kolom *form* untuk diedit oleh pengguna, sementara data lama dihapus dari *state*.
   - **Delete (Hapus):** Menghapus data transaksi tertentu dari daftar menggunakan operasi *filter array*.

2. **Kalkulasi Keuangan Otomatis:**
   - Iterasi pada array transaksi untuk menghitung dan menjumlahkan Total Pemasukan dan Total Pengeluaran.
   - Mengurangi Total Pemasukan dengan Total Pengeluaran untuk memperbarui secara langsung elemen Saldo Saat Ini (*real-time summary*).

3. **Web Storage (Persistensi Data):**
   - Memanfaatkan `localStorage` browser untuk menyimpan data array transaksi format JSON. Data transaksi tidak akan hilang meskipun halaman di-*refresh* atau browser ditutup.
   - Membuat fungsi *load data* yang akan dipanggil saat dom HTML pertama kali selesai dimuat (`DOMContentLoaded`).

4. **Fitur Interaktif Lanjutan:**
   - **Pindah Kategori / Ubah Tipe:** Adanya fitur untuk langsung mengubah status transaksi dengan cepat. Transaksi yang ada di pengeluaran bisa diubah menjadi pemasukan (atau sebaliknya), dan akan langsung dipindahkan ke kolom yang benar secara *real-time*.
   - **Pencarian Dinamis (Live Search):** Filter transaksi berdasarkan kecocokan judul/keterangan transaksi. Fitur ini membaca *event listener* bertipe `input` sehingga daftar langsung diperbarui seiring pengetikan (tanpa perlu reload/submit). Jika kolom dikosongkan, seluruh data akan tampil kembali.
   - **Custom Event (Reactive State):** Menggunakan fitur *Custom Event DOM* (dengan key `transaction:updated`) agar pembaruan data dan tampilan antarmuka selalu tersinkronisasi. Setiap kali fungsi `saveData()` dipanggil, *event* ini otomatis me-render ulang transaksi dan kalkulasi tanpa harus memanggil pembaruan satu per satu.

5. **Aksesibilitas & User Experience (UX):**
   - **Fitur Dark Mode:** Aplikasi memiliki fungsionalitas tombol Toggle *Dark Mode*. Mengubah *theme* situs melalui modifikasi class DOM dan menyimpan preferensi *dark mode* di dalam `localStorage`.

---

## 📂 Struktur Berkas

```text
expense-tracker-app/
├── index.html   ← Struktur halaman (Semantic HTML5, Aksesibilitas ARIA, Atribut data-testid)
├── style.css    ← Tampilan visual (Custom CSS Variables, BEM Methodology, Responsive Design, Dark Mode Styling)
├── main.js      ← Semua logika dan manajemen fungsionalitas (Vanilla JS)
└── README.md    ← Dokumentasi proyek ini
```

---

## 💻 Cara Menjalankan Proyek

Proyek ini dibangun secara statis tanpa perlu menginstal dependensi apa pun seperti `npm` atau *bundler*.

**Opsi 1 (Sangat Disarankan):** Menggunakan ekstensi **Live Server** di VS Code.
1. Buka folder proyek ini di text editor (contoh: VS Code).
2. Klik kanan pada berkas `index.html` dan pilih **"Open with Live Server"**.
3. Browser akan terbuka otomatis di alamat lokal `http://127.0.0.1:5500`.

**Opsi 2 (Cara Biasa):** 
Buka File Explorer Anda, lalu klik ganda (double-click) langsung pada berkas `index.html`. File akan langsung terbuka di browser Anda menggunakan skema protokol file lokal (`file:///`).

---

## 🎓 Tentang

Proyek Submission Kelas **Belajar Membuat Front-End Web untuk Pemula**  
Platform: **Dicoding Indonesia**
