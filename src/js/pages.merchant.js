/* ============================================================
   pages.merchant.js — Render functions for merchant pages
   ============================================================ */

/** Helper: format rupiah */
const formatRp = n => 'Rp ' + Number(n).toLocaleString('id-ID');

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
    <div class="stat-card" style="border-top-color:var(--grn)">
      <div class="st-label">Food Waste Dicegah</div>
      <div class="st-val" id="stat-foodwaste">—</div>
      <div class="st-delta d-grn">Dampak positif</div>
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
        <!-- Populated from API -->
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
function renderOrders() {
  return `
  <div class="inner-tabs">
    <button class="inner-tab active" data-tab="pending"   data-group="orders">Pending   <span class="badge badge-org" style="margin-left:4px" id="tab-badge-pending">—</span></button>
    <button class="inner-tab"        data-tab="confirmed" data-group="orders">Dikonfirmasi <span class="badge badge-blu" style="margin-left:4px">—</span></button>
    <button class="inner-tab"        data-tab="ready"     data-group="orders">Siap Diambil <span class="badge badge-grn" style="margin-left:4px">—</span></button>
    <button class="inner-tab"        data-tab="done"      data-group="orders">Selesai   <span class="badge badge-gray" style="margin-left:4px">—</span></button>
    <button class="inner-tab"        data-tab="rejected"  data-group="orders">Ditolak   <span class="badge badge-red" style="margin-left:4px">—</span></button>
  </div>

  <!-- Pending orders table — TODO: populate from /api/orders?status=pending -->
  <div id="tab-pending" data-panel data-group="orders">
    <div class="card2">
      <table class="tbl">
        <thead>
          <tr>
            <th>Kode Pickup</th><th>Pembeli</th><th>Item</th>
            <th>Total</th><th>Waktu</th><th>Kadaluarsa</th><th>Aksi</th>
          </tr>
        </thead>
        <tbody id="orders-pending-tbody">
          <tr><td colspan="7" class="color-sub" style="text-align:center;padding:24px">Memuat pesanan...</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Confirmed orders — TODO: /api/orders?status=confirmed -->
  <div id="tab-confirmed" class="hide" data-panel data-group="orders">
    <div class="card2">
      <div class="card-body" style="text-align:center;color:var(--sub);padding:32px">
        <div style="font-size:32px;margin-bottom:8px">&#10003;</div>
        <div style="font-weight:600;color:var(--lbl)">Menunggu data pesanan dikonfirmasi</div>
      </div>
    </div>
  </div>

  <!-- Ready for pickup — TODO: /api/orders?status=ready -->
  <div id="tab-ready" class="hide" data-panel data-group="orders">
    <div class="card2">
      <div class="card-body" style="text-align:center;color:var(--sub);padding:32px">
        <div style="font-weight:600;color:var(--lbl)">Menunggu data pesanan siap diambil</div>
      </div>
    </div>
  </div>

  <!-- Completed orders -->
  <div id="tab-done" class="hide" data-panel data-group="orders">
    <div class="card2">
      <div class="card-body" style="text-align:center;color:var(--sub);padding:32px">
        <div style="font-weight:600;color:var(--lbl)">Riwayat pesanan selesai</div>
      </div>
    </div>
  </div>

  <!-- Rejected orders -->
  <div id="tab-rejected" class="hide" data-panel data-group="orders">
    <div class="card2">
      <div class="card-body" style="text-align:center;color:var(--sub);padding:32px">
        <div style="font-weight:600;color:var(--lbl)">Pesanan yang ditolak</div>
      </div>
    </div>
  </div>`;
}

/** Confirm order action — TODO: PATCH /api/orders/:id { status: 'confirmed'|'rejected' } */
function orderAction(orderId, action) {
  // TODO: call API, then refresh order list
  alert(`Pesanan #${orderId} ${action === 'confirm' ? 'dikonfirmasi' : 'ditolak'}.`);
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
    <div>
      <!-- Merchant identity card — TODO: populate from /api/merchant-profiles/:id -->
      <div class="card2 mb-16">
        <div class="card-body" style="text-align:center;padding-top:24px">
          <div class="merchant-avatar" id="profile-avatar"></div>
          <div style="font-family:'Playfair Display',serif;font-size:20px;color:var(--lbl)" id="profile-name">—</div>
          <div style="margin:6px 0"><span class="badge badge-grn" id="profile-verif-badge">Memuat...</span></div>
          <div style="font-size:12px;color:var(--sub)" id="profile-joined">—</div>
        </div>
        <div style="padding:0 18px 18px" id="profile-info-rows">
          <!-- Info rows injected here -->
        </div>
        <div style="padding:0 18px 18px">
          <!-- TODO: open edit profile modal / form -->
          <button class="btn btn-brn" style="width:100%;justify-content:center"
                  onclick="alert('Form edit profil akan tersedia.')">Edit Profil</button>
        </div>
      </div>
    </div>

    <div>
      <!-- Environmental impact stats -->
      <div class="card2 mb-16">
        <div class="card-head">Dampak Lingkungan</div>
        <div class="card-body">
          <div class="grid-2" id="profile-impact-grid">
            <!-- Populated from API -->
          </div>
        </div>
      </div>

      <!-- Store location map placeholder -->
      <div class="card2">
        <div class="card-head">Lokasi Usaha</div>
        <div class="card-body">
          <!-- TODO: embed real map with merchant's lat/lon -->
          <div class="map-placeholder" id="profile-map">
            <div style="font-size:28px">&#128506;</div>
            <div id="profile-address">Memuat alamat...</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ── Status Verifikasi Merchant ── */
function renderVerifStatus() {
  // Timeline steps — status fetched from /api/merchant-verifications?merchant_id=:id
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
