/* ============================================================
   config.js — App state, menu definitions, topbar labels
   ============================================================ */

/** Global app state — role and active page */
const APP = { role: 'merchant', page: 'dashboard' };

/** Sidebar menu definitions per role.
 *  icon: SVG icon name (mapped in buildSidebar via ICONS), label: display text */
const MENUS = {
  merchant: [
    { section: 'Overview' },
    { id: 'dashboard',    icon: 'chart',    label: 'Dashboard' },
    { section: 'Menu Surplus' },
    { id: 'add-listing',  icon: 'plus',     label: 'Tambah Listing' },
    { id: 'listings',     icon: 'box',      label: 'Kelola Listing' },
    { section: 'Pesanan' },
    { id: 'orders',       icon: 'cart',     label: 'Pesanan Masuk', badge: '3', badgeClass: 'grn' },
    { id: 'history',      icon: 'list',     label: 'Riwayat Pesanan' },
    { section: 'Akun' },
    { id: 'profile',      icon: 'store',    label: 'Profil Usaha' },
    { id: 'verif-status', icon: 'check',    label: 'Status Verifikasi' },
  ],
  admin: [
    { section: 'Overview' },
    { id: 'dashboard',       icon: 'chart',   label: 'Dashboard' },
    { id: 'analytics',       icon: 'trend',   label: 'Analitik' },
    { section: 'Manajemen' },
    { id: 'users',           icon: 'users',   label: 'Kelola Pengguna' },
    { id: 'admin-merchants', icon: 'store',   label: 'Kelola Merchant' },
    { id: 'admin-listings',  icon: 'box',     label: 'Kelola Listing' },
    { id: 'admin-orders',    icon: 'cart',    label: 'Kelola Pesanan' },
    { section: 'Verifikasi' },
    { id: 'verifikasi',      icon: 'check',   label: 'Verifikasi Merchant', badge: '5' },
    { id: 'laporan',         icon: 'alert',   label: 'Laporan Pelanggaran', badge: '2' },
  ]
};

/** Topbar title/subtitle per role and page */
const TOPBAR = {
  merchant: {
    'dashboard':    ['Dashboard',          'Ringkasan aktivitas usaha Anda'],
    'add-listing':  ['Tambah Listing',     'Daftarkan makanan surplus baru'],
    'listings':     ['Kelola Listing',     'Kelola menu surplus Anda'],
    'orders':       ['Pesanan Masuk',      'Pesanan yang perlu dikonfirmasi'],
    'history':      ['Riwayat Pesanan',    'Semua transaksi yang telah selesai'],
    'profile':      ['Profil Usaha',       'Informasi lengkap usaha Anda'],
    'verif-status': ['Status Verifikasi',  'Status pendaftaran mitra merchant'],
  },
  admin: {
    'dashboard':        ['Dashboard Admin',       'Ikhtisar platform EcoEats'],
    'analytics':        ['Analitik',              'Data dan tren platform'],
    'users':            ['Kelola Pengguna',        'Manajemen akun pengguna'],
    'admin-merchants':  ['Kelola Merchant',        'Daftar seluruh merchant terdaftar'],
    'admin-listings':   ['Kelola Listing',         'Pantau semua listing aktif'],
    'admin-orders':     ['Kelola Pesanan',         'Monitor semua transaksi'],
    'verifikasi':       ['Verifikasi Merchant',    'Tinjau pengajuan merchant baru'],
    'laporan':          ['Laporan Pelanggaran',    'Tinjau laporan pengguna'],
  }
};

/** Inline SVG icon map — keeps HTML clean and avoids emoji dependency */
const ICONS = {
  chart:  `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  plus:   `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  box:    `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
  cart:   `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  list:   `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  store:  `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l1-5h16l1 5"/><path d="M3 9h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9z"/><path d="M9 21V12h6v9"/></svg>`,
  check:  `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  users:  `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  trend:  `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  alert:  `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  logout: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  leaf:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
};
