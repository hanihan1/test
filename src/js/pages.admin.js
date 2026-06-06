/* ============================================================
   pages.admin.js — Admin dashboard & action handlers
   ============================================================ */

function renderAdminDashboard() {
  const chartData = [180, 220, 165, 310, 205, 280, 340];
  const days      = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const maxV      = Math.max(...chartData);
  const bars      = chartData.map(v =>
    `<div class="chart-bar ${v >= maxV * .8 ? 'hi' : 'lo'}" style="height:${Math.round(v / maxV * 100)}%"></div>`
  ).join('');
  const labels = days.map(d => `<span>${d}</span>`).join('');

  return `
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
    <div class="card2">
      <div class="card-head">Pesanan 7 Hari Terakhir</div>
      <div class="card-body">
        <div class="chart-wrap" style="height:120px">${bars}</div>
        <div class="chart-labels">${labels}</div>
        <div style="margin-top:12px;font-size:12px;color:var(--sub)" id="admin-orders-summary">—</div>
      </div>
    </div>
    <div class="card2">
      <div class="card-head">
        Antrian Verifikasi
        <span class="badge badge-org" id="verif-queue-badge">—</span>
      </div>
      <div class="card-body" style="padding:0">
        <div id="verif-queue-list">
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
    <div class="card2">
      <div class="card-head">Dampak Lingkungan Platform</div>
      <div class="card-body">
        <div class="grid-2" id="admin-impact-grid"></div>
      </div>
    </div>
    <div class="card2">
      <div class="card-head">
        Laporan Pelanggaran
        <span class="badge badge-red" id="laporan-count-badge">—</span>
      </div>
      <div class="card-body">
        <div class="alert alert-red mb-16" id="laporan-alert">Memuat laporan...</div>
        <div id="laporan-preview"></div>
      </div>
    </div>
  </div>`;
}

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
}

function verifAction(verifId, action) {
  const card       = document.getElementById('vcard-' + verifId);
  const approveBtn = document.getElementById('vbtn-approve-' + verifId);
  const rejectBtn  = document.getElementById('vbtn-reject-' + verifId);
  card.classList.add('done');
  approveBtn.textContent = action === 'approve' ? 'Disetujui' : 'Setujui';
  rejectBtn.textContent  = action === 'reject'  ? 'Ditolak'   : 'Tolak';
  alert(action === 'approve'
    ? 'Merchant berhasil diverifikasi.'
    : 'Merchant ditolak. Notifikasi telah dikirim.');
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
  <div id="verif-list">
    <p class="color-sub">Memuat antrian verifikasi...</p>
  </div>`;
}