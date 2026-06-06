APP.pages.orderDetail = {
  title: "Detail Pesanan",
  sub: "Informasi lengkap pesanan",
  render: (params) => {
    const orderId = params.orderId;
    // Mock data
    const order = {
      id: orderId,
      items: ["Nasi Goreng", "Es Teh"],
      total: 25000,
      statusBayar: "Belum Bayar",
      kodePickup: "PK12345",
      uangDiterima: params.paid || false,
      metode: "Transfer Bank"
    };

    return `
      <div style="max-width:600px; margin: 0 auto;">
        <div class="card2">
          <div class="card-head" style="background: var(--grn); color: white;">
            Pesanan Berhasil Diterima
            <span style="float:right">#${order.id}</span>
          </div>
          <div class="card-body">
            <div style="margin-bottom:20px; padding-bottom:15px; border-bottom:1px solid var(--brd)">
              <label class="form-label" style="color:var(--sub)">Daftar Makanan</label>
              <ul style="list-style:none; padding-left:0; font-weight:600; font-size:15px">
                ${order.items.map(it => `<li>• ${it}</li>`).join('')}
              </ul>
            </div>

            <div class="grid-2 mb-20">
              <div>
                <label class="form-label" style="color:var(--sub)">Total Harga</label>
                <div style="font-size:18px; font-weight:700; color:var(--btn)">Rp ${order.total.toLocaleString('id-ID')}</div>
              </div>
              <div>
                <label class="form-label" style="color:var(--sub)">Status Bayar</label>
                <div style="font-weight:600">${order.statusBayar} (${order.metode})</div>
              </div>
            </div>

            <div class="alert alert-grn mb-20" style="text-align:center">
              <div style="font-size:12px; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px">Kode Pickup</div>
              <div style="font-size:28px; font-weight:800; font-family:'DM Mono', monospace;">${order.kodePickup}</div>
            </div>

            <div id="payment-status-container">
              <div class="flex-row" style="justify-content:space-between; align-items:center; padding:12px; background:var(--bg2); border-radius:8px">
                <span style="font-weight:600">Uang Diterima:</span>
                <span class="badge ${order.uangDiterima ? 'badge-grn' : 'badge-org'}" id="payment-badge">
                  ${order.uangDiterima ? "✓ Sudah Diterima" : "⏳ Belum Diterima"}
                </span>
              </div>

              ${!order.uangDiterima ? `
                <button class="btn btn-grn" style="width:100%; margin-top:12px; justify-content:center" 
                        onclick="APP.pages.orderDetail.markAsPaid('${order.id}')">
                  Konfirmasi Uang Sudah Diterima
                </button>
              ` : `
                <button class="btn btn-out" style="width:100%; margin-top:12px; justify-content:center" 
                        onclick="APP.pages.orderDetail.unmarkPaid('${order.id}')">
                  Batalkan Status Diterima
                </button>
              `}
            </div>

            <button class="btn btn-out" style="width:100%; margin-top:20px; border:none; justify-content:center" onclick="navigate('orders')">Kembali ke Daftar Pesanan</button>
          </div>
        </div>
      </div>
    `;
  },

  markAsPaid: (orderId) => {
    // Simulasi update status ke database
    if(confirm('Konfirmasi bahwa uang untuk pesanan ini telah Anda terima?')) {
      // Di aplikasi nyata, panggil API PATCH di sini
      alert('Status pembayaran berhasil diperbarui!');
      // Render ulang dengan status paid: true
      const scroll = document.getElementById('main-scroll');
      scroll.innerHTML = APP.pages.orderDetail.render({ orderId, paid: true });
    }
  },

  unmarkPaid: (orderId) => {
    if(confirm('Batalkan status penerimaan uang?')) {
      alert('Status pembayaran dikembalikan ke Belum Diterima.');
      const scroll = document.getElementById('main-scroll');
      scroll.innerHTML = APP.pages.orderDetail.render({ orderId, paid: false });
    }
  }
};
