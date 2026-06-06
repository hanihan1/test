/* ============================================================
   pages.merchant.js — Render functions for merchant pages
   ============================================================ */

/** Helper: format rupiah */

/* ── Dashboard ── */
function renderMerchantDashboard() {
  const chartData = [45, 60, 38, 80, 55, 75, 92];
  const days      = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const bars      = chartData.map(v =>
    `<div class="chart-bar ${v >= 80 ? 'hi' : 'lo'}" style="height:${v}%"></div>`
  ).join('');
  const labels = days.map(d => `<span>${d}</span>`).join('');

  return `
  <!-- Alert: pending orders -->
  <div class="alert alert-org mb-16">
    <strong>3 pesanan baru</strong> menunggu konfirmasi —
    <a href="#" onclick="navigate('orders');return false;" style="color:inherit;font-weight:600">Lihat sekarang &rarr;</a>
  </div>

  <!-- KPI stat cards -->
  <div class="grid-4 mb-20">
    <div class="stat-card" style="border-top-color:var(--grn)">
      <div class="st-label">Listing Aktif</div>
      <div class="st-val" id="stat-listing-aktif">—</div>
      <div class="st-delta d-grn" id="stat-listing-delta">—</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--blu)">
      <div class="st-label">Pesanan Bulan Ini</div>
      <div class="st-val" id="stat-orders">—</div>
      <div class="st-delta d-grn" id="stat-orders-delta">—</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--btn)">
      <div class="st-label">Pendapatan</div>
      <div class="st-val" style="font-size:20px" id="stat-revenue">—</div>
      <div class="st-delta d-org" id="stat-revenue-period">—</div>
    </div>
  </div>

  <div class="grid-2 mb-20">
    <!-- Incoming orders preview -->
    <div class="card2">
      <div class="card-head">
        Pesanan Masuk
        <span class="badge badge-org" id="pending-badge">3 Pending</span>
      </div>
      <div class="card-body" style="padding:0" id="pending-orders-list">
        <table class="tbl" style="margin:0">
          <tbody id="orders-pending-tbody">
            <tr>
              <td style="padding:16px">
                <div style="font-weight:600">ORD-20240612-001</div>
                <div style="font-size:12px;color:var(--sub)">Budi Santoso • 2 Items</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Sales chart (7 days) -->
    <div class="card2">
      <div class="card-head">Penjualan 7 Hari</div>
      <div class="card-body">
        <div class="chart-wrap">${bars}</div>
        <div class="chart-labels">${labels}</div>
        <div style="margin-top:16px" id="top-products-chart">
          <!-- Top products progress bars, populated from API -->
        </div>
      </div>
    </div>
  </div>

  <!-- Active listings table -->
  <div class="card2">
    <div class="card-head">Listing Aktif Terbaru</div>
    <table class="tbl">
      <thead>
        <tr>
          <th>Nama</th><th>Kategori</th><th>Harga Asli</th>
          <th>Harga Jual</th><th>Stok</th><th>Tutup</th><th>Status</th>
        </tr>
      </thead>
      <tbody id="active-listings-tbody">
        <!-- Populated from API -->
      </tbody>
    </table>
  </div>`;
}

/* ── Tambah Listing ── */
function renderAddListing() {
  return `
  <div style="max-width:680px;margin:0 auto">
    <div class="card2">
      <div class="card-head">Tambah Listing Baru</div>
      <div class="card-body">
        <div class="alert alert-grn mb-16">
          Pastikan harga jual minimal 30% lebih murah dari harga asli.
        </div>

        <div class="form-row mb-12">
          <div class="form-group">
            <label class="form-label">Nama Menu</label>
            <input class="form-input" id="listing-name" placeholder="Contoh: Nasi Kotak Ayam Geprek">
          </div>
          <div class="form-group">
            <label class="form-label">Kategori</label>
            <select class="form-select" id="listing-category">
              <!-- TODO: populate from /api/categories -->
              <option>Nasi &amp; Lauk</option>
              <option>Minuman</option>
              <option>Roti &amp; Kue</option>
              <option>Camilan</option>
              <option>Lainnya</option>
            </select>
          </div>
        </div>

        <div class="form-row mb-12">
          <div class="form-group">
            <label class="form-label">Harga Asli (Rp)</label>
            <input class="form-input" id="listing-orig-price" type="number" placeholder="25000">
          </div>
          <div class="form-group">
            <label class="form-label">Harga Jual Surplus (Rp)</label>
            <input class="form-input" id="listing-disc-price" type="number" placeholder="10000">
          </div>
        </div>

        <div class="form-row mb-12">
          <div class="form-group">
            <label class="form-label">Jumlah Stok</label>
            <input class="form-input" id="listing-stock" type="number" placeholder="10">
          </div>
          <div class="form-group">
            <label class="form-label">Jam Tutup Pickup</label>
            <input class="form-input" id="listing-time" type="time" value="20:00">
          </div>
        </div>

        <div class="form-group mb-12">
          <label class="form-label">Deskripsi</label>
          <textarea class="form-textarea" id="listing-desc"
            placeholder="Kondisi makanan, komposisi, atau info penting lainnya..."></textarea>
        </div>

        <div class="form-group" style="margin-bottom:20px">
          <label class="form-label">Foto Produk</label>
          <input type="file" id="listing-photo" accept="image/*" style="display:none">
          <div class="upload-box" id="photo-box"
               onclick="document.getElementById('listing-photo').click()">
            Klik untuk upload foto<br>
            <span style="font-size:11px;margin-top:4px;display:block">JPG, PNG maks. 5MB</span>
            <div id="photo-preview" style="margin-top:12px;display:none"></div>
          </div>
        </div>

        <div style="display:flex;gap:10px;justify-content:flex-end">
          <button class="btn btn-out" onclick="navigate('listings')">Batal</button>
          <button class="btn btn-grn" onclick="saveListing()">Publikasikan Listing</button>
        </div>
      </div>
    </div>
  </div>`;
}

/** Handle image file selection and preview */
function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    alert('File terlalu besar. Maksimal 5MB.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const preview = document.getElementById('photo-preview');
    preview.innerHTML = `<img src="${e.target.result}"
      style="width:100%;max-height:300px;border-radius:8px;object-fit:cover">`;
    preview.style.display = 'block';
    const box = document.getElementById('photo-box');
    box.style.background = '#F5EBE0';
    box.style.borderColor = '#E8D5C4';
  };
  reader.readAsDataURL(file);
}

/** Validate and submit new listing — TODO: replace alert with API call */
function saveListing() {
  const name      = document.getElementById('listing-name').value.trim();
  const origPrice = parseFloat(document.getElementById('listing-orig-price').value);
  const discPrice = parseFloat(document.getElementById('listing-disc-price').value);
  const stock     = document.getElementById('listing-stock').value;
  const hasPhoto  = document.getElementById('listing-photo').files.length > 0;

  if (!name || isNaN(origPrice) || isNaN(discPrice) || !stock) {
    alert('Lengkapi semua field yang diperlukan.');
    return;
  }
  if (discPrice >= origPrice) {
    alert('Harga jual harus lebih murah dari harga asli.');
    return;
  }
  const discount = Math.round(((origPrice - discPrice) / origPrice) * 100);
  if (discount < 30) {
    alert('Diskon minimal 30% dari harga asli.');
    return;
  }
  if (!hasPhoto) {
    alert('Silakan upload foto produk.');
    return;
  }

  // TODO: POST /api/food-listings with FormData
  alert(`Listing berhasil dipublikasikan!\n${name} — diskon ${discount}%`);
  navigate('listings');
}

/* ── Kelola Listing ── */
function renderListings() {
  return `
  <div class="flex-row mb-20">
    <div class="search-wrap">
      <input id="listing-search" placeholder="Cari listing...">
    </div>
    <select class="form-select" style="width:auto" id="listing-cat-filter">
      <!-- TODO: populate from /api/categories -->
      <option value="">Semua Kategori</option>
      <option>Nasi &amp; Lauk</option>
      <option>Minuman</option>
      <option>Roti &amp; Kue</option>
    </select>
    <button class="btn btn-grn" onclick="navigate('add-listing')">Tambah Listing</button>
  </div>
  <!-- TODO: populate grid from /api/food-listings?merchant_id=:id -->
  <div class="grid-3" id="listings-grid">
    <p class="color-sub">Memuat listing...</p>
  </div>`;
}

/* ── Pesanan Masuk ── */
function renderOrders(targetTab = 'pending') {
  return `
  <div class="inner-tabs">
    <button class="inner-tab ${targetTab === 'pending' ? 'active' : ''}"   data-tab="pending"   data-group="orders">Pending   <span class="badge badge-org" style="margin-left:4px" id="tab-badge-pending">—</span></button>
    <button class="inner-tab ${targetTab === 'confirmed' ? 'active' : ''}" data-tab="confirmed" data-group="orders">Dikonfirmasi <span class="badge badge-blu" style="margin-left:4px">—</span></button>
    <button class="inner-tab ${targetTab === 'ready' ? 'active' : ''}"     data-tab="ready"     data-group="orders">Siap Diambil <span class="badge badge-grn" style="margin-left:4px">—</span></button>
    <button class="inner-tab ${targetTab === 'done' ? 'active' : ''}"      data-tab="done"      data-group="orders">Selesai   <span class="badge badge-gray" style="margin-left:4px">—</span></button>
    <button class="inner-tab ${targetTab === 'rejected' ? 'active' : ''}"  data-tab="rejected"  data-group="orders">Ditolak   <span class="badge badge-red" style="margin-left:4px">—</span></button>
  </div>

  <!-- Pending orders table — TODO: populate from /api/orders?status=pending -->
  <div id="tab-pending" class="${targetTab === 'pending' ? '' : 'hide'}" data-panel data-group="orders">
    <div class="card2">
      <table class="tbl">
        <thead>
          <tr>
            <th>Kode Pickup</th><th>Pembeli</th><th>Item</th>
            <th>Total</th><th>Waktu</th><th>Kadaluarsa</th><th>Aksi</th>
          </tr>
        </thead>
        <tbody id="orders-pending-tbody">
          <tr>
            <td>#ORD-001</td>
            <td>Budi Santoso</td>
            <td>Nasi Kotak Ayam...</td>
            <td>Rp 40.000</td>
            <td>14:30</td>
            <td>20:00</td>
            <td style="display:flex;gap:6px">
              <button class="btn btn-grn btn-sm" onclick="orderAction('ORD-001', 'accept')">Accept</button>
              <button class="btn btn-red btn-sm" onclick="orderAction('ORD-001', 'reject')">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Confirmed orders — TODO: /api/orders?status=confirmed -->
  <div id="tab-confirmed" class="${targetTab === 'confirmed' ? '' : 'hide'}" data-panel data-group="orders">
    <div class="card2">
      <div class="card-body" style="text-align:center;color:var(--sub);padding:32px">
        <div style="font-size:32px;margin-bottom:8px">&#10003;</div>
        <div style="font-weight:600;color:var(--lbl)">Menunggu data pesanan dikonfirmasi</div>
      </div>
    </div>
  </div>

  <!-- Ready for pickup — TODO: /api/orders?status=ready -->
  <div id="tab-ready" class="${targetTab === 'ready' ? '' : 'hide'}" data-panel data-group="orders">
    <div class="card2">
      <div class="card-body" style="text-align:center;color:var(--sub);padding:32px">
        <div style="font-weight:600;color:var(--lbl)">Menunggu data pesanan siap diambil</div>
      </div>
    </div>
  </div>

  <!-- Completed orders -->
  <div id="tab-done" class="${targetTab === 'done' ? '' : 'hide'}" data-panel data-group="orders">
    <div class="card2">
      <div class="card-body" style="text-align:center;color:var(--sub);padding:32px">
        <div style="font-weight:600;color:var(--lbl)">Riwayat pesanan selesai</div>
      </div>
    </div>
  </div>

  <!-- Rejected orders -->
  <div id="tab-rejected" class="${targetTab === 'rejected' ? '' : 'hide'}" data-panel data-group="orders">
    <div class="card2">
      <div class="card-body" style="text-align:center;color:var(--sub);padding:32px">
        <div style="font-weight:600;color:var(--lbl)">Pesanan yang ditolak</div>
      </div>
    </div>
  </div>`;
}

/** Confirm order action — TODO: PATCH /api/orders/:id { status: 'confirmed'|'rejected' } */
function orderAction(orderId, action) {
  if (action === 'accept') {
    navigate('order-detail');
  } else {
    alert(`Pesanan #${orderId} telah ditolak.`);
  }
}

/* ── Riwayat Pesanan ── */
function renderHistory() {
  return `
  <div class="flex-row mb-20">
    <div class="search-wrap">
      <input id="history-search" placeholder="Cari riwayat pesanan...">
    </div>
    <select class="form-select" style="width:auto">
      <option value="">Semua Status</option>
      <option value="completed">Selesai</option>
      <option value="rejected">Ditolak</option>
    </select>
    <input type="date" class="form-input" style="width:auto" id="history-date">
  </div>
  <!-- TODO: populate from /api/orders?merchant_id=:id&status=completed,rejected -->
  <div class="card2">
    <table class="tbl">
      <thead>
        <tr>
          <th>Kode</th><th>Pembeli</th><th>Item</th>
          <th>Total</th><th>Pembayaran</th><th>Status</th><th>Tanggal</th>
        </tr>
      </thead>
      <tbody id="history-tbody">
        <tr><td colspan="7" class="color-sub" style="text-align:center;padding:24px">Memuat riwayat...</td></tr>
      </tbody>
    </table>
  </div>`;
}

/* ── Profil Usaha ── */
function renderProfile() {
  return `
  <div class="grid-2">
    <!-- Kiri: kartu identitas merchant -->
    <div>
      <div class="card2 mb-16">
        <div class="card-body" style="text-align:center;padding-top:24px">
          <div class="merchant-avatar" id="profile-avatar"></div>
          <div style="font-family:'Playfair Display',serif;font-size:20px;color:var(--lbl)" id="profile-name">—</div>
          <div style="margin:6px 0"><span class="badge badge-grn" id="profile-verif-badge">Memuat...</span></div>
          <div style="font-size:12px;color:var(--sub)" id="profile-joined">—</div>
        </div>
        <div style="padding:0 18px 18px">
          <button class="btn btn-brn" style="width:100%;justify-content:center"
                  onclick="alert('Form edit profil akan tersedia.')">Edit Profil</button>
        </div>
      </div>
    </div>

    <!-- Kanan: titik lokasi di peta (Leaflet) -->
    <div>
      <div class="card2">
        <div class="card-head" style="text-transform:uppercase;font-size:12px;letter-spacing:.08em">
          Titik Lokasi di Peta
        </div>
        <div class="card-body" style="padding-top:0">

          <!-- Info banner -->
          <div class="alert alert-grn mb-12" style="font-size:13px">
            📍 Tandai lokasi toko kamu di peta agar pembeli bisa menemukan kamu dengan mudah.
            Klik di peta atau gunakan tombol "Lokasiku" untuk titik GPS.
          </div>

          <!-- Search bar + Lokasiku -->
          <div style="display:flex;gap:8px;margin-bottom:10px">
            <input class="form-input" id="map-search-input"
                   placeholder="Cari alamat atau nama tempat..."
                   style="flex:1"
                   onkeydown="if(event.key==='Enter')searchMapLocation()">
            <button class="btn btn-grn btn-sm" onclick="searchMapLocation()">🔍 Cari</button>
            <button class="btn btn-brn btn-sm" onclick="useMyLocation()">📍 Lokasiku</button>
          </div>

          <!-- Leaflet map container -->
          <div id="profile-leaflet-map"
               style="width:100%;height:300px;border-radius:8px;border:1px solid var(--brd);z-index:0">
          </div>

          <!-- Status bawah map -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
            <div style="font-size:12px;color:var(--sub)" id="map-coord-label">Titik belum dipilih</div>
            <button class="btn btn-grn btn-sm" id="save-location-btn"
                    style="display:none" onclick="saveLocationPin()">Simpan Lokasi</button>
          </div>

        </div>
      </div>
    </div>
  </div>`;
}

/* ── Leaflet map init — panggil setelah renderProfile() di-inject ke DOM ── */
let _profileMap   = null;   // Leaflet map instance
let _profileMarker = null;  // current pin

function initProfileMap(savedLat = -7.5755, savedLng = 110.8243) {
  // Jangan init ulang jika sudah ada
  if (_profileMap) { _profileMap.remove(); _profileMap = null; }

  // Muat Leaflet CSS + JS jika belum ada
  if (!document.getElementById('leaflet-css')) {
    const link = document.createElement('link');
    link.id   = 'leaflet-css';
    link.rel  = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
  }

  function _createMap() {
    _profileMap = L.map('profile-leaflet-map').setView([savedLat, savedLng], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(_profileMap);

    // Pasang marker jika sudah ada koordinat tersimpan
    if (savedLat && savedLng) _setProfilePin(savedLat, savedLng, false);

    // Klik peta → pindah pin
    _profileMap.on('click', function(e) {
      _setProfilePin(e.latlng.lat, e.latlng.lng, true);
    });
  }

  if (typeof L !== 'undefined') {
    _createMap();
  } else {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = _createMap;
    document.head.appendChild(script);
  }
}

function _setProfilePin(lat, lng, showSave) {
  const icon = L.divIcon({
    className: '',
    html: `<div style="
      width:28px;height:28px;background:var(--btn,#e07b54);
      border-radius:50% 50% 50% 0;transform:rotate(-45deg);
      border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3)">
    </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28]
  });

  if (_profileMarker) _profileMarker.remove();
  _profileMarker = L.marker([lat, lng], { icon }).addTo(_profileMap);

  // Update label koordinat
  const label = document.getElementById('map-coord-label');
  if (label) label.textContent = `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;

  // Tampilkan tombol simpan
  const btn = document.getElementById('save-location-btn');
  if (btn && showSave) btn.style.display = 'inline-flex';
}

/** Cari lokasi via Nominatim */
function searchMapLocation() {
  const q = document.getElementById('map-search-input').value.trim();
  if (!q) return;

  fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1&countrycodes=id`)
    .then(r => r.json())
    .then(results => {
      if (!results.length) { alert('Lokasi tidak ditemukan.'); return; }
      const { lat, lon } = results[0];
      _profileMap.setView([+lat, +lon], 16);
      _setProfilePin(+lat, +lon, true);
    })
    .catch(() => alert('Gagal mencari lokasi.'));
}

/** Gunakan GPS browser */
function useMyLocation() {
  if (!navigator.geolocation) { alert('Browser tidak mendukung GPS.'); return; }
  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      _profileMap.setView([lat, lng], 16);
      _setProfilePin(lat, lng, true);
    },
    () => alert('Tidak dapat mengakses lokasi. Pastikan izin GPS diberikan.')
  );
}

/** Simpan koordinat pin ke backend — TODO: PATCH /api/merchant-profiles/:id */
function saveLocationPin() {
  if (!_profileMarker) return;
  const { lat, lng } = _profileMarker.getLatLng();
  // TODO: kirim ke API
  alert(`Lokasi tersimpan!\nLat: ${lat.toFixed(6)}\nLng: ${lng.toFixed(6)}`);
  document.getElementById('save-location-btn').style.display = 'none';
}

function renderVerifStatus() {
  const steps = [
    { type: 'g', title: 'Dokumen diunggah',  sub: 'Semua dokumen telah kami terima' },
    { type: 'g', title: 'Validasi awal',     sub: 'Dokumen lolos filter otomatis' },
    { type: 'o', title: 'Tinjauan admin',    sub: 'Sedang diproses tim EcoEats' },
    { type: 'x', title: 'Keputusan',         sub: 'Menunggu persetujuan akhir' },
  ];

  return `
  <div style="max-width:600px;margin:0 auto">
    <!-- Current status -->
    <div class="card2 mb-16" style="border-left:4px solid var(--org)">
      <div class="card-head" style="color:var(--org)">Status: Menunggu Verifikasi</div>
      <div class="card-body">
        <div class="mb-16">
          ${steps.map(s => `
          <div class="tl-item">
            <div class="tl-dot ${s.type}"></div>
            <div>
              <div class="tl-title">${s.title}</div>
              <div class="tl-sub">${s.sub}</div>
            </div>
          </div>`).join('')}
        </div>
        <div class="alert alert-org">
          Proses verifikasi biasanya 2&ndash;5 hari kerja. Anda akan mendapat notifikasi via email.
        </div>
      </div>
    </div>

    <!-- If approved -->
    <div class="card2 mb-16" style="border-left:4px solid var(--grn)">
      <div class="card-head" style="color:var(--grn)">Jika Disetujui</div>
      <div class="card-body">
        <div class="alert alert-grn mb-16">
          Akun merchant Anda telah diverifikasi. Anda dapat mulai menambahkan listing.
        </div>
        <button class="btn btn-grn" onclick="navigate('add-listing')">Mulai Tambah Listing</button>
      </div>
    </div>

    <!-- If rejected -->
    <div class="card2" style="border-left:4px solid var(--red)">
      <div class="card-head" style="color:var(--red)">Jika Ditolak</div>
      <div class="card-body">
        <div class="alert alert-red mb-16" id="verif-reject-reason">
          <!-- Rejection reason from API -->
          Menunggu keputusan admin.
        </div>
        <div style="font-size:12px;color:var(--sub);margin-bottom:16px" id="verif-attempt">—</div>
        <div style="display:flex;gap:10px">
          <!-- TODO: open document re-upload modal -->
          <button class="btn btn-brn" onclick="alert('Upload ulang dokumen.')">Upload Ulang Dokumen</button>
          <!-- TODO: open support chat / ticket -->
          <button class="btn btn-out"  onclick="alert('Tim EcoEats akan menghubungi Anda.')">Hubungi Support</button>
        </div>
      </div>
    </div>
  </div>`;
}
