// State
let currentStep     = 1;
const TOTAL_STEPS   = 4;
const uploadedFiles = {};

let map            = null;
let marker         = null;
let mapInitialized = false;
let selectedLat    = null;
let selectedLng    = null;

// Step navigation
function goStep(target) {
  if (target > currentStep && !validateStep(currentStep)) return;
  if (target === TOTAL_STEPS) buildReview();

  document.getElementById(`panel-${currentStep}`).classList.remove('active');

  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const dot = document.getElementById(`dot-${i}`);
    const lbl = document.getElementById(`lbl-${i}`);

    dot.classList.remove('active', 'done');
    lbl.classList.remove('active');

    if (i < target) {
      dot.classList.add('done');
      dot.textContent = '';
    } else if (i === target) {
      dot.classList.add('active');
      dot.textContent = i;
      lbl.classList.add('active');
    } else {
      dot.textContent = i;
    }

    if (i < TOTAL_STEPS) {
      document.getElementById(`line-${i}`).classList.toggle('done', i < target);
    }
  }

  currentStep = target;
  document.getElementById(`panel-${currentStep}`).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (target === 2) setTimeout(initMap, 100);
}

// Map
function initMap() {
  if (mapInitialized) return;
  mapInitialized = true;

  map = L.map('map-container', { center: [-7.5561, 110.8317], zoom: 14 });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map);

  const pinIcon = L.divIcon({
    className: '',
    html: `<div style="
      width:36px;height:36px;
      background:linear-gradient(135deg,#503321,#B99470);
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      border:3px solid white;
      box-shadow:0 3px 12px rgba(80,51,33,.45);
      display:flex;align-items:center;justify-content:center;">
      <span style="transform:rotate(45deg);font-size:14px;display:block;margin-top:2px;margin-left:1px;"></span>
    </div>`,
    iconSize:    [36, 36],
    iconAnchor:  [18, 36],
    popupAnchor: [0, -36],
  });

  map._pinIcon = pinIcon;
  map.on('click', e => placePin(e.latlng.lat, e.latlng.lng));

  if (selectedLat && selectedLng) placePin(selectedLat, selectedLng);
}

function placePin(lat, lng) {
  selectedLat = lat;
  selectedLng = lng;
  document.getElementById('lat').value = lat;
  document.getElementById('lng').value = lng;

  if (marker) {
    marker.setLatLng([lat, lng]);
  } else {
    marker = L.marker([lat, lng], { icon: map._pinIcon, draggable: true }).addTo(map);
    marker.bindPopup('<b> Lokasi Toko</b><br>Drag untuk memindahkan').openPopup();
    marker.on('dragend', () => {
      const pos = marker.getLatLng();
      selectedLat = pos.lat;
      selectedLng = pos.lng;
      document.getElementById('lat').value = pos.lat;
      document.getElementById('lng').value = pos.lng;
      updateCoords(pos.lat, pos.lng);
    });
  }

  updateCoords(lat, lng);
  document.getElementById('map-section').classList.add('has-pin');
}

function updateCoords(lat, lng) {
  document.getElementById('coords-label').innerHTML =
    `Pin: <span class="coords-val">${lat.toFixed(6)}, ${lng.toFixed(6)}</span>`;
  document.getElementById('clear-pin-btn').classList.add('show');
}

function clearPin() {
  if (marker) { map.removeLayer(marker); marker = null; }
  selectedLat = null;
  selectedLng = null;
  document.getElementById('lat').value = '';
  document.getElementById('lng').value = '';
  document.getElementById('coords-label').textContent = 'Titik belum dipilih';
  document.getElementById('clear-pin-btn').classList.remove('show');
  document.getElementById('map-section').classList.remove('has-pin');
}

function useMyLocation() {
  if (!navigator.geolocation) { alert('Browser tidak mendukung geolokasi.'); return; }

  const btn = document.querySelector('.btn-my-loc');
  btn.textContent = 'Mencari...';
  btn.disabled = true;

  navigator.geolocation.getCurrentPosition(
    pos => {
      map.setView([pos.coords.latitude, pos.coords.longitude], 17);
      placePin(pos.coords.latitude, pos.coords.longitude);
      btn.textContent = ' Lokasiku';
      btn.disabled = false;
    },
    () => {
      alert('Tidak bisa mendapatkan lokasi. Pastikan izin lokasi diaktifkan.');
      btn.textContent = ' Lokasiku';
      btn.disabled = false;
    },
    { timeout: 8000 }
  );
}

function searchMap() {
  const query = document.getElementById('map-search-input').value.trim();
  if (!query) return;

  const btn = document.querySelector('.btn-map-search');
  btn.textContent = '';
  btn.disabled = true;

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Surakarta')}&limit=1&countrycodes=id`)
    .then(r => r.json())
    .then(data => {
      if (data && data.length) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        map.setView([lat, lng], 17);
        placePin(lat, lng);
      } else {
        alert('Lokasi tidak ditemukan. Coba kata kunci lain atau klik langsung di peta.');
      }
    })
    .catch(() => alert('Gagal mencari lokasi. Periksa koneksi internet.'))
    .finally(() => { btn.textContent = 'Cari'; btn.disabled = false; });
}

// Validation
function validateStep(step) {
  let ok = true;

  if (step === 1) {
    ok &= req('nama_lengkap', v => v.trim().length > 0);
    ok &= req('no_hp',        v => /^08\d{8,11}$/.test(v.replace(/\s/g, '')));
    ok &= req('email',        v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
    ok &= req('password',     v => v.length >= 8);
    ok &= req('konfirmasi_password', v => {
      const match = v === document.getElementById('password').value;
      if (!match) document.getElementById('err-konfirmasi_password').textContent = 'Password tidak cocok';
      return match;
    });
  }

  if (step === 2) {
    ok &= req('nama_toko',       v => v.trim().length > 0);
    ok &= req('kategori',        v => v !== '');
    ok &= req('jam_operasional', v => v.trim().length > 0);
    ok &= req('alamat_jalan',    v => v.trim().length > 0);
    ok &= req('kelurahan',       v => v.trim().length > 0);
    ok &= req('kecamatan',       v => v !== '');
  }

  if (step === 3) {
    ok &= req('status_halal',  v => v !== '');
    ok &= req('jenis_izin',    v => v !== '');
    ok &= req('no_izin_usaha', v => v.trim().length > 0);
    ok &= reqFile('izin_usaha', 'Dokumen izin usaha wajib diupload');

    if (document.getElementById('status_halal').value === 'bersertifikat') {
      ok &= reqFile('halal_cert', 'Sertifikat halal wajib diupload untuk status bersertifikat');
    }
  }

  return !!ok;
}

function req(id, fn) {
  const el    = document.getElementById(id);
  const errEl = document.getElementById(`err-${id}`);
  const valid = el && fn(el.value);
  if (el)    el.classList.toggle('error', !valid);
  if (errEl) errEl.classList.toggle('show', !valid);
  return valid;
}

function reqFile(id, msg) {
  const has   = uploadedFiles[id] && uploadedFiles[id].length > 0;
  const errEl = document.getElementById(`err-${id}`);
  if (errEl)  { errEl.textContent = msg; errEl.classList.toggle('show', !has); }
  return has;
}

// Password
function checkPw(val) {
  const bars = ['bar1', 'bar2', 'bar3'];
  bars.forEach(b => { document.getElementById(b).className = 'pw-bar'; });

  const strength = getPwStrength(val);
  const cls   = ['', 'weak', 'medium', 'strong'][strength];
  const hints = [
    '',
    'Password lemah – tambah angka atau simbol',
    'Cukup kuat – bisa lebih baik lagi',
    'Password kuat! ',
  ];

  for (let i = 0; i < strength; i++) {
    if (cls) document.getElementById(bars[i]).classList.add(cls);
  }
  document.getElementById('pw-hint').textContent = hints[strength];
}

function getPwStrength(p) {
  if (p.length < 6) return 0;
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p) && /[0-9]/.test(p)) s++;
  if (/[^a-zA-Z0-9]/.test(p)) s++;
  return s;
}

function togglePw(id, btn) {
  const el  = document.getElementById(id);
  el.type   = el.type === 'password' ? 'text' : 'password';
  btn.textContent = el.type === 'password' ? 'Lihat' : 'Sembunyikan';
}

// File upload
function addFile(input, key) {
  if (!uploadedFiles[key]) uploadedFiles[key] = [];
  const file = input.files[0];
  if (!file) return;
  uploadedFiles[key].push(file);
  renderPreviews(key);
  input.value = '';
}

function removeFile(key, idx) {
  uploadedFiles[key].splice(idx, 1);
  renderPreviews(key);
}

function renderPreviews(key) {
  const wrap = document.getElementById(`preview-${key}`);
  if (!wrap) return;
  wrap.innerHTML = '';
  (uploadedFiles[key] || []).forEach((f, i) => {
    const chip = document.createElement('div');
    chip.className = 'preview-chip';
    chip.innerHTML = `${f.name} <button onclick="removeFile('${key}',${i})">×</button>`;
    wrap.appendChild(chip);
  });
}

function dragOver(e, zone)      { e.preventDefault(); zone.classList.add('drag'); }
function dragLeave(zone)        { zone.classList.remove('drag'); }
function dropFile(e, key, zone) {
  e.preventDefault();
  zone.classList.remove('drag');
  if (e.dataTransfer.files.length) {
    if (!uploadedFiles[key]) uploadedFiles[key] = [];
    uploadedFiles[key].push(e.dataTransfer.files[0]);
    renderPreviews(key);
  }
}

// Halal toggle
function toggleHalalUpload(val) {
  const required = val === 'bersertifikat';
  const lblNo    = document.getElementById('lbl-no-halal');
  const lblUp    = document.getElementById('lbl-up-halal');
  lblNo.textContent = required ? '(wajib)' : '(opsional)';
  lblUp.textContent = required ? '(wajib)' : '(opsional)';
  lblNo.style.color = required ? 'var(--error)' : '';
  lblUp.style.color = required ? 'var(--error)' : '';
}

// Review
function buildReview() {
  const g = id => document.getElementById(id)?.value || '—';

  const mapInfo = selectedLat && selectedLng
    ? `${selectedLat.toFixed(6)}, ${selectedLng.toFixed(6)}`
    : '—';

  const sections = [
    { title: ' Akun', rows: [
      ['Nama',    g('nama_lengkap')],
      ['No. HP',  g('no_hp')],
      ['Email',   g('email')],
    ]},
    { title: ' Toko', rows: [
      ['Nama Toko',        g('nama_toko')],
      ['Jenis Usaha',      g('kategori')],
      ['Jam Operasional',  g('jam_operasional')],
      ['Alamat',           `${g('alamat_jalan')}, ${g('kelurahan')}, Kec. ${g('kecamatan')}, Surakarta`],
      ['Koordinat Peta',   mapInfo],
      ['Deskripsi',        g('deskripsi_toko') || '—'],
    ]},
    { title: ' Dokumen', rows: [
      ['Status Halal',          g('status_halal').replace(/_/g, ' ')],
      ['No. Sertifikat Halal',  g('no_sertifikat_halal') || '—'],
      ['Jenis Izin Usaha',      g('jenis_izin')],
      ['No. Izin Usaha',        g('no_izin_usaha')],
      ['File Izin Usaha',       (uploadedFiles['izin_usaha'] || []).map(f => f.name).join(', ') || '—'],
      ['File Halal',            (uploadedFiles['halal_cert'] || []).map(f => f.name).join(', ') || '—'],
    ]},
  ];

  document.getElementById('review-content').innerHTML = sections.map(s => `
    <div class="review-section">
      <div class="section-label">${s.title}</div>
      <div class="review-table">
        ${s.rows.map(([k, v]) => `
          <div class="review-row">
            <span class="review-key">${k}</span>
            <span class="review-val">${v}</span>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

// Submit
function submitForm() {
  if (!document.getElementById('agree_tos').checked) {
    document.getElementById('err-agree_tos').classList.add('show');
    return;
  }
  document.getElementById('err-agree_tos').classList.remove('show');

  const btn = document.getElementById('submitBtn');
  btn.disabled    = true;
  btn.textContent = ' Memproses...';

  const now = new Date();
  try {
    localStorage.setItem('ecoeats_reg', JSON.stringify({
      nama:     document.getElementById('nama_lengkap').value,
      email:    document.getElementById('email').value,
      hp:       document.getElementById('no_hp').value,
      toko:     document.getElementById('nama_toko').value,
      kategori: document.getElementById('kategori').value,
      alamat:   `${document.getElementById('alamat_jalan').value}, ${document.getElementById('kelurahan').value}, Kec. ${document.getElementById('kecamatan').value}, Surakarta`,
      lat:      selectedLat,
      lng:      selectedLng,
      waktu:    now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                + ', ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      status:   'pending',
      ref:      'ECO-' + Date.now().toString(36).toUpperCase(),
    }));
  } catch (e) { /* localStorage not available */ }

  // TODO: POST /api/auth/register/merchant (multipart/form-data)
  setTimeout(() => { window.location.href = 'waiting.html'; }, 1500);
}

// Clear field errors on input
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('error');
      const err = document.getElementById(`err-${el.id}`);
      if (err) err.classList.remove('show');
    });
  });
});