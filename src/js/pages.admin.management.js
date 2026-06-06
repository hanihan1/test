/* ============================================================
   pages.admin.management.js — Admin management pages
   (Users, Merchants, Listings, Orders, Violations)
   ============================================================ */


/* ── Admin: Kelola Pengguna ── */
function renderAdminUsers() {
  return `
  <div class="flex-row mb-20">
    <div class="search-wrap">
      <input id="admin-users-search" placeholder="Cari pengguna...">
    </div>
    <select class="form-select" style="width:auto" id="admin-users-filter">
      <option value="">Semua Role</option>
      <option value="customer">Customer</option>
      <option value="merchant">Merchant</option>
      <option value="admin">Admin</option>
    </select>
    <select class="form-select" style="width:auto" id="admin-users-status-filter">
      <option value="">Semua Status</option>
      <option value="active">Aktif</option>
      <option value="suspended">Tersuspend</option>
      <option value="banned">Dibanned</option>
    </select>
  </div>

  <div class="card2">
    <table class="tbl">
      <thead>
        <tr>
          <th>Nama</th><th>Email</th><th>Role</th>
          <th>Status</th><th>Join Date</th><th>Aksi</th>
        </tr>
      </thead>
      <tbody id="admin-users-tbody">
        <tr><td colspan="6" class="color-sub" style="text-align:center;padding:24px">Memuat pengguna...</td></tr>
      </tbody>
    </table>
  </div>`;
}

/* ── Admin: Kelola Merchant ── */
function renderAdminMerchants() {
  return `
  <div class="inner-tabs">
    <button class="inner-tab active" data-tab="all-merchants" data-group="merchants">Semua Merchant</button>
    <button class="inner-tab" data-tab="verified" data-group="merchants">Terverifikasi <span class="badge badge-grn" style="margin-left:4px">—</span></button>
    <button class="inner-tab" data-tab="pending-verif" data-group="merchants">Menunggu Verif <span class="badge badge-org" style="margin-left:4px">—</span></button>
    <button class="inner-tab" data-tab="rejected" data-group="merchants">Ditolak</button>
  </div>

  <!-- All merchants -->
  <div id="tab-all-merchants" data-panel data-group="merchants">
    <div class="flex-row mb-16">
      <div class="search-wrap">
        <input id="merchants-search" placeholder="Cari merchant...">
      </div>
      <select class="form-select" style="width:auto">
        <option value="">Semua Status Verif</option>
        <option value="pending">Menunggu</option>
        <option value="approved">Terverifikasi</option>
        <option value="rejected">Ditolak</option>
      </select>
    </div>
    <div class="grid-2" id="all-merchants-grid">
      <!-- TODO: populate from /api/admin/merchants -->
      <p class="color-sub">Memuat merchant...</p>
    </div>
  </div>

  <!-- Verified merchants -->
  <div id="tab-verified" class="hide" data-panel data-group="merchants">
    <div class="grid-2" id="verified-merchants-grid">
      <p class="color-sub">Memuat merchant terverifikasi...</p>
    </div>
  </div>

  <!-- Pending verification -->
  <div id="tab-pending-verif" class="hide" data-panel data-group="merchants">
    <div id="pending-merchants-list">
      <p class="color-sub">Memuat antrian verifikasi...</p>
    </div>
  </div>

  <!-- Rejected merchants -->
  <div id="tab-rejected" class="hide" data-panel data-group="merchants">
    <div class="grid-2" id="rejected-merchants-grid">
      <p class="color-sub">Memuat merchant yang ditolak...</p>
    </div>
  </div>`;
}

/* ── Admin: Kelola Listing ── */
function renderAdminListingsManagement() {
  return `
  <div class="flex-row mb-20">
    <div class="search-wrap">
      <input id="admin-listings-search" placeholder="Cari listing...">
    </div>
    <select class="form-select" style="width:auto">
      <option value="">Semua Kategori</option>
      <option>Nasi & Lauk</option>
      <option>Minuman</option>
      <option>Roti & Kue</option>
    </select>
    <select class="form-select" style="width:auto">
      <option value="">Semua Status</option>
      <option value="active">Aktif</option>
      <option value="inactive">Tidak Aktif</option>
      <option value="expired">Kadaluarsa</option>
    </select>
  </div>

  <div class="card2">
    <table class="tbl">
      <thead>
        <tr>
          <th>Nama</th><th>Merchant</th><th>Kategori</th>
          <th>Harga</th><th>Stok</th><th>Status</th><th>Aksi</th>
        </tr>
      </thead>
      <tbody id="admin-listings-tbody">
        <tr><td colspan="7" class="color-sub" style="text-align:center;padding:24px">Memuat listing...</td></tr>
      </tbody>
    </table>
  </div>`;
}

/* ── Admin: Kelola Pesanan ── */
function renderAdminOrdersManagement() {
  return `
  <div class="inner-tabs">
    <button class="inner-tab active" data-tab="all-orders" data-group="admin-orders">Semua Pesanan</button>
    <button class="inner-tab" data-tab="pending-orders" data-group="admin-orders">Pending <span class="badge badge-org" style="margin-left:4px">—</span></button>
    <button class="inner-tab" data-tab="completed-orders" data-group="admin-orders">Selesai <span class="badge badge-grn" style="margin-left:4px">—</span></button>
  </div>

  <!-- All orders -->
  <div id="tab-all-orders" data-panel data-group="admin-orders">
    <div class="flex-row mb-16">
      <div class="search-wrap">
        <input id="admin-orders-search" placeholder="Cari order code...">
      </div>
      <input type="date" class="form-input" style="width:auto" id="admin-orders-date">
    </div>
    <div class="card2">
      <table class="tbl">
        <thead>
          <tr>
            <th>Order Code</th><th>Customer</th><th>Merchant</th>
            <th>Total</th><th>Status</th><th>Tanggal</th><th>Aksi</th>
          </tr>
        </thead>
        <tbody id="admin-orders-tbody">
          <tr><td colspan="7" class="color-sub" style="text-align:center;padding:24px">Memuat pesanan...</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Pending orders -->
  <div id="tab-pending-orders" class="hide" data-panel data-group="admin-orders">
    <div class="card2">
      <div class="card-body" style="text-align:center;color:var(--sub);padding:32px">
        <div style="font-size:32px;margin-bottom:8px">⏳</div>
        <div style="font-weight:600;color:var(--lbl)">Pesanan yang menunggu konfirmasi merchant</div>
      </div>
    </div>
  </div>

  <!-- Completed orders -->
  <div id="tab-completed-orders" class="hide" data-panel data-group="admin-orders">
    <div class="card2">
      <div class="card-body" style="text-align:center;color:var(--sub);padding:32px">
        <div style="font-size:32px;margin-bottom:8px">✓</div>
        <div style="font-weight:600;color:var(--lbl)">Pesanan yang sudah selesai</div>
      </div>
    </div>
  </div>`;
}

/* ── Admin: Kelola Pelanggaran & Laporan ── */
function renderAdminViolations() {
  return `
  <div class="inner-tabs">
    <button class="inner-tab active" data-tab="open-violations" data-group="violations">Terbuka <span class="badge badge-red" style="margin-left:4px" id="open-violations-badge">—</span></button>
    <button class="inner-tab" data-tab="resolved-violations" data-group="violations">Terselesaikan</button>
  </div>

  <!-- Open violations -->
  <div id="tab-open-violations" data-panel data-group="violations">
    <div id="open-violations-list">
      <!-- TODO: populate from /api/violations?status=open -->
      <div class="card2 mb-16">
        <div class="card-head">Pelanggaran #V-001</div>
        <div class="card-body">
          <div class="mb-12">
            <div style="font-size:12px;color:var(--sub);margin-bottom:4px">TIPELAPORAN</div>
            <div style="font-weight:600">Merchant Menjual Produk Kadaluarsa</div>
          </div>
          <div class="mb-12">
            <div style="font-size:12px;color:var(--sub);margin-bottom:4px">DILAPORKAN OLEH</div>
            <div>John Doe (Customer)</div>
          </div>
          <div class="mb-16">
            <div style="font-size:12px;color:var(--sub);margin-bottom:4px">DESKRIPSI</div>
            <div style="font-size:13px">Merchant Warung Makan Sukabumi menjual nasi yang sudah kadaluarsa pada tanggal 12 Juni 2024.</div>
          </div>
          <div style="display:flex;gap:10px">
            <button class="btn btn-grn btn-sm" onclick="alert('Tindakan diambil: Merchant diberi warning.')">Beri Warning</button>
            <button class="btn btn-red btn-sm" onclick="alert('Tindakan: Suspend merchant 7 hari.')">Suspend 7 Hari</button>
            <button class="btn btn-out btn-sm" onclick="alert('Ditutup: Laporan tidak valid.')">Tutup Laporan</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Resolved violations -->
  <div id="tab-resolved-violations" class="hide" data-panel data-group="violations">
    <div class="card2">
      <div class="card-body" style="text-align:center;color:var(--sub);padding:32px">
        <div style="font-weight:600;color:var(--lbl)">Laporan yang sudah ditangani</div>
      </div>
    </div>
  </div>`;
}

/* ── Helper: Merchant card ── */
function renderMerchantCard(merchant) {
  return `
    <div class="card2">
      <div class="card-body">
        <div style="display:flex;justify-content:space-between;margin-bottom:12px">
          <div style="font-weight:600">${merchant.name}</div>
          <span class="badge ${merchant.status === 'approved' ? 'badge-grn' : 'badge-org'}">${merchant.status}</span>
        </div>
        <div style="font-size:12px;color:var(--sub);margin-bottom:8px">${merchant.category || 'Multi-kategori'}</div>
        <div style="font-size:12px;margin-bottom:12px">
          <div>📍 ${merchant.address}</div>
          <div>📞 ${merchant.phone}</div>
        </div>
        <div style="display:flex;gap:8px;padding-top:12px;border-top:1px solid var(--brd)">
          <button class="btn btn-sm btn-out" style="flex:1" onclick="alert('View detail merchant')">Detail</button>
          <button class="btn btn-sm btn-grn" style="flex:1" onclick="alert('Approve merchant')">Approve</button>
        </div>
      </div>
    </div>`;
}