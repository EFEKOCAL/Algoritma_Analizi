/*
 * growth-view.js — L2 Büyüme Derecesi laboratuvarı.
 *   table : büyüme derecesi tablosu ve log ölçekli grafik (H1-H2 s. 42, Performans s. 13–14)
 *   loops : döngü sayacı (Performans örnek 1–9)
 *   bound : c ve n₀ ile O / Ω / Θ tanımını sınamak (H1-H2 s. 61–69)
 *   limit : iki fonksiyonun oranı n → ∞ (H1-H2 s. 71–82)
 * Büyük değerler taşmasın diye her fonksiyon log10 cinsinden de hesaplanır.
 */
(function (OSLab) {
  'use strict';

  const L10 = Math.log10;
  const L2 = Math.log2;
  const LN10 = Math.LN10;
  // log10(n!) — küçük n için tam, büyük n için Stirling
  const lfact = (n) => {
    if (n < 2) return 0;
    if (n < 30) { let s = 0; for (let i = 2; i <= n; i++) s += L10(i); return s; }
    return (n * Math.log(n) - n + 0.5 * Math.log(2 * Math.PI * n) + 1 / (12 * n)) / LN10;
  };

  // lg: log10 f(n)  (n ≥ 2 için tanımlı)
  const F = {
    one: { t: '1', lg: () => 0 },
    log: { t: 'log₂n', lg: (n) => L10(L2(n)) },
    ln: { t: 'ln n', lg: (n) => L10(Math.log(n)) },
    log2sq: { t: 'log₂²n', lg: (n) => 2 * L10(L2(n)) },
    logn2: { t: 'log₂n²', lg: (n) => L10(2 * L2(n)) },
    sqrt: { t: '√n', lg: (n) => 0.5 * L10(n) },
    cbrt: { t: '∛n', lg: (n) => L10(n) / 3 },
    n: { t: 'n', lg: (n) => L10(n) },
    n100: { t: '100n + 5', lg: (n) => L10(100 * n + 5) },
    nlog: { t: 'n log₂n', lg: (n) => L10(n) + L10(L2(n)) },
    n2: { t: 'n²', lg: (n) => 2 * L10(n) },
    half: { t: '½n(n−1)', lg: (n) => L10(0.5) + L10(n) + L10(n - 1) },
    nn1: { t: 'n(n+1)', lg: (n) => L10(n) + L10(n + 1) },
    n2k: { t: '2000n²', lg: (n) => L10(2000) + 2 * L10(n) },
    n2c: { t: '100n²', lg: (n) => 2 + 2 * L10(n) },
    n3: { t: 'n³', lg: (n) => 3 * L10(n) },
    n3s: { t: '0,01n³', lg: (n) => -2 + 3 * L10(n) },
    n3t: { t: '0,00001n³', lg: (n) => -5 + 3 * L10(n) },
    n4: { t: 'n⁴ + n + 1', lg: (n) => 4 * L10(n) + L10(1 + 1 / n ** 3 + 1 / n ** 4) },
    sq10: { t: '√(10n²+7n+3)', lg: (n) => 0.5 * L10(10 * n * n + 7 * n + 3) },
    p20: { t: '(n²+1)¹⁰', lg: (n) => 10 * L10(n * n + 1) },
    n20: { t: 'n²⁰', lg: (n) => 20 * L10(n) },
    e2: { t: '2ⁿ', lg: (n) => n * L10(2) },
    e2m: { t: '2ⁿ⁻¹', lg: (n) => (n - 1) * L10(2) },
    e3: { t: '3ⁿ', lg: (n) => n * L10(3) },
    fact: { t: 'n!', lg: (n) => lfact(n) },
    factm: { t: '(n−1)!', lg: (n) => lfact(n - 1) }
  };

  // Limit sekmesindeki hazır çiftler (slayt alıştırmaları) ve kesin cevapları
  const PAIRS = [
    ['half', 'n2', 'lim = ½ → Θ (slayt 74)'],
    ['log', 'sqrt', 'lim = 0 → log₂n daha yavaş (slayt 75, L\'Hôpital)'],
    ['fact', 'e2', 'lim = ∞ → n! daha hızlı (slayt 76, Stirling)'],
    ['nn1', 'n2k', 'lim = 1/2000 → eşit (slayt 59a)'],
    ['n2c', 'n3s', 'lim = 0 → 100n² daha yavaş (slayt 59b)'],
    ['log', 'ln', 'lim = 1/ln2 ≈ 1,44 → eşit (slayt 59c)'],
    ['log2sq', 'logn2', 'lim = ∞ → log₂²n daha hızlı (slayt 59d)'],
    ['e2m', 'e2', 'lim = ½ → eşit (slayt 59e)'],
    ['factm', 'fact', 'lim = 0 → (n−1)! daha yavaş (slayt 59f)'],
    ['p20', 'n20', 'lim = 1 → Θ(n²⁰) (slayt 79a)'],
    ['sq10', 'n', 'lim = √10 → Θ(n) (slayt 79b)'],
    ['n3', 'e2', 'lim = 0 → n³ daha yavaş (slayt 81)']
  ];
  // Sınır sekmesindeki hazır örnekler
  const BOUNDS = [
    { t: 'n100', g: 'n2', kind: 'O', c: 101, n0: 5, note: 'Slayt 63: c = 101, n₀ = 5' },
    { t: 'n3', g: 'n2', kind: 'Ω', c: 1, n0: 0, note: 'Slayt 66: c = 1, n₀ = 0' },
    { t: 'half', g: 'n2', kind: 'Θ', c: 0.5, c2: 0.25, n0: 2, note: 'Slayt 69: c₁ = ½, c₂ = ¼, n₀ = 2' },
    { t: 'n100', g: 'n2', kind: 'Ω', c: 1, n0: 1, note: 'Yanlış iddia: 100n + 5 ∉ Ω(n²). Hangi c\'yi seçersen seç bir yerde bozulur.' },
    { t: 'n3t', g: 'n2', kind: 'O', c: 1000, n0: 1, note: 'Yanlış iddia: 0,00001n³ ∉ O(n²). c büyük olsa da n yeterince büyüyünce bozulur.' }
  ];

  const S = { tab: 'table', pair: 0, bound: 0, ns: false };
  let root = null;

  const sup = (e) => String(e).split('').map((d) => ({ '-': '⁻' })[d] || '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]).join('');
  function fmt(lg) {
    if (!Number.isFinite(lg)) return '—';
    if (lg < 6 && lg > -3) {
      const v = 10 ** lg;
      if (v >= 100 || Math.abs(v - Math.round(v)) < 1e-9) return Math.round(v).toLocaleString('tr-TR');
      return v.toFixed(v < 10 ? 2 : 1).replace('.', ',');
    }
    let e = Math.floor(lg);
    let m = 10 ** (lg - e);
    if (m.toFixed(1) === '10.0') { m = 1; e++; }
    return `${m.toFixed(1).replace('.', ',')}·10${sup(e)}`;
  }
  // log10(saniye) → okunur süre (1 işlem = 1 ns)
  function dur(lgOps) {
    const lgS = lgOps - 9;
    const s = 10 ** lgS;
    if (lgS < -6) return `${(s * 1e9).toFixed(0)} ns`;
    if (lgS < -3) return `${(s * 1e6).toFixed(1)} µs`;
    if (lgS < 0) return `${(s * 1e3).toFixed(1)} ms`;
    if (s < 60) return `${s.toFixed(1)} sn`;
    if (s < 3600) return `${(s / 60).toFixed(1)} dk`;
    if (s < 86400) return `${(s / 3600).toFixed(1)} saat`;
    if (s < 3.15e7) return `${(s / 86400).toFixed(0)} gün`;
    return `${fmt(lgS - L10(3.15e7))} yıl`;
  }

  /* ------------------------------------------------------------ şablonlar */

  function template() {
    return `
      <p class="module-lead">Büyüme derecesini sayılarla ve grafiklerle hisset: tablo, döngü sayacı, O–Ω–Θ tanımının c ve n₀ ile sınanması, limit yöntemi.</p>
      <div class="lab-tabs">
        <button class="lab-tab" type="button" data-tab="table"><span class="lab-num">1</span>Büyüme tablosu <small>log n … n!</small></button>
        <button class="lab-tab" type="button" data-tab="loops"><span class="lab-num">2</span>Döngü sayacı <small>myfunc() kaç kez?</small></button>
        <button class="lab-tab" type="button" data-tab="bound"><span class="lab-num">3</span>O · Ω · Θ <small>c ve n₀ bul</small></button>
        <button class="lab-tab" type="button" data-tab="limit"><span class="lab-num">4</span>Limit <small>t(n)/g(n), n → ∞</small></button>
      </div>
      <div id="gr-body"></div>`;
  }

  const TABLE_F = ['log', 'n', 'nlog', 'n2', 'n3', 'e2', 'fact'];
  function tableTab() {
    const ns = [10, 100, 1e3, 1e4, 1e5, 1e6];
    const rows = ns.map((n) => `<tr><td class="num"><b>${n.toLocaleString('tr-TR')}</b></td>${TABLE_F.map((k) => { const lg = F[k].lg(n); return `<td class="${lg > 15 ? 'gr-huge' : ''}">${S.ns ? dur(lg) : fmt(lg)}</td>`; }).join('')}</tr>`).join('');
    return `<article class="card">
      <header class="card-head"><h2>Büyüme derecesi tablosu</h2><span class="tag">H1-H2 s. 42</span></header>
      <label class="ax-check"><input type="checkbox" id="gr-ns"${S.ns ? ' checked' : ''}> <span>Sayı yerine süre göster (1 işlem = 1 ns)</span></label>
      <div class="table-wrap"><table class="ax-t gr-table"><thead><tr><th>n</th>${TABLE_F.map((k) => `<th>${F[k].t}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>
      <p class="hint">Kırmızı hücreler 10¹⁵\'ten büyük: saniyede 10⁹ işlem yapan bilgisayar bile günlerce, yıllarca, evrenin yaşından uzun çalışır. 2ⁿ ve n! sütunları neden slaytta boş bırakılmış, buradan görülür.</p>
      ${growthChart()}
    </article>`;
  }

  function growthChart() {
    const keys = ['log', 'n', 'nlog', 'n2', 'n3', 'e2'];
    const cols = { log: '#38bdf8', n: '#f472b6', nlog: '#fbbf24', n2: '#22d3ee', n3: '#a78bfa', e2: '#f87171' };
    const X = (n) => 40 + ((n - 1) / 19) * 470;
    const Y = (lg) => 210 - (Math.min(lg, 5) / 5) * 195;
    const grid = [0, 1, 2, 3, 4, 5].map((e) => `<line class="ax-grid" x1="40" x2="510" y1="${Y(e)}" y2="${Y(e)}"/><text class="ax-tick" x="34" y="${Y(e) + 4}" text-anchor="end">10${sup(e)}</text>`).join('');
    const lines = keys.map((k) => {
      const pts = [];
      for (let n = 2; n <= 20; n++) { const lg = F[k].lg(n); if (lg > 5.05) break; pts.push(`${X(n)},${Y(Math.max(lg, 0))}`); }
      return `<polyline class="ax-c" style="stroke:${cols[k]}" points="${pts.join(' ')}"/><text class="ax-lbl" style="fill:${cols[k]}" x="${pts[pts.length - 1].split(',')[0] - 4}" y="${Number(pts[pts.length - 1].split(',')[1]) - 6}">${F[k].t}</text>`;
    }).join('');
    return `<figure class="sl-chart"><svg class="ax-chart" viewBox="0 0 580 230">${grid}${[2, 5, 10, 15, 20].map((n) => `<text class="ax-tick" x="${X(n)}" y="226" text-anchor="middle">${n}</text>`).join('')}${lines}</svg>
      <figcaption>Logaritmik y ekseni (Performans s. 13): n = 20'ye kadar bile 2ⁿ ve n³ diğerlerinden koparak yükselir.</figcaption></figure>`;
  }

  function boundTab() {
    const b = BOUNDS[S.bound];
    const opts = Object.entries(F).filter(([k]) => !['one'].includes(k)).map(([k, f]) => `<option value="${k}">${f.t}</option>`).join('');
    return `<article class="card">
      <header class="card-head"><h2>Tanımı sına: c ve n₀</h2><span class="tag">H1-H2 s. 61–69</span></header>
      <div class="btn-row gr-presets">${BOUNDS.map((x, i) => `<button class="btn btn-sm${i === S.bound ? ' btn-primary' : ''}" type="button" data-bound="${i}">${F[x.t].t} ∈ ${x.kind}(${F[x.g].t})</button>`).join('')}</div>
      <div class="gr-bconf">
        <div class="field"><label for="bd-t">t(n)</label><select id="bd-t">${opts}</select></div>
        <div class="field"><label for="bd-k">İddia</label><select id="bd-k"><option>O</option><option>Ω</option><option>Θ</option></select></div>
        <div class="field"><label for="bd-g">g(n)</label><select id="bd-g">${opts}</select></div>
        <div class="field"><label for="bd-c">c (Θ'da c₁)</label><input id="bd-c" type="number" step="any" value="${b.c}"></div>
        <div class="field" id="bd-c2-w"><label for="bd-c2">c₂ (Θ alt)</label><input id="bd-c2" type="number" step="any" value="${b.c2 || 0.25}"></div>
        <div class="field"><label for="bd-n0">n₀</label><input id="bd-n0" type="number" min="0" step="1" value="${b.n0}"></div>
      </div>
      <div id="bd-out"></div>
    </article>`;
  }

  function checkBound() {
    const $ = (id) => root.querySelector(id);
    const t = $('#bd-t').value; const g = $('#bd-g').value; const k = $('#bd-k').value;
    const c = Number($('#bd-c').value); const c2 = Number($('#bd-c2').value); const n0 = Math.max(0, parseInt($('#bd-n0').value, 10) || 0);
    $('#bd-c2-w').classList.toggle('sl-hide', k !== 'Θ');
    // n₀'dan 10⁹'a kadar: önce tek tek, sonra logaritmik aralıklarla dene
    const ns = [];
    for (let n = Math.max(2, n0); n < Math.max(2, n0) + 3000; n++) ns.push(n);
    for (let e = 3.5; e <= 9; e += 0.05) { const n = Math.round(10 ** e); if (n > ns[ns.length - 1]) ns.push(n); }
    const up = (n) => F[t].lg(n) <= L10(c) + F[g].lg(n) + 1e-12;
    const lo = (n) => F[t].lg(n) >= L10(k === 'Θ' ? c2 : c) + F[g].lg(n) - 1e-12;
    const test = k === 'O' ? up : k === 'Ω' ? lo : (n) => up(n) && lo(n);
    const bad = c > 0 && (k !== 'Θ' || c2 > 0) ? ns.find((n) => !test(n)) : 2;
    const ok = bad === undefined;
    const W = 520; const H = 200; const N = Math.max(30, n0 * 3 + 10);
    const X = (n) => 40 + (n / N) * (W - 60);
    const vals = [];
    for (let n = 2; n <= N; n += Math.max(1, Math.floor(N / 120))) vals.push(n);
    const ys = (fn) => vals.map((n) => fn(n));
    const T = ys((n) => 10 ** F[t].lg(n));
    const U = ys((n) => c * 10 ** F[g].lg(n));
    const D = k === 'Θ' ? ys((n) => c2 * 10 ** F[g].lg(n)) : null;
    const maxV = Math.max(...T, ...(k === 'Ω' ? [] : U), 1);
    const Y = (v) => H - 20 - Math.min(v / maxV, 1.05) * (H - 40);
    const line = (arr, cls) => `<polyline class="ax-c ${cls}" points="${vals.map((n, i) => `${X(n)},${Y(arr[i])}`).join(' ')}"/>`;
    $('#bd-out').innerHTML = `
      <div class="gr-verdict ${ok ? 'ok' : 'bad'}">${ok
        ? `✓ n ≥ ${n0} için (10⁹'a kadar denendi) ${k === 'O' ? `t(n) ≤ ${c}·g(n)` : k === 'Ω' ? `t(n) ≥ ${c}·g(n)` : `${c2}·g(n) ≤ t(n) ≤ ${c}·g(n)`} sağlanıyor.`
        : `✗ n = ${Number(bad).toLocaleString('tr-TR')} için eşitsizlik bozuluyor: t(n) = ${fmt(F[t].lg(bad))}, ${k === 'Θ' && !lo(bad) ? `c₂·g(n) = ${fmt(L10(c2) + F[g].lg(bad))}` : `c·g(n) = ${fmt(L10(c) + F[g].lg(bad))}`}. ${k === 'Ω' || (k === 'Θ' && !lo(bad)) ? 'c\'yi küçült ya da n₀\'ı büyüt.' : 'c\'yi ya da n₀\'ı büyüt.'}`}</div>
      <svg class="ax-chart" viewBox="0 0 ${W} ${H}"><line class="ax-axis" x1="40" y1="${H - 20}" x2="${W - 10}" y2="${H - 20}"/><line class="ax-axis" x1="40" y1="10" x2="40" y2="${H - 20}"/>
        <line class="ax-n0" x1="${X(n0)}" y1="10" x2="${X(n0)}" y2="${H - 20}"/><text class="ax-tick" x="${X(n0)}" y="${H - 6}">n₀=${n0}</text><text class="ax-tick" x="${W - 30}" y="${H - 6}">n=${N}</text>
        ${line(U, 'c2')}${D ? line(D, 'c0') : ''}${line(T, 'c1')}
        <text class="ax-lbl c1" x="${W - 120}" y="22">t(n) = ${F[t].t}</text><text class="ax-lbl c2" x="${W - 120}" y="38">${k === 'Θ' ? 'c₁' : 'c'}·g(n)</text>${D ? `<text class="ax-lbl c0" x="${W - 120}" y="54">c₂·g(n)</text>` : ''}</svg>
      <p class="hint">${BOUNDS[S.bound].note}. Grafik 2 ≤ n ≤ ${N} aralığını gösterir; denetim 10⁹'a kadar yapılır. (Sayısal denetim ispat değildir: ispatı kağıtta eşitsizliklerle yazmalısın.)</p>`;
  }

  function limitTab() {
    const opts = Object.entries(F).map(([k, f]) => `<option value="${k}">${f.t}</option>`).join('');
    return `<article class="card">
      <header class="card-head"><h2>Limit yöntemi: lim t(n) / g(n)</h2><span class="tag">H1-H2 s. 71–82</span></header>
      <div class="btn-row gr-presets">${PAIRS.map(([a, b2], i) => `<button class="btn btn-sm${i === S.pair ? ' btn-primary' : ''}" type="button" data-pair="${i}">${F[a].t} / ${F[b2].t}</button>`).join('')}</div>
      <div class="gr-bconf"><div class="field"><label for="lm-t">t(n)</label><select id="lm-t">${opts}</select></div><div class="field"><label for="lm-g">g(n)</label><select id="lm-g">${opts}</select></div></div>
      <div id="lm-out"></div>
    </article>`;
  }

  function checkLimit() {
    const t = root.querySelector('#lm-t').value; const g = root.querySelector('#lm-g').value;
    const ns = [10, 100, 1e3, 1e4, 1e5, 1e6, 1e8, 1e12];
    const r = ns.map((n) => F[t].lg(n) - F[g].lg(n));
    const last = r[r.length - 1]; const prev = r[r.length - 2];
    let verdict;
    if (Math.abs(last - prev) < 0.01) verdict = { cls: 'eq', txt: `Oran sabitleniyor ≈ <b>${fmt(last)}</b> → c &gt; 0: <b>eşit büyüme derecesi</b>, t(n) ∈ Θ(g(n))` };
    else if (last < prev && last < -1) verdict = { cls: 'lt', txt: 'Oran <b>0\'a</b> gidiyor → t(n)\'nin büyüme derecesi <b>daha küçük</b>, t(n) ∈ O(g(n))' };
    else if (last > prev && last > 1) verdict = { cls: 'gt', txt: 'Oran <b>∞\'a</b> gidiyor → t(n)\'nin büyüme derecesi <b>daha büyük</b>, t(n) ∈ Ω(g(n))' };
    else verdict = { cls: '', txt: 'Oran çok yavaş değişiyor: sayılar kararsız, analitik limit hesapla.' };
    const known = PAIRS.find(([a, b2]) => a === t && b2 === g);
    root.querySelector('#lm-out').innerHTML = `
      <div class="table-wrap"><table class="ax-t"><thead><tr><th>n</th>${ns.map((n) => `<th>10${sup(Math.round(L10(n)))}</th>`).join('')}</tr></thead>
      <tbody><tr><td>t(n)/g(n)</td>${r.map((x) => `<td>${fmt(x)}</td>`).join('')}</tr></tbody></table></div>
      <div class="gr-verdict ${verdict.cls}">${verdict.txt}</div>
      ${known ? `<p class="hint">Slayttaki analitik sonuç: <b>${known[2]}</b></p>` : '<p class="hint">Sayısal oran yalnızca yönü gösterir; sınavda limiti L\'Hôpital ya da Stirling ile analitik olarak hesapla.</p>'}`;
  }

  /* ------------------------------------------------------------ olaylar */

  function drawTab() {
    root.querySelectorAll('.lab-tab').forEach((t) => t.classList.toggle('active', t.dataset.tab === S.tab));
    const body = root.querySelector('#gr-body');
    if (S.tab === 'table') body.innerHTML = tableTab();
    else if (S.tab === 'loops') {
      body.innerHTML = `<article class="card"><header class="card-head"><h2>Döngü sayacı</h2><span class="tag">Performans s. 16–25</span></header>${OSLab.diagrams.render('loops')}</article>`;
      OSLab.diagrams.init(body);
    } else if (S.tab === 'bound') {
      body.innerHTML = boundTab();
      const b = BOUNDS[S.bound];
      root.querySelector('#bd-t').value = b.t;
      root.querySelector('#bd-g').value = b.g;
      root.querySelector('#bd-k').value = b.kind;
      checkBound();
    } else {
      body.innerHTML = limitTab();
      root.querySelector('#lm-t').value = PAIRS[S.pair][0];
      root.querySelector('#lm-g').value = PAIRS[S.pair][1];
      checkLimit();
    }
    OSLab.app.setStatus('ready');
  }

  function onClick(e) {
    const tab = e.target.closest('.lab-tab');
    if (tab) { S.tab = tab.dataset.tab; drawTab(); return; }
    const p = e.target.closest('[data-pair]');
    if (p) { S.pair = Number(p.dataset.pair); drawTab(); return; }
    const bd = e.target.closest('[data-bound]');
    if (bd) { S.bound = Number(bd.dataset.bound); drawTab(); }
  }
  function onInput(e) {
    const id = e.target.id;
    if (id === 'gr-ns') { S.ns = e.target.checked; drawTab(); return; }
    if (/^bd-/.test(id)) checkBound();
    if (/^lm-/.test(id)) checkLimit();
  }

  function mount(container) {
    root = container;
    root.innerHTML = template();
    root.addEventListener('click', onClick);
    root.addEventListener('input', onInput);
    root.addEventListener('change', onInput);
    drawTab();
  }
  function unmount() {
    if (root) {
      root.removeEventListener('click', onClick);
      root.removeEventListener('input', onInput);
      root.removeEventListener('change', onInput);
    }
    root = null;
  }
  function loadPreset(p) {
    if (p.tab) S.tab = p.tab;
    if (root) drawTab();
  }

  OSLab.modules = OSLab.modules || {};
  OSLab.modules.growth = { num: 'L2', title: 'Büyüme Derecesi', subtitle: 'Döngü sayacı, O–Ω–Θ, limit yöntemi', mount, unmount, loadPreset };
})(window.OSLab = window.OSLab || {});
