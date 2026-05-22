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
  freefire:     { name:'FREE FIRE',         sub:'Battle Royale · Garena',  currency:'Diamond',         img:'freefire',
    items:[{a:50,p:8000,b:''},{a:70,p:10000,b:''},{a:100,p:15000,b:''},{a:140,p:20000,b:''},
           {a:210,p:30000,b:''},{a:280,p:40000,b:''},{a:355,p:50000,b:''},
           {a:720,p:100000,b:''},{a:1450,p:200000,b:''}]},
  mobilelegend: { name:'MOBILE LEGENDS',    sub:'MOBA · Moonton',          currency:'Diamond',         img:'mobilelegend',
    items:[{a:5,p:3000,b:'5 + 0 Bonus'},{a:10,p:6000,b:'10 + 0 Bonus'},{a:12,p:15000,b:'11 + 1 Bonus'},{a:19,p:29000,b:'17 + 2 Bonus'},
           {a:28,p:43000,b:'25 + 3 Bonus'},{a:44,p:65000,b:'40 + 4 Bonus'},{a:50,p:86000,b:'50 + 0 Bonus'},{a:59,p:129000,b:'53 + 6 Bonus'},
           {a:85,p:172000,b:'77 + 8 Bonus'},{a:113,p:215000,b:'102 + 11 Bonus'},{a:170,p:344000,b:'154 + 16 Bonus'},{a:296,p:517000,b:'256 + 40 Bonus'}]},
  pubg:         { name:'PUBG MOBILE',       sub:'Battle Royale · Tencent', currency:'UC',              img:'pubg',
    items:[{a:60,p:15000,b:''},{a:180,p:43000,b:''},{a:325,p:75000,b:''},{a:660,p:149000,b:'+10'},
           {a:1800,p:390000,b:'+100'},{a:3850,p:799000,b:'+350'}]},
  genshin:      { name:'GENSHIN IMPACT',    sub:'RPG · HoYoverse',         currency:'Genesis Crystal', img:'genshin',
    items:[{a:60,p:15000,b:''},{a:330,p:75000,b:''},{a:1090,p:215000,b:'+110'},
           {a:2240,p:430000,b:'+210'},{a:3880,p:720000,b:'+650'},{a:8080,p:1430000,b:'+1600'}]},
  valorant:     { name:'VALORANT',          sub:'FPS · Riot Games',        currency:'VP',              img:'valorant',
    items:[{a:475,p:55000,b:''},{a:1000,p:110000,b:''},{a:2050,p:210000,b:''},
           {a:3650,p:370000,b:''},{a:5350,p:530000,b:''},{a:11000,p:1050000,b:''}]},
  honkai:       { name:'HONKAI: STAR RAIL', sub:'RPG · HoYoverse',         currency:'Oneiric Shard',   img:'honkai',
    items:[{a:60,p:15000,b:''},{a:330,p:75000,b:''},{a:1090,p:215000,b:'+110'},
           {a:2240,p:430000,b:'+210'},{a:3880,p:720000,b:'+650'}]},
};

const state = { user:'', umur:'', game:'', gameId:'', item:null };

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
      ${item.b ? `<div class="dbonus">+${item.b} </div>` : ''}
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

  const g = GAMES[state.game];
  document.getElementById('pay-buyer').textContent  = state.user;
  document.getElementById('pay-game').textContent   = g.name;
  document.getElementById('pay-gameid').textContent = state.gameId;
  document.getElementById('pay-item').textContent   = state.item.a.toLocaleString('id-ID') + ' ' + g.currency;
  document.getElementById('pay-price').textContent  = fmt(state.item.p);
  document.getElementById('qris-img').src = QRIS_IMG;
}

function sudahBayar() {
  const trxId = genId();
  const now   = new Date();
  const tgl   = now.toLocaleDateString('id-ID',{day:'2-digit',month:'long',year:'numeric'})
              + ' ' + now.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});
  sessionStorage.setItem('trxId', trxId);
  sessionStorage.setItem('tgl', tgl);
  window.location.href = 'bukti.html';
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
  if (!state.user || !state.item) return window.location.href = 'index.html';

  const g = GAMES[state.game];
  document.getElementById('bk-no').textContent     = trxId;
  document.getElementById('bk-tgl').textContent    = tgl;
  document.getElementById('bk-nama').textContent   = state.user + ' (Umur: ' + state.umur + ')';
  document.getElementById('bk-game').textContent   = g.name;
  document.getElementById('bk-gameid').textContent = state.gameId;
  document.getElementById('bk-item').textContent   = state.item.a.toLocaleString('id-ID') + ' ' + g.currency;
  document.getElementById('bk-harga').textContent  = fmt(state.item.p);

  const msg = encodeURIComponent(
    `🧾 *BUKTI PEMBAYARAN – ASSABIL STORE*\n\n` +
    `No. Transaksi: ${trxId}\nTanggal: ${tgl}\n\n` +
    `👤 Nama: ${state.user} (Umur: ${state.umur})\n` +
    `🎮 Game: ${g.name}\n🆔 ID Game: ${state.gameId}\n` +
    `💎 Item: ${state.item.a.toLocaleString('id-ID')} ${g.currency}${state.item.b?' + '+state.item.b+' Bonus':''}\n` +
    `💰 Total: ${fmt(state.item.p)}\n\n✅ Pembayaran via QRIS\nStatus: LUNAS – Mohon segera diproses 🙏`
  );
  document.getElementById('btn-wa-send').href = 'https://wa.me/6283802687742?text=' + msg;
}

function goHome() {
  sessionStorage.removeItem('game');
  sessionStorage.removeItem('gameId');
  sessionStorage.removeItem('item');
  sessionStorage.removeItem('trxId');
  sessionStorage.removeItem('tgl');
  window.location.href = 'games.html';
}
