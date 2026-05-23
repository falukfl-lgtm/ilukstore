const IMGS = {
  freefire:     'freefire.jpg',
  mobilelegend: 'mobilelegend.jpg',
  pubg:         'pubg.jpg',
  genshin:      'genshin.jpg',
  valorant:     'valorant.jpg',
  honkai:       'honkai.jpg',
};

const QRIS_IMG = 'qris.jpg';

const GAMES = {
  freefire:     { name:'FREE FIRE',         sub:'Battle Royale · Garena',  currency:'Diamond',         img:'freefire',     vipCode:'FF',
    items:[{a:50,p:8000,v:'ff-50-diamond'},{a:70,p:10000,v:'ff-70-diamond'},{a:100,p:15000,v:'ff-100-diamond'},{a:140,p:20000,v:'ff-140-diamond'},
           {a:210,p:30000,v:'ff-210-diamond'},{a:280,p:40000,v:'ff-280-diamond'},{a:355,p:50000,v:'ff-355-diamond'},
           {a:720,p:100000,v:'ff-720-diamond'},{a:1450,p:200000,v:'ff-1450-diamond'}]},
  mobilelegend: { name:'MOBILE LEGENDS',    sub:'MOBA · Moonton',          currency:'Diamond',         img:'mobilelegend', vipCode:'ML',
    items:[{a:5,p:3000,v:'ml-5-diamond'},{a:12,p:15000,v:'ml-12-diamond'},{a:28,p:43000,v:'ml-28-diamond'},
           {a:44,p:65000,v:'ml-44-diamond'},{a:59,p:129000,v:'ml-59-diamond'},{a:85,p:172000,v:'ml-85-diamond'},
           {a:170,p:344000,v:'ml-170-diamond'},{a:296,p:517000,v:'ml-296-diamond'}]},
  pubg:         { name:'PUBG MOBILE',       sub:'Battle Royale · Tencent', currency:'UC',              img:'pubg',         vipCode:'PUBG',
    items:[{a:60,p:15000,v:'pubg-60-uc'},{a:180,p:43000,v:'pubg-180-uc'},{a:325,p:75000,v:'pubg-325-uc'},
           {a:660,p:149000,v:'pubg-660-uc'},{a:1800,p:390000,v:'pubg-1800-uc'}]},
  genshin:      { name:'GENSHIN IMPACT',    sub:'RPG · HoYoverse',         currency:'Genesis Crystal', img:'genshin',      vipCode:'GENSHIN',
    items:[{a:60,p:15000,v:'genshin-60-crystal'},{a:330,p:75000,v:'genshin-330-crystal'},
           {a:1090,p:215000,v:'genshin-1090-crystal'},{a:2240,p:430000,v:'genshin-2240-crystal'}]},
  valorant:     { name:'VALORANT',          sub:'FPS · Riot Games',        currency:'VP',              img:'valorant',     vipCode:'VALORANT',
    items:[{a:475,p:55000,v:'valorant-475-vp'},{a:1000,p:110000,v:'valorant-1000-vp'},
           {a:2050,p:210000,v:'valorant-2050-vp'},{a:3650,p:370000,v:'valorant-3650-vp'}]},
  honkai:       { name:'HONKAI: STAR RAIL', sub:'RPG · HoYoverse',         currency:'Oneiric Shard',   img:'honkai',       vipCode:'HONKAI',
    items:[{a:60,p:15000,v:'honkai-60-shard'},{a:330,p:75000,v:'honkai-330-shard'},
           {a:1090,p:215000,v:'honkai-1090-shard'},{a:2240,p:430000,v:'honkai-2240-shard'}]},
};

const state = { user:'', umur:'', game:'', gameId:'', zoneId:'', item:null };

const fmt   = n => 'Rp ' + n.toLocaleString('id-ID');
const genId = () => 'ASB-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2,5).toUpperCase();

function toast(msg, d=2800) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), d);
}

/* ── LOGIN ── */
function doLogin() {
  const n = document.getElementById('inp-nama').value.trim();
  const u = document.getElementById('inp-umur').value.trim();
  if (!n) return toast('⚠️ Nama tidak boleh kosong!');
  if (!u || +u < 1) return toast('⚠️ Umur tidak valid!');
  state.user = n; state.umur = u;
  sessionStorage.setItem('user', n);
  sessionStorage.setItem('umur', u);
  window.location.href = 'games.html';
}

/* ── GAMES ── */
function loadGames() {
  state.user = sessionStorage.getItem('user') || '';
  if (!state.user) return window.location.href = 'index.html';
  const el = document.getElementById('user-display');
  if (el) el.textContent = state.user;

  const grid = document.getElementById('games-grid');
  if (!grid) return;

  const badges = { freefire:'🔥 HOT', mobilelegend:'⚡ TOP' };
  Object.entries(GAMES).forEach(([key, g]) => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.onclick = () => { sessionStorage.setItem('game', key); window.location.href = 'topup.html'; };
    card.innerHTML = `
      ${badges[key] ? `<div class="badge">${badges[key]}</div>` : ''}
      <img src="${IMGS[g.img]}" alt="${g.name}">
      <div class="info">
        <div class="gname">${g.name}</div>
        <div class="gsub">${g.sub}</div>
      </div>`;
    grid.appendChild(card);
  });
}

/* ── TOPUP ── */
function loadTopup() {
  state.user = sessionStorage.getItem('user') || '';
  state.game = sessionStorage.getItem('game') || '';
  if (!state.user || !state.game) return window.location.href = 'index.html';

  const el = document.getElementById('user-display');
  if (el) el.textContent = state.user;

  const g = GAMES[state.game];
  document.getElementById('gh-img').src = IMGS[g.img];
  document.getElementById('gh-name').textContent = g.name;
  document.getElementById('gh-sub').textContent  = g.sub;

  const grid = document.getElementById('nominal-grid');
  grid.innerHTML = '';
  g.items.forEach(item => {
    const d = document.createElement('div');
    d.className = 'nom-card';
    d.innerHTML = `
      <div class="diam">${item.a.toLocaleString('id-ID')}</div>
      <div class="dlabel">💎 ${g.currency}</div>
      <div class="dprice">${fmt(item.p)}</div>
      <div class="chk">✓</div>`;
    d.onclick = () => selectNom(d, item);
    grid.appendChild(d);
  });
}

function selectNom(el, item) {
  document.querySelectorAll('.nom-card').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  state.item = item;
  sessionStorage.setItem('item', JSON.stringify(item));
  document.getElementById('btn-bayar').disabled = false;
}

function doBayar() {
  const gid = document.getElementById('inp-game-id').value.trim();
  if (!gid) return toast('⚠️ Masukkan ID game kamu dulu!');
  if (!state.item) return toast('⚠️ Pilih nominal dulu!');
  sessionStorage.setItem('gameId', gid);
  window.location.href = 'payment.html';
}

/* ── PAYMENT ── */
function loadPayment() {
  state.user   = sessionStorage.getItem('user') || '';
  state.game   = sessionStorage.getItem('game') || '';
  state.gameId = sessionStorage.getItem('gameId') || '';
  state.item   = JSON.parse(sessionStorage.getItem('item') || 'null');
  if (!state.user || !state.game || !state.item) return window.location.href = 'index.html';

  const el = document.getElementById('user-display');
  if (el) el.textContent = state.user;

  const g = GAMES[state.game];
  document.getElementById('pay-buyer').textContent  = state.user;
  document.getElementById('pay-game').textContent   = g.name;
  document.getElementById('pay-gameid').textContent = state.gameId;
  document.getElementById('pay-item').textContent   = state.item.a.toLocaleString('id-ID') + ' ' + g.currency;
  document.getElementById('pay-price').textContent  = fmt(state.item.p);
  document.getElementById('qris-img').src = QRIS_IMG;
}

/* ── PROSES TOP UP OTOMATIS ── */
 async function sudahBayar() {
  const trxId = genId();
  const now   = new Date();
  const tgl   = now.toLocaleDateString('id-ID',{day:'2-digit',month:'long',year:'numeric'})
              + ' ' + now.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});

  state.user   = sessionStorage.getItem('user') || '';
  state.game   = sessionStorage.getItem('game') || '';
  state.gameId = sessionStorage.getItem('gameId') || '';
  state.item   = JSON.parse(sessionStorage.getItem('item') || 'null');

  const g = GAMES[state.game];

  const btn = document.getElementById('btn-paid');
  btn.textContent = '⏳ Menyimpan order...';
  btn.disabled = true;

  try {
    // Simpan order ke Supabase via Netlify Function
    const res = await fetch('/.netlify/functions/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        buyerName:   state.user,
        productCode: state.item.v,
        gameId:      state.gameId,
        zoneId:      state.zoneId || '',
        itemName:    state.item.a + ' ' + g.currency,
        price:       state.item.p,
        trxId:       trxId,
        tgl:         tgl
      })
    });

    const data = await res.json();

    sessionStorage.setItem('trxId', trxId);
    sessionStorage.setItem('tgl', tgl);
    sessionStorage.setItem('topupStatus', 'pending');

    window.location.href = 'bukti.html';

  } catch (err) {
    btn.textContent = '✅ SAYA SUDAH BAYAR';
    btn.disabled = false;
    toast('❌ Gagal menyimpan order. Coba lagi!');
    console.error(err);
  }
 }
 
/* ── BUKTI ── */
function loadBukti() {
  state.user   = sessionStorage.getItem('user') || '';
  state.umur   = sessionStorage.getItem('umur') || '';
  state.game   = sessionStorage.getItem('game') || '';
  state.gameId = sessionStorage.getItem('gameId') || '';
  state.item   = JSON.parse(sessionStorage.getItem('item') || 'null');
  const trxId  = sessionStorage.getItem('trxId') || '-';
  const tgl    = sessionStorage.getItem('tgl') || '-';
  const topupStatus = sessionStorage.getItem('topupStatus') || 'pending';
  if (!state.user || !state.item) return window.location.href = 'index.html';

  const g = GAMES[state.game];
  document.getElementById('bk-no').textContent     = trxId;
  document.getElementById('bk-tgl').textContent    = tgl;
  document.getElementById('bk-nama').textContent   = state.user + ' (Umur: ' + state.umur + ')';
  document.getElementById('bk-game').textContent   = g.name;
  document.getElementById('bk-gameid').textContent = state.gameId;
  document.getElementById('bk-item').textContent   = state.item.a.toLocaleString('id-ID') + ' ' + g.currency;
  document.getElementById('bk-harga').textContent  = fmt(state.item.p);

  // Update status berdasarkan hasil top up
  const statusEl = document.querySelector('.bv.ok');
  if (statusEl) {
    if (topupStatus === 'success') {
      statusEl.textContent = '✅ LUNAS – TOP UP DIPROSES';
      statusEl.style.color = '#2ed573';
    } else {
      statusEl.textContent = '⏳ LUNAS – MENUNGGU KONFIRMASI';
      statusEl.style.color = '#ffa502';
    }
  }

  const msg = encodeURIComponent(
    `🧾 *BUKTI PEMBAYARAN – ASSABIL STORE*\n\n` +
    `No. Transaksi: ${trxId}\nTanggal: ${tgl}\n\n` +
    `👤 Nama: ${state.user} (Umur: ${state.umur})\n` +
    `🎮 Game: ${g.name}\n🆔 ID Game: ${state.gameId}\n` +
    `💎 Item: ${state.item.a.toLocaleString('id-ID')} ${g.currency}\n` +
    `💰 Total: ${fmt(state.item.p)}\n\n✅ Pembayaran via QRIS\nStatus: LUNAS`
  );
  document.getElementById('btn-wa-send').href = 'https://wa.me/6283802687742?text=' + msg;
}

function goHome() {
  sessionStorage.removeItem('game');
  sessionStorage.removeItem('gameId');
  sessionStorage.removeItem('item');
  sessionStorage.removeItem('trxId');
  sessionStorage.removeItem('tgl');
  sessionStorage.removeItem('topupStatus');
  window.location.href = 'games.html';
}
