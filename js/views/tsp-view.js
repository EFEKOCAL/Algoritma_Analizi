/*
 * tsp-view.js — L3 Gezgin Satıcı (Lab Uygulaması 2): kaba kuvvet / etraflı arama.
 * Kipler: path  → k şehirlik yol (başlangıca dönmeden, k−1 kenar)
 *         cycle → k şehirlik tur (başlangıca dönerek, k kenar)
 *         full  → tüm şehirler, Hamilton devresi (klasik TSP)
 * Her sıralı seçim tek tek denenir; kenarı olmayan sıralamalar elenir.
 */
(function (OSLab) {
  'use strict';

  const UI = OSLab.algoUI;
  const { permutationsOf, fact } = OSLab.algos;
  const GRAPHS = {
    lab2: { name: 'Lab 2 grafı (6 şehir)', g: UI.LAB2_G, w: 470, h: 220 },
    slide: { name: 'Slayt örneği (4 şehir, tam graf)', g: UI.SLIDE_G, w: 320, h: 220 }
  };
  const SPEEDS = [['slow', 'Yavaş', 700], ['mid', 'Normal', 250], ['fast', 'Hızlı', 60], ['max', 'Anında', 0]];

  const S = { graph: 'lab2', mode: 'path', k: 4, speed: 'mid', list: [], i: -1, best: null, timer: 0, valid: 0, filter: 'valid' };
  let root = null;

  const weight = (g, u, v) => { const e = g.edges.find(([x, y]) => (x === u && y === v) || (x === v && y === u)); return e ? e[2] : null; };

  function enumerate() {
    const G = GRAPHS[S.graph].g;
    const ids = G.nodes.map((n) => n.id);
    const k = S.mode === 'full' ? ids.length : Math.min(S.k, ids.length);
    const seqs = S.mode === 'full' ? permutationsOf(ids.slice(1), ids.length - 1).map((p) => [ids[0], ...p]) : permutationsOf(ids, k);
    return seqs.map((seq) => {
      const path = S.mode === 'path' ? seq : [...seq, seq[0]];
      const parts = [];
      let missing = null;
      for (let i = 1; i < path.length; i++) {
        const w = weight(G, path[i - 1], path[i]);
        if (w === null) { missing = `${path[i - 1]}–${path[i]}`; break; }
        parts.push(w);
      }
      return { seq, path, parts, L: missing ? null : parts.reduce((s, x) => s + x, 0), missing };
    });
  }

  /* ------------------------------------------------------------ şablon */

  function template() {
    return `
      <p class="module-lead">Lab 2: bir satıcı şehirlerden birinden yola çıkıp <b>k şehirlik</b> bir satış turu yapacak; aynı şehre ve aynı yola tekrar girmeyecek. Kaba kuvvet çözümü <b>her sıralamayı</b> dener, kenarı olmayanları eler, en kısayı tutar.</p>
      <div class="sl-grid">
        <article class="card sl-conf">
          <header class="card-head"><h2>Ayarlar</h2><span class="tag">Etraflı arama</span></header>
          <div class="field"><label for="ts-g">Graf</label><select id="ts-g">${Object.entries(GRAPHS).map(([k, x]) => `<option value="${k}"${k === S.graph ? ' selected' : ''}>${x.name}</option>`).join('')}</select></div>
          <div class="field"><label for="ts-mode">Kip</label><select id="ts-mode">
            <option value="path">Yol: k şehir, dönüş yok</option><option value="cycle">Tur: k şehir, başlangıca dönüş</option><option value="full">Tüm şehirler (Hamilton devresi)</option></select></div>
          <div class="field" id="ts-k-w"><label for="ts-k">Şehir sayısı k: <b id="ts-k-v">${S.k}</b></label><input id="ts-k" type="range" min="2" max="6" value="${S.k}"></div>
          <div class="field"><label for="ts-sp">Hız</label><select id="ts-sp">${SPEEDS.map(([k, t]) => `<option value="${k}"${k === S.speed ? ' selected' : ''}>${t}</option>`).join('')}</select></div>
          <div class="btn-row"><button class="btn btn-primary" type="button" data-t="play" id="ts-play">▶ Aramayı başlat</button><button class="btn" type="button" data-t="step">Tek adım</button><button class="btn btn-ghost" type="button" data-t="reset">↺</button></div>
          <div class="sl-facts" id="ts-facts"></div>
        </article>
        <article class="card sl-run">
          <header class="card-head"><h2 id="ts-title">Graf</h2><span class="tag" id="ts-step"></span></header>
          <div class="ts-graphs"><figure><figcaption>Şu an denenen</figcaption><div id="ts-cur"></div></figure><figure><figcaption>Şimdiye kadarki en iyi</figcaption><div id="ts-best"></div></figure></div>
          <p class="sl-cap" id="ts-cap"></p>
          <div class="ts-listhead"><b>Denenen sıralamalar</b><span class="qx-filters"><button type="button" class="dg-tab" data-f="valid">Geçerli</button><button type="button" class="dg-tab" data-f="all">Tümü</button></span></div>
          <div class="ts-list" id="ts-list"></div>
        </article>
      </div>`;
  }

  function reset() {
    stop();
    S.list = enumerate();
    S.i = -1;
    S.best = null;
    S.valid = 0;
    const G = GRAPHS[S.graph];
    const n = G.g.nodes.length;
    const k = S.mode === 'full' ? n : Math.min(S.k, n);
    root.querySelector('#ts-mode').value = S.mode;
    root.querySelector('#ts-k-w').classList.toggle('sl-hide', S.mode === 'full');
    root.querySelector('#ts-k').max = n;
    root.querySelector('#ts-k').value = Math.min(S.k, n);
    root.querySelector('#ts-k-v').textContent = Math.min(S.k, n);
    const count = S.mode === 'full' ? `(n − 1)! = ${n - 1}! = ${fact(n - 1)}` : `P(${n}, ${k}) = ${n}!/${n - k}! = ${fact(n) / fact(n - k)}`;
    root.querySelector('#ts-facts').innerHTML = `<table class="ax-t"><tbody>
      <tr><td>Şehir</td><td>${n}</td></tr>
      <tr><td>Denenecek sıralama</td><td><b>${S.list.length}</b><small>${count}</small></td></tr>
      <tr><td>Kenar sayısı / sıralama</td><td>${S.mode === 'path' ? k - 1 : k}</td></tr>
      <tr><td>Karmaşıklık</td><td>${S.mode === 'full' ? 'Θ(n!)' : 'Θ(n!/(n−k)! · k)'}</td></tr></tbody></table>`;
    root.querySelector('#ts-title').textContent = G.name;
    draw();
    OSLab.app.setStatus('ready');
  }

  function stepOnce() {
    if (S.i >= S.list.length - 1) return false;
    S.i++;
    const c = S.list[S.i];
    if (c.L !== null) {
      S.valid++;
      if (!S.best || c.L < S.best.L) { S.best = c; c.newBest = true; }
    }
    return true;
  }

  function draw() {
    const G = GRAPHS[S.graph];
    const cur = S.i >= 0 ? S.list[S.i] : null;
    const edgesOf = (c) => (c ? c.path.slice(1).map((v, i) => `${c.path[i]}-${v}`).filter((e) => { const [u, v] = e.split('-'); return weight(G.g, u, v) !== null; }) : []);
    root.querySelector('#ts-cur').innerHTML = UI.graphSvg(G.g, edgesOf(cur), { w: G.w, h: G.h, order: cur ? cur.seq : [] });
    root.querySelector('#ts-best').innerHTML = UI.graphSvg(G.g, edgesOf(S.best), { w: G.w, h: G.h, order: S.best ? S.best.seq : [] });
    root.querySelector('#ts-step').textContent = `${S.i + 1} / ${S.list.length} · geçerli ${S.valid}`;
    const done = S.i === S.list.length - 1;
    let cap;
    if (!cur) cap = `Başlatınca ${S.list.length} sıralamanın her biri sırayla denenecek.`;
    else if (cur.L === null) cap = `${cur.path.join(' → ')}: <b>${cur.missing}</b> arasında yol yok → <b>elendi</b>.`;
    else cap = `${cur.path.join(' → ')} = ${cur.parts.join(' + ')} = <b>${cur.L}</b>${cur.newBest ? ' → <b>yeni en iyi!</b>' : ` (en iyi ${S.best.L})`}`;
    if (done) {
      const ties = S.list.filter((c) => S.best && c.L === S.best.L);
      const same = S.mode === 'path' ? 'ters yönü aynı yoldur' : 'başlangıcı ya da yönü farklı olanlar aynı devredir';
      cap = S.best ? `✓ Arama bitti. Denenen: ${S.list.length} sıralama, geçerli: ${S.valid}. En kısa: <b>${S.best.path.join(' → ')} = ${S.best.L}</b>${ties.length > 1 ? ` (aynı uzunlukta ${ties.length} sıralama: ${ties.map((t) => t.path.join('')).join(', ')}; ${same})` : ''}.` : `✓ Arama bitti: bu kipte hiç geçerli sıralama yok.`;
      OSLab.app.setStatus('done');
    }
    root.querySelector('#ts-cap').innerHTML = cap;
    drawList();
  }

  function drawList() {
    const items = S.list.slice(0, S.i + 1).map((c, idx) => ({ c, idx })).filter(({ c }) => S.filter === 'all' || c.L !== null);
    const shown = items.slice(-160).reverse();
    root.querySelectorAll('[data-f]').forEach((b) => b.classList.toggle('active', b.dataset.f === S.filter));
    root.querySelector('#ts-list').innerHTML = shown.length
      ? `<table class="ax-t"><tbody>${shown.map(({ c, idx }) => `<tr class="${c.L === null ? 'ts-bad' : ''}${S.best === c ? ' ax-min' : ''}${idx === S.i ? ' sel' : ''}"><td class="num">${idx + 1}</td><td>${c.path.join(' → ')}</td><td>${c.L === null ? `elendi (${c.missing} yok)` : `${c.parts.join(' + ')} = <b>${c.L}</b>`}</td></tr>`).join('')}</tbody></table>${items.length > 160 ? `<p class="hint">Son 160 satır gösteriliyor (toplam ${items.length}).</p>` : ''}`
      : '<p class="hint">Henüz sıralama denenmedi.</p>';
  }

  function stop() {
    clearTimeout(S.timer);
    S.timer = 0;
    const b = root && root.querySelector('#ts-play');
    if (b) b.textContent = S.i >= S.list.length - 1 && S.i >= 0 ? '▶ Tekrar başlat' : S.i >= 0 ? '▶ Devam' : '▶ Aramayı başlat';
  }

  function play() {
    if (S.timer) { stop(); OSLab.app.setStatus('paused'); return; }
    if (S.i >= S.list.length - 1) reset();
    const ms = SPEEDS.find((s) => s[0] === S.speed)[2];
    if (!ms) { while (stepOnce()); draw(); stop(); return; }
    root.querySelector('#ts-play').textContent = '⏸ Durdur';
    OSLab.app.setStatus('running');
    const tick = () => {
      if (!root) return;
      // geçersiz sıralamalar hızlı geçilir
      let moved = stepOnce();
      while (moved && S.list[S.i].L === null && S.filter === 'valid' && S.i < S.list.length - 1) moved = stepOnce();
      draw();
      if (!moved || S.i >= S.list.length - 1) { stop(); return; }
      S.timer = setTimeout(tick, ms);
    };
    tick();
  }

  function onClick(e) {
    const t = e.target.closest('[data-t]');
    if (t) {
      if (t.dataset.t === 'play') play();
      if (t.dataset.t === 'step') { stop(); if (S.i >= S.list.length - 1) reset(); stepOnce(); draw(); }
      if (t.dataset.t === 'reset') reset();
      return;
    }
    const f = e.target.closest('[data-f]');
    if (f) { S.filter = f.dataset.f; drawList(); }
  }
  function onInput(e) {
    const id = e.target.id;
    if (id === 'ts-k') { S.k = Number(e.target.value); root.querySelector('#ts-k-v').textContent = S.k; if (e.type === 'change') reset(); return; }
    if (e.type !== 'change') return;
    if (id === 'ts-g') { S.graph = e.target.value; if (S.graph === 'slide') { S.mode = 'full'; } reset(); }
    if (id === 'ts-mode') { S.mode = e.target.value; reset(); }
    if (id === 'ts-sp') { S.speed = e.target.value; if (S.timer) { stop(); play(); } }
  }

  function mount(container) {
    root = container;
    root.innerHTML = template();
    root.addEventListener('click', onClick);
    root.addEventListener('input', onInput);
    root.addEventListener('change', onInput);
    reset();
  }
  function unmount() {
    stop();
    if (root) {
      root.removeEventListener('click', onClick);
      root.removeEventListener('input', onInput);
      root.removeEventListener('change', onInput);
    }
    root = null;
  }
  function loadPreset(p) {
    if (p.graph) { S.graph = p.graph; S.mode = p.graph === 'slide' ? 'full' : S.mode; }
    else S.graph = 'lab2';
    if (p.mode) S.mode = p.mode;
    if (p.k) S.k = p.k;
    if (root) { root.querySelector('#ts-g').value = S.graph; reset(); }
  }

  OSLab.modules = OSLab.modules || {};
  OSLab.modules.tsp = { num: 'L3', title: 'Gezgin Satıcı', subtitle: 'Lab 2 · kaba kuvvetle en kısa tur', mount, unmount, loadPreset };
})(window.OSLab = window.OSLab || {});
