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
  `;
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

/** Render detail pengajuan merchant untuk ditinjau Admin */
function renderVerifDetail(merchantId = 'M-MOCK') {
  // Data simulasi (dalam realita diambil dari API berdasarkan merchantId)
  const m = {
    name: 'Warung Makan Sukabumi',
    owner: 'Budi Santoso',
    email: 'budi@sukabumi.com',
    phone: '081234567890',
    category: 'Warung Makan',
    description: 'Menyediakan masakan rumahan khas Sunda. Kami ingin mengurangi limbah makanan dengan menjual porsi surplus.',
    address: 'Jl. Slamet Riyadi No. 123, Surakarta',
    halal_status: 'bersertifikat',
    halal_no: 'ID00110000XXXXX',
    license_type: 'NIB (Nomor Induk Berusaha)',
    license_no: '9120001234567',
  };

  return `
  <div style="max-width:900px;margin:0 auto">
    <div style="display:flex;gap:12px;margin-bottom:20px;align-items:center">
      <button class="btn btn-out btn-sm" onclick="navigate('verifikasi')">← Kembali</button>
      <h2 style="font-family:'Playfair Display',serif">Tinjau: ${m.name}</h2>
    </div>

    <div class="grid-2">
      <!-- Sisi Kiri: Profil Bisnis -->
      <div class="flex-col" style="gap:16px">
        <div class="card2">
          <div class="card-head">Profil Merchant</div>
          <div class="card-body">
            <div class="info-row mb-12"><span class="lbl">Pemilik</span><span class="val">${m.owner}</span></div>
            <div class="info-row mb-12"><span class="lbl">Kontak</span><span class="val">${m.email} / ${m.phone}</span></div>
            <div class="info-row mb-12"><span class="lbl">Jenis</span><span class="val"><span class="badge badge-blu">${m.category}</span></span></div>
            <div class="info-row mb-12"><span class="lbl">Deskripsi</span><span class="val">${m.description}</span></div>
            <div class="info-row"><span class="lbl">Alamat</span><span class="val">${m.address}</span></div>
          </div>
        </div>

        <div class="card2">
          <div class="card-head">Keputusan</div>
          <div class="card-body">
            <p style="font-size:13px;color:var(--sub);margin-bottom:16px">Tinjau dokumen di samping sebelum mengambil keputusan.</p>
            <div style="display:flex;gap:12px">
              <button class="btn btn-grn" style="flex:1" onclick="verifAction('${merchantId}', 'approve')">Setujui</button>
              <button class="btn btn-red" style="flex:1" onclick="verifAction('${merchantId}', 'reject')">Tolak</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sisi Kanan: Dokumen Legal -->
      <div class="flex-col" style="gap:16px">
        <div class="card2">
          <div class="card-head">Izin Usaha</div>
          <div class="card-body">
            <div class="info-row mb-12"><span class="lbl">Jenis</span><span class="val">${m.license_type}</span></div>
            <div class="info-row mb-12"><span class="lbl">Nomor</span><span class="val"><code>${m.license_no}</code></span></div>
            <div style="background:var(--bg2);padding:20px;border-radius:8px;text-align:center;border:2px dashed var(--brd)">
              <span style="font-size:32px">📄</span>
              <div style="font-size:12px;margin:8px 0">izin_usaha.pdf</div>
              <button class="btn btn-sm btn-out" onclick="alert('Buka preview PDF')">Lihat File</button>
            </div>
          </div>
        </div>

        <div class="card2">
          <div class="card-head">Sertifikasi Halal</div>
          <div class="card-body">
            <div class="info-row mb-12"><span class="lbl">Status</span><span class="val">${m.halal_status}</span></div>
            <div class="info-row mb-12"><span class="lbl">Nomor</span><span class="val">${m.halal_no}</span></div>
            <div style="background:var(--bg2);padding:20px;border-radius:8px;text-align:center;border:2px dashed var(--brd)">
              <span style="font-size:32px">📜</span>
              <div style="font-size:12px;margin:8px 0">sertifikat_halal.jpg</div>
              <button class="btn btn-sm btn-out" onclick="alert('Buka preview Gambar')">Lihat File</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}