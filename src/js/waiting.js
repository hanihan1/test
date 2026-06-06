/* ────────────────────────────────
   READ REGISTRATION DATA
──────────────────────────────── */
function loadData() {
  // Baca dari localStorage (dikirim oleh register.html saat submit)
  const dataRaw = localStorage.getItem('ecoeats_reg');
  const reg = dataRaw ? JSON.parse(dataRaw) : {};

  if (reg.nama)     document.getElementById('d-nama').textContent     = reg.nama;
  if (reg.email)    document.getElementById('d-email').textContent    = reg.email;
  if (reg.hp)       document.getElementById('d-hp').textContent       = reg.hp;
  if (reg.toko)     document.getElementById('d-toko').textContent     = reg.toko;
  if (reg.kategori) document.getElementById('d-kategori').textContent = reg.kategori;
  if (reg.alamat)   document.getElementById('d-alamat').textContent   = reg.alamat;
  if (reg.waktu)    document.getElementById('d-waktu').textContent    = reg.waktu;
  if (reg.ref)      document.getElementById('d-ref').textContent      = reg.ref;
}

/* ────────────────────────────────
   STATUS STATES
──────────────────────────────── */
function setStatus(status) {
  const badge        = document.getElementById('status-badge');
  const badgeDot     = document.getElementById('status-dot');
  const badgeText    = document.getElementById('status-badge-text');
  const heroTitle    = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');

  // Safety check: pastikan elemen ada sebelum diakses
  if (!badgeDot || !badgeText || !heroTitle || !heroSubtitle) { console.error("Elemen status tidak ditemukan"); return; }

  if (status === 'pending') {
    badgeDot.style.background = '#ffd166';
    badgeDot.style.animation  = 'pulse 1.8s ease-in-out infinite';
    badgeText.textContent     = 'Menunggu Verifikasi';
    heroTitle.textContent     = 'Pendaftaran Berhasil! 🎉';
    heroSubtitle.textContent  =
      'Dokumen kamu sedang ditinjau oleh tim EcoEats. Kami akan menghubungi lewat email setelah proses selesai.';
  }

  else if (status === 'approved') {
    badgeDot.style.background = '#27ae60';
    badgeDot.style.animation  = 'none';
    badgeText.textContent     = 'Terverifikasi ✓';
    heroTitle.textContent     = 'Selamat, Akunmu Aktif! 🚀';
    heroSubtitle.textContent  =
      'Toko kamu sudah berhasil diverifikasi. Mulai jual produkmu sekarang dan bergabung dengan gerakan anti food waste!';
  }

  else if (status === 'rejected') {
    badgeDot.style.background = '#e74c3c';
    badgeDot.style.animation  = 'none';
    badgeText.textContent     = 'Perlu Perbaikan';
    heroTitle.textContent     = 'Dokumen Perlu Diperbarui';
    heroSubtitle.textContent  =
      'Beberapa dokumen yang kamu submit memerlukan perbaikan. Silakan cek email untuk detail dan upload ulang dokumen yang sesuai.';
  }
}

/* ────────────────────────────────
   SET REGISTRATION TIME
──────────────────────────────── */
function setRegistrationMeta() {
  const reg = JSON.parse(localStorage.getItem('ecoeats_reg') || '{}');
  if (!reg.waktu) {
    const now = new Date();
    document.getElementById('d-waktu').textContent =
      now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      + ', '
      + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      + ' WIB';
  }
}

/* ────────────────────────────────
   INIT
──────────────────────────────── */
loadData();
setRegistrationMeta();

// Ambil status dari localStorage untuk menentukan state tampilan (default ke 'pending')
const currentReg = JSON.parse(localStorage.getItem('ecoeats_reg') || '{}');
setStatus(currentReg.status || 'pending');

// Gunakan pengecekan agar tidak error jika fungsi sidebar belum diload
if (typeof buildSidebar === 'function') {
  buildSidebar();
}