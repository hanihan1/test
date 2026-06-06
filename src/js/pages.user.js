/* ============================================================
   pages.user.js — Render functions for customer/user pages
   (Shopping Cart, Checkout, User Addresses)
   ============================================================ */

/** Helper: format rupiah */
const formatRp = n => 'Rp ' + Number(n).toLocaleString('id-ID');

/* ── Shopping Cart ── */
function renderCart() {
  return `
  <div class="grid-3">
    <!-- Cart items list -->
    <div style="grid-column:1/-1;margin-bottom:20px">
      <div class="card2">
        <div class="card-head">Keranjang Belanja</div>
        <div class="card-body">
          <div id="cart-items-list">
            <!-- TODO: populate from localStorage or API /api/cart -->
            <p class="color-sub" style="text-align:center;padding:32px">
              Keranjang Anda kosong. <a href="#" onclick="navigate('listings');return false;">Mulai belanja &rarr;</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart summary (sticky) -->
    <div style="grid-column:1/-1">
      <div class="card2">
        <div class="card-head">Ringkasan Pesanan</div>
        <div class="card-body">
          <div class="summary-row mb-12">
            <span>Subtotal</span>
            <span id="cart-subtotal">Rp 0</span>
          </div>
          <div class="summary-row mb-12">
            <span>Diskon Surplus</span>
            <span id="cart-discount" style="color:var(--grn)">-Rp 0</span>
          </div>
          <div class="summary-row mb-12">
            <span>Biaya Layanan</span>
            <span id="cart-fee">Rp 2.500</span>
          </div>
          <hr style="margin:12px 0;border:none;border-top:1px solid var(--brd)">
          <div class="summary-row" style="font-weight:600;font-size:16px;margin-bottom:16px">
            <span>Total</span>
            <span id="cart-total">Rp 0</span>
          </div>
          <button class="btn btn-grn" style="width:100%;justify-content:center" onclick="navigate('checkout')">
            Lanjut ke Pembayaran
          </button>
          <button class="btn btn-out" style="width:100%;justify-content:center;margin-top:8px" onclick="navigate('listings')">
            Lanjut Belanja
          </button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ── Checkout & Payment ── */
function renderCheckout() {
  return `
  <div style="max-width:800px;margin:0 auto">
    <!-- Order review -->
    <div class="card2 mb-16">
      <div class="card-head">Ringkasan Pesanan</div>
      <table class="tbl" style="margin:0">
        <thead>
          <tr>
            <th>Produk</th><th style="text-align:right">Qty</th>
            <th style="text-align:right">Harga</th><th style="text-align:right">Total</th>
          </tr>
        </thead>
        <tbody id="checkout-items-tbody">
          <!-- TODO: populate from cart -->
          <tr><td colspan="4" class="color-sub" style="text-align:center;padding:24px">Memuat item...</td></tr>
        </tbody>
      </table>
    </div>

    <!-- Delivery address selection -->
    <div class="card2 mb-16">
      <div class="card-head">
        Alamat Pengiriman
        <a href="#" onclick="navigate('user-addresses');return false;" style="float:right;font-size:12px;color:var(--btn)">Kelola Alamat</a>
      </div>
      <div class="card-body">
        <select class="form-select" id="checkout-address">
          <!-- TODO: populate from /api/user-addresses -->
          <option value="">-- Pilih Alamat --</option>
          <option value="addr-1">Jl. Merdeka No.10, Jakarta Pusat (Rumah)</option>
          <option value="addr-2">Jl. Gatot Subroto No.5, Jakarta Selatan (Kantor)</option>
        </select>
        <div style="margin-top:12px;padding:12px;background:var(--bg2);border-radius:6px;font-size:12px;color:var(--sub)" id="checkout-address-preview">
          <!-- Address details will show here -->
        </div>
      </div>
    </div>

    <!-- Payment method selection -->
    <div class="card2 mb-16">
      <div class="card-head">Metode Pembayaran</div>
      <div class="card-body">
        <div class="payment-methods">
          <label class="payment-method-item">
            <input type="radio" name="payment_method" value="transfer" checked>
            <div class="pmi-content">
              <div class="pmi-title">Transfer Bank</div>
              <div class="pmi-sub">BCA, Mandiri, BRI, CIMB Niaga</div>
            </div>
          </label>

          <label class="payment-method-item">
            <input type="radio" name="payment_method" value="ewallet">
            <div class="pmi-content">
              <div class="pmi-title">E-Wallet</div>
              <div class="pmi-sub">GoPay, OVO, Dana, LinkAja</div>
            </div>
          </label>

          <label class="payment-method-item">
            <input type="radio" name="payment_method" value="cod">
            <div class="pmi-content">
              <div class="pmi-title">Bayar di Tempat (COD)</div>
              <div class="pmi-sub">Bayar langsung saat pickup</div>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!-- Payment summary & CTA -->
    <div class="card2">
      <div class="card-body">
        <div class="summary-row mb-12">
          <span>Subtotal</span>
          <span id="checkout-subtotal">Rp 0</span>
        </div>
        <div class="summary-row mb-12">
          <span>Biaya Layanan</span>
          <span>Rp 2.500</span>
        </div>
        <hr style="margin:12px 0;border:none;border-top:1px solid var(--brd)">
        <div class="summary-row" style="font-weight:600;font-size:18px;color:var(--btn);margin-bottom:20px">
          <span>Total Pembayaran</span>
          <span id="checkout-total">Rp 0</span>
        </div>
        <button class="btn btn-grn" style="width:100%;justify-content:center" onclick="submitOrder()">
          Konfirmasi Pesanan
        </button>
        <button class="btn btn-out" style="width:100%;justify-content:center;margin-top:8px" onclick="navigate('cart')">
          Kembali ke Keranjang
        </button>
      </div>
    </div>
  </div>`;
}

/** Handle order submission — TODO: POST /api/orders with order_items & payment_method */
function submitOrder() {
  const address = document.getElementById('checkout-address').value;
  const paymentMethod = document.querySelector('input[name="payment_method"]:checked').value;

  if (!address) {
    alert('Pilih alamat pengiriman terlebih dahulu.');
    return;
  }

  // TODO: call API to create order
  alert(`Pesanan berhasil dibuat!\nMetode: ${paymentMethod}\nAnda akan dialihkan ke halaman pembayaran.`);
}

/* ── User Addresses Management ── */
function renderUserAddresses() {
  return `
  <div style="max-width:600px;margin:0 auto">
    <!-- Add address button -->
    <div style="margin-bottom:16px">
      <button class="btn btn-grn" onclick="openAddressModal()">+ Tambah Alamat Baru</button>
    </div>

    <!-- Address list -->
    <div id="addresses-list">
      <!-- TODO: populate from /api/user-addresses -->
      <div class="card2 mb-12">
        <div class="card-body">
          <div class="flex-row" style="justify-content:space-between;align-items:flex-start;margin-bottom:8px">
            <div>
              <div style="font-weight:600;margin-bottom:4px">Rumah</div>
              <div style="font-size:13px;color:var(--sub);margin-bottom:8px">
                Jl. Merdeka No.10, RT 05 RW 03<br>
                Jakarta Pusat, DKI Jakarta 12130
              </div>
              <div style="font-size:12px">
                <span class="badge badge-grn">Alamat Utama</span>
              </div>
            </div>
            <div style="display:flex;gap:8px">
              <button class="btn btn-sm btn-out" onclick="editAddress('addr-1')">Edit</button>
              <button class="btn btn-sm btn-red" onclick="deleteAddress('addr-1')">Hapus</button>
            </div>
          </div>
        </div>
      </div>

      <div class="card2 mb-12">
        <div class="card-body">
          <div class="flex-row" style="justify-content:space-between;align-items:flex-start;margin-bottom:8px">
            <div>
              <div style="font-weight:600;margin-bottom:4px">Kantor</div>
              <div style="font-size:13px;color:var(--sub);margin-bottom:8px">
                Jl. Gatot Subroto No.5, Lantai 10<br>
                Jakarta Selatan, DKI Jakarta 12950
              </div>
            </div>
            <div style="display:flex;gap:8px">
              <button class="btn btn-sm btn-out" onclick="editAddress('addr-2')">Edit</button>
              <button class="btn btn-sm btn-red" onclick="deleteAddress('addr-2')">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit address modal overlay (hidden by default) -->
    <div id="address-modal" class="modal-overlay hide" onclick="closeAddressModal()">
      <div class="card2" style="max-width:500px;margin:50px auto" onclick="event.stopPropagation()">
        <div class="card-head" id="address-modal-title">Tambah Alamat Baru</div>
        <div class="card-body">
          <div class="form-group mb-12">
            <label class="form-label">Label Alamat (Rumah, Kantor, dll)</label>
            <input class="form-input" id="addr-label" placeholder="Contoh: Rumah">
          </div>

          <div class="form-group mb-12">
            <label class="form-label">Alamat Lengkap</label>
            <textarea class="form-textarea" id="addr-street"
              placeholder="Jl. Merdeka No.10, RT 05 RW 03" rows="3"></textarea>
          </div>

          <div class="form-row mb-12">
            <div class="form-group">
              <label class="form-label">Kota/Kabupaten</label>
              <input class="form-input" id="addr-city" placeholder="Jakarta Pusat">
            </div>
            <div class="form-group">
              <label class="form-label">Provinsi</label>
              <input class="form-input" id="addr-province" placeholder="DKI Jakarta">
            </div>
          </div>

          <div class="form-row mb-12">
            <div class="form-group">
              <label class="form-label">Kode Pos</label>
              <input class="form-input" id="addr-zip" placeholder="12130">
            </div>
            <div class="form-group">
              <label class="form-label">Nomor Telepon</label>
              <input class="form-input" id="addr-phone" placeholder="08123456789">
            </div>
          </div>

          <div class="form-group mb-16">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:500">
              <input type="checkbox" id="addr-default">
              Jadikan Alamat Utama
            </label>
          </div>

          <div style="display:flex;gap:10px;justify-content:flex-end">
            <button class="btn btn-out" onclick="closeAddressModal()">Batal</button>
            <button class="btn btn-grn" onclick="saveAddress()">Simpan Alamat</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/** Open address modal for adding new address */
function openAddressModal() {
  document.getElementById('address-modal-title').textContent = 'Tambah Alamat Baru';
  document.getElementById('addr-label').value = '';
  document.getElementById('addr-street').value = '';
  document.getElementById('addr-city').value = '';
  document.getElementById('addr-province').value = '';
  document.getElementById('addr-zip').value = '';
  document.getElementById('addr-phone').value = '';
  document.getElementById('addr-default').checked = false;
  document.getElementById('address-modal').classList.remove('hide');
}

/** Close address modal */
function closeAddressModal() {
  document.getElementById('address-modal').classList.add('hide');
}

/** Edit existing address — TODO: load current values from API */
function editAddress(addrId) {
  document.getElementById('address-modal-title').textContent = 'Edit Alamat';
  // TODO: populate form with current address data
  document.getElementById('address-modal').classList.remove('hide');
}

/** Delete address — TODO: call DELETE /api/user-addresses/:id */
function deleteAddress(addrId) {
  if (confirm('Hapus alamat ini?')) {
    // TODO: call API to delete
    alert('Alamat berhasil dihapus.');
  }
}

/** Save address (add or update) — TODO: POST or PATCH /api/user-addresses */
function saveAddress() {
  const label = document.getElementById('addr-label').value.trim();
  const street = document.getElementById('addr-street').value.trim();
  const city = document.getElementById('addr-city').value.trim();
  const province = document.getElementById('addr-province').value.trim();
  const zip = document.getElementById('addr-zip').value.trim();
  const phone = document.getElementById('addr-phone').value.trim();

  if (!label || !street || !city || !province || !zip || !phone) {
    alert('Lengkapi semua field yang diperlukan.');
    return;
  }

  // TODO: POST /api/user-addresses
  alert('Alamat berhasil disimpan.');
  closeAddressModal();
}
