/*
 * sorting-view.js — L1 Sıralama Laboratuvarı (Lab Uygulaması 1).
 *   Adım adım  : seçilen algoritmayı slayttaki sözde kodla, kare kare oynatır
 *   Karşılaştır: aynı girdide beş algoritmanın karşılaştırma / yer değiştirme sayıları
 *   Süre ölçümü: ödevdeki deney: 10 … 1.000.000 eleman, 5 tekrar, ortalama ms, süre sınırı
 */
(function (OSLab) {
  'use strict';

  const { SORTS, SORT_ORDER, CODE } = OSLab.algos;
  const UI = OSLab.algoUI;
  const SIZES = [10, 100, 1000, 10000, 100000, 1000000];
  const SPEEDS = [['0.5', 'Yavaş', 1100], ['1', 'Normal', 550], ['2', 'Hızlı', 220], ['4', 'Çok hızlı', 70]];
  const INPUTS = [['random', 'Rastgele'], ['sorted', 'Sıralı (artan)'], ['reversed', 'Ters sıralı'], ['nearly', 'Neredeyse sıralı'], ['slide', 'Slayttaki dizi'], ['custom', 'Kendi dizim']];
  const SLIDE = { selection: [89, 45, 68, 90, 29, 34, 17], bubble: [89, 45, 68, 90, 29, 34, 17], insertion: [89, 45, 68, 90, 29, 34], merge: [8, 3, 2, 9, 7, 1, 5, 4], quick: [5, 3, 1, 9, 8, 2, 4, 7] };

  const S = {
    tab: 'step',
    algo: 'insertion',
    input: 'random',
    n: 12,
    custom: '38, 27, 43, 3, 9, 82, 10',
    early: false,
    speed: '1',
    arr: [],
    frames: [],
    i: 0,
    timer: 0,
    bench: null // { running, stop, results }
  };
  let root = null;

  const randArr = (n, max) => Array.from({ length: n }, () => 1 + Math.floor(Math.random() * (max || 99)));
  function makeInput() {
    const n = S.n;
    if (S.input === 'slide') return SLIDE[S.algo].slice();
    if (S.input === 'custom') {
      const xs = S.custom.split(/[\s,;]+/).map(Number).filter((x) => Number.isFinite(x)).slice(0, 40);
      return xs.length ? xs : [3, 1, 2];
    }
    const a = randArr(n);
    if (S.input === 'sorted') return a.sort((x, y) => x - y);
    if (S.input === 'reversed') return a.sort((x, y) => y - x);
    if (S.input === 'nearly') {
      a.sort((x, y) => x - y);
      for (let k = 0; k < Math.max(1, n / 8); k++) { const i = Math.floor(Math.random() * (n - 1)); [a[i], a[i + 1]] = [a[i + 1], a[i]]; }
    }
    return a;
  }

  /* ------------------------------------------------------------ şablon */

  function template() {
    return `
      <p class="module-lead">Lab 1'deki beş sıralama algoritması. <b>Adım adım</b> sekmesi slayttaki sözde kodu kare kare oynatır; <b>Süre ölçümü</b> ödevdeki deneyi (10 → 1.000.000 eleman, 5 tekrar, ortalama ms) tarayıcında yapar.</p>
      <div class="lab-tabs">
        <button class="lab-tab" type="button" data-tab="step"><span class="lab-num">1</span>Adım adım <small>sözde kodla izle</small></button>
        <button class="lab-tab" type="button" data-tab="cmp"><span class="lab-num">2</span>Karşılaştır <small>aynı girdide beşi</small></button>
        <button class="lab-tab" type="button" data-tab="bench"><span class="lab-num">3</span>Süre ölçümü <small>Lab 1 ödevi</small></button>
      </div>
      <div id="sl-body"></div>`;
  }

  function stepTemplate() {
    return `<div class="sl-grid">
      <article class="card sl-conf">
        <header class="card-head"><h2>Ayarlar</h2><span class="tag">${SORTS[S.algo].technique}</span></header>
        <div class="field"><label for="sl-algo">Algoritma</label>
          <select id="sl-algo">${SORT_ORDER.map((k) => `<option value="${k}"${k === S.algo ? ' selected' : ''}>${SORTS[k].name} · ${SORTS[k].tr}</option>`).join('')}</select></div>
        <div class="field"><label for="sl-input">Girdi</label>
          <select id="sl-input">${INPUTS.map(([k, t]) => `<option value="${k}"${k === S.input ? ' selected' : ''}>${t}</option>`).join('')}</select></div>
        <div class="field${S.input === 'custom' ? '' : ' sl-hide'}" id="sl-custom-wrap"><label for="sl-custom">Dizi (virgülle, en çok 40)</label><input id="sl-custom" type="text" value="${S.custom}"></div>
        <div class="field${/slide|custom/.test(S.input) ? ' sl-hide' : ''}" id="sl-n-wrap"><label for="sl-n">Eleman sayısı: <b id="sl-n-val">${S.n}</b></label><input id="sl-n" type="range" min="4" max="40" value="${S.n}"></div>
        <label class="ax-check${S.algo === 'bubble' ? '' : ' sl-hide'}" id="sl-early-wrap"><input type="checkbox" id="sl-early"${S.early ? ' checked' : ''}> <span>Bayraklı bubble sort (turda değişim yoksa dur)</span></label>
        <div class="field"><label for="sl-speed">Hız</label><select id="sl-speed">${SPEEDS.map(([k, t]) => `<option value="${k}"${k === S.speed ? ' selected' : ''}>${t}</option>`).join('')}</select></div>
        <div class="btn-row"><button class="btn" type="button" data-a="new">↻ Yeni girdi</button></div>
        <div class="sl-facts" id="sl-facts"></div>
      </article>
      <article class="card sl-run">
        <header class="card-head"><h2 id="sl-title"></h2><span class="tag" id="sl-step"></span></header>
        <div id="sl-bars"></div>
        <p class="sl-cap" id="sl-cap"></p>
        <div class="sl-ctrl">
          <button class="btn" type="button" data-a="first" title="Başa">⏮</button>
          <button class="btn" type="button" data-a="prev">◀ Geri</button>
          <button class="btn btn-primary" type="button" data-a="play" id="sl-play">⏵ Oynat</button>
          <button class="btn" type="button" data-a="next">İleri ▶</button>
          <button class="btn" type="button" data-a="last" title="Sona">⏭</button>
          <input type="range" id="sl-seek" min="0" max="0" value="0" aria-label="Adım">
        </div>
        <div class="sl-lower">
          <div id="sl-code"></div>
          <div class="sl-counters">
            <div class="mini-stat"><span>Karşılaştırma</span><b id="sl-cmp">0</b></div>
            <div class="mini-stat"><span id="sl-swp-l">Yer değiştirme</span><b id="sl-swp">0</b></div>
            <div class="mini-stat"><span>n</span><b id="sl-n2">0</b></div>
          </div>
        </div>
        <div id="sl-legend"></div>
      </article>
    </div>`;
  }

  /* ------------------------------------------------------------ adım adım */

  function rebuild(newInput) {
    stop();
    if (newInput || !S.arr.length) S.arr = makeInput();
    const algo = SORTS[S.algo];
    S.frames = algo.trace(S.arr, { early: S.early });
    S.i = 0;
    const $ = (id) => root.querySelector(id);
    $('#sl-title').textContent = `${algo.name} · ${algo.tr}`;
    $('#sl-seek').max = S.frames.length - 1;
    $('#sl-n2').textContent = S.arr.length;
    $('#sl-swp-l').textContent = S.algo === 'merge' || S.algo === 'insertion' ? 'Yazma (kaydırma)' : 'Yer değiştirme';
    $('#sl-legend').innerHTML = UI.legend({ selection: ['min', 'cmp', 'swap', 'done'], bubble: ['cmp', 'swap', 'done'], insertion: ['key', 'cmp', 'write', 'done'], merge: ['range', 'write', 'done'], quick: ['pivot', 'cmp', 'key', 'swap', 'done'] }[S.algo]);
    const n = S.arr.length;
    const last = S.frames[S.frames.length - 1];
    $('#sl-facts').innerHTML = `<table class="ax-t"><tbody>
      <tr><td>En iyi</td><td>${algo.best}</td></tr><tr><td>Ortalama</td><td>${algo.avg}</td></tr><tr><td>En kötü</td><td>${algo.worst}</td></tr>
      <tr><td>En iyi girdi</td><td>${algo.bestCase}</td></tr><tr><td>En kötü girdi</td><td>${algo.worstCase}</td></tr>
      <tr><td>Bu girdide</td><td><b>${last.cmp}</b> karşılaştırma${S.algo === 'selection' || S.algo === 'bubble' ? ` (n(n−1)/2 = ${n * (n - 1) / 2})` : ''}</td></tr></tbody></table>`;
    show();
  }

  function show() {
    const f = S.frames[S.i];
    const $ = (id) => root.querySelector(id);
    $('#sl-bars').innerHTML = UI.arrayRow(f.a, f.mark, { bars: true, index: f.a.length <= 24 });
    $('#sl-cap').innerHTML = f.text;
    $('#sl-code').innerHTML = UI.codePanel(CODE[S.algo], f.line);
    $('#sl-cmp').textContent = f.cmp;
    $('#sl-swp').textContent = f.swp;
    $('#sl-step').textContent = `Adım ${S.i + 1} / ${S.frames.length}`;
    $('#sl-seek').value = S.i;
    if (S.i === S.frames.length - 1) { stop(); OSLab.app.setStatus('done'); } else if (!S.timer) OSLab.app.setStatus(S.i ? 'paused' : 'ready');
  }

  function stop() {
    clearInterval(S.timer);
    S.timer = 0;
    const b = root && root.querySelector('#sl-play');
    if (b) b.textContent = '⏵ Oynat';
  }
  function play() {
    if (S.timer) { stop(); OSLab.app.setStatus('paused'); return; }
    if (S.i >= S.frames.length - 1) S.i = 0;
    const ms = SPEEDS.find((s) => s[0] === S.speed)[2];
    root.querySelector('#sl-play').textContent = '⏸ Durdur';
    OSLab.app.setStatus('running');
    S.timer = setInterval(() => {
      if (!root || S.i >= S.frames.length - 1) { stop(); return; }
      S.i++;
      show();
    }, ms);
  }

  /* ------------------------------------------------------------ karşılaştır */

  function cmpTemplate() {
    return `<article class="card">
      <header class="card-head"><h2>Aynı girdide beş algoritma</h2><span class="tag">temel işlem sayıları</span></header>
      <div class="sl-cmp-conf">
        <div class="field"><label for="cp-n">n</label><select id="cp-n">${[8, 16, 32, 64, 128, 256, 512, 1000].map((n) => `<option${n === 64 ? ' selected' : ''}>${n}</option>`).join('')}</select></div>
        <div class="btn-row">${INPUTS.slice(0, 4).map(([k, t]) => `<button class="btn btn-sm" type="button" data-cp="${k}">${t}</button>`).join('')}</div>
      </div>
      <div id="cp-out"><p class="hint">Bir girdi türü seç. Aynı dizi beş algoritmaya da verilir; karşılaştırma ve yer değiştirme sayıları formüllerle birlikte gösterilir.</p></div>
    </article>`;
  }

  function runCompare(kind) {
    const n = Number(root.querySelector('#cp-n').value);
    const saveN = S.n; const saveIn = S.input;
    S.n = n; S.input = kind;
    const arr = makeInput();
    S.n = saveN; S.input = saveIn;
    const rows = SORT_ORDER.map((k) => {
      const fr = SORTS[k].trace(arr);
      const last = fr[fr.length - 1];
      return { k, cmp: last.cmp, swp: last.swp };
    });
    const max = Math.max(...rows.map((r) => r.cmp), 1);
    const lg = Math.log2(n);
    root.querySelector('#cp-out').innerHTML = `
      <p class="hint">n = ${n}, girdi: <b>${INPUTS.find((x) => x[0] === kind)[1]}</b>. Referans: n(n−1)/2 = <b>${n * (n - 1) / 2}</b>, n·log₂n ≈ <b>${Math.round(n * lg)}</b>, n − 1 = <b>${n - 1}</b>.</p>
      <div class="sl-cmpbars">${rows.map((r) => `<div class="ax-hbar"><span>${SORTS[r.k].name}</span><div><i style="width:${(r.cmp / max) * 100}%;background:${SORTS[r.k].color}"></i></div><b>${r.cmp.toLocaleString('tr-TR')}</b></div>`).join('')}</div>
      <div class="table-wrap"><table class="ax-t"><thead><tr><th>Algoritma</th><th>Karşılaştırma</th><th>Yer değ. / yazma</th><th>Beklenen sınıf</th></tr></thead><tbody>
      ${rows.map((r) => `<tr><td>${SORTS[r.k].name}</td><td>${r.cmp.toLocaleString('tr-TR')}</td><td>${r.swp.toLocaleString('tr-TR')}</td><td>${kind === 'sorted' ? SORTS[r.k].best : SORTS[r.k].avg}</td></tr>`).join('')}</tbody></table></div>
      <p class="hint">Gözle: <b>sıralı</b> girdide insertion n − 1'e iner, quick ise n²'ye çıkar (pivot hep en küçük). Selection her girdide aynıdır.</p>`;
  }

  /* ------------------------------------------------------------ süre ölçümü */

  function benchTemplate() {
    return `<article class="card">
      <header class="card-head"><h2>Çalışma süresi ölçümü</h2><span class="tag">Lab 1 · ms</span></header>
      <div class="sl-bench-conf">
        <div class="field"><label>Algoritmalar</label><div class="sl-checks">${SORT_ORDER.map((k) => `<label class="ax-check"><input type="checkbox" data-b-algo="${k}" checked> <span>${SORTS[k].name}</span></label>`).join('')}</div></div>
        <div class="field"><label>Eleman sayıları</label><div class="sl-checks">${SIZES.map((n) => `<label class="ax-check"><input type="checkbox" data-b-size="${n}" checked> <span>${n.toLocaleString('tr-TR')}</span></label>`).join('')}</div></div>
        <div class="field-row">
          <div class="field"><label for="b-rep">Tekrar</label><input id="b-rep" type="number" min="1" max="20" value="5"></div>
          <div class="field"><label for="b-lim">Süre sınırı (tek ölçüm, sn)</label><input id="b-lim" type="number" min="0.2" max="120" step="0.5" value="3"></div>
        </div>
        <div class="btn-row"><button class="btn btn-primary" type="button" data-b="run" id="b-run">▶ Ölçümü başlat</button><button class="btn" type="button" data-b="stop" id="b-stop" disabled>■ Durdur</button><button class="btn btn-ghost" type="button" data-b="csv" id="b-csv" disabled>Tabloyu kopyala (CSV)</button></div>
        <p class="hint">Her boyutta önce bir rastgele dizi üretilir (0 – 1.000.000 arası tamsayı) ve <b>aynı dizinin kopyası</b> her algoritmaya verilir; bu, tekrar sayısı kadar yinelenir ve ortalama alınır. Bir algoritmanın bir önceki boyuttaki süresine göre <b>tahmini süresi</b> sınırı aşıyorsa ölçüm yapılmaz, tabloda "sınır aşıldı" yazar (ödevdeki "makul süreyi aşan testleri durdurun" notu). Sayfa ölçüm sırasında kısa süre donabilir.</p>
      </div>
      <div id="b-out"></div>
    </article>`;
  }

  const fmtMs = (ms) => (ms < 0.01 ? '&lt; 0,01' : ms < 10 ? ms.toFixed(3).replace('.', ',') : ms < 1000 ? ms.toFixed(1).replace('.', ',') : Math.round(ms).toLocaleString('tr-TR'));
  const pause = () => new Promise((r) => setTimeout(r, 15));

  function renderBench() {
    const B = S.bench;
    if (!B) return;
    const sizes = B.sizes;
    const cell = (k, n) => {
      const r = B.res[k][n];
      if (!r) return '<td class="muted">—</td>';
      if (r.skip) return `<td class="sl-skip" title="Tahmini tek ölçüm: ${fmtMs(r.est)} ms">sınır aşıldı<small>tahmini ≈ ${r.est > 60000 ? (r.est / 60000).toFixed(0) + ' dk' : (r.est / 1000).toFixed(1).replace('.', ',') + ' sn'}</small></td>`;
      if (r.running) return '<td class="sl-running">ölçülüyor…</td>';
      return `<td><b>${fmtMs(r.avg)}</b><small>${r.runs} tekrar</small></td>`;
    };
    root.querySelector('#b-out').innerHTML = `
      <div class="table-wrap"><table class="ax-t sl-bench"><thead><tr><th>Algoritma</th>${sizes.map((n) => `<th>${n.toLocaleString('tr-TR')}</th>`).join('')}</tr></thead>
      <tbody>${B.algos.map((k) => `<tr><td><i class="sl-dot" style="background:${SORTS[k].color}"></i>${SORTS[k].name}<small>${SORTS[k].avg}</small></td>${sizes.map((n) => cell(k, n)).join('')}</tr>`).join('')}</tbody></table></div>
      ${chart(B)}
      <p class="hint">${B.done ? '✓ Ölçüm tamamlandı.' : B.running ? 'Ölçüm sürüyor…' : 'Durduruldu.'} Değerler ortalama milisaniyedir; tarayıcı ve bilgisayara göre değişir, ama <b>oranlar</b> büyüme derecesini gösterir: O(n²) algoritmalarda n 10 katına çıkınca süre ≈ 100 kat, O(n log n) algoritmalarda ≈ 10–13 kat artar.</p>`;
  }

  // log-log grafik: x = log10 n, y = log10 ms
  function chart(B) {
    const pts = [];
    B.algos.forEach((k) => B.sizes.forEach((n) => { const r = B.res[k][n]; if (r && r.avg > 0 && !r.skip && !r.running) pts.push({ k, n, ms: r.avg }); }));
    if (pts.length < 2) return '';
    const minY = Math.floor(Math.log10(Math.min(...pts.map((p) => p.ms))));
    const maxY = Math.ceil(Math.log10(Math.max(...pts.map((p) => p.ms))));
    const X = (n) => 50 + ((Math.log10(n) - 1) / 5) * 480;
    const Y = (ms) => 200 - ((Math.log10(ms) - minY) / Math.max(1, maxY - minY)) * 180;
    const grid = [];
    for (let e = minY; e <= maxY; e++) grid.push(`<line class="ax-grid" x1="50" x2="530" y1="${Y(10 ** e)}" y2="${Y(10 ** e)}"/><text class="ax-tick" x="44" y="${Y(10 ** e) + 4}" text-anchor="end">10${e < 0 ? '⁻' : ''}${String(Math.abs(e)).split('').map((d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]).join('')}</text>`);
    const lines = B.algos.map((k) => {
      const ps = pts.filter((p) => p.k === k);
      if (!ps.length) return '';
      return `<polyline class="ax-c" style="stroke:${SORTS[k].color}" points="${ps.map((p) => `${X(p.n)},${Y(p.ms)}`).join(' ')}"/>${ps.map((p) => `<circle cx="${X(p.n)}" cy="${Y(p.ms)}" r="3" fill="${SORTS[k].color}"/>`).join('')}`;
    }).join('');
    return `<figure class="sl-chart"><svg class="ax-chart" viewBox="0 0 540 225">${grid.join('')}${SIZES.map((n) => `<text class="ax-tick" x="${X(n)}" y="218" text-anchor="middle">${n >= 1000 ? n / 1000 + 'k' : n}</text>`).join('')}${lines}</svg>
      <figcaption>Log-log grafik: x = eleman sayısı, y = ortalama ms. Doğrunun <b>eğimi</b> büyüme derecesidir: O(n²) eğrileri ~2, O(n log n) eğrileri ~1 eğimle yükselir.</figcaption></figure>`;
  }

  async function runBench() {
    const algos = [...root.querySelectorAll('[data-b-algo]:checked')].map((x) => x.dataset.bAlgo);
    const sizes = [...root.querySelectorAll('[data-b-size]:checked')].map((x) => Number(x.dataset.bSize));
    const rep = Math.max(1, Math.min(20, parseInt(root.querySelector('#b-rep').value, 10) || 5));
    const lim = Math.max(0.2, Number(root.querySelector('#b-lim').value) || 3) * 1000;
    if (!algos.length || !sizes.length) return;
    const B = S.bench = { algos, sizes, rep, lim, res: Object.fromEntries(algos.map((k) => [k, {}])), running: true, stop: false, done: false };
    root.querySelector('#b-run').disabled = true;
    root.querySelector('#b-stop').disabled = false;
    root.querySelector('#b-csv').disabled = true;
    OSLab.app.setStatus('running');
    renderBench();
    const lastOk = {};
    for (const n of sizes) {
      // tahmin: önceki ölçülen boyuttan büyüme derecesine göre ölçekle
      algos.forEach((k) => {
        const prev = lastOk[k];
        if (!prev) return;
        const ratio = n / prev.n;
        const growth = SORTS[k].order === 2 ? ratio * ratio : ratio * (Math.log2(n) / Math.log2(prev.n));
        const est = Math.max(prev.ms, 0.05) * growth;
        if (est > lim) B.res[k][n] = { skip: true, est };
      });
      const todo = algos.filter((k) => !B.res[k][n]);
      todo.forEach((k) => { B.res[k][n] = { running: true, sum: 0, runs: 0 }; });
      renderBench();
      await pause();
      for (let r = 0; r < rep; r++) {
        const base = new Int32Array(n);
        for (let i = 0; i < n; i++) base[i] = Math.floor(Math.random() * 1000001);
        for (const k of todo) {
          if (B.stop || !root) break;
          const cell = B.res[k][n];
          if (cell.skipRest) continue;
          const a = base.slice();
          const t0 = performance.now();
          SORTS[k].run(a);
          const dt = performance.now() - t0;
          cell.sum += dt;
          cell.runs++;
          if (dt > lim) cell.skipRest = true; // tek ölçüm sınırı aştı: kalan tekrarlar yapılmaz
          await pause();
        }
        if (B.stop || !root) break;
        if (todo.every((k) => B.res[k][n].skipRest)) break;
      }
      todo.forEach((k) => {
        const c = B.res[k][n];
        if (!c.runs) { delete B.res[k][n]; return; }
        c.avg = c.sum / c.runs;
        c.running = false;
        lastOk[k] = { n, ms: c.avg };
      });
      if (!root) return;
      renderBench();
      if (B.stop) break;
    }
    B.running = false;
    B.done = !B.stop;
    if (!root) return;
    root.querySelector('#b-run').disabled = false;
    root.querySelector('#b-stop').disabled = true;
    root.querySelector('#b-csv').disabled = false;
    OSLab.app.setStatus(B.done ? 'done' : 'paused');
    renderBench();
  }

  function copyCsv() {
    const B = S.bench;
    if (!B) return;
    const lines = [['Algoritma', ...B.sizes].join(';')].concat(B.algos.map((k) => [SORTS[k].name, ...B.sizes.map((n) => { const r = B.res[k][n]; return !r ? '' : r.skip ? 'süre sınırı aşıldı' : r.avg.toFixed(3).replace('.', ','); })].join(';')));
    const txt = lines.join('\n');
    const btn = root.querySelector('#b-csv');
    const done = (ok) => { btn.textContent = ok ? '✓ Kopyalandı' : 'Kopyalanamadı'; setTimeout(() => { if (btn.isConnected) btn.textContent = 'Tabloyu kopyala (CSV)'; }, 1800); };
    try { navigator.clipboard.writeText(txt).then(() => done(true), () => done(false)); } catch (e) { done(false); }
  }

  /* ------------------------------------------------------------ olaylar */

  function drawTab() {
    stop();
    root.querySelectorAll('.lab-tab').forEach((t) => t.classList.toggle('active', t.dataset.tab === S.tab));
    const body = root.querySelector('#sl-body');
    if (S.tab === 'step') { body.innerHTML = stepTemplate(); rebuild(true); }
    else if (S.tab === 'cmp') { body.innerHTML = cmpTemplate(); runCompare('random'); OSLab.app.setStatus('ready'); }
    else { body.innerHTML = benchTemplate(); OSLab.app.setStatus('ready'); renderBench(); if (S.bench && !S.bench.running) root.querySelector('#b-csv').disabled = false; }
  }

  function onClick(e) {
    const tab = e.target.closest('[data-tab]');
    if (tab && tab.classList.contains('lab-tab')) { S.tab = tab.dataset.tab; drawTab(); return; }
    const a = e.target.closest('[data-a]');
    if (a) {
      const x = a.dataset.a;
      if (x === 'new') rebuild(true);
      if (x === 'play') play();
      if (x === 'next' && S.i < S.frames.length - 1) { stop(); S.i++; show(); }
      if (x === 'prev' && S.i > 0) { stop(); S.i--; show(); }
      if (x === 'first') { stop(); S.i = 0; show(); }
      if (x === 'last') { stop(); S.i = S.frames.length - 1; show(); }
      return;
    }
    const cp = e.target.closest('[data-cp]');
    if (cp) { runCompare(cp.dataset.cp); return; }
    const bb = e.target.closest('[data-b]');
    if (bb) {
      if (bb.dataset.b === 'run' && !(S.bench && S.bench.running)) runBench();
      if (bb.dataset.b === 'stop' && S.bench) S.bench.stop = true;
      if (bb.dataset.b === 'csv') copyCsv();
    }
  }

  function onInput(e) {
    const t = e.target;
    if (t.id === 'sl-seek') { stop(); S.i = Number(t.value); show(); return; }
    if (t.id === 'sl-n') { S.n = Number(t.value); root.querySelector('#sl-n-val').textContent = S.n; if (e.type === 'change') rebuild(true); return; }
    if (e.type !== 'change' && t.id !== 'sl-custom') return;
    if (t.id === 'sl-algo') { S.algo = t.value; syncVisibility(); rebuild(S.input === 'slide'); OSLab.app.focusInfo('cases'); }
    if (t.id === 'sl-input') { S.input = t.value; syncVisibility(); rebuild(true); }
    if (t.id === 'sl-custom' && e.type === 'change') { S.custom = t.value; rebuild(true); }
    if (t.id === 'sl-early') { S.early = t.checked; rebuild(false); }
    if (t.id === 'sl-speed') { S.speed = t.value; if (S.timer) { stop(); play(); } }
    if (t.id === 'cp-n') runCompare('random');
  }

  function syncVisibility() {
    root.querySelector('#sl-custom-wrap').classList.toggle('sl-hide', S.input !== 'custom');
    root.querySelector('#sl-n-wrap').classList.toggle('sl-hide', /slide|custom/.test(S.input));
    root.querySelector('#sl-early-wrap').classList.toggle('sl-hide', S.algo !== 'bubble');
    root.querySelector('.sl-conf .tag').textContent = SORTS[S.algo].technique;
  }

  function onKey(e) {
    if (!root || S.tab !== 'step' || /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); if (S.i < S.frames.length - 1) { stop(); S.i++; show(); } }
    if (e.key === 'ArrowLeft') { e.preventDefault(); if (S.i > 0) { stop(); S.i--; show(); } }
    if (e.key === ' ' && e.target.tagName !== 'BUTTON') { e.preventDefault(); play(); }
  }

  function mount(container) {
    root = container;
    root.innerHTML = template();
    root.addEventListener('click', onClick);
    root.addEventListener('input', onInput);
    root.addEventListener('change', onInput);
    document.addEventListener('keydown', onKey);
    drawTab();
  }

  function unmount() {
    stop();
    if (S.bench) S.bench.stop = true;
    if (root) {
      root.removeEventListener('click', onClick);
      root.removeEventListener('input', onInput);
      root.removeEventListener('change', onInput);
    }
    document.removeEventListener('keydown', onKey);
    root = null;
  }

  function loadPreset(p) {
    if (p.tab) S.tab = p.tab;
    else S.tab = 'step';
    if (p.algo) S.algo = p.algo;
    if (p.input) S.input = p.input;
    if (root) drawTab();
  }

  OSLab.modules = OSLab.modules || {};
  OSLab.modules.sorting = { num: 'L1', title: 'Sıralama Laboratuvarı', subtitle: 'Lab 1 · adım adım izleme ve süre ölçümü', mount, unmount, loadPreset };
})(window.OSLab = window.OSLab || {});
