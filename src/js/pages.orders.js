/* ============================================================
   pages.orders.js — Detail Pesanan & Manajemen Pembayaran
   ============================================================ */

/** 
 * Render halaman detail pesanan setelah merchant klik "Accept".
 * Menampilkan daftar makanan, total, kode pickup, dan toggle status uang.
 */

const formatRp = n => 'Rp ' + Number(n).toLocaleString('id-ID');

function renderOrderDetail(orderId, isPaid = false) {
  // Mock data - Di aplikasi nyata, data ini diambil dari API berdasarkan orderId
  // Untuk demo, kita akan menggunakan data statis dan orderId dari APP.activeOrderId
  const order = {
    id: orderId || APP.activeOrderId || 'ORD-001',
    items: ["Nasi Kotak Ayam Geprek (2x)", "Es Teh Manis (1x)"], // Contoh item
    total: 47500, // Contoh total harga
    statusBayar: isPaid ? "Sudah Bayar" : "Belum Bayar",
    kodePickup: "PK-" + Math.floor(10000 + Math.random() * 90000), // Kode pickup random
    waktuPesanan: "12 Juni 2024, 14:30", // Waktu pesanan dummy
    metode: "Transfer Bank (BCA)",
    uangDiterima: isPaid
  };

  return `
  <div style="max-width:600px; margin: 0 auto;">
    <div class="card2">
      <div class="card-head" style="background: var(--grn); color: white;">
        Pesanan Berhasil Diterima
        <span style="float:right">#${order.id}</span>
      </div>
      <div class="card-body">
        <!-- Daftar Makanan -->
        <div style="margin-bottom:20px; padding-bottom:15px; border-bottom:1px solid var(--brd)">
          <label class="form-label" style="color:var(--sub)">Daftar Makanan</label>
          <ul style="list-style:none; padding-left:0; font-weight:600; font-size:15px; margin-top:8px; line-height:1.6">
            ${order.items.map(it => `<li style="margin-bottom:4px">• ${it}</li>`).join('')}
          </ul>
        </div>

        <!-- Ringkasan Harga & Bayar -->
        <div class="grid-2 mb-20">
          <div>
            <label class="form-label" style="color:var(--sub)">Total Harga</label>
            <div style="font-size:18px; font-weight:700; color:var(--btn)">${formatRp(order.total)}</div> 
          </div>
          <div>
            <label class="form-label" style="color:var(--sub)">Status Bayar</label>
            <div style="font-weight:600">${order.statusBayar}</div>
            <div style="font-size:11px; color:var(--sub)">${order.metode}</div>
          </div>
          <div style="margin-top:12px">
            <label class="form-label" style="color:var(--sub)">Waktu Pesanan</label>
            <div style="font-weight:600">${order.waktuPesanan}</div>
          </div>
        </div>

        <!-- Kode Pickup -->
        <div class="alert alert-grn mb-20" style="text-align:center; padding:20px">
          <div style="font-size:12px; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px">Kode Pickup</div>
          <div style="font-size:28px; font-weight:800; font-family:'DM Mono', monospace;">${order.kodePickup}</div>
        </div>

        <!-- Status Uang (Manual Edit oleh Merchant) -->
        <div id="payment-status-container">
          <div class="flex-row" style="justify-content:space-between; align-items:center; padding:12px; background:var(--bg2); border-radius:8px">
            <span style="font-weight:600">Uang Diterima:</span>
            <span class="badge ${order.uangDiterima ? 'badge-grn' : 'badge-org'}" id="payment-badge">
              ${order.uangDiterima ? "✓ Sudah Diterima" : "⏳ Belum Diterima"}
            </span>
          </div>

          ${!order.uangDiterima ? `
            <button class="btn btn-grn" style="width:100%; margin-top:12px; justify-content:center" 
                    onclick="updatePaymentStatus('${order.id}', true)">
              Konfirmasi Uang Sudah Diterima
            </button>
          ` : `
            <button class="btn btn-out" style="width:100%; margin-top:12px; justify-content:center" 
                    onclick="updatePaymentStatus('${order.id}', false)">
              Batalkan Status Diterima
            </button>
          `}
        </div>

        <button class="btn btn-out" style="width:100%; margin-top:20px; border:none; justify-content:center" 
                onclick="navigate('orders')">
          Kembali ke Daftar Pesanan
        </button>
      </div>
    </div>
  </div>`;
}

/** Update status pembayaran secara lokal dan render ulang */
function updatePaymentStatus(orderId, status) {
  const msg = status ? 'Konfirmasi bahwa uang telah diterima?' : 'Batalkan status penerimaan uang?';
  if (confirm(msg)) {
    // TODO: PATCH /api/orders/:id { payment_received: status }
    const scroll = document.getElementById('main-scroll');
    scroll.innerHTML = renderOrderDetail(orderId, status);
    alert(status ? 'Pembayaran berhasil dikonfirmasi!' : 'Status pembayaran dibatalkan.');
  }
}
