/* ============================================================
   app.js — Core shell: sidebar builder, router, topbar
   ============================================================ */

/** Build sidebar navigation from MENUS[role] */
function buildSidebar() {
  const nav   = document.getElementById('sb-nav');
  const items = MENUS[APP.role];
  let html = '';

  items.forEach(item => {
    if (item.section) {
      html += `<div class="sb-section">${item.section}</div>`;
    } else {
      const badge = item.badge
        ? `<span class="sb-badge ${item.badgeClass || ''}">${item.badge}</span>`
        : '';
      const icon = ICONS[item.icon] || '';
      html += `
        <button class="sb-item" id="nav-${item.id}" onclick="navigate('${item.id}')">
          <span class="sb-item-icon">${icon}</span>
          <span>${item.label}</span>
          ${badge}
        </button>`;
    }
  });

  nav.innerHTML = html;

  // Update role label and avatar text
  document.getElementById('sb-role-label').textContent =
    APP.role === 'merchant' ? 'Mitra Merchant' : 'Administrator';
  document.getElementById('topbar-avatar').textContent =
    APP.role === 'merchant' ? 'M' : 'A';
}

/** Navigate to a page: update sidebar highlight, topbar, and render content */
function navigate(page) {
  APP.page = page;

  // Update active state in sidebar
  document.querySelectorAll('.sb-item').forEach(el => el.classList.remove('active'));
  const navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');

  // Update topbar title/subtitle
  const tb = TOPBAR[APP.role][page] || ['EcoEats', ''];
  document.getElementById('topbar-title').textContent = tb[0];
  document.getElementById('topbar-sub').textContent   = tb[1];

  // Show/hide contextual topbar action button
  const action = document.getElementById('topbar-action');
  if (page === 'listings') {
    action.textContent = 'Tambah Listing';
    action.classList.remove('hide');
  } else if (page === 'users') {
    action.textContent = 'Export CSV';
    action.classList.remove('hide');
  } else {
    action.classList.add('hide');
  }

  // Render page content with fade animation
  const scroll = document.getElementById('main-scroll');
  scroll.className = 'main-scroll fade-in';
  void scroll.offsetWidth; // force reflow to restart animation
  scroll.innerHTML = render(page);
  bindPageEvents(page);
}

/** Handle topbar action button click */
function topbarAction() {
  if (APP.page === 'listings') {
    navigate('add-listing');
  } else if (APP.page === 'users') {
    // TODO: connect to CSV export endpoint
    alert('Export CSV akan diproses.');
  }
}

/** Route page id to its render function */
function render(page) {
  const routes = {
    'dashboard':        () => APP.role === 'merchant' ? renderMerchantDashboard() : (APP.role === 'admin' ? renderAdminDashboard() : renderCart()),
    'add-listing':      renderAddListing,
    'listings':         renderListings,
    'orders':           () => renderOrders('pending'),
    'orders-confirmed': () => renderOrders('confirmed'),
    'orders-ready':     () => renderOrders('ready'),
    'order-detail':     () => APP.pages.orderDetail.render({ orderId: 'ORD-20240612-001' }),
    'history':          renderHistory,
    'profile':          renderProfile,
    'verif-status':     renderVerifStatus,
    'verifikasi':       renderVerifikasi,
    // Merchant analytics
    'analytics':        () => APP.role === 'merchant' ? renderMerchantAnalytics() : renderAdminPlatformAnalytics(),
    // Admin management pages
    'users':            renderAdminUsers,
    'admin-merchants':  renderAdminMerchants,
    // User/Customer pages
    'cart':             renderCart,
    'checkout':         renderCheckout,
    'user-addresses':   renderUserAddresses,
  };
  return (routes[page] || (() => `<p class="color-sub">Halaman belum tersedia.</p>`))();
}

/** Bind generic DOM events after a page renders */
function bindPageEvents(page) {
  // Inner tab switching (data-tab / data-panel pattern)
  document.querySelectorAll('[data-tab]').forEach(tab => {
    tab.addEventListener('click', function () {
      const group = this.dataset.group;
      document.querySelectorAll(`[data-tab][data-group="${group}"]`)
        .forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll(`[data-panel][data-group="${group}"]`)
        .forEach(p => p.classList.add('hide'));
      const panel = document.getElementById('tab-' + this.dataset.tab);
      if (panel) panel.classList.remove('hide');
    });
  });

  // Photo upload preview on add-listing page
  if (page === 'add-listing') {
    const photoInput = document.getElementById('listing-photo');
    if (photoInput) photoInput.addEventListener('change', handlePhotoUpload);
  }

  // Checkout page: address selection
  if (page === 'checkout') {
    const addressSelect = document.getElementById('checkout-address');
    if (addressSelect) {
      addressSelect.addEventListener('change', function() {
        // TODO: fetch address details from API and update preview
        document.getElementById('checkout-address-preview').textContent = 
          'Alamat yang dipilih: ' + (this.options[this.selectedIndex].text || 'Pilih alamat');
      });
    }
  }

  // User addresses page: file upload & modal
  if (page === 'user-addresses') {
    const modal = document.getElementById('address-modal');
    if (modal) {
      modal.addEventListener('click', closeAddressModal);
    }
  }

  if (page === 'profile') {
    initProfileMap();
  }
}

/** Session logout — clear role and redirect to login */
function logout() {
  localStorage.removeItem('userRole');
  window.location.href = 'login.html';
}