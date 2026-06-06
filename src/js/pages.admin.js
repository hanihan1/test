/* ============================================================
   pages.admin.js — Render functions for admin pages
   ============================================================ */

/* ── Admin Dashboard ── */
function renderAdminDashboard() {
  const chartData = [180, 220, 165, 310, 205, 280, 340];
  const days      = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const maxV      = Math.max(...chartData);
  const bars      = chartData.map(v =>
    `<div class="chart-bar ${v >= maxV * .8 ? 'hi' : 'lo'}" style="height:${Math.round(v / maxV * 100)}%"></div>`
  ).join('');
  const labels = days.map(d => `<span>${d}</span>`).join('');

  return `
  <!-- KPI stat cards — TODO: populate from /api/admin/stats -->
  <div class="grid-4 mb-20">
    <div class="stat-card" style="border-top-color:var(--blu)">
      <div class="st-label">Total Pengguna</div>
      <div class="st-val" id="stat-total-users">—</div>
      <div class="st-delta d-grn" id="stat-users-delta">—</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--grn)">
      <div class="st-label">Merchant Terverifikasi</div>
      <div class="st-val" id="stat-verified-merchants">—</div>
      <div class="st-delta d-grn" id="stat-merchants-delta">—</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--btn)">
      <div class="st-label">Listing Aktif</div>
      <div class="st-val" id="stat-active-listings">—</div>
      <div class="st-delta d-org" id="stat-listings-delta">—</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--red)">
      <div class="st-label">Menunggu Verifikasi</div>
      <div class="st-val" style="color:var(--red)" id="stat-pending-verif">—</div>
      <div class="st-delta d-red">Perlu ditinjau</div>
    </div>
  </div>

  <div class="grid-2 mb-20">
    <!-- Platform orders chart -->
    <div class="card2">
      <div class="card-head">Pesanan 7 Hari Terakhir</div>
      <div class="card-body">
        <div class="chart-wrap" style="height:120px">${bars}</div>
        <div class="chart-labels">${labels}</div>
        <div style="margin-top:12px;font-size:12px;color:var(--sub)" id="admin-orders-summary">—</div>
      </div>
    </div>

    <!-- Verification queue preview -->
    <div class="card2">
      <div class="card-head">
        Antrian Verifikasi
        <span class="badge badge-org" id="verif-queue-badge">—</span>
      </div>
      <div class="card-body" style="padding:0">
        <div id="verif-queue-list">
          <!-- TODO: populate from /api/merchant-verifications?status=pending -->
          <div style="padding:16px;color:var(--sub);font-size:13px">Memuat antrian...</div>
        </div>
        <div style="padding:12px 16px">
          <button class="btn btn-brn btn-sm"
                  style="width:100%;justify-content:center"
                  onclick="navigate('verifikasi')">
            Lihat Semua Antrian &rarr;
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="grid-2">
    <!-- Platform environmental impact -->
    <div class="card2">
      <div class="card-head">Dampak Lingkungan Platform</div>
      <div class="card-body">
        <div class="grid-2" id="admin-impact-grid">
          <!-- TODO: populate from /api/admin/impact-stats -->
        </div>
      </div>
    </div>

    <!-- Active violation reports -->
    <div class="card2">
      <div class="card-head">
        Laporan Pelanggaran
        <span class="badge badge-red" id="laporan-count-badge">—</span>
      </div>
      <div class="card-body">
        <div class="alert alert-red mb-16" id="laporan-alert">
          Memuat laporan...
        </div>
        <div id="laporan-preview">
          <!-- TODO: populate from /api/reports?status=open&limit=2 -->
        </div>
        <button class="btn btn-red btn-sm" style="margin-top:12px"
                onclick="navigate('laporan')">
          Tinjau Laporan &rarr;
        </button>
      </div>
    </div>
  </div>`;
}

/* ── Analitik ── */
function renderAnalytics() {
  return `
  <!-- Platform KPI summary — TODO: from /api/admin/analytics -->
  <div class="grid-4 mb-20">
    <div class="stat-card" style="border-top-color:var(--grn)">
      <div class="st-label">Total Transaksi</div>
      <div class="st-val" id="analytics-tx">—</div>
      <div class="st-delta d-grn" id="analytics-tx-delta">—</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--btn)">
      <div class="st-label">GMV Platform</div>
      <div class="st-val" style="font-size:18px" id="analytics-gmv">—</div>
      <div class="st-delta d-grn" id="analytics-gmv-delta">—</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--blu)">
      <div class="st-label">Rating Rata-rata</div>
      <div class="st-val" id="analytics-rating">—</div>
      <div class="st-delta d-grn" id="analytics-rating-count">—</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--org)">
      <div class="st-label">Food Waste Dicegah</div>
      <div class="st-val" id="analytics-foodwaste">—</div>
      <div class="st-delta d-grn" id="analytics-fw-period">—</div>
    </div>
  </div>

  <div class="grid-2">
    <!-- Category distribution -->
    <div class="card2">
      <div class="card-head">Distribusi Kategori</div>
      <div class="card-body" id="analytics-categories">
        <!-- TODO: populate from /api/admin/analytics/categories -->
        <p class="color-sub">Memuat data...</p>
      </div>
    </div>

    <!-- Top kecamatan table -->
    <div class="card2">
      <div class="card-head">Top Kecamatan</div>
      <div class="card-body" style="padding:0">
        <!-- TODO: populate from /api/admin/analytics/by-area -->
        <table class="tbl">
          <thead>
            <tr><th>Kecamatan</th><th>Merchant</th><th>Transaksi</th></tr>
          </thead>
          <tbody id="analytics-area-tbody">
            <tr><td colspan="3" class="color-sub" style="text-align:center;padding:24px">Memuat...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

/* ── Kelola Pengguna ── */
function renderUsers() {
  return `
  <div class="flex-row mb-20">
    <div class="search-wrap">
      <input id="users-search" placeholder="Cari pengguna...">
    </div>
    <select class="form-select" style="width:auto" id="users-role-filter">
      <option value="">Semua Role</option>
      <option value="user">User</option>
      <option value="merchant">Merchant</option>
    </select>
    <select class="form-select" style="width:auto" id="users-status-filter">
      <option value="">Semua Status</option>
      <option value="active">Aktif</option>
      <option value="blocked">Diblokir</option>
    </select>
  </div>
  <!-- TODO: populate from /api/users -->
  <div class="card2">
    <table class="tbl">
      <thead>
        <tr>
          <th>Nama</th><th>Email</th><th>Role</th>
          <th>Bergabung</th><th>Status</th><th>Aksi</th>
        </tr>
      </thead>
      <tbody id="users-tbody">
        <tr><td colspan="6" class="color-sub" style="text-align:center;padding:24px">Memuat pengguna...</td></tr>
      </tbody>
    </table>
  </div>`;
}

/** Toggle user active/blocked — TODO: PATCH /api/users/:id { deleted_at: null | now() } */
function toggleUser(userId, action) {
  const statusEl = document.getElementById('ustatus-' + userId);
  const btnEl    = document.getElementById('ubtn-' + userId);
  if (action === 'block') {
    statusEl.innerHTML = '<span class="badge badge-red">Diblokir</span>';
    btnEl.className    = 'btn btn-grn btn-sm';
    btnEl.textContent  = 'Pulihkan';
    btnEl.setAttribute('onclick', `toggleUser('${userId}','restore')`);
  } else {
    statusEl.innerHTML = '<span class="badge badge-grn">Aktif</span>';
    btnEl.className    = 'btn btn-red btn-sm';
    btnEl.textContent  = 'Blokir';
    btnEl.setAttribute('onclick', `toggleUser('${userId}','block')`);
  }
  // TODO: PATCH /api/users/:userId { status: action === 'block' ? 'blocked' : 'active' }
}

/* ── Kelola Merchant ── */
function renderMerchants() {
  return `
  <div class="flex-row mb-20">
    <div class="search-wrap">
      <input id="merchants-search" placeholder="Cari merchant...">
    </div>
    <select class="form-select" style="width:auto" id="merchants-status-filter">
      <option value="">Semua Status</option>
      <option value="verified">Terverifikasi</option>
      <option value="pending">Pending</option>
    </select>
  </div>
  <!-- TODO: populate from /api/merchant-profiles -->
  <div class="card2">
    <table class="tbl">
      <thead>
        <tr>
          <th>Merchant</th><th>Jenis</th><th>Email</th>
          <th>Bergabung</th><th>Listing</th><th>Status</th><th>Aksi</th>
        </tr>
      </thead>
      <tbody id="merchants-tbody">
        <tr><td colspan="7" class="color-sub" style="text-align:center;padding:24px">Memuat merchant...</td></tr>
      </tbody>
    </table>
  </div>`;
}

/* ── Kelola Listing (admin) ── */
function renderAdminListings() {
  return `
  <div class="flex-row mb-20">
    <div class="search-wrap">
      <input id="admin-listings-search" placeholder="Cari listing...">
    </div>
    <select class="form-select" style="width:auto" id="admin-listings-cat">
      <option value="">Semua Kategori</option>
      <!-- TODO: populate from /api/categories -->
    </select>
    <select class="form-select" style="width:auto" id="admin-listings-status">
      <option value="">Semua Status</option>
      <option value="available">Aktif</option>
      <option value="sold_out">Habis</option>
    </select>
  </div>
  <!-- TODO: populate from /api/food-listings (admin view, all merchants) -->
  <div class="card2">
    <table class="tbl">
      <thead>
        <tr>
          <th>Produk</th><th>Merchant</th><th>Kategori</th>
          <th>Harga</th><th>Stok</th><th>Status</th><th>Aksi</th>
        </tr>
      </thead>
      <tbody id="admin-listings-tbody">
        <tr><td colspan="7" class="color-sub" style="text-align:center;padding:24px">Memuat listing...</td></tr>
      </tbody>
    </table>
  </div>`;
}

/** Takedown a listing — TODO: PATCH /api/food-listings/:id { status: 'out' } */
function takedownListing(listingId) {
  if (confirm('Yakin ingin men-takedown listing ini?')) {
    // TODO: PATCH API call
    alert('Listing telah di-takedown.');
  }
}

/* ── Kelola Pesanan (admin) ── */
function renderAdminOrders() {
  return `
  <div class="flex-row mb-20">
    <div class="search-wrap">
      <input id="admin-orders-search" placeholder="Cari pesanan...">
    </div>
    <select class="form-select" style="width:auto" id="admin-orders-status">
      <option value="">Semua Status</option>
      <option value="pending">Pending</option>
      <option value="confirmed">Dikonfirmasi</option>
      <option value="completed">Selesai</option>
      <option value="rejected">Ditolak</option>
      <option value="expired">Kadaluarsa</option>
    </select>
    <input type="date" class="form-input" style="width:auto" id="admin-orders-date">
  </div>
  <!-- TODO: populate from /api/orders (admin, all merchants) -->
  <div class="card2">
    <table class="tbl">
      <thead>
        <tr>
          <th>Kode</th><th>Pembeli</th><th>Merchant</th>
          <th>Item</th><th>Total</th><th>Status</th><th>Waktu</th>
        </tr>
      </thead>
      <tbody id="admin-orders-tbody">
        <tr><td colspan="7" class="color-sub" style="text-align:center;padding:24px">Memuat pesanan...</td></tr>
      </tbody>
    </table>
  </div>`;
}

/* ── Verifikasi Merchant ── */
function renderVerifikasi() {
  return `
  <div class="flex-row mb-20">
    <div class="search-wrap">
      <input id="verif-search" placeholder="Cari merchant...">
    </div>
    <select class="form-select" style="width:auto" id="verif-status-filter">
      <option value="">Semua Status</option>
      <option value="pending">Pending</option>
      <option value="approved">Disetujui</option>
      <option value="rejected">Ditolak</option>
    </select>
  </div>
  <!-- TODO: populate from /api/merchant-verifications?status=pending -->
  <div id="verif-list">
    <p class="color-sub">Memuat antrian verifikasi...</p>
  </div>`;
}

/**
 * Approve or reject a merchant verification.
 * TODO: PATCH /api/merchant-verifications/:id { status: 'approved'|'rejected', notes: '...' }
 */
function verifAction(verifId, action) {
  const card      = document.getElementById('vcard-' + verifId);
  const approveBtn= document.getElementById('vbtn-approve-' + verifId);
  const rejectBtn = document.getElementById('vbtn-reject-' + verifId);
  card.classList.add('done');
  approveBtn.textContent = action === 'approve' ? 'Disetujui' : 'Setujui';
  rejectBtn.textContent  = action === 'reject'  ? 'Ditolak'   : 'Tolak';
  alert(action === 'approve'
    ? 'Merchant berhasil diverifikasi.'
    : 'Merchant ditolak. Notifikasi telah dikirim.');
}

/* ── Laporan Pelanggaran ── */
function renderLaporan() {
  return `
  <div class="alert alert-red mb-20" id="laporan-header-alert">
    Memuat laporan aktif...
  </div>
  <!-- TODO: populate from /api/reports?status=open -->
  <div id="violation-list">
    <p class="color-sub">Memuat laporan...</p>
  </div>`;
}

/**
 * Takedown content or dismiss a report.
 * TODO: PATCH /api/reports/:id { status: 'resolved'|'dismissed' }
 */
function violAction(reportId, action) {
  const card = document.getElementById('viol-' + reportId);
  card.classList.add('done');
  alert(action === 'takedown' ? 'Konten telah di-takedown.' : 'Laporan diabaikan.');
}
