
let APP = { role: 'merchant', page: 'dashboard' };

const MENUS = {
  merchant: [
    { section: 'Overview' },
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { section: 'Menu Surplus' },
    { id: 'add-listing', icon: '➕', label: 'Tambah Listing' },
    { id: 'listings', icon: '🍱', label: 'Kelola Listing' },
    { section: 'Pesanan' },
    { id: 'orders', icon: '🛒', label: 'Pesanan Masuk', badge: '3', badgeClass: 'grn' },
    { id: 'history', icon: '📋', label: 'Riwayat Pesanan' },
    { section: 'Akun' },
    { id: 'profile', icon: '🏪', label: 'Profil Usaha' },
    { id: 'verif-status', icon: '✅', label: 'Status Verifikasi' },
  ],
  admin: [
    { section: 'Overview' },
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'analytics', icon: '📈', label: 'Analitik' },
    { section: 'Manajemen' },
    { id: 'users', icon: '👥', label: 'Kelola Pengguna' },
    { id: 'admin-merchants', icon: '🏪', label: 'Kelola Merchant' },
    { id: 'admin-listings', icon: '🍱', label: 'Kelola Listing' },
    { id: 'admin-orders', icon: '🛒', label: 'Kelola Pesanan' },
    { section: 'Verifikasi' },
    { id: 'verifikasi', icon: '✅', label: 'Verifikasi Merchant', badge: '5' },
    { id: 'laporan', icon: '🚨', label: 'Laporan Pelanggaran', badge: '2' },
  ]
};

const TOPBAR = {
  merchant: {
    dashboard: ['Dashboard', 'Ringkasan aktivitas usaha Anda'],
    'add-listing': ['Tambah Listing', 'Daftarkan makanan surplus baru'],
    listings: ['Kelola Listing', 'Kelola menu surplus Anda'],
    orders: ['Pesanan Masuk', 'Pesanan yang perlu dikonfirmasi'],
    history: ['Riwayat Pesanan', 'Semua transaksi yang telah selesai'],
    profile: ['Profil Usaha', 'Informasi lengkap usaha Anda'],
    'verif-status': ['Status Verifikasi', 'Status pendaftaran mitra merchant'],
  },
  admin: {
    dashboard: ['Dashboard Admin', 'Ikhtisar platform EcoEats'],
    analytics: ['Analitik', 'Data dan tren platform'],
    users: ['Kelola Pengguna', 'Manajemen akun pengguna'],
    'admin-merchants': ['Kelola Merchant', 'Daftar seluruh merchant terdaftar'],
    'admin-listings': ['Kelola Listing', 'Pantau semua listing aktif'],
    'admin-orders': ['Kelola Pesanan', 'Monitor semua transaksi'],
    verifikasi: ['Verifikasi Merchant', 'Tinjau pengajuan merchant baru'],
    laporan: ['Laporan Pelanggaran', 'Tinjau laporan pengguna'],
  }
};

function switchRole(role, btn) {
  APP.role = role;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('auth-merchant').classList.toggle('hide', role !== 'merchant');
  document.getElementById('auth-admin').classList.toggle('hide', role !== 'admin');
  const card = document.getElementById('auth-card');
  card.style.transform = 'scale(.985)';
  setTimeout(() => { card.style.transform = 'scale(1)'; }, 150);
}

function doLogin(role) {
  APP.role = role;
  document.getElementById('page-auth').classList.add('hide');
  document.getElementById('page-app').classList.remove('hide');
  buildSidebar();
  navigate('dashboard');
}

function logout() {
  document.getElementById('page-app').classList.add('hide');
  document.getElementById('page-auth').classList.remove('hide');
}

function buildSidebar() {
  const nav = document.getElementById('sb-nav');
  const items = MENUS[APP.role];
  let html = '';
  items.forEach(item => {
    if (item.section) {
      html += `<div class="sb-section">${item.section}</div>`;
    } else {
      const badge = item.badge ? `<span class="sb-badge ${item.badgeClass||''}">${item.badge}</span>` : '';
      html += `<button class="sb-item" id="nav-${item.id}" onclick="navigate('${item.id}')">
        <span class="sb-item-icon">${item.icon}</span>
        <span>${item.label}</span>${badge}
      </button>`;
    }
  });
  nav.innerHTML = html;
  document.getElementById('sb-role-label').textContent = APP.role === 'merchant' ? 'Mitra Merchant' : 'Administrator';
  document.getElementById('topbar-avatar').textContent = APP.role === 'merchant' ? '🏪' : '🛠';
}

function navigate(page) {
  APP.page = page;

  document.querySelectorAll('.sb-item').forEach(el => el.classList.remove('active'));
  const navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');

  const tb = TOPBAR[APP.role][page] || ['EcoEats', ''];
  document.getElementById('topbar-title').textContent = tb[0];
  document.getElementById('topbar-sub').textContent = tb[1];
  const action = document.getElementById('topbar-action');
  if (page === 'listings' || page === 'admin-listings') {
    action.textContent = '➕ Tambah Listing';
    action.classList.remove('hide');
  } else if (page === 'users') {
    action.textContent = '📥 Export CSV';
    action.classList.remove('hide');
  } else {
    action.classList.add('hide');
  }
  const scroll = document.getElementById('main-scroll');
  scroll.className = 'main-scroll fade-in';
  void scroll.offsetWidth;
  scroll.innerHTML = render(page);
  bindEvents(page);
}

function topbarAction() {
  if (APP.page === 'listings' || APP.page === 'admin-listings') navigate('add-listing');
  else alert('Data berhasil diexport ke CSV!');
}

function render(page) {
  const map = {
    'dashboard': APP.role === 'merchant' ? renderMerchantDashboard : renderAdminDashboard,
    'add-listing': renderAddListing,
    'listings': renderListings,
    'orders': renderOrders,
    'history': renderHistory,
    'profile': renderProfile,
    'verif-status': renderVerifStatus,
    'verifikasi': renderVerifikasi,
    'users': renderUsers,
    'admin-merchants': renderMerchants,
    'admin-listings': renderAdminListings,
    'admin-orders': renderAdminOrders,
    'laporan': renderLaporan,
    'analytics': renderAnalytics,
  };
  return (map[page] || (() => `<p style="color:var(--sub)">Halaman belum tersedia.</p>`))();
}

function bindEvents(page) {
  // Inner tabs
  document.querySelectorAll('[data-tab]').forEach(tab => {
    tab.addEventListener('click', function() {
      const group = this.dataset.group;
      document.querySelectorAll(`[data-tab][data-group="${group}"]`).forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll(`[data-panel][data-group="${group}"]`).forEach(p => p.classList.add('hide'));
      const panel = document.getElementById('tab-' + this.dataset.tab);
      if (panel) panel.classList.remove('hide');
    });
  });
  
  // Photo upload handler for add-listing page
  if (page === 'add-listing') {
    const photoInput = document.getElementById('listing-photo');
    if (photoInput) {
      photoInput.addEventListener('change', handlePhotoUpload);
    }
  }
}

function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  if (file.size > 5 * 1024 * 1024) {
    alert('File terlalu besar! Maksimal 5MB.');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const preview = document.getElementById('photo-preview');
    preview.innerHTML = `<img src="${e.target.result}" style="width:100%;max-height:300px;border-radius:8px;object-fit:cover">`;
    preview.style.display = 'block';
    
    const box = document.getElementById('photo-box');
    box.style.background = '#F5EBE0';
    box.style.borderColor = '#E8D5C4';
  };
  reader.readAsDataURL(file);
}

function saveListing() {
  const name = document.getElementById('listing-name').value.trim();
  const category = document.getElementById('listing-category').value;
  const origPrice = document.getElementById('listing-orig-price').value;
  const discPrice = document.getElementById('listing-disc-price').value;
  const stock = document.getElementById('listing-stock').value;
  const time = document.getElementById('listing-time').value;
  const desc = document.getElementById('listing-desc').value.trim();
  const hasPhoto = document.getElementById('listing-photo').files.length > 0;
  
  if (!name || !origPrice || !discPrice || !stock) {
    alert('⚠️ Lengkapi semua field yang diperlukan!');
    return;
  }
  
  if (parseFloat(discPrice) >= parseFloat(origPrice)) {
    alert('⚠️ Harga jual harus lebih murah dari harga asli!');
    return;
  }
  
  const discount = Math.round(((origPrice - discPrice) / origPrice) * 100);
  if (discount < 30) {
    alert('⚠️ Diskon minimal 30% dari harga asli!');
    return;
  }
  
  if (!hasPhoto) {
    alert('⚠️ Silakan upload foto produk!');
    return;
  }
  
  alert(`✅ Listing berhasil dipublikasikan! 🎉\n\n${name}\n${category} · Diskon ${discount}%\n${hasPhoto ? '📷 Foto berhasil diupload' : ''}`);
  navigate('listings');
}

function renderMerchantDashboard() {
  const chartData = [45, 60, 38, 80, 55, 75, 92];
  const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const bars = chartData.map((v, i) => `<div class="chart-bar ${v >= 80 ? 'hi' : 'lo'}" style="height:${v}%;title='${days[i]}: ${Math.round(v*3.4)} pesanan'"></div>`).join('');
  const labels = days.map(d => `<span>${d}</span>`).join('');

  return `
  <div class="alert alert-org mb-16">⚠️ <strong>3 pesanan baru</strong> menunggu konfirmasi — <a href="#" onclick="navigate('orders');return false;" style="color:inherit;font-weight:600">Lihat sekarang →</a></div>

  <div class="grid-4 mb-20">
    <div class="stat-card" style="border-top-color:var(--grn)">
      <div class="st-label">🍱 Listing Aktif</div>
      <div class="st-val">7</div>
      <div class="st-delta d-grn">↑ 2 minggu ini</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--blu)">
      <div class="st-label">🛒 Pesanan Bulan Ini</div>
      <div class="st-val">84</div>
      <div class="st-delta d-grn">↑ 12% vs bulan lalu</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--btn)">
      <div class="st-label">💰 Pendapatan</div>
      <div class="st-val" style="font-size:20px">Rp 2,4jt</div>
      <div class="st-delta d-org">Bulan Mei 2025</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--grn)">
      <div class="st-label">♻️ Food Waste Dicegah</div>
      <div class="st-val">112 kg</div>
      <div class="st-delta d-grn">🌱 Dampak positif</div>
    </div>
  </div>

  <div class="grid-2 mb-20">
    <div class="card2">
      <div class="card-head">🛒 Pesanan Masuk <span class="badge badge-org">3 Pending</span></div>
      <div class="card-body" style="padding:0">
        ${[
          ['#ECO7821','Rizky Pratama','Nasi Kotak ×2','Rp 20.000','10 mnt lalu','14 mnt'],
          ['#ECO7820','Sari Dewi','Es Teh ×3','Rp 12.000','25 mnt lalu','~1 jam'],
          ['#ECO7819','Budi Santoso','Roti Isi ×5','Rp 25.000','1 jam lalu','~30 mnt'],
        ].map(([id, buyer, item, total, time, exp]) => `
        <div style="padding:12px 16px;border-bottom:1px solid #F0EBE0">
          <div class="flex-between mb-12">
            <div>
              <span class="mono" style="font-size:11px;color:var(--blu)">${id}</span>
              <div style="font-weight:600;font-size:13px;color:var(--lbl)">${buyer}</div>
              <div style="font-size:12px;color:var(--sub)">${item} · ${total}</div>
            </div>
            <div style="text-align:right">
              <div style="font-size:11px;color:var(--sub)">${time}</div>
              <span class="badge badge-org" style="font-size:10px">⏱ ${exp}</span>
            </div>
          </div>
          <div style="display:flex;gap:7px">
            <button class="btn btn-grn btn-sm" onclick="alert('Pesanan ${id} dikonfirmasi!')">✓ Konfirmasi</button>
            <button class="btn btn-red btn-sm" onclick="alert('Pesanan ${id} ditolak.')">✕ Tolak</button>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <div class="card2">
      <div class="card-head">📊 Penjualan 7 Hari</div>
      <div class="card-body">
        <div class="chart-wrap">${bars}</div>
        <div class="chart-labels">${labels}</div>
        <div style="margin-top:16px">
          ${[
            ['Nasi Kotak Ayam Geprek', 78],
            ['Es Teh Manis Jumbo', 62],
            ['Nasi Goreng Spesial', 45],
            ['Boba Brown Sugar', 38],
          ].map(([name, pct]) => `
          <div style="margin-bottom:10px">
            <div class="flex-between text-sm mb-12" style="margin-bottom:4px"><span>${name}</span><span style="color:var(--sub)">${pct}%</span></div>
            <div class="prog-wrap"><div class="prog-fill" style="width:${pct}%"></div></div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <div class="card2">
    <div class="card-head">🍱 Listing Aktif Terbaru</div>
    <table class="tbl">
      <thead><tr><th>Nama</th><th>Kategori</th><th>Harga Asli</th><th>Harga Jual</th><th>Stok</th><th>Tutup</th><th>Status</th></tr></thead>
      <tbody>
        ${[
          ['🍱 Nasi Kotak Ayam Geprek','Nasi & Lauk','Rp 25.000','Rp 10.000','8','20:00','available'],
          ['☕ Es Teh Manis Jumbo','Minuman','Rp 8.000','Rp 4.000','15','21:00','available'],
          ['🥐 Roti Isi Coklat','Roti & Kue','Rp 12.000','Rp 5.000','0','19:00','sold_out'],
          ['🍜 Nasi Goreng Spesial','Nasi & Lauk','Rp 22.000','Rp 15.000','3','20:30','available'],
          ['🧋 Boba Brown Sugar','Minuman','Rp 18.000','Rp 8.000','5','21:30','available'],
        ].map(([name, cat, orig, disc, stock, time, status]) => `
        <tr>
          <td style="font-weight:600">${name}</td>
          <td style="color:var(--sub)">${cat}</td>
          <td style="text-decoration:line-through;color:var(--sub)">${orig}</td>
          <td style="color:var(--grn);font-weight:600">${disc}</td>
          <td>${stock == 0 ? '<span style="color:var(--red)">Habis</span>' : stock <= 3 ? `<span style="color:var(--org)">${stock}</span>` : stock}</td>
          <td class="mono" style="font-size:12px">${time}</td>
          <td>${status === 'available' ? '<span class="badge badge-grn">Aktif</span>' : '<span class="badge badge-red">Habis</span>'}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

function renderAddListing() {
  return `
  <div style="max-width:680px;margin:0 auto">
    <div class="card2">
      <div class="card-head">➕ Tambah Listing Baru</div>
      <div class="card-body">
        <div class="alert alert-grn mb-16">✅ Pastikan harga jual minimal 30% lebih murah dari harga asli untuk menarik pembeli.</div>
        <div class="form-row mb-12">
          <div class="form-group">
            <label class="form-label">Nama Menu</label>
            <input class="form-input" id="listing-name" placeholder="Contoh: Nasi Kotak Ayam Geprek">
          </div>
          <div class="form-group">
            <label class="form-label">Kategori</label>
            <select class="form-select" id="listing-category">
              <option>Nasi & Lauk</option><option>Minuman</option><option>Roti & Kue</option><option>Camilan</option><option>Lainnya</option>
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
          <textarea class="form-textarea" id="listing-desc" placeholder="Jelaskan kondisi makanan, komposisi, atau info penting lainnya..."></textarea>
        </div>
        <div class="form-group" style="margin-bottom:20px">
          <label class="form-label">📷 Foto Produk</label>
          <input type="file" id="listing-photo" accept="image/*" style="display:none">
          <div class="upload-box" id="photo-box" onclick="document.getElementById('listing-photo').click()" style="cursor:pointer;position:relative">
            📷 Klik untuk upload foto<br><span style="font-size:11px;margin-top:4px;display:block">JPG, PNG maks. 5MB</span>
            <div id="photo-preview" style="margin-top:12px;display:none"></div>
          </div>
        </div>
        <div style="display:flex;gap:10px;justify-content:flex-end">
          <button class="btn btn-out" onclick="navigate('listings')">Batal</button>
          <button class="btn btn-grn" onclick="saveListing()">✓ Publikasikan Listing</button>
        </div>
      </div>
    </div>
  </div>`;
}

function renderListings() {
  const listings = [
    { id:1, emoji:'🍱', photo:'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23E8F5E0%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2280%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E🍱%3C/text%3E%3C/svg%3E', name:'Nasi Kotak Ayam Geprek', cat:'Nasi & Lauk', orig:25000, disc:10000, stock:8, time:'20:00', status:'available' },
    { id:2, emoji:'☕', photo:'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23E3F2FD%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2280%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E☕%3C/text%3E%3C/svg%3E', name:'Es Teh Manis Jumbo', cat:'Minuman', orig:8000, disc:4000, stock:15, time:'21:00', status:'available' },
    { id:3, emoji:'🥐', photo:'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23FFF3E0%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2280%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E🥐%3C/text%3E%3C/svg%3E', name:'Roti Isi Coklat', cat:'Roti & Kue', orig:12000, disc:5000, stock:0, time:'19:00', status:'sold_out' },
    { id:4, emoji:'🍜', photo:'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23FCE4EC%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2280%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E🍜%3C/text%3E%3C/svg%3E', name:'Nasi Goreng Spesial', cat:'Nasi & Lauk', orig:22000, disc:15000, stock:3, time:'20:30', status:'available' },
    { id:5, emoji:'🧋', photo:'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23F3E5F5%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2280%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E🧋%3C/text%3E%3C/svg%3E', name:'Boba Brown Sugar', cat:'Minuman', orig:18000, disc:8000, stock:5, time:'21:30', status:'available' },
  ];
  const f = n => 'Rp ' + n.toLocaleString('id-ID');
  return `
  <div class="flex-row mb-20">
    <div class="search-wrap"><input placeholder="Cari listing..."></div>
    <select class="form-select" style="width:auto">
      <option>Semua Kategori</option><option>Nasi & Lauk</option><option>Minuman</option><option>Roti & Kue</option>
    </select>
    <button class="btn btn-grn" onclick="navigate('add-listing')">➕ Tambah Listing</button>
  </div>
  <div class="grid-3">
    ${listings.map(l => `
    <div class="listing-card" style="${l.status === 'sold_out' ? 'opacity:.65' : ''}">
      <div class="listing-img" style="background:url('${l.photo}');background-size:cover;background-position:center;min-height:160px"></div>
      <div class="listing-body">
        <div style="font-weight:600;margin-bottom:3px">${l.name}</div>
        <div style="font-size:11px;color:var(--sub);margin-bottom:8px">${l.cat}</div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <span style="font-weight:700;color:var(--grn)">${f(l.disc)}</span>
          <span style="font-size:11px;text-decoration:line-through;color:var(--sub)">${f(l.orig)}</span>
        </div>
        <div style="font-size:11px;color:var(--sub);display:flex;gap:10px">
          <span>📦 ${l.stock === 0 ? '<span style="color:var(--red)">Habis</span>' : l.stock <= 3 ? `<span style="color:var(--org)">${l.stock} tersisa</span>` : l.stock + ' pcs'}</span>
          <span>⏰ ${l.time}</span>
        </div>
        <div style="margin-top:8px">
          ${l.status === 'sold_out' ? '<span class="badge badge-red">Habis Terjual</span>' : l.stock <= 3 ? '<span class="badge badge-org">Stok Menipis</span>' : '<span class="badge badge-grn">Aktif</span>'}
        </div>
      </div>
      <div class="listing-footer">
        <button class="btn btn-out btn-sm" onclick="alert('Edit listing ${l.id}')">✎ Edit</button>
        <button class="btn btn-red btn-sm" onclick="if(confirm('Hapus listing ini?'))alert('Listing dihapus.')">🗑 Hapus</button>
      </div>
    </div>`).join('')}
  </div>`;
}

function renderOrders() {
  return `
  <div class="inner-tabs">
    <button class="inner-tab active" data-tab="pending" data-group="orders">Pending <span class="badge badge-org" style="margin-left:4px">3</span></button>
    <button class="inner-tab" data-tab="confirmed" data-group="orders">Dikonfirmasi <span class="badge badge-blu" style="margin-left:4px">5</span></button>
    <button class="inner-tab" data-tab="ready" data-group="orders">Siap Diambil <span class="badge badge-grn" style="margin-left:4px">2</span></button>
    <button class="inner-tab" data-tab="done" data-group="orders">Selesai <span class="badge badge-gray" style="margin-left:4px">74</span></button>
    <button class="inner-tab" data-tab="rejected" data-group="orders">Ditolak <span class="badge badge-red" style="margin-left:4px">2</span></button>
  </div>

  <div id="tab-pending" data-panel data-group="orders">
    <div class="card2">
      <table class="tbl">
        <thead><tr><th>Kode Pickup</th><th>Pembeli</th><th>Item</th><th>Total</th><th>Waktu</th><th>Kadaluarsa</th><th>Aksi</th></tr></thead>
        <tbody>
          ${[
            ['ECO7821','Rizky Pratama','Nasi Kotak ×2','Rp 20.000','10 mnt lalu','14 mnt'],
            ['ECO7820','Sari Dewi','Es Teh ×3','Rp 12.000','25 mnt lalu','~1 jam'],
            ['ECO7819','Budi Santoso','Roti Isi ×5','Rp 25.000','1 jam lalu','~30 mnt'],
          ].map(([id, buyer, item, total, time, exp]) => `
          <tr>
            <td><span class="mono" style="color:var(--blu);font-size:12px">#${id}</span></td>
            <td style="font-weight:500">${buyer}</td>
            <td>${item}</td>
            <td style="font-weight:600;color:var(--grn)">${total}</td>
            <td style="color:var(--sub);font-size:12px">${time}</td>
            <td><span class="badge badge-org">⏱ ${exp}</span></td>
            <td><div style="display:flex;gap:5px">
              <button class="btn btn-grn btn-sm" onclick="alert('#${id} dikonfirmasi!')">✓</button>
              <button class="btn btn-red btn-sm" onclick="alert('#${id} ditolak.')">✕</button>
            </div></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <div id="tab-confirmed" class="hide" data-panel data-group="orders">
    <div class="card2"><div class="card-body" style="text-align:center;color:var(--sub);padding:32px">
      <div style="font-size:32px;margin-bottom:8px">✅</div>
      <div style="font-weight:600;color:var(--lbl)">5 Pesanan Dikonfirmasi</div>
      <div style="font-size:12px;margin-top:4px">Menunggu pembeli datang untuk pickup</div>
    </div></div>
  </div>

  <div id="tab-ready" class="hide" data-panel data-group="orders">
    <div class="card2"><div class="card-body" style="text-align:center;color:var(--sub);padding:32px">
      <div style="font-size:32px;margin-bottom:8px">🛍️</div>
      <div style="font-weight:600;color:var(--lbl)">2 Pesanan Siap Diambil</div>
      <div style="font-size:12px;margin-top:4px">Mohon siapkan pesanan di meja pickup</div>
    </div></div>
  </div>

  <div id="tab-done" class="hide" data-panel data-group="orders">
    <div class="card2"><div class="card-body" style="text-align:center;color:var(--sub);padding:32px">
      <div style="font-size:32px;margin-bottom:8px">🎉</div>
      <div style="font-weight:600;color:var(--lbl)">74 Pesanan Selesai</div>
      <div style="font-size:12px;margin-top:4px">Bulan Mei 2025</div>
    </div></div>
  </div>

  <div id="tab-rejected" class="hide" data-panel data-group="orders">
    <div class="card2"><div class="card-body" style="text-align:center;color:var(--sub);padding:32px">
      <div style="font-size:32px;margin-bottom:8px">❌</div>
      <div style="font-weight:600;color:var(--lbl)">2 Pesanan Ditolak</div>
      <div style="font-size:12px;margin-top:4px">Terakhir: Budi Santoso — 2 hari lalu</div>
    </div></div>
  </div>`;
}

function renderHistory() {
  return `
  <div class="flex-row mb-20">
    <div class="search-wrap"><input placeholder="Cari riwayat pesanan..."></div>
    <select class="form-select" style="width:auto">
      <option>Semua Status</option><option>Selesai</option><option>Ditolak</option>
    </select>
    <input type="date" class="form-input" style="width:auto" value="2025-05-22">
  </div>
  <div class="card2">
    <table class="tbl">
      <thead><tr><th>Kode</th><th>Pembeli</th><th>Item</th><th>Total</th><th>Pembayaran</th><th>Status</th><th>Tanggal</th></tr></thead>
      <tbody>
        ${[
          ['#ECO7800','Rizky Pratama','Nasi Kotak ×2','Rp 20.000','QRIS','selesai','20 Mei 2025'],
          ['#ECO7795','Sari Dewi','Es Teh ×4','Rp 16.000','Transfer','selesai','19 Mei 2025'],
          ['#ECO7790','Dewi Rahayu','Boba Brown Sugar ×1','Rp 8.000','QRIS','selesai','18 Mei 2025'],
          ['#ECO7785','Eko Wibowo','Nasi Goreng ×2','Rp 30.000','Transfer','ditolak','17 Mei 2025'],
          ['#ECO7780','Budi Santoso','Roti Isi ×3','Rp 15.000','QRIS','selesai','16 Mei 2025'],
        ].map(([id, buyer, item, total, pay, status, date]) => `
        <tr>
          <td><span class="mono" style="font-size:11px;color:var(--blu)">${id}</span></td>
          <td style="font-weight:500">${buyer}</td>
          <td style="color:var(--sub)">${item}</td>
          <td style="font-weight:600">${total}</td>
          <td style="color:var(--sub);font-size:12px">${pay}</td>
          <td>${status === 'selesai' ? '<span class="badge badge-grn">Selesai</span>' : '<span class="badge badge-red">Ditolak</span>'}</td>
          <td style="font-size:12px;color:var(--sub)">${date}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

function renderProfile() {
  return `
  <div class="grid-2">
    <div>
      <div class="card2 mb-16">
        <div class="card-body" style="text-align:center;padding-top:24px">
          <div class="merchant-avatar">🏪</div>
          <div style="font-family:'Playfair Display',serif;font-size:20px;color:var(--lbl)">Warung Bu Sari</div>
          <div style="margin:6px 0"><span class="badge badge-grn">✅ Terverifikasi</span></div>
          <div style="font-size:12px;color:var(--sub)">Bergabung sejak 10 Mei 2025</div>
        </div>
        <div style="padding:0 18px 18px">
          ${[
            ['🏷️','Jenis Usaha','Warung Makan'],
            ['📍','Alamat','Jl. Slamet Riyadi No. 12, Solo'],
            ['📞','Telepon','+62 812-3456-7890'],
            ['✉️','Email','bsari@email.com'],
          ].map(([icon, label, val]) => `
          <div class="info-row">
            <span class="info-icon">${icon}</span>
            <span class="info-label">${label}</span>
            <span class="info-val">${val}</span>
          </div>`).join('')}
        </div>
        <div style="padding:0 18px 18px">
          <button class="btn btn-brn" style="width:100%;justify-content:center">✎ Edit Profil</button>
        </div>
      </div>
    </div>
    <div>
      <div class="card2 mb-16">
        <div class="card-head">🌱 Dampak Lingkungan</div>
        <div class="card-body">
          <div class="grid-2">
            ${[
              ['112 kg','Makanan diselamatkan','🥗'],
              ['4.8 ⭐','Rating pelanggan','💬'],
              ['84','Pesanan bulan ini','📦'],
              ['Rp 2,4jt','Pendapatan bulan ini','💰'],
            ].map(([val, label, icon]) => `
            <div style="text-align:center;padding:16px;background:var(--inp);border-radius:10px">
              <div style="font-size:20px;margin-bottom:4px">${icon}</div>
              <div class="impact-num" style="font-size:22px">${val}</div>
              <div style="font-size:11px;color:var(--sub);margin-top:4px">${label}</div>
            </div>`).join('')}
          </div>
        </div>
      </div>
      <div class="card2">
        <div class="card-head">📍 Lokasi Usaha</div>
        <div class="card-body">
          <div class="map-placeholder">
            <div style="font-size:28px">🗺️</div>
            <div>Jl. Slamet Riyadi No. 12, Solo</div>
            <div style="font-size:11px;color:var(--sub)">-7.5695, 110.8272</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function renderVerifStatus() {
  return `
  <div style="max-width:600px;margin:0 auto">
    <div class="card2 mb-16" style="border-left:4px solid var(--org)">
      <div class="card-head" style="color:var(--org)">⏳ Status: Menunggu Verifikasi</div>
      <div class="card-body">
        <div class="mb-16">
          ${[
            ['g','Dokumen diunggah','Semua dokumen telah kami terima'],
            ['g','Validasi awal','Dokumen lolos filter otomatis'],
            ['o','Tinjauan admin','Sedang diproses tim EcoEats'],
            ['x','Keputusan','Menunggu persetujuan akhir'],
          ].map(([type, title, sub]) => `
          <div class="tl-item">
            <div class="tl-dot ${type}"></div>
            <div><div class="tl-title">${title}</div><div class="tl-sub">${sub}</div></div>
          </div>`).join('')}
        </div>
        <div class="alert alert-org">⚠️ Proses verifikasi biasanya 2–5 hari kerja. Anda akan mendapat notifikasi via email.</div>
      </div>
    </div>
    <div class="card2 mb-16" style="border-left:4px solid var(--grn)">
      <div class="card-head" style="color:var(--grn)">✅ Jika Disetujui</div>
      <div class="card-body">
        <div class="alert alert-grn mb-16">🎉 Selamat! Akun merchant Anda telah diverifikasi. Anda dapat mulai menambahkan listing.</div>
        <button class="btn btn-grn" onclick="navigate('add-listing')">➕ Mulai Tambah Listing</button>
      </div>
    </div>
    <div class="card2" style="border-left:4px solid var(--red)">
      <div class="card-head" style="color:var(--red)">❌ Jika Ditolak</div>
      <div class="card-body">
        <div class="alert alert-red mb-16">📋 Pengajuan Anda ditolak karena: Dokumen SIUP tidak terbaca dengan jelas. Silakan upload ulang.</div>
        <div style="font-size:12px;color:var(--sub);margin-bottom:16px">Percobaan: 1 dari 3 pengajuan</div>
        <div style="display:flex;gap:10px">
          <button class="btn btn-brn" onclick="alert('Silakan upload dokumen yang lebih jelas.')">📤 Upload Ulang Dokumen</button>
          <button class="btn btn-out" onclick="alert('Tim EcoEats akan menghubungi Anda dalam 1x24 jam.')">💬 Hubungi Support</button>
        </div>
      </div>
    </div>
  </div>`;
}

function renderAdminDashboard() {
  const chartData = [180, 220, 165, 310, 205, 280, 340];
  const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const maxV = Math.max(...chartData);
  const bars = chartData.map((v, i) => `<div class="chart-bar ${v >= maxV*.8 ? 'hi' : 'lo'}" style="height:${Math.round(v/maxV*100)}%"></div>`).join('');
  const labels = days.map(d => `<span>${d}</span>`).join('');

  return `
  <div class="grid-4 mb-20">
    <div class="stat-card" style="border-top-color:var(--blu)">
      <div class="st-label">👥 Total Pengguna</div>
      <div class="st-val">2.841</div>
      <div class="st-delta d-grn">↑ 148 bulan ini</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--grn)">
      <div class="st-label">🏪 Merchant Terverifikasi</div>
      <div class="st-val">148</div>
      <div class="st-delta d-grn">↑ 12 baru</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--btn)">
      <div class="st-label">🍱 Listing Aktif</div>
      <div class="st-val">312</div>
      <div class="st-delta d-org">+24 hari ini</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--red)">
      <div class="st-label">⏳ Menunggu Verifikasi</div>
      <div class="st-val" style="color:var(--red)">5</div>
      <div class="st-delta d-red">Perlu ditinjau</div>
    </div>
  </div>

  <div class="grid-2 mb-20">
    <div class="card2">
      <div class="card-head">📊 Pesanan 7 Hari Terakhir</div>
      <div class="card-body">
        <div class="chart-wrap" style="height:120px">${bars}</div>
        <div class="chart-labels">${labels}</div>
        <div style="margin-top:12px;font-size:12px;color:var(--sub)">Total: 1.700 pesanan minggu ini · Naik 18% vs minggu lalu</div>
      </div>
    </div>
    <div class="card2">
      <div class="card-head">✅ Antrian Verifikasi <span class="badge badge-org">5</span></div>
      <div class="card-body" style="padding:0">
        ${[
          ['🍜','Warung Bu Sari','Warung Makan','2 jam lalu'],
          ['☕','Kafe Semangat Solo','Kafe','5 jam lalu'],
          ['🥐','Toko Roti Harum','Toko Roti','1 hari lalu'],
        ].map(([icon, name, type, time]) => `
        <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid #F0EBE0">
          <div style="width:34px;height:34px;background:var(--inp);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">${icon}</div>
          <div style="flex:1">
            <div style="font-weight:600;font-size:13px">${name}</div>
            <div style="font-size:11px;color:var(--sub)">${type} · ${time}</div>
          </div>
          <span class="badge badge-org">Pending</span>
        </div>`).join('')}
        <div style="padding:12px 16px">
          <button class="btn btn-brn btn-sm" style="width:100%;justify-content:center" onclick="navigate('verifikasi')">Lihat Semua Antrian →</button>
        </div>
      </div>
    </div>
  </div>

  <div class="grid-2">
    <div class="card2">
      <div class="card-head">🌱 Dampak Lingkungan Platform</div>
      <div class="card-body">
        <div class="grid-2">
          ${[
            ['4.280 kg','Makanan diselamatkan','♻️'],
            ['8.640 liter','Air dihemat','💧'],
            ['12,4 ton','CO₂ dikurangi','🌍'],
            ['21.400+','Porsi dinikmati','🍽️'],
          ].map(([val, label, icon]) => `
          <div style="padding:14px;background:var(--inp);border-radius:10px;text-align:center">
            <div style="font-size:22px;margin-bottom:4px">${icon}</div>
            <div class="impact-num" style="font-size:18px">${val}</div>
            <div style="font-size:10px;color:var(--sub);margin-top:2px">${label}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="card2">
      <div class="card-head">🚨 Laporan Pelanggaran <span class="badge badge-red">2</span></div>
      <div class="card-body">
        <div class="alert alert-red mb-16">⚠️ Ada 2 laporan yang memerlukan tindakan segera.</div>
        <div style="padding:12px;background:var(--inp);border-radius:8px;margin-bottom:10px;font-size:13px">
          <div style="font-weight:600;margin-bottom:4px">Listing "Nasi Kotak Murah"</div>
          <div style="color:var(--sub);font-size:12px">3 laporan · Foto tidak sesuai produk</div>
        </div>
        <div style="padding:12px;background:var(--inp);border-radius:8px;font-size:13px">
          <div style="font-weight:600;margin-bottom:4px">Merchant "Warung ABC"</div>
          <div style="color:var(--sub);font-size:12px">1 laporan · Makanan tidak layak konsumsi</div>
        </div>
        <button class="btn btn-red btn-sm mt-16" onclick="navigate('laporan')" style="margin-top:12px">Tinjau Laporan →</button>
      </div>
    </div>
  </div>`;
}

function renderVerifikasi() {
  const merchants = [
    {icon:'🍜', name:'Warung Bu Sari', type:'Warung Makan', addr:'Jl. Slamet Riyadi', time:'2 jam lalu'},
    {icon:'☕', name:'Kafe Semangat Solo', type:'Kafe', addr:'Jl. Merdeka', time:'5 jam lalu'},
    {icon:'🥐', name:'Toko Roti Harum', type:'Toko Roti', addr:'Jl. Ahmad Yani', time:'1 hari lalu'},
    {icon:'🍰', name:'Bakery Manis Solo', type:'Toko Kue', addr:'Jl. Diponegoro', time:'2 hari lalu'},
    {icon:'🍛', name:'Warung Pak Joko', type:'Warung Nasi', addr:'Jl. Gajah Mada', time:'2 hari lalu'},
  ];
  return `
  <div class="flex-row mb-20">
    <div class="search-wrap"><input placeholder="Cari merchant..."></div>
    <select class="form-select" style="width:auto">
      <option>Semua Status</option><option>Pending</option><option>Disetujui</option><option>Ditolak</option>
    </select>
  </div>
  ${merchants.map((m, i) => `
  <div class="verif-card" id="vcard-${i}">
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px">
      <div style="width:44px;height:44px;border-radius:10px;background:linear-gradient(135deg,#E8F5E0,#D0EAC8);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${m.icon}</div>
      <div style="flex:1">
        <div style="font-weight:700;font-size:15px;color:var(--lbl)">${m.name}</div>
        <div style="font-size:12px;color:var(--sub)">${m.type} · ${m.addr} · ${m.time}</div>
      </div>
      <span class="badge badge-org">Pending</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
      <div style="background:var(--inp);border-radius:8px;padding:14px;text-align:center;cursor:pointer" onclick="alert('Preview dokumen SIUP ${m.name}')">
        <div style="font-size:24px;margin-bottom:4px">📄</div>
        <div style="font-size:11px;font-weight:600">SIUP</div>
        <div style="font-size:10px;color:var(--sub)">Surat Izin Usaha</div>
      </div>
      <div style="background:var(--inp);border-radius:8px;padding:14px;text-align:center;cursor:pointer" onclick="alert('Preview dokumen NIB ${m.name}')">
        <div style="font-size:24px;margin-bottom:4px">📋</div>
        <div style="font-size:11px;font-weight:600">NIB</div>
        <div style="font-size:10px;color:var(--sub)">Nomor Induk Berusaha</div>
      </div>
    </div>
    <div class="form-group" style="margin-bottom:14px">
      <label class="form-label">Catatan Admin (opsional)</label>
      <textarea class="form-textarea" placeholder="Tambahkan catatan untuk merchant..." style="min-height:60px"></textarea>
    </div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-grn" id="vbtn-approve-${i}" onclick="verifAction(${i},'approve')">✓ Setujui Merchant</button>
      <button class="btn btn-red" id="vbtn-reject-${i}" onclick="verifAction(${i},'reject')">✕ Tolak Pengajuan</button>
    </div>
  </div>`).join('')}`;
}

function verifAction(i, action) {
  const card = document.getElementById('vcard-' + i);
  const approveBtn = document.getElementById('vbtn-approve-' + i);
  const rejectBtn = document.getElementById('vbtn-reject-' + i);
  card.classList.add('done');
  approveBtn.textContent = action === 'approve' ? '✓ Disetujui' : '✓ Setujui';
  rejectBtn.textContent = action === 'reject' ? '✕ Ditolak' : '✕ Tolak';
  alert(action === 'approve' ? 'Merchant berhasil diverifikasi!' : 'Merchant ditolak. Notifikasi telah dikirim.');
}

function renderUsers() {
  const users = [
    ['Rizky Pratama','rizky@email.com','user','15 Jan 2025','active'],
    ['Warung Bu Sari','bsari@email.com','merchant','20 Feb 2025','active'],
    ['Sari Kusuma','sari@email.com','user','5 Mar 2025','active'],
    ['Budi Santoso','budi@email.com','user','12 Mar 2025','blocked'],
    ['Dewi Rahayu','dewi@email.com','merchant','1 Apr 2025','active'],
    ['Kafe Semangat','kafe@email.com','merchant','10 Apr 2025','active'],
    ['Eko Wibowo','eko@email.com','user','22 Apr 2025','blocked'],
  ];
  return `
  <div class="flex-row mb-20">
    <div class="search-wrap"><input placeholder="Cari pengguna..."></div>
    <select class="form-select" style="width:auto">
      <option>Semua Role</option><option>User</option><option>Merchant</option>
    </select>
    <select class="form-select" style="width:auto">
      <option>Semua Status</option><option>Aktif</option><option>Diblokir</option>
    </select>
  </div>
  <div class="card2">
    <table class="tbl">
      <thead><tr><th>Nama</th><th>Email</th><th>Role</th><th>Bergabung</th><th>Status</th><th>Aksi</th></tr></thead>
      <tbody id="users-tbody">
        ${users.map(([name, email, role, date, status], i) => `
        <tr id="urow-${i}">
          <td style="font-weight:600">${name}</td>
          <td style="color:var(--sub);font-size:12px">${email}</td>
          <td>${role === 'merchant' ? '<span class="badge badge-blu">Merchant</span>' : '<span class="badge badge-gray">User</span>'}</td>
          <td style="font-size:12px;color:var(--sub)">${date}</td>
          <td id="ustatus-${i}">${status === 'active' ? '<span class="badge badge-grn">Aktif</span>' : '<span class="badge badge-red">Diblokir</span>'}</td>
          <td>
            ${status === 'active'
              ? `<button class="btn btn-red btn-sm" id="ubtn-${i}" onclick="toggleUser(${i},'block')">🚫 Blokir</button>`
              : `<button class="btn btn-grn btn-sm" id="ubtn-${i}" onclick="toggleUser(${i},'restore')">✓ Pulihkan</button>`}
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

function toggleUser(i, action) {
  const statusEl = document.getElementById('ustatus-' + i);
  const btnEl = document.getElementById('ubtn-' + i);
  if (action === 'block') {
    statusEl.innerHTML = '<span class="badge badge-red">Diblokir</span>';
    btnEl.className = 'btn btn-grn btn-sm';
    btnEl.textContent = '✓ Pulihkan';
    btnEl.setAttribute('onclick', `toggleUser(${i},'restore')`);
  } else {
    statusEl.innerHTML = '<span class="badge badge-grn">Aktif</span>';
    btnEl.className = 'btn btn-red btn-sm';
    btnEl.textContent = '🚫 Blokir';
    btnEl.setAttribute('onclick', `toggleUser(${i},'block')`);
  }
}

function renderMerchants() {
  return `
  <div class="flex-row mb-20">
    <div class="search-wrap"><input placeholder="Cari merchant..."></div>
    <select class="form-select" style="width:auto">
      <option>Semua Status</option><option>Terverifikasi</option><option>Pending</option>
    </select>
  </div>
  <div class="card2">
    <table class="tbl">
      <thead><tr><th>Merchant</th><th>Jenis</th><th>Email</th><th>Bergabung</th><th>Listing</th><th>Status</th><th>Aksi</th></tr></thead>
      <tbody>
        ${[
          ['🍜 Warung Bu Sari','Warung Makan','bsari@email.com','20 Feb 2025',5,'verified'],
          ['☕ Kafe Semangat Solo','Kafe','kafe@email.com','10 Apr 2025',3,'verified'],
          ['🥐 Toko Roti Harum','Toko Roti','harum@email.com','8 Mei 2025',0,'pending'],
          ['🍰 Bakery Manis Solo','Toko Kue','manis@email.com','15 Mei 2025',0,'pending'],
          ['🍛 Warung Pak Joko','Warung Nasi','joko@email.com','18 Mei 2025',0,'pending'],
        ].map(([name, type, email, date, listings, status]) => `
        <tr>
          <td style="font-weight:600">${name}</td>
          <td style="color:var(--sub)">${type}</td>
          <td style="font-size:12px;color:var(--sub)">${email}</td>
          <td style="font-size:12px;color:var(--sub)">${date}</td>
          <td style="text-align:center">${listings}</td>
          <td>${status === 'verified' ? '<span class="badge badge-grn">Terverifikasi</span>' : '<span class="badge badge-org">Pending</span>'}</td>
          <td><button class="btn btn-out btn-sm" onclick="alert('Detail merchant')">Detail</button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

function renderAdminListings() {
  return `
  <div class="flex-row mb-20">
    <div class="search-wrap"><input placeholder="Cari listing..."></div>
    <select class="form-select" style="width:auto">
      <option>Semua Kategori</option><option>Nasi & Lauk</option><option>Minuman</option>
    </select>
    <select class="form-select" style="width:auto">
      <option>Semua Status</option><option>Aktif</option><option>Habis</option>
    </select>
  </div>
  <div class="card2">
    <table class="tbl">
      <thead><tr><th>Produk</th><th>Merchant</th><th>Kategori</th><th>Harga</th><th>Stok</th><th>Status</th><th>Aksi</th></tr></thead>
      <tbody>
        ${[
          ['🍱 Nasi Kotak Ayam Geprek','Warung Bu Sari','Nasi & Lauk','Rp 10.000',8,'active'],
          ['☕ Es Teh Manis Jumbo','Warung Bu Sari','Minuman','Rp 4.000',15,'active'],
          ['🍜 Nasi Goreng Spesial','Warung Bu Sari','Nasi & Lauk','Rp 15.000',3,'active'],
          ['☕ Kopi Susu Gula Aren','Kafe Semangat','Minuman','Rp 12.000',10,'active'],
          ['🥐 Croissant Mentega','Toko Roti Harum','Roti & Kue','Rp 7.000',0,'sold_out'],
        ].map(([name, merchant, cat, price, stock, status]) => `
        <tr>
          <td style="font-weight:600">${name}</td>
          <td style="color:var(--sub)">${merchant}</td>
          <td style="color:var(--sub)">${cat}</td>
          <td style="color:var(--grn);font-weight:600">${price}</td>
          <td>${stock === 0 ? '<span style="color:var(--red)">Habis</span>' : stock}</td>
          <td>${status === 'active' ? '<span class="badge badge-grn">Aktif</span>' : '<span class="badge badge-red">Habis</span>'}</td>
          <td><button class="btn btn-red btn-sm" onclick="alert('Listing telah di-takedown.')">🗑 Takedown</button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

function renderAdminOrders() {
  return `
  <div class="flex-row mb-20">
    <div class="search-wrap"><input placeholder="Cari pesanan..."></div>
    <select class="form-select" style="width:auto">
      <option>Semua Status</option><option>Pending</option><option>Selesai</option>
    </select>
    <input type="date" class="form-input" style="width:auto" value="2025-05-22">
  </div>
  <div class="card2">
    <table class="tbl">
      <thead><tr><th>Kode</th><th>Pembeli</th><th>Merchant</th><th>Item</th><th>Total</th><th>Status</th><th>Waktu</th></tr></thead>
      <tbody>
        ${[
          ['#ECO7821','Rizky Pratama','Warung Bu Sari','Nasi Kotak ×2','Rp 20.000','pending','10 mnt lalu'],
          ['#ECO7820','Sari Dewi','Warung Bu Sari','Es Teh ×3','Rp 12.000','confirmed','25 mnt lalu'],
          ['#ECO7815','Dewi Rahayu','Kafe Semangat','Kopi Susu ×1','Rp 12.000','completed','2 jam lalu'],
          ['#ECO7810','Eko Wibowo','Warung Bu Sari','Boba ×2','Rp 16.000','completed','5 jam lalu'],
          ['#ECO7805','Budi Santoso','Toko Roti Harum','Croissant ×3','Rp 21.000','rejected','1 hari lalu'],
        ].map(([id, buyer, merchant, item, total, status, time]) => `
        <tr>
          <td><span class="mono" style="font-size:11px;color:var(--blu)">${id}</span></td>
          <td style="font-weight:500">${buyer}</td>
          <td style="color:var(--sub)">${merchant}</td>
          <td style="color:var(--sub)">${item}</td>
          <td style="font-weight:600">${total}</td>
          <td>${{pending:'<span class="badge badge-org">Pending</span>',confirmed:'<span class="badge badge-blu">Dikonfirmasi</span>',completed:'<span class="badge badge-grn">Selesai</span>',rejected:'<span class="badge badge-red">Ditolak</span>'}[status]}</td>
          <td style="font-size:12px;color:var(--sub)">${time}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

function renderLaporan() {
  return `
  <div class="alert alert-red mb-20">🚨 Terdapat 2 laporan pelanggaran aktif yang memerlukan tindakan.</div>
  ${[
    {icon:'🍱', title:'Listing "Nasi Kotak Murah"', merchant:'Warung ABC', count:3, reason:'Foto produk tidak sesuai dengan makanan yang disajikan', id:0},
    {icon:'🏪', title:'Merchant "Warung ABC"', merchant:'Warung ABC', count:1, reason:'Makanan tidak layak konsumsi, bau tidak sedap', id:1},
  ].map(v => `
  <div class="viol-card card2" id="viol-${v.id}">
    <div class="card-head">
      <div>${v.icon} ${v.title}</div>
      <span class="badge badge-red">${v.count} Laporan</span>
    </div>
    <div class="card-body">
      <div style="font-size:13px;color:var(--sub);margin-bottom:14px">📋 Alasan: ${v.reason}</div>
      <div style="font-size:12px;color:var(--sub);margin-bottom:14px">Merchant: ${v.merchant}</div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-red btn-sm" onclick="violAction(${v.id},'takedown')">🗑 Takedown</button>
        <button class="btn btn-out btn-sm" onclick="violAction(${v.id},'ignore')">✓ Abaikan</button>
      </div>
    </div>
  </div>`).join('')}`;
}

function violAction(i, action) {
  document.getElementById('viol-' + i).classList.add('done');
  alert(action === 'takedown' ? 'Konten telah di-takedown.' : 'Laporan diabaikan.');
}

function renderAnalytics() {
  return `
  <div class="grid-4 mb-20">
    <div class="stat-card" style="border-top-color:var(--grn)">
      <div class="st-label">🍽️ Total Transaksi</div>
      <div class="st-val">21.480</div>
      <div class="st-delta d-grn">↑ 18% bulan ini</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--btn)">
      <div class="st-label">💰 GMV Platform</div>
      <div class="st-val" style="font-size:18px">Rp 284jt</div>
      <div class="st-delta d-grn">↑ 22% vs April</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--blu)">
      <div class="st-label">⭐ Rating Rata-rata</div>
      <div class="st-val">4.7</div>
      <div class="st-delta d-grn">Dari 2.841 ulasan</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--org)">
      <div class="st-label">♻️ Food Waste Dicegah</div>
      <div class="st-val">4.280 kg</div>
      <div class="st-delta d-grn">Mei 2025</div>
    </div>
  </div>

  <div class="grid-2">
    <div class="card2">
      <div class="card-head">📊 Distribusi Kategori</div>
      <div class="card-body">
        ${[
          ['Nasi & Lauk', 42, 'var(--btn)'],
          ['Minuman', 28, 'var(--blu)'],
          ['Roti & Kue', 18, 'var(--org)'],
          ['Camilan', 8, 'var(--grn)'],
          ['Lainnya', 4, 'var(--sub)'],
        ].map(([name, pct, color]) => `
        <div style="margin-bottom:12px">
          <div class="flex-between text-sm mb-12" style="margin-bottom:4px">
            <span>${name}</span><span style="color:var(--sub)">${pct}%</span>
          </div>
          <div class="prog-wrap"><div class="prog-fill" style="width:${pct}%;background:${color}"></div></div>
        </div>`).join('')}
      </div>
    </div>
    <div class="card2">
      <div class="card-head">📍 Top Kecamatan</div>
      <div class="card-body" style="padding:0">
        <table class="tbl">
          <thead><tr><th>Kecamatan</th><th>Merchant</th><th>Transaksi</th></tr></thead>
          <tbody>
            ${[
              ['Laweyan','24','3.240'],
              ['Banjarsari','19','2.860'],
              ['Jebres','15','2.100'],
              ['Pasar Kliwon','12','1.580'],
              ['Serengan','8','980'],
            ].map(([kec, merch, tx]) => `
            <tr>
              <td style="font-weight:500">${kec}</td>
              <td style="text-align:center;color:var(--sub)">${merch}</td>
              <td style="text-align:center;font-weight:600;color:var(--grn)">${tx}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.pill')[0].click();
});
