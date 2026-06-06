/* ============================================================
   pages.merchant.analytics.js — Merchant analytics & impact tracking
   ============================================================ */


/* ── Merchant: Analytics Dashboard ── */
function renderMerchantAnalytics() {
  const chartData = [45, 60, 38, 80, 55, 75, 92];
  const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const bars = chartData.map(v =>
    `<div class="chart-bar ${v >= 80 ? 'hi' : 'lo'}" style="height:${v}%"></div>`
  ).join('');
  const labels = days.map(d => `<span>${d}</span>`).join('');

  return `
  <div class="grid-4 mb-20">
    <div class="stat-card" style="border-top-color:var(--btn)">
      <div class="st-label">Total Revenue</div>
      <div class="st-val">Rp 4.5M</div>
      <div class="st-delta d-grn">↑ 12% bulan ini</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--grn)">
      <div class="st-label">Total Pesanan</div>
      <div class="st-val">342</div>
      <div class="st-delta d-grn">↑ 28 pesanan baru</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--blu)">
      <div class="st-label">Conversion Rate</div>
      <div class="st-val">3.8%</div>
      <div class="st-delta d-org">↓ 0.2% dari rata-rata</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--grn)">
      <div class="st-label">Avg Rating</div>
      <div class="st-val">4.7★</div>
      <div class="st-delta d-grn">Sangat memuaskan</div>
    </div>
  </div>

  <div class="grid-2 mb-20">
    <!-- Revenue chart -->
    <div class="card2">
      <div class="card-head">Pendapatan 7 Hari</div>
      <div class="card-body">
        <div class="chart-wrap">${bars}</div>
        <div class="chart-labels">${labels}</div>
      </div>
    </div>

    <!-- Top products -->
    <div class="card2">
      <div class="card-head">Produk Terlaris</div>
      <div class="card-body">
        <div style="margin-bottom:16px">
          <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:12px">
            <span>Nasi Kotak Ayam Geprek</span>
            <strong>145 terjual</strong>
          </div>
          <div class="prog-wrap"><div class="prog-fill" style="width:100%"></div></div>
        </div>
        <div style="margin-bottom:16px">
          <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:12px">
            <span>Es Teh Manis</span>
            <strong>98 terjual</strong>
          </div>
          <div class="prog-wrap"><div class="prog-fill" style="width:67%"></div></div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:12px">
            <span>Roti Bakar Cokelat</span>
            <strong>62 terjual</strong>
          </div>
          <div class="prog-wrap"><div class="prog-fill" style="width:42%"></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Food waste & environmental impact -->
  <div class="grid-2 mb-20">
    <div class="card2">
      <div class="card-head">Dampak Lingkungan Anda</div>
      <div class="card-body">
        <div class="mb-16">
          <div style="font-size:12px;color:var(--sub);margin-bottom:4px">MAKANAN DICEGAH TERBUANG</div>
          <div class="impact-num">127 porsi</div>
          <div style="font-size:12px;color:var(--sub);margin-top:4px">Setara dengan 24 kg sampah organik</div>
        </div>
        <hr style="margin:12px 0;border:none;border-top:1px solid var(--brd)">
        <div>
          <div style="font-size:12px;color:var(--sub);margin-bottom:4px">CO₂ YANG DICEGAH</div>
          <div class="impact-num" style="font-size:24px">54 kg</div>
          <div style="font-size:12px;color:var(--sub);margin-top:4px">Setara perjalanan mobil 135 km</div>
        </div>
      </div>
    </div>

    <!-- Sales by category -->
    <div class="card2">
      <div class="card-head">Penjualan per Kategori</div>
      <div class="card-body">
        <div style="margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
            <span>Nasi & Lauk</span>
            <span style="font-weight:600">45%</span>
          </div>
          <div class="prog-wrap"><div class="prog-fill" style="width:45%;background:var(--grn)"></div></div>
        </div>
        <div style="margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
            <span>Minuman</span>
            <span style="font-weight:600">30%</span>
          </div>
          <div class="prog-wrap"><div class="prog-fill" style="width:30%;background:var(--blu)"></div></div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
            <span>Roti & Kue</span>
            <span style="font-weight:600">25%</span>
          </div>
          <div class="prog-wrap"><div class="prog-fill" style="width:25%;background:var(--btn)"></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Customer satisfaction -->
  <div class="card2">
    <div class="card-head">Tingkat Kepuasan Customer</div>
    <div class="card-body">
      <div class="grid-4">
        <div style="text-align:center">
          <div style="font-size:24px;font-weight:700;color:var(--grn);margin-bottom:4px">92%</div>
          <div style="font-size:11px;color:var(--sub)">Puas (4-5★)</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:24px;font-weight:700;color:var(--btn);margin-bottom:4px">6%</div>
          <div style="font-size:11px;color:var(--sub)">Netral (3★)</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:24px;font-weight:700;color:var(--red);margin-bottom:4px">2%</div>
          <div style="font-size:11px;color:var(--sub)">Tidak Puas (1-2★)</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:24px;font-weight:700;color:var(--sub);margin-bottom:4px">4.7★</div>
          <div style="font-size:11px;color:var(--sub)">Rating Rata-rata</div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ── Admin: Platform Analytics ── */
function renderAdminPlatformAnalytics() {
  const chartData = [180, 220, 165, 310, 205, 280, 340];
  const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const maxV = Math.max(...chartData);
  const bars = chartData.map(v =>
    `<div class="chart-bar ${v >= maxV * .8 ? 'hi' : 'lo'}" style="height:${Math.round(v / maxV * 100)}%"></div>`
  ).join('');
  const labels = days.map(d => `<span>${d}</span>`).join('');

  return `
  <div class="grid-4 mb-20">
    <div class="stat-card" style="border-top-color:var(--blu)">
      <div class="st-label">Platform Revenue</div>
      <div class="st-val">Rp 142.5M</div>
      <div class="st-delta d-grn">↑ 18% bulan ini</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--grn)">
      <div class="st-label">Total Transaksi</div>
      <div class="st-val">12.4K</div>
      <div class="st-delta d-grn">↑ 842 bulan ini</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--btn)">
      <div class="st-label">Merchant Aktif</div>
      <div class="st-val">287</div>
      <div class="st-delta d-grn">+34 baru</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--red)">
      <div class="st-label">Pelanggaran</div>
      <div class="st-val">12</div>
      <div class="st-delta d-red">Perlu ditangani</div>
    </div>
  </div>

  <div class="grid-2 mb-20">
    <!-- Platform orders chart -->
    <div class="card2">
      <div class="card-head">Pesanan Platform 7 Hari</div>
      <div class="card-body">
        <div class="chart-wrap" style="height:120px">${bars}</div>
        <div class="chart-labels">${labels}</div>
        <div style="margin-top:12px;font-size:12px;color:var(--sub)">
          Total: <strong>1,905 pesanan</strong> | Rata-rata: <strong>272 pesanan/hari</strong>
        </div>
      </div>
    </div>

    <!-- Environmental impact -->
    <div class="card2">
      <div class="card-head">Dampak Platform Keseluruhan</div>
      <div class="card-body">
        <div class="mb-16">
          <div style="font-size:12px;color:var(--sub);margin-bottom:4px">MAKANAN DICEGAH TERBUANG</div>
          <div class="impact-num" style="font-size:28px">42.8K porsi</div>
          <div style="font-size:12px;color:var(--sub);margin-top:4px">≈ 8.1 ton sampah organik</div>
        </div>
        <hr style="margin:12px 0;border:none;border-top:1px solid var(--brd)">
        <div>
          <div style="font-size:12px;color:var(--sub);margin-bottom:4px">CO₂ YANG DICEGAH</div>
          <div class="impact-num" style="font-size:28px;color:var(--grn)">18.2 ton</div>
          <div style="font-size:12px;color:var(--sub);margin-top:4px">Setara 45,500 km berkendara</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Top metrics -->
  <div class="grid-3">
    <div class="card2">
      <div class="card-head">Merchant Terbaik</div>
      <div class="card-body">
        <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--brd)">
          <div style="font-weight:600;font-size:13px;margin-bottom:2px">Warung Makan Sukabumi</div>
          <div style="font-size:12px;color:var(--sub)">Rp 12.5M revenue • 245 pesanan</div>
        </div>
        <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--brd)">
          <div style="font-weight:600;font-size:13px;margin-bottom:2px">Toko Kue Ibu Siti</div>
          <div style="font-size:12px;color:var(--sub)">Rp 8.2M revenue • 156 pesanan</div>
        </div>
        <div>
          <div style="font-weight:600;font-size:13px;margin-bottom:2px">Bakery Plus</div>
          <div style="font-size:12px;color:var(--sub)">Rp 6.8M revenue • 134 pesanan</div>
        </div>
      </div>
    </div>

    <div class="card2">
      <div class="card-head">Kategori Populer</div>
      <div class="card-body">
        <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--brd)">
          <div style="display:flex;justify-content:space-between">
            <span style="font-weight:600">Nasi & Lauk</span>
            <span style="color:var(--grn);font-weight:600">38%</span>
          </div>
        </div>
        <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--brd)">
          <div style="display:flex;justify-content:space-between">
            <span style="font-weight:600">Roti & Kue</span>
            <span style="color:var(--btn);font-weight:600">32%</span>
          </div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between">
            <span style="font-weight:600">Minuman</span>
            <span style="color:var(--org);font-weight:600">30%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card2">
      <div class="card-head">Payment Methods</div>
      <div class="card-body">
        <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--brd)">
          <div style="display:flex;justify-content:space-between">
            <span style="font-weight:600">Transfer Bank</span>
            <span>48%</span>
          </div>
        </div>
        <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--brd)">
          <div style="display:flex;justify-content:space-between">
            <span style="font-weight:600">E-Wallet</span>
            <span>35%</span>
          </div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between">
            <span style="font-weight:600">COD</span>
            <span>17%</span>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}