/* ============================================================
   pages.merchant.analytics.js — Merchant analytics & impact tracking
   ============================================================ */


/* ── Merchant: Analytics Dashboard ── */
function renderMerchantAnalytics() {
  return `
  <div class="grid-4 mb-20">
    <div class="stat-card" style="border-top-color:var(--btn)">
      <div class="st-label">Total Pendapatan</div>
      <div class="st-val" id="stat-merchant-revenue">—</div>
      <div class="st-delta d-grn" id="stat-merchant-revenue-delta">—</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--grn)">
      <div class="st-label">Total Pesanan</div>
      <div class="st-val" id="stat-merchant-orders">—</div>
      <div class="st-delta d-grn" id="stat-merchant-orders-delta">—</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--blu)">
      <div class="st-label">Conversion Rate</div>
      <div class="st-val" id="stat-merchant-conversion">—</div>
      <div class="st-delta d-org" id="stat-merchant-conversion-delta">—</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--grn)">
      <div class="st-label">Avg Rating</div>
      <div class="st-val" id="stat-merchant-rating">—</div>
      <div class="st-delta d-grn" id="stat-merchant-rating-delta">—</div>
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
        <p class="color-sub" style="font-size:12px">Memuat data...</p>
      </div>
    </div>
  </div>`;
}

/* ── Admin: Platform Analytics ── */
function renderAdminPlatformAnalytics() {

  return `
  <div class="grid-3 mb-20">
    <div class="stat-card" style="border-top-color:var(--blu)">
      <div class="st-label">Total Pendapatan Merchant</div>
      <div class="st-val" id="stat-total-revenue">—</div>
      <div class="st-delta d-grn" id="stat-revenue-delta">—</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--grn)">
      <div class="st-label">Total Transaksi</div>
      <div class="st-val" id="stat-platform-transactions">—</div>
      <div class="st-delta d-grn" id="stat-platform-transactions-delta">—</div>
    </div>
    <div class="stat-card" style="border-top-color:var(--btn)">
      <div class="st-label">Merchant Aktif</div>
      <div class="st-val" id="stat-platform-active-merchants">—</div>
      <div class="st-delta d-grn" id="stat-platform-active-merchants-delta">—</div>
    </div>
  </div>

  <div class="grid-2 mb-20">
    <!-- Platform orders chart -->
    <div class="card2">
      <div class="card-head">Pesanan Platform 7 Hari</div>
      <div class="card-body">
        <div class="chart-wrap" style="height:120px">${bars}</div>
        <div class="chart-labels" id="platform-orders-chart">
          <p class="color-sub" style="font-size:12px;text-align:center;padding-top:40px">Memuat data grafik...</p></div>
      </div>
    </div>

  </div>

  <!-- Top metrics -->
  <div class="grid-2">

    <div class="card2">
      <div class="card-head">Kategori Populer</div>
      <div class="card-body">
        <p class="color-sub" style="font-size:12px">Memuat data...</p>
      </div>
    </div>

    <div class="card2">
      <div class="card-head">Payment Methods</div>
      <div class="card-body">
        <p class="color-sub" style="font-size:12px">Memuat data...</p>
      </div>
    </div>
  </div>`;
}