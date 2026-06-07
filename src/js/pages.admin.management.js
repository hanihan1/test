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
  </div>

  <div class="card2">
    <table class="tbl">
      <thead>
        <tr>
          <th>Nama</th><th>Email</th>
          <th>Join Date</th><th>Aksi</th>
        </tr>
      </thead>
      <tbody id="admin-users-tbody">
        <tr><td colspan="4" class="color-sub" style="text-align:center;padding:24px">Memuat pengguna...</td></tr>
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







/* ── Helper: Merchant card ── */
function renderMerchantCard(merchant) {
  return `
    <div class="card2">
      <div class="card-body">
        <div style="display:flex;justify-content:space-between;margin-bottom:12px">
          <div style="font-weight:600">${merchant.name}</div>
          <span class="badge ${merchant.status === 'approved' ? 'badge-grn' : 'badge-org'}">${merchant.status}</span>
        </div>
        <div style="font-size:12px;color:var(--sub);margin-bottom:8px">${merchant.business_type || '—'}</div>
        <div style="font-size:12px;margin-bottom:12px">
          <div>📍 ${merchant.address}</div>
          <div>📞 ${merchant.phone}</div>
        </div>
        <div style="display:flex;gap:8px;padding-top:12px;border-top:1px solid var(--brd)">
          <button class="btn btn-sm btn-out" style="flex:1" onclick="navigate('verif-detail')">Detail</button>
          <button class="btn btn-sm btn-grn" style="flex:1" onclick="verifAction('${merchant.id}', 'approve')">Approve</button>
        </div>
      </div>
    </div>`;
}