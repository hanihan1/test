/* ============================================================
   pages.orders.js — Order detail and item display functions
   ============================================================ */

/** Helper: format rupiah */

/* ── Order Detail with Items ── */
function renderOrderDetail(orderId) {
  return `
  <div style="max-width:800px;margin:0 auto">
    <!-- Order header -->
    <div class="card2 mb-16">
      <div class="card-head">
        Pesanan #${orderId}
        <span class="badge badge-grn" style="float:right">Selesai</span>
      </div>
      <div class="card-body">
        <div class="grid-2 mb-16">
          <div>
            <div style="font-size:12px;color:var(--sub);margin-bottom:4px">Status Pesanan</div>
            <div style="font-weight:600;font-size:14px">Siap Diambil</div>
          </div>
          <div>
            <div style="font-size:12px;color:var(--sub);margin-bottom:4px">Waktu Pemesanan</div>
            <div style="font-weight:600;font-size:14px">12 Juni 2024, 14:30</div>
          </div>
          <div>
            <div style="font-size:12px;color:var(--sub);margin-bottom:4px">Batas Pickup</div>
            <div style="font-weight:600;font-size:14px">12 Juni 2024, 20:00</div>
          </div>
          <div>
            <div style="font-size:12px;color:var(--sub);margin-bottom:4px">Total Pembayaran</div>
            <div style="font-weight:600;font-size:14px;color:var(--btn)">Rp 57.500</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Order items detail -->
    <div class="card2 mb-16">
      <div class="card-head">Detail Item</div>
      <table class="tbl" style="margin:0">
        <thead>
          <tr>
            <th>Produk</th>
            <th style="text-align:center">Qty</th>
            <th style="text-align:right">Harga Satuan</th>
            <th style="text-align:right">Total</th>
          </tr>
        </thead>
        <tbody id="order-items-tbody">
          <tr>
            <td>
              <div style="font-weight:600;margin-bottom:4px">Nasi Kotak Ayam Geprek</div>
              <div style="font-size:12px;color:var(--sub)">dari Warung Makan Sukabumi</div>
            </td>
            <td style="text-align:center">2</td>
            <td style="text-align:right">Rp 20.000</td>
            <td style="text-align:right;font-weight:600">Rp 40.000</td>
          </tr>
          <tr>
            <td>
              <div style="font-weight:600;margin-bottom:4px">Es Teh Manis</div>
              <div style="font-size:12px;color:var(--sub)">dari Warung Makan Sukabumi</div>
            </td>
            <td style="text-align:center">2</td>
            <td style="text-align:right">Rp 8.500</td>
            <td style="text-align:right;font-weight:600">Rp 17.000</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Payment & Shipping info -->
    <div class="grid-2 mb-16">
      <!-- Payment info -->
      <div class="card2">
        <div class="card-head">Informasi Pembayaran</div>
        <div class="card-body">
          <div class="info-row mb-12">
            <span class="lbl">Subtotal</span>
            <span class="val">Rp 57.000</span>
          </div>
          <div class="info-row mb-12">
            <span class="lbl">Biaya Layanan</span>
            <span class="val">Rp 2.500</span>
          </div>
          <div class="info-row mb-12">
            <span class="lbl">Potongan (Surplus)</span>
            <span class="val" style="color:var(--grn)">-Rp 2.000</span>
          </div>
          <hr style="margin:12px 0;border:none;border-top:1px solid var(--brd)">
          <div class="info-row" style="font-weight:600;color:var(--btn);font-size:16px">
            <span class="lbl">Total</span>
            <span class="val">Rp 57.500</span>
          </div>
          <div style="margin-top:16px;padding:12px;background:var(--bg2);border-radius:6px;font-size:12px;color:var(--sub)">
            <strong>Metode:</strong> Transfer Bank (BCA)<br>
            <strong>Status:</strong> ✓ Sudah Dibayar (12 Juni, 14:45)
          </div>
        </div>
      </div>

      <!-- Shipping info -->
      <div class="card2">
        <div class="card-head">Alamat Pengiriman</div>
        <div class="card-body">
          <div style="margin-bottom:12px">
            <div style="font-weight:600;margin-bottom:4px">Jl. Merdeka No.10</div>
            <div style="font-size:13px;color:var(--sub);margin-bottom:8px">
              RT 05 RW 03, Jakarta Pusat<br>
              DKI Jakarta 12130
            </div>
            <div style="font-size:12px;color:var(--sub)">
              <strong>No. Telp:</strong> 081234567890
            </div>
          </div>
          <hr style="margin:12px 0;border:none;border-top:1px solid var(--brd)">
          <div style="font-size:12px;color:var(--sub)">
            <strong>Catatan Pengiriman:</strong><br>
            Pesanan boleh ditinggal di depan pintu jika tidak ada yang menjawab
          </div>
        </div>
      </div>
    </div>

    <!-- Action buttons -->
    <div style="display:flex;gap:10px;justify-content:center;margin-bottom:16px">
      <button class="btn btn-out" onclick="history.back()">Kembali</button>
      <button class="btn btn-grn" onclick="alert('Mencetak invoice...')">Print Invoice</button>
    </div>
  </div>`;
}

/* ── Order Items Partial (for tables) ── */
function renderOrderItemsRow(items) {
  if (!items || items.length === 0) return '<td colspan="4" class="color-sub">Tidak ada item</td>';
  return items.map(item => `
    <tr class="order-item-row">
      <td style="font-size:13px">
        <strong>${item.name}</strong><br>
        <span class="color-sub">${item.merchant}</span>
      </td>
      <td style="text-align:center">${item.quantity}</td>
      <td style="text-align:right">${formatRp(item.price)}</td>
      <td style="text-align:right;font-weight:600">${formatRp(item.quantity * item.price)}</td>
    </tr>
  `).join('');
}