## 🔤 Komponen Frontend Reusable by Klaz

### 1. Animasi Transisi

<details>
  <summary><strong>Penjelasan Lengkap</strong></summary>

Komponen ini digunakan untuk memberikan efek transisi yang halus saat sebuah elemen muncul di layar, baik ketika halaman dimuat atau saat pengguna melakukan scroll. Komponen ini dibangun menggunakan `framer-motion` dan `react-intersection-observer` sehingga animasi hanya akan dipicu sekali saat elemen masuk ke viewport.

#### 📌 Props

- `children`: Elemen React yang akan dianimasikan.
- `direction`: Arah masuknya animasi. Nilai yang didukung: `"up"` (default), `"down"`, `"left"`, `"right"`.
- `delay`: Waktu delay sebelum animasi dimulai (dalam detik, default `0`).

---

🔗 **Contoh tampilan**: [Klik di sini](https://contoh-tampilan.com/animasi-transisi)  
💻 **Source code**: [Lihat di sini](https://github.com/username/repo/blob/main/components/AnimateOnScroll.jsx)

### 🧩 Contoh Penggunaan

```jsx
import AnimateOnScroll from "./components/AnimateOnScroll";

function Home() {
  return (
    <>
      <AnimateOnScroll direction="up" delay={0.2}>
        <h1>Selamat Datang!</h1>
      </AnimateOnScroll>

      <AnimateOnScroll direction="right" delay={0.4}>
        <p>Ini adalah contoh komponen dengan animasi transisi.</p>
      </AnimateOnScroll>
    </>
  );
}
```

</details>

---

### 2. Navbar Dinamis

<details>
  <summary><strong>Penjelasan Lengkap</strong></summary>
Komponen navbar yang responsif dengan tampilan mobile dalam bentuk sidebar. jika di scroll navbar nya sticky on top dan ada shadow transition.

🔗 **Contoh tampilan**: [Klik di sini](https://contoh-tampilan.com/navbar-dinamis)  
💻 **Source code**: [Lihat di sini](https://github.com/username/repo/blob/main/components/NavbarDinamis.jsx)

### 🧩 Contoh Penggunaan

```jsx
import NavbarDinamis from "./components/NavbarDinamis";

function MainLayout() {
  return (
    <>
      <NavbarDinamis />
      <main>
        <h2>Konten Halaman</h2>
      </main>
    </>
  );
}
```

</details>
