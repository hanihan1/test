/* ============================================================
   pages.merchant.analytics.js — Merchant analytics & impact tracking
   ============================================================ */


/* ── Merchant: Analytics Dashboard ── */
function renderMerchantAnalytics() {
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
        <div class="chart-wrap" id="analytics-revenue-chart"></div>
        <div class="chart-labels" id="analytics-revenue-labels"></div>
      </div>
    </div>

    <!-- Top products -->
    <div class="card2">
      <div class="card-head">Produk Terlaris</div>
      <div class="card-body" id="analytics-top-products">
        <p class="color-sub" style="font-size:12px">Memuat data...</p>
      </div>
    </div>
  </div>

  <!-- Penjualan per Kategori -->
  <div class="mb-20">
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
  <div class="grid-3 mb-20">
    <div class="stat-card" style="border-top-color:var(--blu)">
      <div class="st-label">Total Pendapatan Merchant</div>
      <div class="st-val" id="stat-total-revenue">—</div>
      <div class="st-delta d-grn" id="stat-revenue-delta">—</div>
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

  </div>

  <!-- Top metrics -->
  <div class="grid-2">

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